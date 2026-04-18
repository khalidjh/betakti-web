'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Trash2, Copy } from 'lucide-react';
import { useAuth } from '@/lib/auth/context';
import { createProject, deleteProject, listUserProjects } from '@/lib/data/projects';
import type { Project } from '@/lib/types/canvas';
import { formatDate } from '@/lib/utils';

export default function ProjectsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  async function refresh() {
    if (!user) return;
    setProjects(await listUserProjects(user.uid));
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function onDelete(id: string) {
    if (!confirm(locale === 'ar' ? 'حذف المشروع؟' : 'Delete project?')) return;
    try {
      await deleteProject(id);
      setProjects((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  async function onDuplicate(p: Project) {
    try {
      await createProject({
        userId: p.userId,
        name: `${p.name} (نسخة)`,
        canvasSize: p.canvasSize,
        background: p.background,
        elements: p.elements,
        thumbnailUrl: p.thumbnailUrl,
      });
      await refresh();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (!user) {
    return (
      <div className="p-10">
        <Link href="/auth/login" className="text-[color:var(--primary)]">
          {t('nav.login')}
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('nav.projects')}</h1>
      {projects.length === 0 ? (
        <p className="text-sm text-[color:var(--muted-foreground)]">—</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-[color:var(--border)] overflow-hidden"
            >
              <Link href={`/app/editor/${p.id}`}>
                <div
                  className="bg-[color:var(--muted)] aspect-square bg-cover bg-center"
                  style={{
                    backgroundImage: p.thumbnailUrl ? `url(${p.thumbnailUrl})` : undefined,
                  }}
                />
              </Link>
              <div className="p-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-[color:var(--muted-foreground)]">
                    {formatDate(p.updatedAt, locale)}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => onDuplicate(p)}
                    className="p-1.5 rounded hover:bg-[color:var(--muted)]"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="p-1.5 rounded hover:bg-[color:var(--muted)] text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
