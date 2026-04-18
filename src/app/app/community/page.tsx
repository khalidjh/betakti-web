'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';
import { listShared, type SharedTemplate } from '@/lib/data/shared-templates';
import { useAuth } from '@/lib/auth/context';
import { createProject } from '@/lib/data/projects';

export default function CommunityPage() {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuth();
  const [items, setItems] = useState<SharedTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listShared(60).then(setItems).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  async function useTpl(t: SharedTemplate) {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    try {
      const id = await createProject({
        userId: user.uid,
        name: locale === 'ar' ? t.nameAr : t.nameEn,
        canvasSize: t.canvasSize,
        background: t.project.background,
        elements: t.project.elements,
      });
      router.push(`/app/editor/${id}`);
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {locale === 'ar' ? 'قوالب المجتمع' : 'Community Templates'}
      </h1>
      {loading ? (
        <p className="text-sm text-[color:var(--muted-foreground)]">…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-[color:var(--muted-foreground)]">—</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((t) => (
            <button
              key={t.id}
              onClick={() => useTpl(t)}
              className="rounded-xl border border-[color:var(--border)] overflow-hidden hover:border-[color:var(--primary)] transition text-start"
            >
              <div
                className="bg-[color:var(--muted)]"
                style={{ aspectRatio: `${t.canvasSize.width}/${t.canvasSize.height}` }}
              />
              <div className="p-3">
                <p className="text-sm truncate">{locale === 'ar' ? t.nameAr : t.nameEn}</p>
                <p className="text-[10px] text-[color:var(--muted-foreground)] truncate">
                  @{t.authorName ?? 'anonymous'}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
