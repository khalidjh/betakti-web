'use client';

import * as fabric from 'fabric';
import type { CanvasElement } from '@/lib/types/canvas';
import { animationFrame, totalAnimationDuration } from './animations';

type FabricWithId = fabric.Object & { _elId?: string };

interface GifOptions {
  fps?: number;
  quality?: number; // 1 (best) – 30 (worst)
  watermark?: boolean;
  watermarkText?: string;
  onProgress?: (p: number) => void;
}

export async function exportCanvasToGIF(
  canvas: fabric.Canvas,
  elements: CanvasElement[],
  opts: GifOptions = {},
): Promise<Blob> {
  const fps = opts.fps ?? 24;
  const quality = opts.quality ?? 10;
  const duration = Math.min(totalAnimationDuration(elements), 6000); // cap at 6s
  const frameCount = Math.max(1, Math.round((duration / 1000) * fps));
  const delay = Math.round(1000 / fps);
  const w = canvas.getWidth();
  const h = canvas.getHeight();

  // Dynamic import — gif.js.optimized has no types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GIFmod = (await import('gif.js.optimized')) as any;
  const GIF = GIFmod.default ?? GIFmod;

  const gif = new GIF({
    workers: 2,
    quality,
    width: w,
    height: h,
    workerScript: '/gif.worker.js',
  });

  // Snapshot current state: remember original props so we can restore.
  const objects = canvas.getObjects();
  type Snap = {
    obj: fabric.Object;
    left: number;
    top: number;
    scaleX: number;
    scaleY: number;
    angle: number;
    opacity: number;
    visible: boolean;
    originalElement?: CanvasElement;
  };
  const snaps: Snap[] = objects.map((o) => {
    const id = (o as FabricWithId)._elId;
    return {
      obj: o,
      left: o.left ?? 0,
      top: o.top ?? 0,
      scaleX: o.scaleX ?? 1,
      scaleY: o.scaleY ?? 1,
      angle: o.angle ?? 0,
      opacity: o.opacity ?? 1,
      visible: o.visible ?? true,
      originalElement: elements.find((e) => e.id === id),
    };
  });

  for (let i = 0; i < frameCount; i++) {
    const t = (i / frameCount) * duration;
    for (const s of snaps) {
      const el = s.originalElement;
      if (!el) continue;
      const f = animationFrame(el, t, w, h);
      s.obj.set({
        left: s.left + f.translateX,
        top: s.top + f.translateY,
        scaleX: s.scaleX * f.scale,
        scaleY: s.scaleY * f.scale,
        angle: s.angle + f.rotate,
        opacity: s.opacity * f.opacity,
        visible: f.visible && s.visible,
      });
    }
    canvas.renderAll();
    const lower = (canvas as unknown as { lowerCanvasEl: HTMLCanvasElement }).lowerCanvasEl;
    gif.addFrame(lower, { copy: true, delay });
    opts.onProgress?.(i / frameCount);
  }

  // Restore
  for (const s of snaps) {
    s.obj.set({
      left: s.left,
      top: s.top,
      scaleX: s.scaleX,
      scaleY: s.scaleY,
      angle: s.angle,
      opacity: s.opacity,
      visible: s.visible,
    });
  }
  canvas.renderAll();

  return new Promise((resolve, reject) => {
    gif.on('finished', (blob: Blob) => resolve(blob));
    gif.on('abort', () => reject(new Error('gif aborted')));
    gif.render();
  });
}
