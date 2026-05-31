<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { navigating } from '$app/state';
  import { initAnalytics } from '$lib/firebase/client';

  interface Props {
    children: Snippet;
  }
  const { children }: Props = $props();

  $effect(() => {
    // Browser-only; safe no-op during SSR or when Analytics is unsupported.
    initAnalytics();
  });
</script>

{#if navigating.to}
  <div class="nav-progress" role="progressbar" aria-label="Loading"></div>
{/if}

{@render children()}

<style>
  .nav-progress {
    position: fixed;
    inset-inline-start: 0;
    inset-inline-end: 0;
    top: 0;
    height: 2px;
    z-index: 9999;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--color-accent, #6366f1) 50%,
      transparent 100%
    );
    background-size: 40% 100%;
    background-repeat: no-repeat;
    animation: nav-progress-slide 1s ease-in-out infinite;
    pointer-events: none;
    border-radius: 2px;
  }
  @keyframes nav-progress-slide {
    0% { background-position: -40% 0; }
    100% { background-position: 140% 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .nav-progress { animation-duration: 2s; }
  }
</style>
