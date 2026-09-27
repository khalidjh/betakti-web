<script lang="ts">
  import { page } from '$app/state';
  import Logo from '$lib/brand/logo.svelte';
  import { m } from '$lib/i18n';
</script>

<div
  class="min-h-dvh flex flex-col items-center justify-center gap-5 px-6 text-center relative overflow-hidden"
>
  <!-- Soft gradient mesh backdrop -->
  <div
    class="absolute inset-0 -z-10"
    style="background:
      radial-gradient(ellipse 600px 400px at 20% 20%, color-mix(in srgb, var(--color-teal) 18%, transparent), transparent 60%),
      radial-gradient(ellipse 500px 400px at 80% 85%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 60%),
      radial-gradient(ellipse 400px 300px at 60% 40%, color-mix(in srgb, var(--color-violet) 14%, transparent), transparent 60%);"
    aria-hidden="true"
  ></div>

  <Logo size={52} />

  <span
    class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-[var(--color-muted)] mt-2"
    style="font-family: var(--font-mono);"
  >
    <span class="inline-block w-6 h-px bg-[var(--color-border-strong)]" aria-hidden="true"></span>
    {page.status}
  </span>

  <h1
    class="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] max-w-[18ch]"
    style="font-family: var(--font-display); letter-spacing: -0.02em;"
  >
    {m.error_title()}
  </h1>

  {#if page.error?.message}
    <p class="text-base text-[var(--color-ink-2)] max-w-[46ch] leading-relaxed">
      {page.error.message}
    </p>
  {/if}

  <a
    href="/"
    class="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-[10px] text-white font-semibold text-sm"
    style="background: var(--brand-gradient); box-shadow: 0 6px 20px rgba(91, 141, 239, 0.28);"
  >
    ← {m.error_back_home()}
  </a>
</div>
