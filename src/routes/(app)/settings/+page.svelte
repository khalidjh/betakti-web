<script lang="ts">
  import { m, getLocale } from '$lib/i18n';
  import Card from '$lib/components/card.svelte';
  import Button from '$lib/components/button.svelte';
  import Input from '$lib/components/input.svelte';
  import Segmented from '$lib/components/segmented.svelte';
  import ProBadge from '$lib/components/pro-badge.svelte';
  import { enhance } from '$app/forms';
  import { goto, invalidateAll } from '$app/navigation';
  import { signOut } from '$lib/auth/client';

  const { data } = $props();

  let theme = $state<'light' | 'dark' | 'system'>(
    (data.theme as 'light' | 'dark' | 'system') ?? 'system'
  );
  let displayName = $state(data.account.displayName ?? '');
  let nameSaved = $state(false);

  function applyTheme(next: 'light' | 'dark' | 'system'): void {
    theme = next;
    if (typeof window === 'undefined') return;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effective = next === 'system' ? (prefersDark ? 'dark' : 'light') : next;
    document.documentElement.setAttribute('data-theme', effective);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore
    }
    document.cookie = `theme=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }

  async function changeLocale(next: 'ar' | 'en'): Promise<void> {
    if (next === data.locale) return;
    document.cookie = `locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    window.location.reload();
  }

  async function handleSignOut(): Promise<void> {
    await signOut();
    await invalidateAll();
    await goto('/');
  }

  function formatDate(ms: number | null): string {
    if (!ms) return '—';
    try {
      return new Intl.DateTimeFormat(getLocale() === 'ar' ? 'ar-SA' : 'en-US', {
        dateStyle: 'medium'
      }).format(new Date(ms));
    } catch {
      return new Date(ms).toDateString();
    }
  }
</script>

<div class="relative isolate overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-10">
  <div class="bg-hero-mesh absolute inset-0 -z-10 opacity-80" aria-hidden="true"></div>
  <header class="max-w-3xl mx-auto flex flex-col gap-2 pt-4">
    <span
      class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
      style="font-family: var(--font-mono);"
    >
      <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
      {data.account.email}
    </span>
    <h1
      class="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.1]"
      style="font-family: var(--font-display); letter-spacing: -0.015em;"
    >
      {m.page_settings_title()}
    </h1>
  </header>
</div>

<div class="max-w-3xl mx-auto flex flex-col gap-6 pt-4">

  <Card>
    <h2 class="text-lg font-semibold mb-4">{m.settings_account()}</h2>
    <div class="flex items-center gap-4 mb-4">
      <div
        class="w-14 h-14 rounded-[999px] flex items-center justify-center text-white text-xl font-bold"
        style="background: var(--brand-gradient);"
      >
        {(data.account.displayName ?? data.account.email ?? '?').charAt(0).toUpperCase()}
      </div>
      <div>
        <div class="text-sm text-[var(--color-muted)]">{data.account.email}</div>
      </div>
    </div>
    <form
      method="POST"
      action="?/updateName"
      use:enhance={() => {
        nameSaved = false;
        return async ({ update }) => {
          await update();
          nameSaved = true;
        };
      }}
      class="flex items-end gap-3"
    >
      <Input name="displayName" label={m.label_display_name()} bind:value={displayName} class="flex-1" />
      <Button variant="primary" type="submit">{m.settings_save()}</Button>
    </form>
    {#if nameSaved}
      <p class="text-xs text-[var(--color-success)] mt-2">{m.settings_saved()}</p>
    {/if}
  </Card>

  <Card>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold flex items-center gap-2">
        {m.settings_subscription()}
        {#if data.account.subscription.tier === 'pro' && data.account.subscription.isActive}
          <ProBadge />
        {/if}
      </h2>
    </div>
    <div class="text-sm text-[var(--color-muted)] mb-4">
      {#if data.account.subscription.isLifetime}
        {m.subscription_lifetime()}
      {:else if data.account.subscription.tier === 'pro' && data.account.subscription.isActive}
        {m.subscription_renews()}
        {formatDate(data.account.subscription.expirationDate)}
      {:else}
        {m.subscription_free()}
      {/if}
    </div>
    <Button variant="secondary" href="/subscription">{m.settings_manage_subscription()}</Button>
  </Card>

  <Card>
    <h2 class="text-lg font-semibold mb-4">{m.settings_appearance()}</h2>
    <div class="flex items-center justify-between">
      <span class="text-sm">{m.theme()}</span>
      <Segmented
        value={theme}
        onChange={applyTheme}
        options={[
          { value: 'light', label: m.theme_light() },
          { value: 'dark', label: m.theme_dark() },
          { value: 'system', label: m.theme_system() }
        ]}
      />
    </div>
  </Card>

  <Card>
    <h2 class="text-lg font-semibold mb-4">{m.settings_language()}</h2>
    <div class="flex items-center justify-between">
      <span class="text-sm">{m.language()}</span>
      <Segmented
        value={data.locale}
        onChange={changeLocale}
        options={[
          { value: 'ar', label: m.lang_ar() },
          { value: 'en', label: m.lang_en() }
        ]}
      />
    </div>
  </Card>

  <Card>
    <h2 class="text-lg font-semibold mb-3">{m.settings_help()}</h2>
    <a href="mailto:eiddesigner37@gmail.com" class="text-sm text-[var(--color-accent)] hover:underline">
      eiddesigner37@gmail.com
    </a>
  </Card>

  <Card>
    <h2 class="text-lg font-semibold mb-3">{m.settings_legal()}</h2>
    <div class="flex flex-col gap-2 text-sm">
      <a href="/privacy" class="text-[var(--color-accent)] hover:underline">{m.settings_privacy()}</a>
      <a href="/terms" class="text-[var(--color-accent)] hover:underline">{m.settings_terms()}</a>
    </div>
  </Card>

  <Card>
    <h2 class="text-lg font-semibold mb-3">{m.settings_social()}</h2>
    <div class="flex flex-col gap-2 text-sm">
      <a
        href="https://twitter.com/khalidjsah"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[var(--color-accent)] hover:underline"
      >
        Twitter · @khalidjsah
      </a>
      <a
        href="https://instagram.com/khalidjh"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[var(--color-accent)] hover:underline"
      >
        Instagram · @khalidjh
      </a>
    </div>
  </Card>

  <button
    type="button"
    onclick={handleSignOut}
    class="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] text-white font-semibold text-sm self-start hover:opacity-95"
    style="background: linear-gradient(160deg, #ef4444 0%, #b91c1c 100%);"
  >
    {m.settings_sign_out()}
  </button>
</div>
