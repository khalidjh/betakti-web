import { error } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';
import type { PageServerLoad } from './$types';
import type { Project, CanvasElement } from '$lib/editor/types';
import { createBlankProject, DEFAULT_CANVAS_SIZES } from '$lib/editor/types';
import { normalizeTemplate } from '$lib/data/templates';
import { v4 as uuid } from 'uuid';

export interface StockBackgroundRow {
  id: string;
  url: string;
  thumbnailUrl: string;
  category: string;
}

async function loadStockBackgrounds(): Promise<StockBackgroundRow[]> {
  try {
    const snap = await adminDb()
      .collection('backgrounds')
      .where('status', '==', 'approved')
      .get();
    return snap.docs
      .map((d) => {
        const data = d.data();
        return {
          id: d.id,
          url: String(data.url ?? ''),
          thumbnailUrl: String(data.thumbnailUrl ?? data.url ?? ''),
          category: String(data.category ?? 'Other'),
          sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : 999
        };
      })
      .filter((r) => r.url)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(({ sortOrder, ...rest }) => rest);
  } catch (err) {
    console.error('[editor/+page.server] backgrounds query failed:', err);
    return [];
  }
}

export const load: PageServerLoad = async ({ params, locals, url, parent }) => {
  await parent();
  if (!locals.user) throw error(401, 'Unauthorised');
  const isPro = locals.user.subscription === 'pro';

  if (params.projectId === 'new') {
    const templateId = url.searchParams.get('templateId');
    const sizeId = url.searchParams.get('size');

    const project = createBlankProject(locals.user.uid, 'new');
    let lockedPremium = false;
    const stockBackgrounds = await loadStockBackgrounds();

    if (templateId) {
      try {
        const snap = await adminDb().collection('dynamic_templates').doc(templateId).get();
        if (snap.exists) {
          const tpl = normalizeTemplate(snap.id, snap.data());
          if (tpl && tpl.isActive) {
            project.canvasSize = tpl.canvasSize;
            project.background = tpl.background;
            project.elements = tpl.elements.map(
              (el): CanvasElement => ({ ...el, id: uuid() }) as CanvasElement
            );
            project.name =
              locals.locale === 'en' ? tpl.nameEn || tpl.nameAr : tpl.nameAr || tpl.nameEn;
            if (tpl.isPremium && !isPro) lockedPremium = true;
          }
        }
      } catch {
        // template bootstrap best-effort — fall through to blank project
      }
    } else if (sizeId) {
      const size = DEFAULT_CANVAS_SIZES.find((s) => s.id === sizeId);
      if (size) project.canvasSize = size;
    }

    return { project, isPro, lockedPremium, stockBackgrounds };
  }

  try {
    const [snap, stockBackgrounds] = await Promise.all([
      adminDb().collection('projects').doc(params.projectId).get(),
      loadStockBackgrounds()
    ]);
    if (!snap.exists) throw error(404, 'Project not found');
    const data = snap.data()!;
    if (data.userId !== locals.user.uid) throw error(403, 'Forbidden');
    const project: Project = {
      id: snap.id,
      userId: data.userId,
      name: data.name,
      canvasSize: data.canvasSize,
      background: data.background,
      elements: data.elements ?? [],
      createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
      updatedAt: data.updatedAt?.toMillis?.() ?? Date.now(),
      thumbnailUrl: data.thumbnailUrl ?? undefined
    };
    return { project, isPro, lockedPremium: false, stockBackgrounds };
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) throw err;
    throw error(500, 'Failed to load project');
  }
};
