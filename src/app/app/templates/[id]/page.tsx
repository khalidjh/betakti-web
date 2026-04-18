'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getTemplate } from '@/lib/data/templates';
import { createProject } from '@/lib/data/projects';
import { useAuth } from '@/lib/auth/context';
import type { DesignTemplate } from '@/lib/types/canvas';

export default function TemplateDetailPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [tpl, setTpl] = useState<DesignTemplate | null>(null);

  useEffect(() => {
    getTemplate(id).then(setTpl);
  }, [id]);

  async function useTemplate() {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    if (!tpl) return;
    try {
      const pid = await createProject({
        userId: user.uid,
        name: locale === 'ar' ? tpl.nameAr : tpl.nameEn,
        canvasSize: tpl.canvasSize,
        background: tpl.project.background,
        elements: tpl.project.elements,
      });
      router.push(`/app/editor/${pid}`);
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  if (!tpl) return <div className="p-10">…</div>;

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{locale === 'ar' ? tpl.nameAr : tpl.nameEn}</h1>
      <div
        className="bg-[color:var(--muted)] rounded-xl mx-auto"
        style={{
          aspectRatio: `${tpl.canvasSize.width}/${tpl.canvasSize.height}`,
          maxWidth: 420,
          width: '100%',
        }}
      />
      <Button onClick={useTemplate} className="w-full" size="lg">
        {t('editor.defaultProjectName')}
      </Button>
    </div>
  );
}
