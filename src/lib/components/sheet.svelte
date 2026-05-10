<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: Snippet;
    side?: 'start' | 'end';
    /** When true, render children without the default content padding so the
     *  caller can manage its own internal layout. */
    bare?: boolean;
  }
  const { open, onClose, title, children, side = 'end', bare = false }: Props = $props();

  function onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') onClose();
  }
</script>

<svelte:window onkeydown={onKeyDown} />

{#if open}
  <div
    class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
    onclick={onClose}
    role="button"
    tabindex="-1"
    aria-label="Close"
    onkeydown={(e) => e.key === 'Enter' && onClose()}
  ></div>
  <div
    class="fixed top-0 bottom-0 {side === 'end' ? 'end-0' : 'start-0'} z-50 w-[min(360px,calc(100vw-2rem))] bg-[var(--color-surface)] border-s border-[var(--color-border)] shadow-[var(--shadow-3)] flex flex-col"
    role="dialog"
    aria-modal="true"
    style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"
  >
    {#if title}
      <header class="h-14 border-b border-[var(--color-border)] flex items-center px-4 flex-none">
        <h2 class="text-base font-semibold">{title}</h2>
        <button
          class="ms-auto w-9 h-9 inline-flex items-center justify-center rounded-[8px] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
          onclick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </header>
    {/if}
    <div class="flex-1 overflow-y-auto min-h-0 {bare ? '' : 'p-4'}">{@render children()}</div>
  </div>
{/if}
