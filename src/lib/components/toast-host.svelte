<script lang="ts">
  import { toasts } from './toast.svelte';
</script>

<div class="fixed bottom-6 end-6 z-[60] flex flex-col gap-2 pointer-events-none">
  {#each toasts.items as t (t.id)}
    <div
      class="pointer-events-auto px-4 py-2 rounded-[10px] text-sm shadow-[var(--shadow-2)] border
        transition-transform
        {t.variant === 'success'
        ? 'bg-[var(--color-success)] text-white border-transparent'
        : t.variant === 'error'
          ? 'bg-[var(--color-danger)] text-white border-transparent'
          : 'bg-[var(--color-surface)] text-[var(--color-ink)] border-[var(--color-border)]'}"
      style:transition="transform var(--duration-standard) var(--ease-spring)"
    >
      {t.message}
    </div>
  {/each}
</div>
