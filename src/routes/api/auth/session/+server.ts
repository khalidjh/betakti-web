import { json, error, type RequestHandler } from '@sveltejs/kit';
import { adminAuth, adminDb } from '$lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { dev } from '$app/environment';

const EXPIRES_IN_MS = 14 * 24 * 60 * 60 * 1000;

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { idToken } = (await request.json().catch(() => ({}))) as { idToken?: string };
  if (!idToken) throw error(400, 'Missing idToken');

  const decoded = await adminAuth().verifyIdToken(idToken).catch(() => null);
  if (!decoded) throw error(401, 'Invalid token');

  const sessionCookie = await adminAuth().createSessionCookie(idToken, {
    expiresIn: EXPIRES_IN_MS
  });

  cookies.set('__session', sessionCookie, {
    httpOnly: true,
    secure: !dev,
    sameSite: 'lax',
    path: '/',
    maxAge: EXPIRES_IN_MS / 1000
  });

  const userRef = adminDb().collection('users').doc(decoded.uid);
  const snap = await userRef.get();
  if (!snap.exists) {
    await userRef.set({
      email: decoded.email ?? null,
      displayName: decoded.name ?? null,
      photoURL: decoded.picture ?? null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      subscription: { tier: 'free', isActive: false }
    });
  } else {
    await userRef.set(
      {
        email: decoded.email ?? snap.data()?.email ?? null,
        updatedAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  }

  return json({ ok: true });
};
