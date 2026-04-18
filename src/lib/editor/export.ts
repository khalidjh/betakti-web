'use client';

import * as fabric from 'fabric';
import { jsPDF } from 'jspdf';

export type ExportQuality = 'standard' | 'high' | 'ultra';

const SCALES: Record<ExportQuality, number> = {
  standard: 1,
  high: 2,
  ultra: 3,
};

export function exportCanvasToPNG(
  canvas: fabric.Canvas,
  {
    quality = 'standard',
    watermark = false,
    watermarkText = 'صُمم بـ Betakti',
  }: { quality?: ExportQuality; watermark?: boolean; watermarkText?: string } = {},
): Promise<string> {
  const multiplier = SCALES[quality];
  const dataUrl = canvas.toDataURL({
    format: 'png',
    multiplier,
  });
  if (!watermark) return Promise.resolve(dataUrl);

  return addWatermark(dataUrl, watermarkText);
}

function addWatermark(dataUrl: string, text: string): Promise<string> {
  if (typeof document === 'undefined') return Promise.resolve(dataUrl);
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.width;
      c.height = img.height;
      const ctx = c.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const pad = Math.max(12, img.width * 0.02);
      const fontSize = Math.max(14, img.width * 0.025);
      ctx.font = `600 ${fontSize}px Cairo, system-ui, sans-serif`;
      ctx.textAlign = 'end';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillText(text, img.width - pad, img.height - pad);
      resolve(c.toDataURL('image/png'));
    };
    img.src = dataUrl;
  });
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function exportCanvasToPDF(
  canvas: fabric.Canvas,
  opts: { watermark?: boolean; watermarkText?: string; filename?: string } = {},
): Promise<void> {
  const dataUrl = await exportCanvasToPNG(canvas, {
    quality: 'high',
    watermark: opts.watermark,
    watermarkText: opts.watermarkText,
  });
  const w = canvas.getWidth();
  const h = canvas.getHeight();
  const pdf = new jsPDF({
    orientation: w >= h ? 'landscape' : 'portrait',
    unit: 'px',
    format: [w, h],
    hotfixes: ['px_scaling'],
  });
  pdf.addImage(dataUrl, 'PNG', 0, 0, w, h);
  pdf.save(opts.filename ?? 'betakti.pdf');
}

export async function generateThumbnail(canvas: fabric.Canvas, size = 512): Promise<string> {
  const full = canvas.toDataURL({ format: 'png', multiplier: 1 });
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(size / img.width, size / img.height);
      const c = document.createElement('canvas');
      c.width = img.width * scale;
      c.height = img.height * scale;
      c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL('image/jpeg', 0.7));
    };
    img.src = full;
  });
}
