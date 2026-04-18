'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { STYLE_PRESETS } from '@/lib/ai/styles';
import { useAuth } from '@/lib/auth/context';
import { getUserDoc } from '@/lib/data/users';
import { downloadDataUrl } from '@/lib/editor/export';
import { cn } from '@/lib/utils';

export default function AIStylePage() {
  const locale = useLocale();
  const { user } = useAuth();
  const [isPro, setIsPro] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [styleId, setStyleId] = useState(STYLE_PRESETS[0].id);
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) getUserDoc(user.uid).then((u) => setIsPro(u?.subscription.tier === 'pro'));
  }, [user]);

  async function pickImage(f: File) {
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result as string);
    reader.readAsDataURL(f);

    // Upload to Firebase Storage so fal.ai can fetch it by URL.
    setUploadedUrl(null);
    const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    const { storage } = await import('@/lib/firebase/client');
    if (!user) return;
    const path = `ai_inputs/${user.uid}/${Date.now()}-${f.name}`;
    const r = ref(storage, path);
    await uploadBytes(r, f);
    setUploadedUrl(await getDownloadURL(r));
  }

  async function run() {
    if (!user || !uploadedUrl) return;
    setBusy(true);
    setResult(null);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/ai/style', {
        method: 'POST',
        body: JSON.stringify({ imageUrl: uploadedUrl, styleId, idToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'failed');
      setResult(data.url);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!user) {
    return (
      <div className="p-10">
        <p>{locale === 'ar' ? 'سجل الدخول' : 'Log in first'}</p>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div className="p-10 max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-2xl font-bold">
          {locale === 'ar' ? 'تحويل الستايل بالذكاء الاصطناعي' : 'AI Style Transfer'}
        </h1>
        <p className="text-sm text-[color:var(--muted-foreground)]">
          {locale === 'ar' ? 'متاح لمشتركي برو فقط' : 'Pro subscribers only'}
        </p>
        <Button onClick={() => (window.location.href = '/app/subscription')}>
          {locale === 'ar' ? 'الترقية' : 'Upgrade'}
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        {locale === 'ar' ? 'تحويل الستايل' : 'AI Style Transfer'}
      </h1>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) pickImage(f);
        }}
      />

      {!src && (
        <Button size="lg" onClick={() => fileRef.current?.click()}>
          {locale === 'ar' ? 'رفع صورة' : 'Upload image'}
        </Button>
      )}

      {src && (
        <>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-foreground)] mb-2">
              {locale === 'ar' ? 'اختر النمط' : 'Pick a style'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STYLE_PRESETS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyleId(s.id)}
                  className={cn(
                    'p-3 rounded-lg border text-sm',
                    styleId === s.id
                      ? 'border-[color:var(--primary)] bg-[color:var(--muted)]'
                      : 'border-[color:var(--border)]',
                  )}
                >
                  {locale === 'ar' ? s.nameAr : s.nameEn}
                </button>
              ))}
            </div>
          </div>

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

          <div className="flex gap-2">
            <Button onClick={run} disabled={busy || !uploadedUrl}>
              {locale === 'ar' ? 'تطبيق النمط' : 'Apply style'}
            </Button>
            {result && (
              <Button variant="outline" onClick={() => downloadDataUrl(result, 'styled.png')}>
                {locale === 'ar' ? 'تحميل' : 'Download'}
              </Button>
            )}
            <Button variant="ghost" onClick={() => fileRef.current?.click()}>
              {locale === 'ar' ? 'تغيير' : 'Change image'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
