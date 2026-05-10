<script lang="ts">
  import { getLocale } from '$lib/i18n';

  const current = $derived(getLocale());

  function set(next: 'ar' | 'en'): void {
    if (next === current) return;
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
