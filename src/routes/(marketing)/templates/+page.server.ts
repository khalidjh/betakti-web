import type { PageServerLoad } from './$types';
import { adminDb } from '$lib/firebase/admin';
import {
  TEMPLATE_CATEGORIES,
  normalizeTemplate,
  type DynamicTemplate,
  type TemplateCategory
} from '$lib/data/templates';

export const load: PageServerLoad = async ({ url }) => {
  const categoryParam = url.searchParams.get('category');
  const category =
    categoryParam && (TEMPLATE_CATEGORIES as string[]).includes(categoryParam)
      ? (categoryParam as TemplateCategory)
      : null;

  let templates: DynamicTemplate[] = [];
  try {
    let q: FirebaseFirestore.Query = adminDb()
      .collection('dynamic_templates')
      .where('isActive', '==', true);
    if (category) q = q.where('category', '==', category);
    const snap = await q.limit(200).get();
    templates = snap.docs
      .map((d) => normalizeTemplate(d.id, d.data()))
      .filter((t): t is DynamicTemplate => t !== null)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (err) {
    console.error('[templates/+page.server] query failed:', err);
    templates = [];
  }

  return { templates, category };
};
