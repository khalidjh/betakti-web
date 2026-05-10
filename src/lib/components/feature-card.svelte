<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    description: string;
    illustration: Snippet;
  }
  const { title, description, illustration }: Props = $props();
</script>

<div
  class="flex flex-col gap-4 p-6 rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-1)]"
>
  <div class="w-14 h-14 flex items-center justify-center">
    {@render illustration()}
  </div>
  <div class="flex flex-col gap-1.5">
    <h3 class="text-lg font-semibold">{title}</h3>
    <p class="text-sm text-[var(--color-muted)] leading-relaxed">{description}</p>
  </div>
</div>
