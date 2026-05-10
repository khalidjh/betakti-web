<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = {
    label?: string;
    error?: string;
    value?: string;
    class?: string;
  } & Omit<HTMLInputAttributes, 'class'>;

  let { label, error, value = $bindable(''), class: klass = '', ...rest }: Props = $props();
</script>

<label class="flex flex-col gap-1 text-sm {klass}">
  {#if label}
    <span class="font-medium text-[var(--color-ink-2)]">{label}</span>
  {/if}
  <input
    bind:value
    class="ui-input px-3 py-2.5 rounded-[10px] border bg-[var(--color-surface-2)] transition-colors text-[var(--color-ink)]
      {error
      ? 'border-[var(--color-danger)]'
      : 'border-[var(--color-border-strong)] focus:border-[var(--color-accent)]'}"
    {...rest}
  />
  {#if error}
    <span class="text-xs text-[var(--color-danger)]">{error}</span>
  {/if}
</label>

<style>
  /* Prevent iOS Safari from auto-zooming when an input is focused. iOS only
     zooms when the field's computed font-size is < 16px. Below the sm
     breakpoint we bump to 16px; on larger viewports we keep the original
     14px for a tighter desktop feel. */
  .ui-input {
    font-size: 16px;
  }
  @media (min-width: 640px) {
    .ui-input {
      font-size: 14px;
    }
  }
</style>
