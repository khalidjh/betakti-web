import type { PageServerLoad } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { normalizeTemplate, type DynamicTemplate } from '$lib/data/templates';

export const prerender = true;

export const load: PageServerLoad = async () => {
  let previews: DynamicTemplate[] = [];
  try {
    const snap = await adminDb()
      .collection('dynamic_templates')
      .where('isActive', '==', true)
      .where('isPremium', '==', false)
      .limit(50)
      .get();
    previews = snap.docs
      .map((d) => normalizeTemplate(d.id, d.data()))
      .filter((t): t is DynamicTemplate => t !== null)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .slice(0, 8);
  } catch (err) {
    console.error('[marketing/+page.server] previews query failed:', err);
    previews = [];
  }
  return { previews };
};
