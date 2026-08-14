import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '$lib/firebase/client';
import type { Project } from './types';

/**
 * Picked images go to Storage, never inline into the project document.
 *
 * A project is one Firestore document holding every element, and Firestore caps
 * a document at 1 MiB. A single base64 phone photo blows past that, so the write
 * fails — silently, since autosave only logs. Everything here exists to keep
 * `imageSrc` / `background.src` holding a short https URL rather than the bytes.
 */

/**
 * Longest edge we keep. The tallest canvas is 1920px and exports top out at 3×,
 * so pixels beyond this are ones nobody can see, paid for on every upload, save
 * and export.
 */
const MAX_EDGE = 2048;
/** Refuse absurd inputs before decoding them into memory. */
const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const WEBP_QUALITY = 0.86;
const JPEG_QUALITY = 0.9;

export interface PreparedImage {
  /**
   * Data URL of the prepared bytes, safe to drop straight onto the canvas —
   * including for guests, who have no Storage write until they sign in.
   */
  previewSrc: string;
  blob: Blob;
  ext: string;
  width: number;
  height: number;
}

/** True for a payload embedded in the document rather than referenced by URL. */
export function isInlineImage(src: string | undefined): boolean {
  return typeof src === 'string' && src.startsWith('data:');
}

let webpSupport: boolean | null = null;
function supportsWebp(): boolean {
  if (webpSupport === null) {
    const probe = document.createElement('canvas');
    probe.width = probe.height = 1;
    webpSupport = probe.toDataURL('image/webp').startsWith('data:image/webp');
  }
  return webpSupport;
}

/**
 * WebP wherever the browser can encode it — roughly a third of the JPEG bytes at
 * the same quality, and it keeps alpha. Without it, stay lossless for sources
 * that might have transparency and compress everything else.
 */
function encodingFor(sourceType: string): { mime: string; ext: string; quality: number } {
  if (supportsWebp()) return { mime: 'image/webp', ext: 'webp', quality: WEBP_QUALITY };
  if (/png|gif|svg|webp/i.test(sourceType)) return { mime: 'image/png', ext: 'png', quality: 1 };
  return { mime: 'image/jpeg', ext: 'jpg', quality: JPEG_QUALITY };
}

function extFor(mime: string): string {
  if (/webp/i.test(mime)) return 'webp';
  if (/png/i.test(mime)) return 'png';
  if (/gif/i.test(mime)) return 'gif';
  if (/svg/i.test(mime)) return 'svg';
  return 'jpg';
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error('read failed'));
    reader.readAsDataURL(blob);
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
}

interface Decoded {
  source: CanvasImageSource;
  width: number;
  height: number;
  release: () => void;
}

async function decode(blob: Blob): Promise<Decoded> {
  // createImageBitmap is the cheap path, but it rejects on SVG in some browsers
  // and on anything it can't sniff — fall back to an <img> before giving up.
  try {
    const bitmap = await createImageBitmap(blob);
    return { source: bitmap, width: bitmap.width, height: bitmap.height, release: () => bitmap.close() };
  } catch {
    const url = URL.createObjectURL(blob);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error('decode failed'));
        el.src = url;
      });
      return {
        source: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        release: () => URL.revokeObjectURL(url)
      };
    } catch (err) {
      URL.revokeObjectURL(url);
      throw err;
    }
  }
}

/**
 * Decode, downscale to `MAX_EDGE`, and re-encode a picked file.
 *
 * Throws on anything undecodable so callers can say so, rather than inserting an
 * element that renders as a permanent dashed placeholder.
 */
export async function prepareImageFile(file: Blob): Promise<PreparedImage> {
  if (file.size > MAX_INPUT_BYTES) throw new Error('image-too-large');

  const decoded = await decode(file);
  try {
    const { width: srcW, height: srcH } = decoded;
    if (!srcW || !srcH) throw new Error('decode failed');

    const scale = Math.min(1, MAX_EDGE / Math.max(srcW, srcH));
    const width = Math.max(1, Math.round(srcW * scale));
    const height = Math.max(1, Math.round(srcH * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('no 2d context');
    ctx.drawImage(decoded.source, 0, 0, width, height);

    const encoding = encodingFor(file.type || '');
    const encoded = await canvasToBlob(canvas, encoding.mime, encoding.quality);

    // Re-encoding an already-optimised file at its original size can come out
    // bigger than what we started with. Only keep our version when it earns it.
    const useOriginal = !encoded || (scale === 1 && file.size <= encoded.size);
    const blob = useOriginal ? file : encoded;
    const ext = useOriginal ? extFor(file.type || '') : encoding.ext;

    return { previewSrc: await blobToDataUrl(blob), blob, ext, width, height };
  } finally {
    decoded.release();
  }
}

/** Upload prepared bytes and return their public download URL. */
export async function uploadAsset(blob: Blob, ext: string): Promise<string> {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('not signed in');
  const sref = ref(storage, `uploads/${uid}/${crypto.randomUUID()}.${ext}`);
  await uploadBytes(sref, blob, {
    contentType: blob.type || undefined,
    // The path is unique per upload, so the bytes behind it never change.
    cacheControl: 'public, max-age=31536000, immutable'
  });
  return getDownloadURL(sref);
}

/**
 * Replace every inline image left in the project with an uploaded URL.
 *
 * The insert paths upload eagerly, so this is the net under the cases they
 * can't cover: a guest who added images before signing in, an upload that failed
 * offline, and projects saved back when images went inline.
 *
 * Swapping `imageSrc` in place is deliberately invisible — the stage syncs
 * geometry from an image element but never re-reads the source of a bitmap it
 * has already drawn.
 */
export async function uploadInlineImages(project: Project): Promise<boolean> {
  if (!auth.currentUser) return false;

  // One upload per distinct payload: duplicating an image element shares its src.
  const done = new Map<string, string>();
  async function hostedUrl(src: string): Promise<string | null> {
    const cached = done.get(src);
    if (cached) return cached;
    try {
      const prepared = await prepareImageFile(await (await fetch(src)).blob());
      const url = await uploadAsset(prepared.blob, prepared.ext);
      done.set(src, url);
      return url;
    } catch (err) {
      console.error('inline image upload failed', err);
      return null;
    }
  }

  let changed = false;
  for (const el of project.elements) {
    if (el.type !== 'image' || !isInlineImage(el.imageSrc)) continue;
    const url = await hostedUrl(el.imageSrc);
    if (url) {
      el.imageSrc = url;
      changed = true;
    }
  }

  const bg = project.background;
  if (bg.type === 'image' && isInlineImage(bg.src)) {
    const url = await hostedUrl(bg.src);
    if (url) {
      bg.src = url;
      changed = true;
    }
  }

  return changed;
}
