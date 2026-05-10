import type { PageServerLoad, Actions } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { error, fail } from '@sveltejs/kit';

export interface ProjectRow {
  id: string;
  name: string;
  thumbnailUrl: string | null;
  updatedAt: number;
}

export const load: PageServerLoad = async ({ locals, parent }) => {
  await parent();
  const uid = locals.user!.uid;
  try {
    const snap = await adminDb()
      .collection('projects')
      .where('userId', '==', uid)
      .orderBy('updatedAt', 'desc')
      .limit(50)
      .get();
    const projects: ProjectRow[] = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: String(data.name ?? 'Untitled'),
        thumbnailUrl: (data.thumbnailUrl as string | undefined) ?? null,
        updatedAt: data.updatedAt?.toMillis?.() ?? 0
      };
    });
    return { projects };
  } catch (err) {
    console.error('[projects/+page.server] query failed:', err);
    return { projects: [] as ProjectRow[] };
  }
};

async function ensureOwner(uid: string, projectId: string) {
  const ref = adminDb().collection('projects').doc(projectId);
  const snap = await ref.get();
  if (!snap.exists) throw error(404, 'Not found');
  const data = snap.data()!;
  if (data.userId !== uid) throw error(403, 'Forbidden');
  return { ref, data };
}

export const actions: Actions = {
  rename: async ({ request, locals }) => {
    const uid = locals.user!.uid;
    const fd = await request.formData();
    const id = String(fd.get('id') ?? '');
    const name = String(fd.get('name') ?? '').trim();
    if (!id || !name) return fail(400, { ok: false, message: 'invalid' });
    const { ref } = await ensureOwner(uid, id);
    await ref.set({ name, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    return { ok: true };
  },
  duplicate: async ({ request, locals }) => {
    const uid = locals.user!.uid;
    const fd = await request.formData();
    const id = String(fd.get('id') ?? '');
    if (!id) return fail(400, { ok: false });
    const { data } = await ensureOwner(uid, id);
    const now = FieldValue.serverTimestamp();
    const clone = {
      ...data,
      name: `${data.name ?? 'Untitled'} (copy)`,
      thumbnailUrl: null,
      createdAt: now,
      updatedAt: now
    };
    await adminDb().collection('projects').add(clone);
    return { ok: true };
  },
  delete: async ({ request, locals }) => {
    const uid = locals.user!.uid;
    const fd = await request.formData();
    const id = String(fd.get('id') ?? '');
    if (!id) return fail(400, { ok: false });
    const { ref } = await ensureOwner(uid, id);
    await ref.delete();
    return { ok: true };
  }
};
