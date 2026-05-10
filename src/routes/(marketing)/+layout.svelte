<script lang="ts">
  import type { Snippet } from 'svelte';
  import Logo from '$lib/brand/logo.svelte';
  import { m } from '$lib/i18n';
  import LocaleToggle from '$lib/components/locale-toggle.svelte';
  import ThemeToggle from '$lib/components/theme-toggle.svelte';

  interface Props {
    children: Snippet;
    data: { user: { uid: string; email: string | null; subscription: 'free' | 'pro' | null } | null };
  }
  const { children, data }: Props = $props();
  const userInitial = $derived(
    (data.user?.email ?? '?').charAt(0).toUpperCase()
  );
</script>

<div class="min-h-dvh flex flex-col bg-[var(--color-paper)]">
  <header
    class="sticky top-0 z-30 bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] backdrop-blur border-b border-[var(--color-border)]"
  >
    <div class="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 gap-2">
      <a href="/" class="flex items-center gap-2.5">
        <Logo size={30} />
        <span class="font-semibold text-base">{m.app_name()}</span>
      </a>
      <nav class="flex items-center gap-1 sm:gap-3 text-sm">
        <a
          href="/templates"
          class="hidden sm:inline px-3 py-1.5 rounded-[8px] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
        >
          {m.nav_templates()}
        </a>
        <a
          href="/pricing"
          class="hidden sm:inline px-3 py-1.5 rounded-[8px] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
        >
          {m.nav_pricing()}
        </a>
        <span class="hidden sm:inline w-px h-5 bg-[var(--color-border)] mx-1"></span>
        <ThemeToggle />
        <LocaleToggle />
        {#if data.user}
          <a
            href="/home"
            class="px-3.5 py-1.5 rounded-[10px] text-white font-medium text-sm"
            style="background: var(--brand-gradient);"
          >
            {m.cta_open_app()}
          </a>
          <a
            href="/settings"
            title={data.user.email ?? ''}
            class="w-8 h-8 rounded-[999px] flex items-center justify-center text-white text-sm font-bold ring-1 ring-[var(--color-border)]"
            style="background: var(--brand-gradient);"
          >
            {userInitial}
          </a>
        {:else}
          <a
            href="/auth/login"
            class="px-3 py-1.5 rounded-[8px] text-[var(--color-ink-2)] hover:text-[var(--color-ink)]"
          >
            {m.cta_sign_in()}
          </a>
          <a
            href="/auth/register"
            class="px-3.5 py-1.5 rounded-[10px] text-white font-medium text-sm"
            style="background: var(--brand-gradient);"
          >
            {m.cta_start()}
          </a>
        {/if}
      </nav>
    </div>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div class="sm:col-span-2 md:col-span-1 flex flex-col gap-3">
        <div class="flex items-center gap-2.5">
          <Logo size={28} />
          <span class="font-semibold">{m.app_name()}</span>
        </div>
        <p class="text-sm text-[var(--color-muted)] max-w-[18ch]">{m.marketing_footer_tagline()}</p>
      </div>
      <div class="flex flex-col gap-2 text-sm">
        <div class="font-semibold text-[var(--color-ink)] mb-1">{m.marketing_footer_product()}</div>
        <a href="/templates" class="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >{m.nav_templates()}</a
        >
        <a href="/pricing" class="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >{m.nav_pricing()}</a
        >
        <a href="/auth/register" class="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >{m.page_editor_title()}</a
        >
      </div>
      <div class="flex flex-col gap-2 text-sm">
        <div class="font-semibold text-[var(--color-ink)] mb-1">{m.marketing_footer_company()}</div>
        <a href="/privacy" class="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >{m.marketing_footer_privacy()}</a
        >
        <a href="/terms" class="text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >{m.marketing_footer_terms()}</a
        >
      </div>
      <div class="flex flex-col gap-2 text-sm">
        <div class="font-semibold text-[var(--color-ink)] mb-1">{m.marketing_footer_social()}</div>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noreferrer"
          class="text-[var(--color-muted)] hover:text-[var(--color-ink)]">{m.marketing_footer_twitter()}</a
        >
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noreferrer"
          class="text-[var(--color-muted)] hover:text-[var(--color-ink)]">{m.marketing_footer_instagram()}</a
        >
      </div>
    </div>
    <div
      class="border-t border-[var(--color-border)] py-4 px-4 sm:px-6 text-xs text-[var(--color-muted)] flex items-center justify-between max-w-6xl mx-auto"
    >
      <span>© {new Date().getFullYear()} {m.app_name()} — {m.marketing_footer_rights()}</span>
    </div>
  </footer>
</div>
