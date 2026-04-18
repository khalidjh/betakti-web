'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '@/lib/types/categories';
import type { Project, TemplateCategory } from '@/lib/types/canvas';
import { publishProject } from '@/lib/data/shared-templates';

export function PublishDialog({
  project,
  authorName,
  onClose,
}: {
  project: Project;
  authorName: string | null;
  onClose: () => void;
}) {
  const locale = useLocale();
  const [nameAr, setNameAr] = useState(project.name);
  const [nameEn, setNameEn] = useState(project.name);
  const [category, setCategory] = useState<TemplateCategory>('quotes');
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    try {
      await publishProject(project, { authorName, category, nameAr, nameEn });
      toast.success(locale === 'ar' ? 'تم النشر' : 'Published');
      onClose();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[color:var(--background)] rounded-2xl p-6 w-full max-w-md space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 end-3 p-1 rounded hover:bg-[color:var(--muted)]"
        >
          <X size={18} />
        </button>
        <h2 className="text-xl font-bold">
          {locale === 'ar' ? 'نشر كقالب' : 'Publish as template'}
        </h2>
        <Input
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          placeholder="الاسم بالعربية"
        />
        <Input
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder="Name in English"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TemplateCategory)}
          className="w-full h-10 rounded-lg border border-[color:var(--border)] bg-transparent px-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {locale === 'ar' ? c.ar : c.en}
            </option>
          ))}
        </select>
        <Button onClick={submit} disabled={busy} className="w-full">
          {locale === 'ar' ? 'نشر' : 'Publish'}
        </Button>
      </div>
    </div>
  );
}
