<script lang="ts">
  import '../app.css';
  import type { Snippet } from 'svelte';
  import { navigating, page } from '$app/state';
  import { initAnalytics } from '$lib/firebase/client';
  import {
    initAnalytics as initPostHog,
    capturePageview
  } from '$lib/analytics/posthog';

  interface Props {
    children: Snippet;
  }
  const { children }: Props = $props();

  $effect(() => {
    // Browser-only; safe no-op during SSR or when Analytics is unsupported.
    initAnalytics();
    initPostHog();
  });

  // SvelteKit navigates on the client, so without this only the first page of
  // a visit would ever be recorded.
  $effect(() => {
    const url = page.url;
    if (url) capturePageview(url);
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
      var(--color-accent, #2d5ff0) 50%,
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
