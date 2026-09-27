import { error } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';
import type { PageServerLoad } from './$types';

/**
 * A design someone shared, as seen by a person who does not have the app.
 *
 * The app builds these URLs (`DeepLinkService.createRemixLink`) and they are
 * claimed in the apple-app-site-association file, so on a phone with the app
 * the tap never reaches here. Everyone else used to get a 404 — which is most
 * people, since sharing is how the app reaches someone new.
 */
export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;

  try {
    const snap = await adminDb().collection('published_templates').doc(id).get();
    if (!snap.exists) error(404, 'التصميم غير موجود');

    const data = snap.data()!;
    if (data.isHidden === true) error(404, 'التصميم غير متاح');

    return {
      design: {
        id,
        title: (data.title as string) || '',
        thumbnailUrl: (data.thumbnailUrl as string) || '',
        ownerName: (data.ownerName as string) || '',
        canvasWidth: Number(data.canvasWidth) || 1080,
        canvasHeight: Number(data.canvasHeight) || 1350,
        remixCount: Number(data.remixCount) || 0
      }
    };
  } catch (e) {
    // An error() throw from above is already the right answer; anything else
    // is Firestore being unreachable, and a 404 would be a lie.
    if (e && typeof e === 'object' && 'status' in e) throw e;
    console.error('remix page load failed', e);
    error(503, 'تعذّر تحميل التصميم');
  }
};
