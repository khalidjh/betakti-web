'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Sparkles, Wand2 } from 'lucide-react';
import { CANVAS_SIZES, type CanvasSize, type Project } from '@/lib/types/canvas';
import { useAuth } from '@/lib/auth/context';
import { createProject, listUserProjects } from '@/lib/data/projects';
import { emptyProject } from '@/lib/project-factory';
import { getCurrentOccasion } from '@/lib/occasion';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { user } = useAuth();
  const [recent, setRecent] = useState<Project[]>([]);
  const occasion = getCurrentOccasion();

  useEffect(() => {
    if (!user) return;
    listUserProjects(user.uid, 8).then(setRecent).catch(() => {});
  }, [user]);

  async function startNew(size: CanvasSize) {
    if (!user) {
      toast.info(locale === 'ar' ? 'سجل الدخول لحفظ التصميم' : 'Log in to save designs');
      router.push('/auth/login');
      return;
    }
    const id = await createProject(emptyProject(user.uid, size, t('editor.defaultProjectName')));
    router.push(`/app/editor/${id}`);
  }

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Start New Design */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{t('home.startNewDesign')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CANVAS_SIZES.map((s) => {
            const ratio = s.width / s.height;
            return (
              <button
                key={s.id}
                onClick={() => startNew(s)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[color:var(--border)] hover:border-[color:var(--primary)] hover:bg-[color:var(--muted)] transition"
              >
                <div
                  className="bg-[color:var(--muted)] rounded-md"
                  style={{
                    width: ratio >= 1 ? 64 : 64 * ratio,
                    height: ratio >= 1 ? 64 / ratio : 64,
                  }}
                />
                <span className="text-xs text-center">
                  {locale === 'ar' ? s.nameAr : s.nameEn}
                </span>
                <span className="text-[10px] text-[color:var(--muted-foreground)]">
                  {s.width}×{s.height}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Occasion Banner */}
      {occasion && (
        <section>
          <Link
            href={`/app/templates?category=${occasion.category}`}
            className="block rounded-2xl bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--accent)] text-white p-6"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={28} />
              <div>
                <p className="text-xl font-bold">
                  {locale === 'ar' ? occasion.titleAr : occasion.titleEn}
                </p>
                <p className="text-sm opacity-90">
                  {locale === 'ar' ? 'قوالب مخصصة' : 'Themed templates'}
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Tools */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{t('home.tools')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            href="/app/tools/bg-remove"
            className="p-5 rounded-xl border border-[color:var(--border)] flex items-center gap-3 hover:border-[color:var(--primary)] transition"
          >
            <Wand2 size={22} />
            <div>
              <p className="font-medium">{t('home.backgroundRemoval')}</p>
              <p className="text-xs text-[color:var(--muted-foreground)]">
                {locale === 'ar' ? 'أداة' : 'Tool'}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent Designs */}
      {user && (
        <section>
          <h2 className="text-2xl font-bold mb-4">{t('home.recentDesigns')}</h2>
          {recent.length === 0 ? (
            <p className="text-sm text-[color:var(--muted-foreground)]">—</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recent.map((p) => (
                <Link
                  key={p.id}
                  href={`/app/editor/${p.id}`}
                  className="rounded-xl border border-[color:var(--border)] overflow-hidden hover:border-[color:var(--primary)] transition"
                >
                  <div
                    className="bg-[color:var(--muted)] aspect-square bg-cover bg-center"
                    style={{
                      backgroundImage: p.thumbnailUrl ? `url(${p.thumbnailUrl})` : undefined,
                    }}
                  />
                  <div className="p-3">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-[color:var(--muted-foreground)]">
                      {formatDate(p.updatedAt, locale)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
