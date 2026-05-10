import { json, type RequestHandler } from '@sveltejs/kit';
import { adminAuth } from '$lib/firebase/admin';

export const POST: RequestHandler = async ({ cookies }) => {
  const sessionCookie = cookies.get('__session');
  if (sessionCookie) {
    try {
      const decoded = await adminAuth().verifySessionCookie(sessionCookie, true);
      await adminAuth().revokeRefreshTokens(decoded.uid);
    } catch {
      // ignore — cookie already invalid
    }
  }
  cookies.delete('__session', { path: '/' });
  return json({ ok: true });
};
