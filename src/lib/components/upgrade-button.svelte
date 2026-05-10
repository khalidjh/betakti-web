<script lang="ts">
  import { m } from '$lib/i18n';
  import { Sparkles } from 'lucide-svelte';

  interface Props {
    href?: string;
  }
  const { href = '/subscription' }: Props = $props();
</script>

<a
  {href}
  class="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] text-white font-semibold text-sm shadow-[var(--shadow-1)] hover:opacity-95 transition-opacity"
  style="background: var(--brand-gradient);"
>
  <Sparkles size={16} strokeWidth={2.2} />
  {m.subscription_pro()}
</a>
