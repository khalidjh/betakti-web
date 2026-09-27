<script lang="ts">
  import type { Snippet } from 'svelte';
  import Logo from '$lib/brand/logo.svelte';
  import { m } from '$lib/i18n';
  import LocaleToggle from '$lib/components/locale-toggle.svelte';
  import ThemeToggle from '$lib/components/theme-toggle.svelte';

  interface Props {
    children: Snippet;
  }
  const { children }: Props = $props();
</script>

<div
  class="min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden isolate"
  style="padding-top: max(2rem, env(safe-area-inset-top)); padding-bottom: max(2rem, env(safe-area-inset-bottom));"
>
  <div class="bg-hero-mesh absolute inset-0 -z-10" aria-hidden="true"></div>

  <div
    class="absolute end-3 sm:end-4 flex items-center gap-2"
    style="top: max(0.75rem, env(safe-area-inset-top));"
  >
    <ThemeToggle />
    <LocaleToggle />
  </div>

  <a href="/" class="flex items-center gap-3 mb-8 sm:mb-10">
    <Logo size={44} />
    <span class="font-semibold text-xl" style="font-family: var(--font-display); letter-spacing: -0.01em;">
      {m.app_name()}
    </span>
  </a>

  <div
    class="w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] p-6 sm:p-8 shadow-[var(--shadow-2)]"
  >
    {@render children()}
  </div>

  <p class="mt-6 text-xs text-[var(--color-muted)] text-center max-w-sm">
    © {new Date().getFullYear()} {m.app_name()}
  </p>
</div>
