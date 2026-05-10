import type { PageServerLoad, Actions } from './$types';
import { adminDb, adminAuth } from '$lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { fail } from '@sveltejs/kit';

export interface AccountData {
  email: string | null;
  displayName: string | null;
  subscription: {
    tier: 'free' | 'pro';
    isActive: boolean;
    expirationDate: number | null;
    isLifetime: boolean;
  };
}

export const load: PageServerLoad = async ({ locals, cookies, parent }) => {
  await parent();
  const uid = locals.user!.uid;
  let account: AccountData = {
    email: locals.user!.email,
    displayName: null,
    subscription: { tier: 'free', isActive: false, expirationDate: null, isLifetime: false }
  };
  try {
    const snap = await adminDb().collection('users').doc(uid).get();
    if (snap.exists) {
      const data = snap.data()!;
      const sub = data.subscription ?? {};
      account = {
        email: data.email ?? locals.user!.email,
        displayName: data.displayName ?? null,
        subscription: {
          tier: (sub.tier as 'free' | 'pro') ?? 'free',
          isActive: Boolean(sub.isActive),
          expirationDate: sub.expirationDate?.toMillis?.() ?? sub.expirationDate ?? null,
          isLifetime: Boolean(sub.isLifetime)
        }
      };
    }
  } catch {
    // ignore
  }
  return {
    account,
    theme: cookies.get('theme') ?? 'system',
    locale: locals.locale
  };
};

export const actions: Actions = {
  updateName: async ({ request, locals }) => {
    const uid = locals.user!.uid;
    const fd = await request.formData();
    const name = String(fd.get('displayName') ?? '').trim();
    if (!name) return fail(400, { ok: false });
    await adminDb()
      .collection('users')
      .doc(uid)
      .set({ displayName: name, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    try {
      await adminAuth().updateUser(uid, { displayName: name });
    } catch {
      // ignore
    }
    return { ok: true };
  }
};
