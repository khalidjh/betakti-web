import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithCustomToken,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  signOut as fbSignOut,
  type UserCredential,
  type User
} from 'firebase/auth';
import { auth } from '$lib/firebase/client';

async function exchangeIdToken(cred: UserCredential): Promise<void> {
  const idToken = await cred.user.getIdToken();
  const res = await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ idToken })
  });
  if (!res.ok) throw new Error('Failed to create session');
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await exchangeIdToken(cred);
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<void> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) await updateProfile(cred.user, { displayName });
  await exchangeIdToken(cred);
}

export async function signInWithGoogle(): Promise<void> {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await exchangeIdToken(cred);
}

// TODO: re-add Apple Sign-In — requires APPLE_SERVICES_ID, APPLE_TEAM_ID, APPLE_KEY_ID,
// APPLE_PRIVATE_KEY env vars, and Apple provider enabled in Firebase Console → Authentication.
export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

// Resolves once Firebase Auth has loaded its persisted state (or confirmed
// there is none).
export function waitForAuthReady(): Promise<User | null> {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });
}

// If the server cookie says we're signed in but the client SDK has no user
// (e.g. IndexedDB persistence empty), mint a custom token via the server and
// sign the client SDK in with it. Returns the resulting user, or null if the
// cookie is also missing/invalid.
export async function ensureClientSignedIn(): Promise<User | null> {
  const existing = await waitForAuthReady();
  if (existing) return existing;
  try {
    const res = await fetch('/api/auth/firebase-token', { method: 'POST' });
    if (!res.ok) return null;
    const { token } = (await res.json()) as { token: string };
    const cred = await signInWithCustomToken(auth, token);
    return cred.user;
  } catch {
    return null;
  }
}

export async function signOut(): Promise<void> {
  await fbSignOut(auth).catch(() => {});
  await fetch('/api/auth/signout', { method: 'POST' });
}

export function mapAuthError(code: unknown): string {
  const c = typeof code === 'string' ? code : '';
  if (c.includes('invalid-credential') || c.includes('wrong-password') || c.includes('user-not-found'))
    return 'invalid_credentials';
  if (c.includes('email-already-in-use')) return 'email_in_use';
  if (c.includes('weak-password')) return 'weak_password';
  return 'generic';
}
