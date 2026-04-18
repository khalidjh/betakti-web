'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/context';
import {
  deleteCustomFont,
  listCustomFonts,
  registerCustomFont,
  uploadCustomFont,
  type CustomFont,
} from '@/lib/data/custom-fonts';

export default function CustomFontsPage() {
  const locale = useLocale();
  const { user } = useAuth();
  const [family, setFamily] = useState('');
  const [fonts, setFonts] = useState<CustomFont[]>([]);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function refresh() {
    if (!user) return;
    const list = await listCustomFonts(user.uid);
    setFonts(list);
    list.forEach(registerCustomFont);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function onUpload(file: File) {
    if (!user || !family.trim()) {
      toast.error(locale === 'ar' ? 'اكتب اسم الخط' : 'Enter a font name');
      return;
    }
    setBusy(true);
    try {
      const f = await uploadCustomFont(user.uid, file, family.trim());
      await registerCustomFont(f);
      toast.success(locale === 'ar' ? 'تم الرفع' : 'Uploaded');
      setFamily('');
      await refresh();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!user) return <div className="p-10">—</div>;

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        {locale === 'ar' ? 'خطوط مخصصة' : 'Custom Fonts'}
      </h1>

      <div className="rounded-xl border border-[color:var(--border)] p-4 space-y-3">
        <Input
          placeholder={locale === 'ar' ? 'اسم الخط (مثال: MyFont)' : 'Font family name'}
          value={family}
          onChange={(e) => setFamily(e.target.value)}
        />
        <input
          ref={fileRef}
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload(f);
            e.target.value = '';
          }}
        />
        <Button onClick={() => fileRef.current?.click()} disabled={busy || !family.trim()}>
          {locale === 'ar' ? 'رفع ملف خط' : 'Upload font file'}
        </Button>
        <p className="text-xs text-[color:var(--muted-foreground)]">
          .ttf · .otf · .woff · .woff2
        </p>
      </div>

      <div className="space-y-2">
        {fonts.map((f) => (
          <div
            key={f.id}
            className="flex items-center justify-between p-3 rounded-lg border border-[color:var(--border)]"
          >
            <span style={{ fontFamily: f.family }}>{f.family}</span>
            <button
              onClick={async () => {
                await deleteCustomFont(f.id);
                setFonts((s) => s.filter((x) => x.id !== f.id));
              }}
              className="p-2 rounded hover:bg-[color:var(--muted)] text-red-600"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
