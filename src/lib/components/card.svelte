<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  type Props = {
    class?: string;
    padded?: boolean;
    children: Snippet;
  } & Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'>;

  const { class: klass = '', padded = true, children, ...rest }: Props = $props();

  const base =
    'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] shadow-[var(--shadow-1)]';
  const pad = padded ? 'p-5' : '';
</script>

<div class="{base} {pad} {klass}" {...rest}>
  {@render children()}
</div>
