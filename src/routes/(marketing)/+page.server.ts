import type { PageServerLoad } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { normalizeTemplate, type DynamicTemplate } from '$lib/data/templates';

export const prerender = true;

// The hero shows real, current templates rather than mock-ups: the occasion
// people come for most (a wedding invitation) in the middle, flanked by an
// everyday card and a newborn one. Picked by hand — no people in the art, and
// nothing the brand rules out (birthdays, national days). A missing or
// deactivated id just drops out; the hero copes with fewer.
const HERO_IDS = ['lab_sadu_jumah', 'wed_watercolour_olive', 'st_261004_nb_storybook'];

export const load: PageServerLoad = async () => {
  let hero: DynamicTemplate[] = [];
  try {
    const refs = HERO_IDS.map((id) => adminDb().collection('dynamic_templates').doc(id));
    const snaps = await adminDb().getAll(...refs);
    hero = snaps
      .filter((d) => d.exists && d.data()?.isActive === true)
      .map((d) => normalizeTemplate(d.id, d.data()!))
      .filter((t): t is DynamicTemplate => t !== null && !!t.thumbnailUrl);
  } catch (err) {
    console.error('[marketing/+page.server] hero query failed:', err);
  }

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
  return { hero, previews };
};
