export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase/admin';
import { fetchPayment } from '@/lib/moyasar/client';
import { getPlan } from '@/lib/moyasar/plans';
import type { SubscriptionPlan, SubscriptionStatus } from '@/lib/types/subscription';

// Moyasar redirects the user back here with ?id=<payment_id>&status=paid (+ our plan/uid).
export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const paymentId = searchParams.get('id');
  const plan = searchParams.get('plan') as SubscriptionPlan | null;
  const uid = searchParams.get('uid');

  if (!paymentId || !plan || !uid) {
    return NextResponse.redirect(`${origin}/app/subscription?error=missing_params`);
  }

  try {
    const payment = await fetchPayment(paymentId);
    if (payment.status !== 'paid') {
      return NextResponse.redirect(`${origin}/app/subscription?error=unpaid`);
    }

    const planInfo = getPlan(plan);
    const now = Date.now();
    const endDate =
      planInfo.periodDays === null ? null : now + planInfo.periodDays * 86400_000;

    const sub: SubscriptionStatus = {
      tier: 'pro',
      isActive: true,
      isLifetime: planInfo.periodDays === null,
      plan,
      expirationDate: endDate ?? undefined,
      productId: `betakti_${plan}`,
    };

    await adminDb.collection('users').doc(uid).set(
      { subscription: sub },
      { merge: true },
    );

    await adminDb.collection('subscriptions').add({
      userId: uid,
      moyasarPaymentId: paymentId,
      plan,
      amount: payment.amount,
      currency: payment.currency,
      status: 'paid',
      startDate: FieldValue.serverTimestamp(),
      endDate: endDate,
      autoRenew: false,
    });

    return NextResponse.redirect(`${origin}/app/subscription?status=ok`);
  } catch (e) {
    return NextResponse.redirect(
      `${origin}/app/subscription?error=${encodeURIComponent((e as Error).message)}`,
    );
  }
}
