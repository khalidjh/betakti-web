'use client';

import { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { removeBackground } from '@/lib/editor/bg-remove';
import { downloadDataUrl } from '@/lib/editor/export';

export default function BgRemovePage() {
  const t = useTranslations();
  const locale = useLocale();
  const [src, setSrc] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function process() {
    if (!src) return;
    setBusy(true);
    try {
      const out = await removeBackground(src);
      setResult(out);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{t('home.backgroundRemoval')}</h1>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => {
            setSrc(reader.result as string);
            setResult(null);
          };
          reader.readAsDataURL(f);
        }}
      />

      {!src ? (
        <Button size="lg" onClick={() => fileRef.current?.click()}>
          {locale === 'ar' ? 'رفع صورة' : 'Upload image'}
        </Button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="source" className="w-full rounded-xl border border-[color:var(--border)]" />
          <div className="rounded-xl border border-[color:var(--border)] flex items-center justify-center bg-[color:var(--muted)] min-h-[200px]">
            {busy ? (
              <p className="text-sm">{locale === 'ar' ? 'جار المعالجة…' : 'Processing…'}</p>
            ) : result ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={result} alt="result" className="w-full" />
            ) : (
              <p className="text-xs text-[color:var(--muted-foreground)]">—</p>
            )}
          </div>
        </div>
      )}

      {src && (
        <div className="flex gap-2">
          <Button onClick={process} disabled={busy || !src}>
            {locale === 'ar' ? 'إزالة الخلفية' : 'Remove background'}
          </Button>
          {result && (
            <Button variant="outline" onClick={() => downloadDataUrl(result, 'bg-removed.png')}>
              {locale === 'ar' ? 'تحميل' : 'Download'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
