import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { logEvent, updateStore } from '$lib/salla/store.server';

/**
 * Webhooks from Salla for the «بطاقتي - تصاميم متجرك» app (App ID 537359223).
 *
 * The app is set to the Signature strategy in the partner portal: Salla signs
 * the raw body with HMAC-SHA256 using the webhook secret shown there, hex, in
 * `x-salla-signature`. Nothing unsigned is accepted — with no secret on the
 * server every call is refused with 503, so a missing env var can't quietly
 * turn into an open endpoint.
 *
 * Easy auth mode: the merchant's tokens arrive here as `app.store.authorize`
 * when they install, not through an OAuth redirect.
 */

interface SallaEvent {
  event: string;
  merchant: number;
  created_at?: string;
  data?: Record<string, unknown>;
}

function verifySignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
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

const CATALOGUE = new Set([
  'product.created',
  'product.updated',
  'specialoffer.created',
  'specialoffer.updated'
]);

export const POST: RequestHandler = async ({ request }) => {
  const secret = env.SALLA_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[salla] SALLA_WEBHOOK_SECRET is not set; refusing webhook');
    return json({ error: 'not configured' }, { status: 503 });
  }

  const raw = await request.text();
  if (!verifySignature(raw, request.headers.get('x-salla-signature'), secret)) {
    return json({ error: 'invalid signature' }, { status: 401 });
  }

  let body: SallaEvent;
  try {
    body = JSON.parse(raw) as SallaEvent;
  } catch {
    return json({ error: 'invalid json' }, { status: 400 });
  }

  const { event, merchant } = body;
  const data = body.data ?? {};
  if (!event || !merchant) return json({ ok: true });

  try {
    if (event === 'app.store.authorize') {
      await updateStore(merchant, (s) => ({
        ...s,
        access_token: String(data.access_token ?? ''),
        refresh_token: String(data.refresh_token ?? ''),
        expires: Number(data.expires) || undefined,
        scope: data.scope ? String(data.scope) : undefined,
        authorized_at: body.created_at ?? new Date().toISOString(),
        uninstalled_at: undefined
      }));
      console.log(`[salla] authorized merchant ${merchant}`);
    } else if (event === 'app.installed') {
      await updateStore(merchant, (s) => ({
        ...s,
        installed_at: String(data.installation_date ?? body.created_at ?? new Date().toISOString()),
        store_type: data.store_type ? String(data.store_type) : s.store_type,
        uninstalled_at: undefined
      }));
      console.log(`[salla] installed by merchant ${merchant}`);
    } else if (event === 'app.uninstalled') {
      // The tokens go with the app: an uninstalled store's keys aren't kept.
      await updateStore(merchant, (s) => ({
        merchant,
        installed_at: s.installed_at,
        store_type: s.store_type,
        uninstalled_at: String(data.uninstallation_date ?? body.created_at ?? new Date().toISOString()),
        updated_at: s.updated_at
      }));
      console.log(`[salla] uninstalled by merchant ${merchant}`);
    } else if (CATALOGUE.has(event)) {
      await logEvent({
        merchant,
        event,
        id: data.id ?? null,
        name: data.name ?? null,
        created_at: body.created_at ?? null
      });
    }
  } catch (e) {
    // Salla retries on non-2xx, so a disk error is worth a retry.
    console.error(`[salla] failed to handle ${event} for ${merchant}:`, (e as Error).message);
    return json({ error: 'storage' }, { status: 500 });
  }

  return json({ ok: true });
};
