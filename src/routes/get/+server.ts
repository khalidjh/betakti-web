import { redirect } from '@sveltejs/kit';
import { APP_STORE_URL, PLAY_STORE_URL } from '$lib/seo/config';
import type { RequestHandler } from './$types';

/**
 * `/get` — the link a shared design carries.
 *
 * The app puts this URL in every share (watermark, WhatsApp, Instagram, the
 * PDF, Settings), so the person receiving a card lands on the store for the
 * phone in their hand. `betakti.web.app` used to do exactly this and nothing
 * on betakti.com replaced it, which meant a tap opened the web editor — the
 * wrong place for someone who has never heard of the app.
 *
 * Desktop has no app to install, so it goes to /welcome, which shows both
 * badges and what the app is.
 *
 * Campaign tags are forwarded, not dropped:
 *  - **Play** takes `referrer`, which the Install Referrer API hands back to
 *    the app after install. That is the only way an Android install can be
 *    traced to the card that caused it.
 *  - **App Store** takes `ct` (campaign text, max 40 chars) which shows up in
 *    App Analytics under Campaigns. `pt`/`at` need a provider token we don't
 *    have, and `ct` works without one.
 */

const IOS = /iPhone|iPad|iPod/i;
const ANDROID = /Android/i;

/** App Store `ct` allows letters, numbers, `_` and `-`, and caps at 40. */
function campaignToken(parts: string[]): string {
  return parts
    .filter(Boolean)
    .join('_')
    .replace(/[^A-Za-z0-9_-]/g, '')
    .slice(0, 40);
}

export const GET: RequestHandler = ({ request, url }) => {
  const ua = request.headers.get('user-agent') ?? '';
  const source = url.searchParams.get('utm_source') ?? 'web';
  const medium = url.searchParams.get('utm_medium') ?? '';
  const campaign = url.searchParams.get('utm_campaign') ?? '';

  if (ANDROID.test(ua)) {
    // Play wants the referrer as one URL-encoded query string.
    const referrer = new URLSearchParams({
      utm_source: source,
      ...(medium ? { utm_medium: medium } : {}),
      ...(campaign ? { utm_campaign: campaign } : {})
    }).toString();

    const play = new URL(PLAY_STORE_URL);
    play.searchParams.set('referrer', referrer);
    redirect(302, play.toString());
  }

  if (IOS.test(ua)) {
    const apple = new URL(APP_STORE_URL);
    const ct = campaignToken([source, campaign]);
    if (ct) apple.searchParams.set('ct', ct);
    apple.searchParams.set('mt', '8');
    redirect(302, apple.toString());
  }

  // Desktop, or a crawler: show the landing page rather than a store it
  // cannot use. Keep the tags so the visit is still attributable.
  const welcome = new URL('/welcome', url.origin);
  for (const [key, value] of url.searchParams) {
    if (key.startsWith('utm_')) welcome.searchParams.set(key, value);
  }
  redirect(302, welcome.toString());
};
