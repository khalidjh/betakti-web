<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    description?: string;
    icon?: Snippet;
    action?: Snippet;
  }
  const { title, description, icon, action }: Props = $props();
</script>

<div
  class="flex flex-col items-center justify-center text-center py-16 px-6 gap-4 rounded-[14px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)]"
>
  {#if icon}
    <div
      class="w-16 h-16 rounded-[999px] flex items-center justify-center text-white"
      style="background: var(--brand-gradient);"
    >
      {@render icon()}
    </div>
  {/if}
  <div class="flex flex-col gap-1 max-w-sm">
    <h3 class="text-lg font-semibold">{title}</h3>
    {#if description}
      <p class="text-sm text-[var(--color-muted)]">{description}</p>
    {/if}
  </div>
  {#if action}
    <div>{@render action()}</div>
  {/if}
</div>
