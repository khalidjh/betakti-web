<script lang="ts">
  import type { Snippet } from 'svelte';

  type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'accent';
  interface Props {
    tone?: Tone;
    children: Snippet;
  }
  const { tone = 'neutral', children }: Props = $props();

  const tones: Record<Tone, string> = {
    neutral: 'bg-[var(--color-surface-2)] text-[var(--color-ink-2)] border-[var(--color-border)]',
    success: 'bg-[color-mix(in_srgb,var(--color-success)_14%,transparent)] text-[var(--color-success)] border-[color-mix(in_srgb,var(--color-success)_30%,transparent)]',
    warning: 'bg-[color-mix(in_srgb,var(--color-warning)_14%,transparent)] text-[var(--color-warning)] border-[color-mix(in_srgb,var(--color-warning)_30%,transparent)]',
    danger: 'bg-[color-mix(in_srgb,var(--color-danger)_14%,transparent)] text-[var(--color-danger)] border-[color-mix(in_srgb,var(--color-danger)_30%,transparent)]',
    accent: 'bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-[var(--color-accent)] border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)]'
  };
</script>

<span
  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-[999px] text-xs font-medium border {tones[tone]}"
>
  {@render children()}
</span>
