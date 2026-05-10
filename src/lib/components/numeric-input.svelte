<script lang="ts">
  interface Props {
    value: number;
    onChange: (v: number) => void;
    label?: string;
    suffix?: string;
    step?: number;
    min?: number;
    max?: number;
  }

  const { value, onChange, label, suffix = '', step = 1, min, max }: Props = $props();

  let local = $state<string>('');

  $effect(() => {
    local = formatValue(value);
  });

  function formatValue(n: number): string {
    if (Number.isInteger(n)) return String(n);
    return n.toFixed(2).replace(/\.?0+$/, '');
  }

  function commit(): void {
    const parsed = parseFloat(local);
    if (Number.isFinite(parsed)) {
      let v = parsed;
      if (min !== undefined) v = Math.max(min, v);
      if (max !== undefined) v = Math.min(max, v);
      onChange(v);
      local = formatValue(v);
    } else {
      local = formatValue(value);
    }
  }

  function onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter') (e.currentTarget as HTMLInputElement).blur();
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(value + step);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(value - step);
    }
  }
</script>

<label class="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
  {#if label}<span class="font-mono w-5">{label}</span>{/if}
  <span class="relative flex items-center">
    <input
      class="font-mono text-right bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-[6px] px-2 py-1 w-20 text-[var(--color-ink)] focus:border-[var(--color-accent)] outline-none"
      inputmode="decimal"
      bind:value={local}
      onblur={commit}
      onkeydown={onKeyDown}
    />
    {#if suffix}
      <span class="ms-1 text-[10px] font-mono text-[var(--color-muted)]">{suffix}</span>
    {/if}
  </span>
</label>
