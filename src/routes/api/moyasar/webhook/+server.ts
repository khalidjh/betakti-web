import { json, type RequestHandler } from '@sveltejs/kit';
import { adminDb } from '$lib/firebase/admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { env } from '$env/dynamic/private';
import { createHmac, timingSafeEqual } from 'node:crypto';

interface MoyasarPayment {
  id: string;
  status: string;
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, unknown>;
  source?: { type?: string; token?: string };
}

interface MoyasarEvent {
  type: string;
  data?: MoyasarPayment;
}

function verifySignature(rawBody: string, header: string | null): boolean {
  const secret = env.MOYASAR_WEBHOOK_SECRET;
  if (!secret || !header) return false;
  const mac = createHmac('sha256', secret).update(rawBody).digest('hex');
  try {
    const a = Buffer.from(mac, 'hex');
    const b = Buffer.from(header.trim(), 'hex');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function planEndDate(plan: string | undefined, now: Date): { end: Date | null; lifetime: boolean } {
  if (plan === 'lifetime') return { end: null, lifetime: true };
  if (plan === 'yearly') {
    const end = new Date(now);
    end.setFullYear(end.getFullYear() + 1);
    return { end, lifetime: false };
  }
  const end = new Date(now);
  end.setMonth(end.getMonth() + 1);
  return { end, lifetime: false };
}

export const POST: RequestHandler = async ({ request }) => {
  const raw = await request.text();
  const signature = request.headers.get('x-moyasar-signature');
  if (!verifySignature(raw, signature)) {
    return json({ error: 'invalid signature' }, { status: 400 });
  }

  let event: MoyasarEvent;
  try {
    event = JSON.parse(raw) as MoyasarEvent;
  } catch {
    return json({ error: 'invalid json' }, { status: 400 });
  }

  const payment = event.data;
  if (!payment) return json({ ok: true });
  const meta = (payment.metadata ?? {}) as { userId?: string; plan?: string };
  const userId = meta.userId;
  const plan = meta.plan ?? 'monthly';

  const db = adminDb();
  const subRef = db.collection('subscriptions').doc(payment.id);

  if (event.type === 'payment_paid' && payment.status === 'paid' && userId) {
    const now = new Date();
    const { end, lifetime } = planEndDate(plan, now);
    await subRef.set(
      {
        userId,
        moyasarPaymentId: payment.id,
        plan,
        amount: payment.amount,
        currency: payment.currency,
        status: 'active',
        startDate: Timestamp.fromDate(now),
        endDate: end ? Timestamp.fromDate(end) : null,
        autoRenew: !lifetime,
        moyasarToken: payment.source?.token ?? null,
        updatedAt: FieldValue.serverTimestamp()
      },
      { merge: true }
    );
    await db
      .collection('users')
      .doc(userId)
      .set(
        {
          subscription: {
            tier: 'pro',
            isActive: true,
            expirationDate: end ? Timestamp.fromDate(end) : null,
            productId: plan,
            isLifetime: lifetime
          },
          updatedAt: FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    return json({ ok: true });
  }

  if ((event.type === 'payment_failed' || event.type === 'payment_refunded') && userId) {
    await subRef.set(
      { status: 'inactive', updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    await db
      .collection('users')
      .doc(userId)
      .set(
        {
          subscription: { tier: 'free', isActive: false },
          updatedAt: FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    return json({ ok: true });
  }

  return json({ ok: true });
};
