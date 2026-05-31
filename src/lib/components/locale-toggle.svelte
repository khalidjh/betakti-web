<script lang="ts">
  import { getLocale } from '$lib/i18n';
  import { addLocalePrefix, isAppPath, stripLocalePrefix, type Locale } from '$lib/locale-path';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  const current = $derived(getLocale() as Locale);

  function set(next: Locale): void {
    if (next === current) return;

    const path = page.url.pathname;

    // Marketing pages are locale-by-URL: navigate to the prefixed/un-prefixed
    // equivalent so the URL and rendered language always agree (good for SEO).
    if (!isAppPath(path)) {
      const target = addLocalePrefix(stripLocalePrefix(path), next) + page.url.search;
      goto(target, { invalidateAll: true });
      return;
    }

    // In-app pages store the language as a preference cookie.
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `locale=${next}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `PARAGLIDE_LOCALE=${next}; path=/; max-age=${maxAge}; SameSite=Lax`;
    location.reload();
  }
</script>

<div
  class="locale-toggle inline-flex items-center rounded-[999px] border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 text-xs font-medium"
  role="group"
  aria-label="Language"
>
  <button
    type="button"
    class="px-2.5 py-1 rounded-[999px] transition-colors cursor-pointer {current === 'ar'
      ? 'text-white'
      : 'text-[var(--color-ink-2)] hover:text-[var(--color-ink)]'}"
    style={current === 'ar' ? 'background: var(--color-accent);' : ''}
    aria-pressed={current === 'ar'}
    onclick={() => set('ar')}
  >
    عربي
  </button>
  <button
    type="button"
    class="px-2.5 py-1 rounded-[999px] transition-colors cursor-pointer {current === 'en'
      ? 'text-white'
      : 'text-[var(--color-ink-2)] hover:text-[var(--color-ink)]'}"
    style={current === 'en' ? 'background: var(--color-accent);' : ''}
    aria-pressed={current === 'en'}
    onclick={() => set('en')}
  >
    EN
  </button>
</div>
