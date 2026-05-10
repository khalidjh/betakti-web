<script lang="ts">
  interface Props {
    label: string;
    href: string;
    active?: boolean;
  }
  const { label, href, active = false }: Props = $props();
</script>

<a
  {href}
  class="inline-flex items-center px-3.5 py-1.5 rounded-[999px] text-sm whitespace-nowrap border transition-colors duration-[var(--duration-standard)] ease-[var(--ease-out)] {active
    ? 'text-white border-transparent'
    : 'bg-[var(--color-surface)] text-[var(--color-ink-2)] border-[var(--color-border)] hover:text-[var(--color-ink)] hover:border-[var(--color-border-strong)]'}"
  style={active ? 'background: var(--brand-gradient);' : ''}
  aria-current={active ? 'page' : undefined}
>
  {label}
</a>
