import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { normalizeTemplate } from '$lib/data/templates';

/** Full design for one template — fetched only when someone actually applies it. */
export const GET: RequestHandler = async ({ params, locals }) => {
  const snap = await adminDb().collection('dynamic_templates').doc(params.id).get();
  if (!snap.exists) throw error(404, 'Template not found');

  const tpl = normalizeTemplate(snap.id, snap.data(), locals.locale === 'en' ? 'en' : 'ar');
  if (!tpl || !tpl.isActive) throw error(404, 'Template not found');

  return json({
    id: tpl.id,
    name: locals.locale === 'en' ? tpl.nameEn || tpl.nameAr : tpl.nameAr || tpl.nameEn,
    isPremium: tpl.isPremium,
    canvasSize: tpl.canvasSize,
    background: tpl.background,
    elements: tpl.elements
  });
};
