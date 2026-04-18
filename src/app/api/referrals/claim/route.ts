import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import type { SubscriptionStatus } from '@/lib/types/subscription';

// 3 signups = +30 days Pro. 10 = +1 year. Amounts are cumulative tiers.
const TIERS: { minReferrals: number; grantDays: number }[] = [
  { minReferrals: 3, grantDays: 30 },
  { minReferrals: 10, grantDays: 365 },
];

export async function POST(req: NextRequest) {
  let idToken: string | undefined;
  try {
    idToken = (await req.json()).idToken;
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }
  if (!idToken) return NextResponse.json({ error: 'missing idToken' }, { status: 401 });

  let uid: string;
  try {
    uid = (await adminAuth.verifyIdToken(idToken)).uid;
  } catch {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Look up the referral code for this user.
  const refDoc = await adminDb.collection('referrals').doc(uid).get();
  if (!refDoc.exists) return NextResponse.json({ error: 'no code' }, { status: 404 });
  const code = refDoc.data()?.code as string;
  const alreadyGranted = (refDoc.data()?.rewardedCount as number) ?? 0;

  // Count signups for this code.
  const signupSnap = await adminDb
    .collection('referral_events')
    .where('code', '==', code)
    .where('type', '==', 'signup')
    .get();
  const signups = signupSnap.size;

  // Determine the highest tier reached.
  const tier = [...TIERS].reverse().find((t) => signups >= t.minReferrals);
  if (!tier) {
    return NextResponse.json({ referralCount: signups, granted: 0 });
  }
  if (alreadyGranted >= tier.minReferrals) {
    return NextResponse.json({ referralCount: signups, granted: alreadyGranted });
  }

  // Extend Pro by grantDays. Stack on top of an existing expirationDate if in the future.
  const userRef = adminDb.collection('users').doc(uid);
  const userSnap = await userRef.get();
  const existing: SubscriptionStatus | undefined = userSnap.data()?.subscription;
  const now = Date.now();
  const base =
    existing?.isActive && existing.expirationDate && existing.expirationDate > now
      ? existing.expirationDate
      : now;
  const newExpiration = base + tier.grantDays * 86400_000;

  const updated: SubscriptionStatus = {
    tier: 'pro',
    isActive: true,
    isLifetime: existing?.isLifetime ?? false,
    plan: existing?.plan,
    expirationDate: updated_if_not_lifetime(existing, newExpiration),
    productId: `referral_${tier.minReferrals}`,
  };

  await userRef.set({ subscription: updated }, { merge: true });
  await refDoc.ref.set({ rewardedCount: tier.minReferrals }, { merge: true });

  return NextResponse.json({
    referralCount: signups,
    granted: tier.minReferrals,
    grantDays: tier.grantDays,
    expirationDate: updated.expirationDate,
  });
}

function updated_if_not_lifetime(
  existing: SubscriptionStatus | undefined,
  newExpiration: number,
): number | undefined {
  if (existing?.isLifetime) return undefined;
  return newExpiration;
}
