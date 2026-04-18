'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { DesignTemplate, TemplateCategory } from '@/lib/types/canvas';
import { CATEGORIES } from '@/lib/types/categories';
import { listAllActiveTemplates, listTemplatesByCategory } from '@/lib/data/templates';
import { cn } from '@/lib/utils';

export default function TemplatesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const params = useSearchParams();
  const initial = (params.get('category') as TemplateCategory | null) ?? null;
  const [category, setCategory] = useState<TemplateCategory | null>(initial);
  const [templates, setTemplates] = useState<DesignTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const task = category
      ? listTemplatesByCategory(category, 60)
      : listAllActiveTemplates(60);
    task.then(setTemplates).catch(() => setTemplates([])).finally(() => setLoading(false));
  }, [category]);

  const filters = useMemo(() => [{ key: null, ar: 'الكل', en: 'All' }, ...CATEGORIES], []);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('nav.templates')}</h1>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
        {filters.map((f) => (
          <button
            key={f.key ?? 'all'}
            onClick={() => setCategory(f.key as TemplateCategory | null)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition',
              category === f.key
                ? 'bg-[color:var(--primary)] text-[color:var(--primary-foreground)] border-transparent'
                : 'border-[color:var(--border)] hover:bg-[color:var(--muted)]',
            )}
          >
            {locale === 'ar' ? f.ar : f.en}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-[color:var(--muted-foreground)]">…</p>
      ) : templates.length === 0 ? (
        <p className="text-sm text-[color:var(--muted-foreground)]">—</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {templates.map((tpl) => (
            <Link
              key={tpl.id}
              href={`/app/templates/${tpl.id}`}
              className="rounded-xl border border-[color:var(--border)] overflow-hidden hover:border-[color:var(--primary)] transition group"
            >
              <div
                className="bg-[color:var(--muted)]"
                style={{ aspectRatio: `${tpl.canvasSize.width}/${tpl.canvasSize.height}` }}
              />
              <div className="p-3 flex items-center justify-between">
                <p className="text-sm truncate">
                  {locale === 'ar' ? tpl.nameAr : tpl.nameEn}
                </p>
                {tpl.isPremium && (
                  <span className="text-[10px] bg-[color:var(--accent)] text-black rounded px-1.5 py-0.5">
                    PRO
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
