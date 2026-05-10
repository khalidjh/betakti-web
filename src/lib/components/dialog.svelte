<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: Snippet;
  }
  const { open, onClose, title, children }: Props = $props();

  function onKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') onClose();
  }
</script>

<svelte:window onkeydown={onKey} />

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-6"
    style="padding-bottom: max(0.75rem, env(safe-area-inset-bottom));"
  >
    <button class="absolute inset-0 w-full h-full" aria-label="Close" onclick={onClose}></button>
    <div
      class="relative w-full max-w-xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[85dvh] bg-[var(--color-surface)] rounded-[14px] shadow-[var(--shadow-3)] border border-[var(--color-border)] overflow-hidden flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      {#if title}
        <header class="h-14 border-b border-[var(--color-border)] flex items-center px-4 sm:px-5 flex-none">
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
      <div class="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0">{@render children()}</div>
    </div>
  </div>
{/if}
