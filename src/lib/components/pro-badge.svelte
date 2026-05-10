<script lang="ts">
  import { m } from '$lib/i18n';

  interface Props {
    size?: 'sm' | 'md';
  }
  const { size = 'sm' }: Props = $props();
  const sz = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5';
</script>

<span
  class="inline-flex items-center justify-center font-bold rounded-[999px] text-white leading-none tracking-wide {sz}"
  style="background: var(--brand-gradient);"
>
  {m.pro_badge()}
</span>
