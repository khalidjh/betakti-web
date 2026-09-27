import type { PageServerLoad } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { DEFAULT_CANVAS_SIZES } from '$lib/editor/types';

export interface HomeRecentProject {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  updatedAt: number;
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

// Home is deliberately just "your latest design, or a way to start one", so it
// needs a single query. The template sections and occasion banner that used to
// live here (and cost a config read plus one query per section) belong on
// /templates, which is where the browsing intent actually is.
export const load: PageServerLoad = async ({ locals, parent }) => {
  await parent();
  const recent = await loadRecentProjects(locals.user!.uid);
  return {
    canvasSizes: DEFAULT_CANVAS_SIZES,
    recent
  };
};
