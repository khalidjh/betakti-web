import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * `/invite/<code>` — a referral link from the app.
 *
 * On a phone with the app installed this never runs: the path is claimed in
 * the apple-app-site-association file, so iOS opens the app and
 * `ReferralService.handleDeepLinkReferral` records the code. Everyone else
 * lands here, and the only useful thing to do with them is send them to the
 * store — carrying the code, so an install can eventually be traced back to
 * whoever invited them.
 *
 * Play hands `referrer` back to the app after install, which is the one
 * channel that survives the store round trip. Nothing credits a referrer yet
 * (see ReferralService in the Flutter app); this keeps the thread intact for
 * when something does.
 */
export const GET: RequestHandler = ({ params, url }) => {
  const code = (params.code || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 24);

  const target = new URL('/get', url.origin);
  target.searchParams.set('utm_source', 'invite');
  target.searchParams.set('utm_medium', 'referral');
  if (code) target.searchParams.set('utm_campaign', code);

  redirect(302, target.toString());
};
