<script lang="ts">
  import { t, localizeHref } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import AppStoreButtons from '$lib/components/app-store-buttons.svelte';
  import PricingSummary from '$lib/components/pricing-summary.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { Localized } from '$lib/seo/landings';

  interface Crumb {
    name: string;
    href: string;
  }

  interface Props {
    content: Localized;
    /** Visible breadcrumb trail (already localized labels + base paths). */
    crumbs: Crumb[];
    /** Optional /templates deep-link for the secondary CTA. */
    templatesHref?: string;
    sizeLabel?: string;
  }

  const { content, crumbs, templatesHref, sizeLabel }: Props = $props();

  const registerHref = $derived(localizeHref('/auth/register'));
</script>

<article>
  <!-- Hero -->
  <section class="relative isolate overflow-hidden">
    <div class="bg-hero-mesh absolute inset-x-0 top-0 h-[460px] -z-10 opacity-90" aria-hidden="true"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-10">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-xs text-[var(--color-muted)] flex flex-wrap items-center gap-1.5" aria-label="Breadcrumb">
        {#each crumbs as crumb, i (crumb.href)}
          {#if i > 0}<span aria-hidden="true">/</span>{/if}
          {#if i < crumbs.length - 1}
            <a href={localizeHref(crumb.href)} class="hover:text-[var(--color-ink)]">{crumb.name}</a>
          {:else}
            <span class="text-[var(--color-ink-2)]">{crumb.name}</span>
          {/if}
        {/each}
      </nav>

      <div class="flex flex-col gap-5 max-w-3xl" use:reveal>
        <span
          class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
          style="font-family: var(--font-mono);"
        >
          <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
          {content.eyebrow}
        </span>

        <h1
          class="font-bold text-[clamp(2.25rem,5.5vw,4rem)]"
          style="font-family: var(--font-display); letter-spacing: -0.02em; line-height: 1.1;"
        >
          {content.h1}
        </h1>

        <p class="text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed">
          {content.intro}
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <Button variant="gradient" href={registerHref}>{t('ابدأ التصميم مجاناً', 'Start designing free')}</Button>
          {#if templatesHref}
            <Button variant="ghost" href={localizeHref(templatesHref)}>{t('تصفح القوالب ←', 'Browse templates →')}</Button>
          {/if}
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-xs font-medium text-[var(--color-muted)]">{t('أو حمّل التطبيق على جوالك', 'Or download the app on your phone')}</span>
          <AppStoreButtons size="sm" />
        </div>

        {#if sizeLabel}
          <p class="text-xs text-[var(--color-muted)]">
            {t('المقاس الموصى به', 'Recommended size')}: <span class="font-medium text-[var(--color-ink-2)]">{sizeLabel}</span>
          </p>
        {/if}
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each content.bullets as b (b.title)}
        <div
          class="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          use:reveal
        >
          <h3 class="font-semibold text-[var(--color-ink)] mb-1.5">{b.title}</h3>
          <p class="text-sm text-[var(--color-ink-2)] leading-relaxed">{b.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Steps -->
  <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
    <h2
      class="text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-8"
      style="font-family: var(--font-display); letter-spacing: -0.01em;"
    >
      {t('كيف تصمم في 3 خطوات', 'How it works — 3 steps')}
    </h2>
    <ol class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each content.steps as step, i (step.title)}
        <li
          class="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          use:reveal
        >
          <div
            class="w-8 h-8 rounded-[999px] flex items-center justify-center text-white text-sm font-bold mb-3"
            style="background: var(--brand-gradient);"
          >
            {i + 1}
          </div>
          <h3 class="font-semibold text-[var(--color-ink)] mb-1.5">{step.title}</h3>
          <p class="text-sm text-[var(--color-ink-2)] leading-relaxed">{step.desc}</p>
        </li>
      {/each}
    </ol>
  </section>

  <!-- Pricing (web + app) -->
  <PricingSummary />

  <!-- FAQ -->
  {#if content.faq.length}
    <section class="max-w-3xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      <h2
        class="text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-6"
        style="font-family: var(--font-display); letter-spacing: -0.01em;"
      >
        {t('الأسئلة الشائعة', 'Frequently asked')}
      </h2>
      <div class="flex flex-col gap-3">
        {#each content.faq as item (item.q)}
          <details
            class="group rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
          >
            <summary class="font-medium text-[var(--color-ink)] list-none flex items-center justify-between gap-3">
              {item.q}
              <span class="text-[var(--color-muted)] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p class="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{item.a}</p>
          </details>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Final CTA -->
  <section class="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
    <div
      class="rounded-[var(--radius-xl)] p-8 sm:p-12 text-center text-white"
      style="background: var(--brand-gradient);"
    >
      <h2 class="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold mb-3" style="font-family: var(--font-display);">
        {t('جاهز تبدأ التصميم؟', 'Ready to start designing?')}
      </h2>
      <p class="text-white/90 mb-6 max-w-[46ch] mx-auto">
        {t('مجاناً للبدء، قوالب بلا حدود، بدون بطاقة ائتمان.', 'Free to start, unlimited templates, no credit card.')}
      </p>
      <div class="flex flex-col items-center gap-4">
        <a
          href={registerHref}
          class="inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-md)] bg-white text-[var(--color-ink)] font-semibold hover:opacity-95"
        >
          {t('ابدأ على الويب', 'Start on the web')}
        </a>
        <AppStoreButtons variant="light" class="justify-center" />
      </div>
    </div>
  </section>
</article>
