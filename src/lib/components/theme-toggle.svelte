<script lang="ts">
  import { Sun, Moon } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let current = $state<'light' | 'dark'>('light');

  onMount(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    current = attr === 'dark' ? 'dark' : 'light';
  });

  function toggle(): void {
    const next = current === 'light' ? 'dark' : 'light';
    current = next;
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore
    }
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `theme=${next}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }

  const label = $derived(
    current === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
  );
</script>

<button
  type="button"
  onclick={toggle}
  aria-label={label}
  title={label}
  class="inline-flex items-center justify-center w-8 h-8 rounded-[999px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)] transition-colors"
>
  {#if current === 'light'}
    <Moon size={15} strokeWidth={1.75} />
  {:else}
    <Sun size={15} strokeWidth={1.75} />
  {/if}
</button>
