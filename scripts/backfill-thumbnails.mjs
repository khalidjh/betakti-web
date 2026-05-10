#!/usr/bin/env node
/*
 * Backfill thumbnails for `dynamic_templates` Firestore docs.
 *
 * Renders each template to a 600x600 PNG using @napi-rs/canvas, uploads it
 * to Firebase Storage at `template-thumbnails/{id}.png`, and writes the
 * resolved public URL back to the doc's `thumbnailUrl` field.
 *
 * Usage:
 *   node scripts/backfill-thumbnails.mjs [--dry-run] [--force] [--limit=N]
 *
 * Flags:
 *   --dry-run   Render but do not upload or write back.
 *   --force     Re-render and overwrite docs that already have a thumbnailUrl.
 *   --limit=N   Process at most N candidate docs.
 *
 * Required env vars (loaded from .env.local at repo root):
 *   FIREBASE_ADMIN_PROJECT_ID
 *   FIREBASE_ADMIN_CLIENT_EMAIL
 *   FIREBASE_ADMIN_PRIVATE_KEY     (with \n escapes, as stored in .env.local)
 *   PUBLIC_FIREBASE_STORAGE_BUCKET (e.g. betakti.appspot.com)
 *
 * Dev dep (add once):
 *   npm install -D @napi-rs/canvas
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

// --- tiny .env.local parser (avoid dotenv runtime dep) ---------------------
function loadDotenvLocal() {
  try {
    const raw = readFileSync(join(REPO_ROOT, '.env.local'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    // .env.local missing is OK if user already exported the vars
  }
}
loadDotenvLocal();

// --- args ------------------------------------------------------------------
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE = args.includes('--force');
const LIMIT = (() => {
  const a = args.find((x) => x.startsWith('--limit='));
  if (!a) return null;
  const n = Number.parseInt(a.slice('--limit='.length), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
})();

// --- lazy imports so a missing dep gives a useful message -----------------
let createCanvas, loadImage;
try {
  ({ createCanvas, loadImage } = await import('@napi-rs/canvas'));
} catch (e) {
  console.error('[backfill] @napi-rs/canvas not installed. Run: npm install -D @napi-rs/canvas');
  process.exit(1);
}

const admin = await import('firebase-admin/app');
const { cert, getApps, initializeApp } = admin;
const { getFirestore } = await import('firebase-admin/firestore');
const { getStorage } = await import('firebase-admin/storage');

// --- firebase-admin init ---------------------------------------------------
const bucketName = process.env.PUBLIC_FIREBASE_STORAGE_BUCKET;
if (!bucketName) {
  console.error('[backfill] Missing PUBLIC_FIREBASE_STORAGE_BUCKET');
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '').replace(/\\n/g, '\n')
    }),
    storageBucket: bucketName
  });
}

const db = getFirestore();
const bucket = getStorage().bucket();

// --- minimal canvas renderer ----------------------------------------------
const OUT = 600;

function applyBackground(ctx, bg, w, h) {
  if (!bg || bg.type === 'color') {
    ctx.fillStyle = bg?.color ?? '#ffffff';
    ctx.fillRect(0, 0, w, h);
    return;
  }
  if (bg.type === 'gradient') {
    const angle = ((bg.angle ?? 0) * Math.PI) / 180;
    const cx = w / 2;
    const cy = h / 2;
    const dx = (Math.cos(angle) * w) / 2;
    const dy = (Math.sin(angle) * h) / 2;
    const grad = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
    const stops = Array.isArray(bg.stops) && bg.stops.length ? bg.stops : [
      { offset: 0, color: '#ffffff' },
      { offset: 1, color: '#eeeeee' }
    ];
    for (const s of stops) grad.addColorStop(Math.max(0, Math.min(1, s.offset ?? 0)), s.color ?? '#000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    return;
  }
  // image/pattern: fall back to white (we don't block on remote fetches for thumbnails)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
}

function drawText(ctx, el) {
  const weight = el.isBold ? 'bold' : 'normal';
  const style = el.isItalic ? 'italic' : 'normal';
  const family = el.fontFamily || 'sans-serif';
  const size = Math.max(1, el.fontSize ?? 24);
  ctx.font = `${style} ${weight} ${size}px "${family}"`;
  ctx.fillStyle = el.color ?? '#000';
  const align = el.textAlignment ?? 'left';
  ctx.textAlign = align === 'center' ? 'center' : align === 'right' ? 'right' : 'left';
  ctx.textBaseline = 'top';
  const lines = String(el.text ?? '').split('\n');
  const lh = size * (el.lineHeight ?? 1.2);
  const anchorX = align === 'center' ? el.x + el.width / 2 : align === 'right' ? el.x + el.width : el.x;
  lines.forEach((ln, i) => ctx.fillText(ln, anchorX, el.y + i * lh));
}

function drawShape(ctx, el) {
  ctx.fillStyle = el.fillColor ?? '#000';
  ctx.strokeStyle = el.strokeColor ?? 'transparent';
  ctx.lineWidth = el.strokeWidth ?? 0;
  const t = el.shapeType ?? 'rectangle';
  if (t === 'rectangle') {
    const r = Math.max(0, el.cornerRadius ?? 0);
    if (r > 0) {
      const x = el.x, y = el.y, w = el.width, h = el.height;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fill();
      if (el.strokeWidth) ctx.stroke();
    } else {
      ctx.fillRect(el.x, el.y, el.width, el.height);
      if (el.strokeWidth) ctx.strokeRect(el.x, el.y, el.width, el.height);
    }
  } else if (t === 'circle') {
    ctx.beginPath();
    ctx.ellipse(el.x + el.width / 2, el.y + el.height / 2, el.width / 2, el.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    if (el.strokeWidth) ctx.stroke();
  } else if (t === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(el.x + el.width / 2, el.y);
    ctx.lineTo(el.x + el.width, el.y + el.height);
    ctx.lineTo(el.x, el.y + el.height);
    ctx.closePath();
    ctx.fill();
    if (el.strokeWidth) ctx.stroke();
  } else if (t === 'line') {
    ctx.strokeStyle = el.fillColor ?? el.strokeColor ?? '#000';
    ctx.lineWidth = Math.max(1, el.strokeWidth ?? 2);
    ctx.beginPath();
    ctx.moveTo(el.x, el.y + el.height / 2);
    ctx.lineTo(el.x + el.width, el.y + el.height / 2);
    ctx.stroke();
  }
  // other shapes: skipped for thumbnails
}

async function drawImage(ctx, el) {
  if (!el.imageSrc) return;
  try {
    const img = await loadImage(el.imageSrc);
    ctx.save();
    ctx.globalAlpha = el.opacity ?? 1;
    ctx.drawImage(img, el.x, el.y, el.width, el.height);
    ctx.restore();
  } catch {
    // skip on fetch failure
  }
}

function drawSticker(ctx, el) {
  if (el.stickerType !== 'emoji') return;
  const size = Math.min(el.width, el.height);
  ctx.font = `${size}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = el.color ?? '#000';
  ctx.fillText(String(el.content ?? ''), el.x + el.width / 2, el.y + el.height / 2);
}

async function renderTemplate(tpl) {
  const srcW = tpl.canvasSize?.width ?? 1080;
  const srcH = tpl.canvasSize?.height ?? 1080;
  const canvas = createCanvas(OUT, OUT);
  const ctx = canvas.getContext('2d');
  const scale = Math.min(OUT / srcW, OUT / srcH);
  const offX = (OUT - srcW * scale) / 2;
  const offY = (OUT - srcH * scale) / 2;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, OUT, OUT);

  ctx.save();
  ctx.translate(offX, offY);
  ctx.scale(scale, scale);

  applyBackground(ctx, tpl.background, srcW, srcH);

  const elements = Array.isArray(tpl.elements) ? [...tpl.elements] : [];
  elements.sort((a, b) => (a?.zIndex ?? 0) - (b?.zIndex ?? 0));

  for (const el of elements) {
    if (!el || el.isVisible === false) continue;
    ctx.save();
    if (el.rotation) {
      const cx = (el.x ?? 0) + (el.width ?? 0) / 2;
      const cy = (el.y ?? 0) + (el.height ?? 0) / 2;
      ctx.translate(cx, cy);
      ctx.rotate(((el.rotation ?? 0) * Math.PI) / 180);
      ctx.translate(-cx, -cy);
    }
    if (el.type === 'text') drawText(ctx, el);
    else if (el.type === 'shape') drawShape(ctx, el);
    else if (el.type === 'image') await drawImage(ctx, el);
    else if (el.type === 'sticker') drawSticker(ctx, el);
    ctx.restore();
  }

  ctx.restore();
  return canvas.toBuffer('image/png');
}

// --- main ------------------------------------------------------------------
async function main() {
  console.log(`[backfill] dry-run=${DRY_RUN} force=${FORCE} limit=${LIMIT ?? 'none'}`);
  const snap = await db.collection('dynamic_templates').where('isActive', '==', true).get();
  let candidates = snap.docs;
  if (!FORCE) {
    candidates = candidates.filter((d) => {
      const url = d.data().thumbnailUrl;
      return !(typeof url === 'string' && url.trim().length);
    });
  }
  if (LIMIT) candidates = candidates.slice(0, LIMIT);

  const total = candidates.length;
  const skippedExisting = snap.size - (FORCE ? snap.size : candidates.length + (FORCE ? 0 : 0));
  let rendered = 0;
  let failed = 0;

  for (let i = 0; i < candidates.length; i++) {
    const doc = candidates[i];
    const id = doc.id;
    try {
      const png = await renderTemplate(doc.data());
      if (DRY_RUN) {
        console.log(`[${i + 1}/${total}] ${id} → (dry-run, ${png.length} bytes)`);
        rendered++;
        continue;
      }
      const file = bucket.file(`template-thumbnails/${id}.png`);
      await file.save(png, {
        contentType: 'image/png',
        resumable: false,
        metadata: { cacheControl: 'public, max-age=86400' }
      });
      await file.makePublic().catch(() => {});
      const url = `https://storage.googleapis.com/${bucket.name}/template-thumbnails/${id}.png`;
      await doc.ref.update({ thumbnailUrl: url });
      console.log(`[${i + 1}/${total}] ${id} → ${url}`);
      rendered++;
    } catch (e) {
      failed++;
      console.error(`[${i + 1}/${total}] ${id} FAILED: ${e?.message ?? e}`);
    }
  }

  console.log(
    `[backfill] done. rendered=${rendered} skipped-existing=${snap.size - candidates.length} failed=${failed}`
  );
}

main().catch((e) => {
  console.error('[backfill] fatal:', e);
  process.exit(1);
});
