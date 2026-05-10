<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Props = {
    label: string;
    active?: boolean;
    size?: 'sm' | 'md';
    children: Snippet;
  } & Omit<HTMLButtonAttributes, 'children'>;

  const { label, active = false, size = 'md', children, ...rest }: Props = $props();

  const dims = $derived(size === 'sm' ? 'h-8 w-8' : 'h-10 w-10');
</script>

<button
  class="icon-btn relative inline-flex items-center justify-center rounded-[10px] transition-colors duration-[var(--duration-micro)] {dims}
    {active
    ? 'bg-[var(--color-surface-2)] text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]'
    : 'text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]'}"
  aria-label={label}
  aria-pressed={active}
  title={label}
  {...rest}
>
  {@render children()}
</button>

<style>
  /* On coarse pointers (touch), expand the click target to ~44px without
     changing the visual size. This keeps toolbars compact on desktop while
     remaining tappable on phones. */
  @media (pointer: coarse) {
    .icon-btn::before {
      content: '';
      position: absolute;
      inset: -6px;
      min-width: 44px;
      min-height: 44px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
