<script lang="ts">
  interface Props {
    keys: string;
  }
  const { keys }: Props = $props();
</script>

<span
  class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-muted)]"
>
  {keys}
</span>
