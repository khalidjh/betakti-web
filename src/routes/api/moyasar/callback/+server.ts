import { redirect, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

async function verifyPayment(paymentId: string): Promise<boolean> {
  const secret = env.MOYASAR_SECRET_KEY;
  if (!secret) return false;
  try {
    const res = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${secret}:`).toString('base64')}`
      }
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { status?: string };
    return data.status === 'paid';
  } catch {
    return false;
  }
}

export const GET: RequestHandler = async ({ url }) => {
  const paymentId = url.searchParams.get('id') ?? url.searchParams.get('payment_id');
  const status = url.searchParams.get('status');
  if (!paymentId) throw redirect(303, '/subscription?status=failed');

  if (status === 'paid' || (await verifyPayment(paymentId))) {
    throw redirect(303, '/subscription?status=success');
  }
  throw redirect(303, '/subscription?status=failed');
};
