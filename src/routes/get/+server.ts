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
 * Desktop has no app to install, so it goes to the landing page, which shows
 * both badges and what the app is.
 *
 * Campaign tags are forwarded, not dropped:
 *  - **Play** takes `referrer`, which the Install Referrer API hands back to
 *    the app after install. That is the only way an Android install can be
 *    traced to the card that caused it.
 *  - **App Store** takes `pt` (our provider token) plus `ct` (campaign text,
 *    max 40 chars). App Analytics → Campaigns only counts a link carrying both.
 */

/** App Store Connect provider id of the team that owns Betakti. */
const APPLE_PROVIDER_TOKEN = '120059042';

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

  // An explicit store beats sniffing: someone on a laptop clicking the App
  // Store badge wants the App Store, not the landing page they came from.
  const asked = url.searchParams.get('platform');

  if (asked === 'android' || (!asked && ANDROID.test(ua))) {
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

  if (asked === 'ios' || IOS.test(ua)) {
    const apple = new URL(APP_STORE_URL);
    const ct = campaignToken([source, campaign]);
    apple.searchParams.set('pt', APPLE_PROVIDER_TOKEN);
    if (ct) apple.searchParams.set('ct', ct);
    apple.searchParams.set('mt', '8');
    redirect(302, apple.toString());
  }

  // Desktop, or a crawler: show the landing page rather than a store it
  // cannot use. Keep the tags so the visit is still attributable. The landing
  // page is the root now — pointing at /welcome would cost a second hop.
  const welcome = new URL('/', url.origin);
  welcome.hash = 'download';
  for (const [key, value] of url.searchParams) {
    if (key.startsWith('utm_')) welcome.searchParams.set(key, value);
  }
  redirect(302, welcome.toString());
};
