<script lang="ts">
  import { m, getLocale, t, localizeHref } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import ProBadge from '$lib/components/pro-badge.svelte';
  import TemplateCard from '$lib/components/template-card.svelte';
  import Seo from '$lib/components/seo.svelte';
  import { SITE_URL } from '$lib/seo/config';
  import { breadcrumbList, faqPage } from '$lib/seo/schema';
  import { templateContent } from '$lib/seo/template-content';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const tpl = $derived(data.template);
  const locale = $derived(getLocale() as 'ar' | 'en');
  const tplName = $derived(locale === 'en' ? tpl.nameEn : tpl.nameAr);
  const content = $derived(templateContent(tpl, locale));

  const aspect = $derived(`${tpl.canvasSize.width} / ${tpl.canvasSize.height}`);

  const bgStyle = $derived.by(() => {
    const bg = tpl.background;
    if (!bg) return 'background: var(--color-surface-2);';
    if (bg.type === 'color') return `background:${bg.color};`;
    if (bg.type === 'gradient') {
      const stops = bg.stops.map((s) => `${s.color} ${Math.round(s.offset * 100)}%`).join(', ');
      return `background: linear-gradient(${bg.angle}deg, ${stops});`;
    }
    if (bg.type === 'image') return `background:#0b0d17 url(${bg.src}) center/cover;`;
    return 'background: var(--color-surface-2);';
  });

  const useHref = $derived(localizeHref(`/editor/new?templateId=${tpl.id}`));

  const jsonLd = $derived([
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: tpl.nameAr,
      alternateName: tpl.nameEn,
      description: content.description,
      image: tpl.thumbnailUrl ?? `${SITE_URL}/brand/logo.png`,
      inLanguage: locale,
      creator: { '@type': 'Organization', name: 'Betakti' }
    },
    breadcrumbList([
      { name: t('الرئيسية', 'Home'), url: SITE_URL + localizeHref('/') },
      { name: m.page_templates_title(), url: SITE_URL + localizeHref('/templates') },
      { name: tplName, url: SITE_URL + localizeHref(`/templates/${tpl.id}`) }
    ]),
    faqPage(content.faq)
  ]);
</script>

<Seo
  title={tplName}
  description={content.metaDescription}
  path={`/templates/${tpl.id}`}
  type="article"
  image={tpl.thumbnailUrl ?? '/brand/logo.png'}
  {jsonLd}
/>

<section class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
  <nav class="text-sm text-[var(--color-muted)] mb-6 flex items-center gap-2">
    <a href={localizeHref('/templates')} class="hover:text-[var(--color-ink)]">{m.page_templates_title()}</a>
    <span>/</span>
    <span class="text-[var(--color-ink-2)]">{tplName}</span>
  </nav>

  <div class="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8">
    <div
      class="rounded-[20px] overflow-hidden border border-[var(--color-border)] shadow-[var(--shadow-2)] bg-[var(--color-surface-2)] flex items-center justify-center"
    >
      {#if tpl.thumbnailUrl}
        <img
          src={tpl.thumbnailUrl}
          alt={tpl.nameAr}
          class="w-full h-auto"
          style="aspect-ratio: {aspect};"
        />
      {:else}
        <div class="w-full relative" style="aspect-ratio: {aspect}; {bgStyle}">
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center gap-2 px-6">
            <span
              class="text-3xl md:text-4xl font-bold text-white/90 drop-shadow"
              style="font-family: var(--font-display);"
            >
              {tpl.nameAr}
            </span>
            <span class="text-sm text-white/70">{tpl.nameEn}</span>
          </div>
        </div>
      {/if}
    </div>

    <aside class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span
            class="inline-flex items-center px-2.5 py-1 rounded-[999px] text-xs bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-ink-2)]"
          >
            {tpl.category}
          </span>
          {#if tpl.isPremium}
            <ProBadge size="md" />
          {/if}
        </div>
        <h1 class="text-3xl font-bold" style="font-family: var(--font-display);">{tpl.nameAr}</h1>
        <p class="text-[var(--color-muted)]">{tpl.nameEn}</p>
      </div>

      <p class="text-[var(--color-ink-2)] leading-relaxed">{content.description}</p>

      <ul class="flex flex-wrap gap-2">
        {#each content.tags as tag (tag)}
          <li
            class="inline-flex items-center px-2.5 py-1 rounded-[999px] text-xs bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-ink-2)]"
          >
            {tag}
          </li>
        {/each}
      </ul>

      <p class="text-xs text-[var(--color-muted)]">{content.layersLine}</p>

      <dl class="flex flex-col gap-2 text-sm">
        <div class="flex items-center justify-between border-t border-[var(--color-border)] pt-2">
          <dt class="text-[var(--color-muted)]">{m.tpl_canvas_size()}</dt>
          <dd class="text-[var(--color-ink)]">
            {tpl.canvasSize.nameAr} · {tpl.canvasSize.width}×{tpl.canvasSize.height}
          </dd>
        </div>
        <div class="flex items-center justify-between border-t border-[var(--color-border)] pt-2">
          <dt class="text-[var(--color-muted)]">{m.tpl_category()}</dt>
          <dd class="text-[var(--color-ink)]">{tpl.category}</dd>
        </div>
      </dl>

      {#if tpl.isPremium}
        <div
          class="on-soft rounded-[12px] px-4 py-3 text-xs"
          style="background: var(--brand-gradient-soft);"
        >
          {m.tpl_pro_only()}
        </div>
      {/if}

      <div class="flex flex-col gap-2">
        <Button variant="gradient" href={useHref}>{m.tpl_use()}</Button>
        <Button variant="secondary" href={useHref}>{m.tpl_remix()}</Button>
      </div>
    </aside>
  </div>

  {#if content.textOnDesign.length > 0}
    <section class="mt-16">
      <h2 class="text-xl font-semibold mb-4">{t('النص في هذا التصميم', 'Text on this design')}</h2>
      <ul class="flex flex-col gap-2">
        {#each content.textOnDesign as line (line)}
          <li
            class="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2.5 text-[var(--color-ink-2)]"
          >
            {line}
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  <section class="mt-16">
    <h2 class="text-xl font-semibold mb-4">{t('أسئلة شائعة', 'Frequently asked questions')}</h2>
    <div class="flex flex-col gap-3">
      {#each content.faq as item (item.q)}
        <details
          class="group rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3"
        >
          <summary
            class="flex items-center justify-between gap-3 font-medium text-[var(--color-ink)] list-none"
          >
            {item.q}
            <span class="text-[var(--color-muted)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-2 text-[var(--color-ink-2)] leading-relaxed">{item.a}</p>
        </details>
      {/each}
    </div>
  </section>

  {#if data.related.length > 0}
    <section class="mt-16">
      <h2 class="text-xl font-semibold mb-4">{m.tpl_related()}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {#each data.related as r (r.id)}
          <TemplateCard template={r} {locale} />
        {/each}
      </div>
    </section>
  {/if}
</section>
