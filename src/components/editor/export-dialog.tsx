'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';
import {
  downloadDataUrl,
  exportCanvasToPDF,
  exportCanvasToPNG,
  type ExportQuality,
} from '@/lib/editor/export';
import { exportCanvasToGIF } from '@/lib/editor/gif-export';
import { hasAnimations } from '@/lib/editor/animations';
import { cn } from '@/lib/utils';
import type { CanvasElement } from '@/lib/types/canvas';

type Format = 'png' | 'pdf' | 'gif';

export function ExportDialog({
  canvas,
  elements,
  onClose,
  isPro,
  projectName,
}: {
  canvas: fabric.Canvas | null;
  elements: CanvasElement[];
  onClose: () => void;
  isPro: boolean;
  projectName: string;
}) {
  const locale = useLocale();
  const [format, setFormat] = useState<Format>('png');
  const [quality, setQuality] = useState<ExportQuality>('standard');
  const [busy, setBusy] = useState(false);

  async function doExport() {
    if (!canvas) return;
    setBusy(true);
    try {
      const watermark = !isPro;
      if (format === 'png') {
        const dataUrl = await exportCanvasToPNG(canvas, { quality, watermark });
        downloadDataUrl(dataUrl, `${projectName || 'betakti'}-${quality}.png`);
      } else if (format === 'pdf') {
        await exportCanvasToPDF(canvas, {
          watermark,
          filename: `${projectName || 'betakti'}.pdf`,
        });
      } else if (format === 'gif') {
        if (!hasAnimations(elements)) {
          toast.error(locale === 'ar' ? 'لا توجد حركات' : 'No animations');
          return;
        }
        const blob = await exportCanvasToGIF(canvas, elements, { watermark });
        downloadDataUrl(URL.createObjectURL(blob), `${projectName || 'betakti'}.gif`);
      }
      toast.success(locale === 'ar' ? 'تم التصدير' : 'Exported');
      onClose();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const formats: { id: Format; label: string; locked: boolean }[] = [
    { id: 'png', label: 'PNG', locked: false },
    { id: 'pdf', label: 'PDF', locked: !isPro },
    { id: 'gif', label: 'GIF', locked: !isPro },
  ];

  const qualities: { id: ExportQuality; label: string; locked: boolean }[] = [
    { id: 'standard', label: '1x', locked: false },
    { id: 'high', label: '2x (HD)', locked: !isPro },
    { id: 'ultra', label: '3x (4K)', locked: !isPro },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[color:var(--background)] rounded-2xl p-6 w-full max-w-md space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 end-3 p-1 rounded hover:bg-[color:var(--muted)]"
        >
          <X size={18} />
        </button>
        <h2 className="text-xl font-bold">
          {locale === 'ar' ? 'تصدير التصميم' : 'Export design'}
        </h2>

        <div className="space-y-2">
          <p className="text-xs text-[color:var(--muted-foreground)]">
            {locale === 'ar' ? 'الصيغة' : 'Format'}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {formats.map((f) => (
              <button
                key={f.id}
                disabled={f.locked}
                onClick={() => setFormat(f.id)}
                className={cn(
                  'p-3 rounded-lg border text-sm',
                  format === f.id
                    ? 'border-[color:var(--primary)] bg-[color:var(--muted)]'
                    : 'border-[color:var(--border)]',
                  f.locked && 'opacity-40 cursor-not-allowed',
                )}
              >
                {f.label}
                {f.locked && <span className="block text-[10px]">PRO</span>}
              </button>
            ))}
          </div>
        </div>

        {format === 'png' && (
          <div className="space-y-2">
            <p className="text-xs text-[color:var(--muted-foreground)]">
              {locale === 'ar' ? 'الجودة' : 'Quality'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {qualities.map((q) => (
                <button
                  key={q.id}
                  disabled={q.locked}
                  onClick={() => setQuality(q.id)}
                  className={cn(
                    'p-3 rounded-lg border text-sm',
                    quality === q.id
                      ? 'border-[color:var(--primary)] bg-[color:var(--muted)]'
                      : 'border-[color:var(--border)]',
                    q.locked && 'opacity-40 cursor-not-allowed',
                  )}
                >
                  {q.label}
                  {q.locked && <span className="block text-[10px]">PRO</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {!isPro && (
          <p className="text-xs text-[color:var(--muted-foreground)]">
            {locale === 'ar'
              ? 'سيتم إضافة علامة مائية. قم بالترقية لإزالتها.'
              : 'Watermark will be added. Upgrade to remove.'}
          </p>
        )}

        <Button onClick={doExport} disabled={busy} className="w-full">
          {busy ? '…' : format.toUpperCase()}
        </Button>
      </div>
    </div>
  );
}
