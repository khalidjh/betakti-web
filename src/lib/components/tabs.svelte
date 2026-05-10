<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Tab {
    id: string;
    label: string;
  }

  interface Props {
    tabs: Tab[];
    active: string;
    onChange: (id: string) => void;
    children?: Snippet;
  }
  const { tabs, active, onChange, children }: Props = $props();
</script>

<div class="flex flex-col h-full">
  <div class="flex items-center gap-4 px-4 border-b border-[var(--color-border)]">
    {#each tabs as tab (tab.id)}
      <button
        class="relative py-3 text-sm transition-colors
          {active === tab.id
          ? 'text-[var(--color-accent)] font-semibold'
          : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
        onclick={() => onChange(tab.id)}
        aria-selected={active === tab.id}
        role="tab"
      >
        {tab.label}
        {#if active === tab.id}
          <span class="absolute -bottom-px start-0 end-0 h-0.5 rounded-full" style="background: var(--color-accent);"></span>
        {/if}
      </button>
    {/each}
  </div>
  <div class="flex-1 overflow-y-auto">
    {#if children}{@render children()}{/if}
  </div>
</div>
