import type { PageServerLoad, Actions } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { fail } from '@sveltejs/kit';

export type BackgroundStatus = 'approved' | 'removed';

export interface BackgroundRow {
  id: string;
  url: string;
  thumbnailUrl: string;
  category: string;
  status: BackgroundStatus;
  sortOrder: number;
  addedAt: number;
}

const VALID_STATUS: readonly BackgroundStatus[] = ['approved', 'removed'];

export const load: PageServerLoad = async () => {
  try {
    const snap = await adminDb().collection('backgrounds').get();
    const rows: BackgroundRow[] = snap.docs
      .map((d) => {
        const data = d.data();
        return {
          id: d.id,
          url: String(data.url ?? ''),
          thumbnailUrl: String(data.thumbnailUrl ?? data.url ?? ''),
          category: String(data.category ?? ''),
          status: (data.status as BackgroundStatus) ?? 'approved',
          sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : 999,
          addedAt: data.addedAt?.toMillis?.() ?? 0
        };
      })
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === 'approved' ? -1 : 1;
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return b.addedAt - a.addedAt;
      });
    return { rows };
  } catch (err) {
    console.error('[admin/backgrounds] load failed:', err);
    return { rows: [] as BackgroundRow[] };
  }
};

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

export const actions: Actions = {
  add: async ({ request }) => {
    const fd = await request.formData();
    const url = String(fd.get('url') ?? '').trim();
    const thumbnailUrl = String(fd.get('thumbnailUrl') ?? '').trim();
    const category = String(fd.get('category') ?? '').trim();
    const sortOrderRaw = String(fd.get('sortOrder') ?? '').trim();

    if (!isHttpUrl(url)) return fail(400, { ok: false, message: 'Invalid URL' });
    if (thumbnailUrl && !isHttpUrl(thumbnailUrl))
      return fail(400, { ok: false, message: 'Invalid thumbnail URL' });
    if (!category) return fail(400, { ok: false, message: 'Category required' });

    const sortOrder = Number.parseInt(sortOrderRaw, 10);

    await adminDb()
      .collection('backgrounds')
      .add({
        url,
        thumbnailUrl: thumbnailUrl || url,
        category,
        status: 'approved' satisfies BackgroundStatus,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 999,
        addedAt: FieldValue.serverTimestamp()
      });

    return { ok: true };
  },

  setStatus: async ({ request }) => {
    const fd = await request.formData();
    const id = String(fd.get('id') ?? '');
    const status = String(fd.get('status') ?? '') as BackgroundStatus;
    if (!id) return fail(400, { ok: false });
    if (!VALID_STATUS.includes(status)) return fail(400, { ok: false });
    await adminDb().collection('backgrounds').doc(id).set({ status }, { merge: true });
    return { ok: true };
  },

  delete: async ({ request }) => {
    const fd = await request.formData();
    const id = String(fd.get('id') ?? '');
    if (!id) return fail(400, { ok: false });
    await adminDb().collection('backgrounds').doc(id).delete();
    return { ok: true };
  }
};
