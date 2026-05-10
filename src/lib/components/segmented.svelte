<script lang="ts" generics="T extends string | number">
  interface Option {
    value: T;
    label: string;
  }
  interface Props {
    options: Option[];
    value: T;
    onChange: (v: T) => void;
  }
  const { options, value, onChange }: Props = $props();
</script>

<div class="inline-flex p-1 bg-[var(--color-surface-2)] rounded-[10px] border border-[var(--color-border)]">
  {#each options as opt (opt.value)}
    <button
      class="px-3 py-1.5 rounded-[7px] text-sm transition-colors
        {value === opt.value
        ? 'bg-[var(--color-surface)] text-[var(--color-ink)] shadow-sm font-medium'
        : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
      onclick={() => onChange(opt.value)}
    >
      {opt.label}
    </button>
  {/each}
</div>
