export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

// Webhook endpoint for Moyasar payment events.
// Configure in Moyasar Dashboard → Webhooks → POST https://<domain>/api/moyasar/webhook
// Set a shared secret and compare via the `secret_token` field in the payload.
export async function POST(req: NextRequest) {
  const expected = process.env.MOYASAR_WEBHOOK_SECRET;
  const payload = await req.json();

  if (expected && payload.secret_token !== expected) {
    return NextResponse.json({ error: 'invalid secret' }, { status: 401 });
  }

  const type = payload.type as string | undefined;
  const data = payload.data as Record<string, unknown> | undefined;
  if (!type || !data) return NextResponse.json({ ok: true });

  const paymentId = data.id as string | undefined;
  const status = data.status as string | undefined;
  const metadata = (data.metadata ?? {}) as { userId?: string };

  if (!paymentId) return NextResponse.json({ ok: true });

  await adminDb.collection('moyasar_events').add({
    type,
    paymentId,
    status,
    userId: metadata.userId ?? null,
    receivedAt: new Date(),
    raw: payload,
  });

  // Refunds / failures: downgrade the user.
  if (status === 'refunded' || type === 'payment_refunded' || type === 'payment_failed') {
    if (metadata.userId) {
      await adminDb.collection('users').doc(metadata.userId).set(
        {
          subscription: {
            tier: 'free',
            isActive: true,
            isLifetime: false,
          },
        },
        { merge: true },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
