import { json, error, type RequestHandler } from '@sveltejs/kit';
import { adminAuth } from '$lib/firebase/admin';

// Mints a Firebase custom token for the user identified by the `__session`
// cookie. Lets the browser's Firebase JS SDK sign in (via signInWithCustomToken)
// when the cookie says signed-in but client-side auth is empty
// (cleared IndexedDB, different browser profile, dev reset, etc.).
export const POST: RequestHandler = async ({ cookies }) => {
  const cookie = cookies.get('__session');
  if (!cookie) throw error(401, 'No session');

  const decoded = await adminAuth().verifySessionCookie(cookie, true).catch(() => null);
  if (!decoded) throw error(401, 'Invalid session');

  const token = await adminAuth().createCustomToken(decoded.uid);
  return json({ token });
};
