import { env } from '$env/dynamic/private';
import { getStore, updateStore, type SallaStore } from './store.server';

/**
 * Talking to Salla on a merchant's behalf.
 *
 * Two kinds of token are in play and they are easy to mix up:
 *  - the **embedded session token** (`em_tok_…`) the dashboard puts in the
 *    iframe URL. Short-lived, says only "merchant X, user Y, until Z". We
 *    check it with Salla's introspect endpoint and never store it.
 *  - the **merchant access token** from `app.store.authorize`, kept in
 *    stores.json. 14 days; the refresh token that renews it lasts a month and
 *    is single-use — reuse one and Salla revokes the lot, and the merchant
 *    has to reinstall. Hence one refresh in flight per merchant.
 *
 * Docs: docs.salla.dev/embedded-sdk/authentication, /doc-421118 (OAuth).
 */

const API = 'https://api.salla.dev/admin/v2';
const INTROSPECT = 'https://api.salla.dev/exchange-authority/v1/introspect';
const TOKEN = 'https://accounts.salla.sa/oauth2/token';
const APP_ID = () => env.SALLA_APP_ID || '537359223';

export class SallaError extends Error {
  constructor(
    public code: 'invalid_session' | 'not_installed' | 'refresh_unavailable' | 'reauthorize' | 'upstream',
    message: string
  ) {
    super(message);
  }
}

/** The merchant behind an embedded session token, or null if Salla says no. */
export async function introspect(sessionToken: string): Promise<number | null> {
  const res = await fetch(INTROSPECT, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json', 'S-Source': APP_ID() },
    body: JSON.stringify({ token: sessionToken })
  });
  if (!res.ok) return null;
  const body = (await res.json().catch(() => null)) as {
    success?: boolean;
    data?: { merchant_id?: number; exp?: string };
  } | null;
  const merchant = body?.success ? body.data?.merchant_id : undefined;
  if (!merchant) return null;
  if (body?.data?.exp && Date.parse(body.data.exp) < Date.now()) return null;
  return merchant;
}

// `expires` arrives as unix seconds on app.store.authorize and as seconds-from-
// now (`expires_in`) on the token endpoint; the docs use both.
function absoluteExpiry(v: unknown): number | undefined {
  const n = Number(v);
  if (!n) return undefined;
  return n > 1e9 ? n : Math.floor(Date.now() / 1000) + n;
}

const refreshing = new Map<number, Promise<SallaStore>>();

async function refresh(store: SallaStore): Promise<SallaStore> {
  const inflight = refreshing.get(store.merchant);
  if (inflight) return inflight;
  const run = (async () => {
    const id = env.SALLA_CLIENT_ID;
    const secret = env.SALLA_CLIENT_SECRET;
    if (!id || !secret) {
      throw new SallaError('refresh_unavailable', 'SALLA_CLIENT_ID / SALLA_CLIENT_SECRET are not set');
    }
    if (!store.refresh_token) throw new SallaError('reauthorize', 'no refresh token on file');
    const res = await fetch(TOKEN, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: store.refresh_token,
        client_id: id,
        client_secret: secret
      })
    });
    const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok || !body.access_token) {
      console.error(`[salla] refresh failed for merchant ${store.merchant}: HTTP ${res.status}`);
      throw new SallaError('reauthorize', 'token refresh was refused');
    }
    let next: SallaStore = store;
    await updateStore(store.merchant, (s) => {
      next = {
        ...s,
        access_token: String(body.access_token),
        refresh_token: String(body.refresh_token ?? ''),
        expires: absoluteExpiry(body.expires_in ?? body.expires),
        scope: body.scope ? String(body.scope) : s.scope
      };
      return next;
    });
    console.log(`[salla] refreshed token for merchant ${store.merchant}`);
    return next;
  })();
  refreshing.set(store.merchant, run);
  try {
    return await run;
  } finally {
    refreshing.delete(store.merchant);
  }
}

/** A usable access token for the merchant, refreshing it if it's about to lapse. */
async function accessFor(merchant: number, force = false): Promise<SallaStore> {
  const store = await getStore(merchant);
  if (!store?.access_token || store.uninstalled_at) {
    throw new SallaError('not_installed', 'no access token for this merchant');
  }
  const now = Math.floor(Date.now() / 1000);
  if (force || (store.expires && store.expires < now + 3600)) {
    try {
      return await refresh(store);
    } catch (e) {
      // Without client credentials a token that hasn't lapsed yet still works.
      const stillValid = !force && store.expires && store.expires > now + 60;
      if (e instanceof SallaError && e.code === 'refresh_unavailable' && stillValid) return store;
      throw e;
    }
  }
  return store;
}

/** GET an Admin API path as the merchant. One retry through a refresh on 401. */
export async function adminGet<T>(merchant: number, path: string): Promise<T> {
  let store = await accessFor(merchant);
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(API + path, {
      headers: { authorization: `Bearer ${store.access_token}`, accept: 'application/json' }
    });
    if (res.status === 401 && attempt === 0) {
      store = await accessFor(merchant, true);
      continue;
    }
    if (!res.ok) throw new SallaError('upstream', `GET ${path} → HTTP ${res.status}`);
    return (await res.json()) as T;
  }
  throw new SallaError('upstream', `GET ${path} unauthorized after refresh`);
}
