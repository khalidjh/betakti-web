<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    label: string;
    shortcut?: string;
    children: Snippet;
    placement?: 'top' | 'bottom';
  }
  const { label, shortcut, children, placement = 'bottom' }: Props = $props();
  let visible = $state(false);
  let coords = $state({ left: 0, top: 0 });
  let timer: ReturnType<typeof setTimeout> | null = null;
  let wrapper: HTMLSpanElement | null = $state(null);
  let bubble: HTMLSpanElement | null = $state(null);

  function position(): void {
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const bw = bubble?.offsetWidth ?? 0;
    const bh = bubble?.offsetHeight ?? 0;
    const margin = 8;
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    let left = rect.left + rect.width / 2 - bw / 2;
    let top = placement === 'bottom' ? rect.bottom + margin : rect.top - bh - margin;
    left = Math.max(margin, Math.min(left, vw - bw - margin));
    top = Math.max(margin, Math.min(top, vh - bh - margin));
    coords = { left, top };
  }

  function enter(): void {
    timer = setTimeout(() => {
      visible = true;
      // Position twice: once to mount the bubble (so we can measure it),
      // then again on the next frame with accurate dimensions.
      queueMicrotask(position);
      requestAnimationFrame(position);
    }, 400);
  }
  function leave(): void {
    if (timer) clearTimeout(timer);
    visible = false;
  }
</script>

<span
  bind:this={wrapper}
  class="relative inline-flex"
  onmouseenter={enter}
  onmouseleave={leave}
  onfocusin={enter}
  onfocusout={leave}
  role="group"
>
  {@render children()}
</span>
{#if visible}
  <span
    bind:this={bubble}
    class="fixed z-[100] whitespace-nowrap bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-1 rounded-[6px] text-xs shadow-[var(--shadow-2)] inline-flex items-center gap-1.5 pointer-events-none"
    style="left: {coords.left}px; top: {coords.top}px;"
  >
    {label}
    {#if shortcut}
      <span class="font-mono text-[10px] opacity-70">{shortcut}</span>
    {/if}
  </span>
{/if}
