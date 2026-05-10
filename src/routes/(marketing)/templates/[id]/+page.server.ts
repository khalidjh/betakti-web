import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { normalizeTemplate, type DynamicTemplate } from '$lib/data/templates';

export const prerender = false;

export const load: PageServerLoad = async ({ params, setHeaders }) => {
  setHeaders({ 'cache-control': 'public, max-age=60, s-maxage=300' });

  let template: DynamicTemplate | null = null;
  let related: DynamicTemplate[] = [];
  try {
    const snap = await adminDb().collection('dynamic_templates').doc(params.id).get();
    if (!snap.exists) throw error(404, 'Template not found');
    template = normalizeTemplate(snap.id, snap.data());
    if (!template || !template.isActive) throw error(404, 'Template not found');

    try {
      const rel = await adminDb()
        .collection('dynamic_templates')
        .where('isActive', '==', true)
        .where('category', '==', template.category)
        .limit(20)
        .get();
      related = rel.docs
        .map((d) => normalizeTemplate(d.id, d.data()))
        .filter((t): t is DynamicTemplate => t !== null && t.id !== template!.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .slice(0, 6);
    } catch (err) {
      console.error('[templates/[id]/+page.server] related query failed:', err);
      related = [];
    }
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) throw err;
    throw error(404, 'Template not found');
  }

  return { template, related };
};
