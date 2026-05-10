export type ExportScale = 1 | 2 | 3;

export interface ExportOptions {
  scale: ExportScale;
  withWatermark: boolean;
}

export async function downloadPng(
  exporter: (scale: number, withWatermark: boolean) => Promise<string>,
  opts: ExportOptions,
  filename = 'betakti-design.png'
): Promise<string> {
  const dataUrl = await exporter(opts.scale, opts.withWatermark);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  return dataUrl;
}

export async function copyPngToClipboard(
  exporter: (scale: number, withWatermark: boolean) => Promise<string>,
  opts: ExportOptions
): Promise<boolean> {
  try {
    const dataUrl = await exporter(opts.scale, opts.withWatermark);
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    // ClipboardItem may not be present in all browsers/types.
    const ClipboardItemCtor = (globalThis as unknown as { ClipboardItem?: typeof ClipboardItem })
      .ClipboardItem;
    if (!ClipboardItemCtor || !navigator.clipboard?.write) return false;
    await navigator.clipboard.write([new ClipboardItemCtor({ 'image/png': blob })]);
    return true;
  } catch {
    return false;
  }
}

export function estimateSize(width: number, height: number, scale: number): string {
  // Very rough PNG estimate: ~4 bytes per pixel * 0.35 compression factor
  const bytes = width * scale * height * scale * 4 * 0.35;
  if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}
