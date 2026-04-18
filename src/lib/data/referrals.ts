import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

export interface ReferralStats {
  code: string;
  referralCount: number;
  rewardedCount: number;
}

function randomCode(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function getOrCreateReferralCode(userId: string): Promise<string> {
  const ref = doc(db, 'referrals', userId);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data().code;
  const code = `${randomCode()}`;
  await setDoc(ref, { code, userId, createdAt: serverTimestamp() });
  return code;
}

export async function recordReferralClick(code: string, visitorUid?: string): Promise<void> {
  await addDoc(collection(db, 'referral_events'), {
    code,
    type: 'click',
    visitorUid: visitorUid ?? null,
    at: serverTimestamp(),
  });
}

export async function recordReferralSignup(code: string, newUserId: string): Promise<void> {
  await addDoc(collection(db, 'referral_events'), {
    code,
    type: 'signup',
    newUserId,
    at: serverTimestamp(),
  });
}

export async function getReferralStats(userId: string): Promise<ReferralStats> {
  const code = await getOrCreateReferralCode(userId);
  const snap = await getDocs(
    query(
      collection(db, 'referral_events'),
      where('code', '==', code),
      where('type', '==', 'signup'),
    ),
  );
  return {
    code,
    referralCount: snap.size,
    rewardedCount: 0,
  };
}
