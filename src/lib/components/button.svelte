<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'gradient';

  type Props = {
    variant?: Variant;
    href?: string;
    children: Snippet;
  } & Omit<HTMLButtonAttributes, 'children'> &
    Omit<HTMLAnchorAttributes, 'children'>;

  const { variant = 'primary', href, children, ...rest }: Props = $props();

  const base =
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[10px] font-medium text-sm transition-colors duration-[var(--duration-standard)] ease-[var(--ease-out)] disabled:opacity-50';

  const variants: Record<Variant, string> = {
    primary: 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]',
    secondary:
      'bg-[var(--color-surface-2)] text-[var(--color-ink)] hover:bg-[var(--color-border)] border border-[var(--color-border)]',
    ghost:
      'bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]',
    gradient: 'text-white [background:var(--brand-gradient)] hover:opacity-95'
  };

  const cls = $derived(`${base} ${variants[variant]}`);
</script>

{#if href}
  <a {href} class={cls} {...rest}>{@render children()}</a>
{:else}
  <button class={cls} {...rest}>{@render children()}</button>
{/if}
