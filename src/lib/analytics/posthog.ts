import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

/**
 * PostHog for the website, on the same project as the app.
 *
 * The app already dual-writes to Firebase and PostHog. The site had Firebase
 * only, so the two halves of the same journey — someone reads an occasion
 * page, then installs and makes a card — sat in different systems and could
 * not be joined. Same key, same person, one funnel.
 *
 * Nothing here fails a page render: an absent key simply means no analytics,
 * which is what a fork of this repo without secrets should do.
 */

type PostHogLike = {
  init: (key: string, options: Record<string, unknown>) => void;
  capture: (event: string, properties?: Record<string, unknown>) => void;
  register: (properties: Record<string, unknown>) => void;
};

let client: PostHogLike | null = null;
let started = false;

/** The tags a visit arrived with, kept for the whole session. */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

export async function initAnalytics(): Promise<void> {
  if (!browser || started) return;
  const key = env.PUBLIC_POSTHOG_KEY;
  if (!key) return;
  started = true;

  try {
    const mod = await import('posthog-js');
    const posthog = (mod.default ?? mod) as unknown as PostHogLike;
    posthog.init(key, {
      api_host: env.PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      // SvelteKit routes on the client, so a single automatic pageview would
      // be the only one ever recorded.
      capture_pageview: false,
      persistence: 'localStorage+cookie'
    });
    client = posthog;

    // Whatever brought this visit in, attached to every later event rather
    // than only the landing one — the install happens several pages later,
    // and the question is always which post caused it.
    const params = new URLSearchParams(window.location.search);
    const campaign: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) campaign[k] = v;
    }
    const referrer = document.referrer;
    posthog.register({
      ...campaign,
      ...(referrer ? { initial_referrer: referrer } : {})
    });
  } catch (e) {
    console.warn('PostHog unavailable', e);
  }
}

export function capturePageview(url: URL): void {
  client?.capture('$pageview', { $current_url: url.href, path: url.pathname });
}

export function capture(event: string, properties?: Record<string, unknown>): void {
  client?.capture(event, properties);
}
