<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    label: string;
    shortcut?: string;
    children: Snippet;
  }
  const { label, shortcut, children }: Props = $props();
  let visible = $state(false);
  let timer: ReturnType<typeof setTimeout> | null = null;

  function enter(): void {
    timer = setTimeout(() => (visible = true), 400);
  }
  function leave(): void {
    if (timer) clearTimeout(timer);
    visible = false;
  }
</script>

<span
  class="relative inline-flex"
  onmouseenter={enter}
  onmouseleave={leave}
  onfocusin={enter}
  onfocusout={leave}
  role="group"
>
  {@render children()}
  {#if visible}
    <span
      class="absolute left-full top-1/2 -translate-y-1/2 ms-2 z-50 whitespace-nowrap bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-1 rounded-[6px] text-xs shadow-[var(--shadow-2)] flex items-center gap-1.5"
    >
      {label}
      {#if shortcut}
        <span class="font-mono text-[10px] opacity-70">{shortcut}</span>
      {/if}
    </span>
  {/if}
</span>
