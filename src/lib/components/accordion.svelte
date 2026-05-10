<script lang="ts">
  interface Item {
    q: string;
    a: string;
  }
  interface Props {
    items: Item[];
  }
  const { items }: Props = $props();
</script>

<div class="flex flex-col gap-2">
  {#each items as item, i (i)}
    <details
      class="group rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors open:border-[var(--color-border-strong)]"
    >
      <summary
        class="flex items-center justify-between gap-3 px-5 py-4 list-none text-start font-medium text-[var(--color-ink)] select-none"
      >
        <span>{item.q}</span>
        <span
          class="inline-flex items-center justify-center w-6 h-6 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] text-sm transition-transform duration-[var(--duration-standard)] ease-[var(--ease-out)] group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <div class="px-5 pb-5 pt-0 text-sm text-[var(--color-muted)] leading-relaxed">{item.a}</div>
    </details>
  {/each}
</div>

<style>
  summary::-webkit-details-marker {
    display: none;
  }
</style>
