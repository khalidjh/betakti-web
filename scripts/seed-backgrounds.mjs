#!/usr/bin/env node
/*
 * Seed the Firestore `backgrounds` collection from the hardcoded
 * STOCK_IMAGES list in src/lib/editor/stock-backgrounds.ts.
 *
 * After running, the editor inspector will read from Firestore, and the
 * admin page (/admin/backgrounds) will show every image so you can
 * hide/delete/reorder them.
 *
 * Usage:
 *   node scripts/seed-backgrounds.mjs              # add only missing
 *   node scripts/seed-backgrounds.mjs --reset      # delete all then re-seed
 *
 * Required env (loaded from .env.local):
 *   FIREBASE_ADMIN_PROJECT_ID
 *   FIREBASE_ADMIN_CLIENT_EMAIL
 *   FIREBASE_ADMIN_PRIVATE_KEY
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

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
    // optional
  }
}
loadDotenvLocal();

const RESET = process.argv.includes('--reset');

// --- Mirror of STOCK_IMAGES in src/lib/editor/stock-backgrounds.ts ---------
function fillSeeds(prefix, count, category) {
  return Array.from({ length: count }, (_, i) => ({
    seed: `${prefix}-${String(i + 1).padStart(2, '0')}`,
    category
  }));
}

const STOCK_IMAGES = [
  ...fillSeeds('mountain', 4, 'Landscape'),
  ...fillSeeds('valley', 3, 'Landscape'),
  ...fillSeeds('desert', 3, 'Landscape'),
  ...fillSeeds('horizon', 3, 'Landscape'),
  ...fillSeeds('canyon', 3, 'Landscape'),

  ...fillSeeds('sky', 4, 'Sky'),
  ...fillSeeds('clouds', 3, 'Sky'),
  ...fillSeeds('sunset', 3, 'Sky'),
  ...fillSeeds('aurora', 3, 'Sky'),
  ...fillSeeds('stars', 3, 'Sky'),

  ...fillSeeds('ocean', 4, 'Sea'),
  ...fillSeeds('wave', 3, 'Sea'),
  ...fillSeeds('shore', 3, 'Sea'),
  ...fillSeeds('lake', 3, 'Sea'),
  ...fillSeeds('reef', 3, 'Sea'),

  ...fillSeeds('forest', 4, 'Forest'),
  ...fillSeeds('pine', 3, 'Forest'),
  ...fillSeeds('leaf', 3, 'Forest'),
  ...fillSeeds('jungle', 3, 'Forest'),
  ...fillSeeds('meadow', 3, 'Forest'),

  ...fillSeeds('city', 4, 'Urban'),
  ...fillSeeds('street', 3, 'Urban'),
  ...fillSeeds('arch', 3, 'Urban'),
  ...fillSeeds('facade', 3, 'Urban'),
  ...fillSeeds('neon', 3, 'Urban'),

  ...fillSeeds('paper', 3, 'Texture'),
  ...fillSeeds('marble', 3, 'Texture'),
  ...fillSeeds('wood', 3, 'Texture'),
  ...fillSeeds('linen', 3, 'Texture'),
  ...fillSeeds('concrete', 3, 'Texture'),
  ...fillSeeds('sand', 3, 'Texture'),

  ...fillSeeds('ink', 3, 'Abstract'),
  ...fillSeeds('bokeh', 3, 'Abstract'),
  ...fillSeeds('smoke', 3, 'Abstract'),
  ...fillSeeds('glow', 3, 'Abstract'),
  ...fillSeeds('flow', 3, 'Abstract'),
  ...fillSeeds('light', 3, 'Abstract')
];

const stockThumbUrl = (seed) => `https://picsum.photos/seed/${seed}/200/200`;
const stockFullUrl = (seed) => `https://picsum.photos/seed/${seed}/1600/1200`;

// --- Firebase init ---------------------------------------------------------
const { cert, getApps, initializeApp } = await import('firebase-admin/app');
const { getFirestore, FieldValue } = await import('firebase-admin/firestore');

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '').replace(/\\n/g, '\n')
    })
  });
}

const db = getFirestore();
const col = db.collection('backgrounds');

if (RESET) {
  const snap = await col.get();
  console.log(`[seed] resetting: deleting ${snap.size} existing docs`);
  const batch = db.batch();
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

// --- Existing docs: index by seed (stored as `seed` field) -----------------
const existing = await col.get();
const existingSeeds = new Set();
for (const d of existing.docs) {
  const seed = d.data()?.seed;
  if (typeof seed === 'string') existingSeeds.add(seed);
}

let added = 0;
let skipped = 0;
const writer = db.batch();
let pending = 0;

for (let i = 0; i < STOCK_IMAGES.length; i++) {
  const im = STOCK_IMAGES[i];
  if (existingSeeds.has(im.seed)) {
    skipped++;
    continue;
  }
  const ref = col.doc();
  writer.set(ref, {
    seed: im.seed,
    url: stockFullUrl(im.seed),
    thumbnailUrl: stockThumbUrl(im.seed),
    category: im.category,
    status: 'approved',
    sortOrder: i + 1,
    addedAt: FieldValue.serverTimestamp()
  });
  added++;
  pending++;
  if (pending >= 400) {
    await writer.commit();
    pending = 0;
  }
}
if (pending > 0) await writer.commit();

console.log(`[seed] done · added ${added} · skipped (already present) ${skipped}`);
