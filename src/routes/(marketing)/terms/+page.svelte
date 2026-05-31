<script lang="ts">
  import { m, t } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  const updated = '2026-04-18';
</script>

<Seo
  title={m.settings_terms()}
  description={t('شروط وأحكام استخدام Betakti.', 'Betakti’s terms and conditions of use.')}
  path="/terms"
/>

<div class="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col gap-6">
  <header class="flex flex-col gap-3 mb-2">
    <span
      class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-muted)]"
      style="font-family: var(--font-mono);"
    >
      <span class="inline-block w-6 h-px bg-[var(--color-border-strong)]" aria-hidden="true"></span>
      {m.legal_updated()}: {updated}
    </span>
    <h1
      class="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05]"
      style="font-family: var(--font-display); letter-spacing: -0.02em;"
    >
      {m.settings_terms()}
    </h1>
  </header>
  <p class="text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed">{m.legal_terms_body()}</p>
  <p class="text-sm text-[var(--color-muted)] pt-4 border-t border-[var(--color-border)]">
    {m.legal_contact()}:
    <a href="mailto:eiddesigner37@gmail.com" class="text-[var(--color-accent)] hover:underline font-medium"
      >eiddesigner37@gmail.com</a
    >
  </p>
</div>
