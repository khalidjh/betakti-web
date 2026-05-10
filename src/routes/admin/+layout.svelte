<script lang="ts">
  import type { Snippet } from 'svelte';
  import { page } from '$app/state';

  interface Props {
    children: Snippet;
  }
  const { children }: Props = $props();

  const navItems = [{ href: '/admin/backgrounds', label: 'Backgrounds' }] as const;
</script>

<div class="min-h-dvh flex flex-col">
  <header
    class="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 flex items-center gap-6"
  >
    <a href="/home" class="text-sm font-semibold">← App</a>
    <span
      class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]"
      style="font-family: var(--font-mono);"
    >
      Admin
    </span>
    <nav class="flex items-center gap-1">
      {#each navItems as item (item.href)}
        {@const active = page.url.pathname.startsWith(item.href)}
        <a
          href={item.href}
          class="px-3 py-1.5 rounded-[8px] text-sm transition-colors {active
            ? 'bg-[var(--color-surface-2)] text-[var(--color-ink)] font-medium'
            : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface-2)]'}"
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </header>
  <main class="flex-1 p-8 bg-[var(--color-paper)]">
    {@render children()}
  </main>
</div>
