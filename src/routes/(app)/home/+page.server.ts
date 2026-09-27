import type { PageServerLoad } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { DEFAULT_CANVAS_SIZES } from '$lib/editor/types';
import { DEFAULT_OCCASIONS, detectOccasion, type OccasionWindow } from '$lib/occasions';

export interface HomeTemplateCard {
  id: string;
  nameAr: string;
  nameEn: string;
  thumbnailUrl: string | null;
  isPremium: boolean;
}

export interface HomeSection {
  id: string;
  titleAr: string;
  titleEn: string;
  section: string;
  templates: HomeTemplateCard[];
}

export interface HomeRecentProject {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  updatedAt: number;
}

const TEMPLATES_PER_SECTION = 8;

async function loadOccasionWindows(): Promise<OccasionWindow[]> {
  try {
    const snap = await adminDb().collection('config').doc('occasions').get();
    const data = snap.data();
    if (!snap.exists || !Array.isArray(data?.windows)) return DEFAULT_OCCASIONS;
    return data.windows as OccasionWindow[];
  } catch {
    return DEFAULT_OCCASIONS;
  }
}

async function loadSections(): Promise<HomeSection[]> {
  try {
    const snap = await adminDb().collection('home_sections').where('isActive', '==', true).get();
    const docs = snap.docs
      .map((d) => ({ id: d.id, data: d.data() }))
      .filter((x) => x.data.isActive !== false)
      .sort(
        (a, b) =>
          (typeof a.data.sortOrder === 'number' ? a.data.sortOrder : 999) -
          (typeof b.data.sortOrder === 'number' ? b.data.sortOrder : 999)
      );

    const sectionResults = await Promise.all(
      docs.map(async ({ id, data: d }) => {
        const dataSource = String(d.dataSource ?? '');
        const viewAllCategory =
          typeof d.viewAllCategory === 'string' ? (d.viewAllCategory as string) : null;

        let tplDocs: FirebaseFirestore.QueryDocumentSnapshot[] = [];
        if (dataSource.startsWith('firestore:')) {
          const section = dataSource.slice('firestore:'.length);
          const tplSnap = await adminDb()
            .collection('dynamic_templates')
            .where('section', '==', section)
            .limit(TEMPLATES_PER_SECTION)
            .get();
          tplDocs = tplSnap.docs;
        } else if (viewAllCategory) {
          const tplSnap = await adminDb()
            .collection('dynamic_templates')
            .where('category', '==', viewAllCategory)
            .where('isActive', '==', true)
            .limit(TEMPLATES_PER_SECTION)
            .get();
          tplDocs = tplSnap.docs;
        }

        if (tplDocs.length === 0) return null;

        return {
          id,
          titleAr: String(d.titleAr ?? d.title ?? ''),
          titleEn: String(d.titleEn ?? d.subtitleEn ?? d.title ?? ''),
          section: dataSource,
          templates: tplDocs
            .map((t) => {
              const td = t.data();
              return {
                id: t.id,
                nameAr: String(td.nameAr ?? td.name ?? ''),
                nameEn: String(td.nameEn ?? td.name ?? ''),
                thumbnailUrl: (td.thumbnailUrl as string | undefined) ?? null,
                isPremium: Boolean(td.isPremium),
                sortOrder: typeof td.sortOrder === 'number' ? (td.sortOrder as number) : 999
              };
            })
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map(({ sortOrder, ...rest }) => rest)
        } satisfies HomeSection;
      })
    );
    return sectionResults.filter((s): s is HomeSection => s !== null);
  } catch (err) {
    console.error('[home/+page.server] sections query failed:', err);
    return [];
  }
}

async function loadRecentProjects(uid: string): Promise<HomeRecentProject[]> {
  try {
    const snap = await adminDb()
      .collection('projects')
      .where('userId', '==', uid)
      .orderBy('updatedAt', 'desc')
      .limit(8)
      .get();
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: String(data.name ?? 'Untitled'),
        thumbnailUrl: (data.thumbnailUrl as string | undefined) ?? null,
        updatedAt: data.updatedAt?.toMillis?.() ?? 0
      };
    });
  } catch (err) {
    console.error('[home/+page.server] recent query failed:', err);
    return [];
  }
}

export const load: PageServerLoad = async ({ locals, parent }) => {
  await parent();
  const uid = locals.user!.uid;
  const [windows, sections, recent] = await Promise.all([
    loadOccasionWindows(),
    loadSections(),
    loadRecentProjects(uid)
  ]);
  const occasion = detectOccasion(new Date(), windows);

  return {
    canvasSizes: DEFAULT_CANVAS_SIZES,
    sections,
    recent,
    occasion: occasion ? { id: occasion.id, category: occasion.category } : null
  };
};
