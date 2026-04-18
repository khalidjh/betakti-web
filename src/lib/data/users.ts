import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from '@/lib/firebase/client';
import { DEFAULT_SUBSCRIPTION, type SubscriptionStatus } from '@/lib/types/subscription';

export interface UserDoc {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: number;
  subscription: SubscriptionStatus;
}

export async function ensureUserDoc(user: User): Promise<void> {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return;

  const data: Partial<UserDoc> = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    subscription: DEFAULT_SUBSCRIPTION,
  };
  await setDoc(ref, { ...data, createdAt: serverTimestamp() });
}

export async function getUserDoc(uid: string): Promise<UserDoc | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    uid,
    email: d.email ?? null,
    displayName: d.displayName ?? null,
    photoURL: d.photoURL ?? null,
    createdAt: d.createdAt?.toMillis?.() ?? Date.now(),
    subscription: d.subscription ?? DEFAULT_SUBSCRIPTION,
  };
}
