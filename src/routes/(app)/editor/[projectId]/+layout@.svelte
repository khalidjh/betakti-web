<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    children: Snippet;
  }
  const { children }: Props = $props();
</script>

<!-- Editor owns the full viewport — no app sidebar here -->
<div class="fixed inset-0">{@render children()}</div>
