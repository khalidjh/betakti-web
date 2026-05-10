<script lang="ts">
  import { m } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import ProBadge from '$lib/components/pro-badge.svelte';
  import TemplateCard from '$lib/components/template-card.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const tpl = $derived(data.template);

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

  const useHref = $derived(`/editor/new?templateId=${tpl.id}`);

  const jsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: tpl.nameAr,
    alternateName: tpl.nameEn,
    image: tpl.thumbnailUrl ?? 'https://betakti.app/brand/logo.png',
    inLanguage: 'ar',
    creator: { '@type': 'Organization', name: 'Betakti' }
  });
</script>

<svelte:head>
  <title>{tpl.nameAr} · Betakti</title>
  <meta name="description" content="{tpl.nameAr} — {tpl.nameEn}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{tpl.nameAr} · Betakti" />
  <meta property="og:description" content={tpl.nameEn} />
  <meta property="og:image" content={tpl.thumbnailUrl ?? '/brand/logo.png'} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={tpl.thumbnailUrl ?? '/brand/logo.png'} />
  {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<` + `/script>`}
</svelte:head>

<section class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
  <nav class="text-sm text-[var(--color-muted)] mb-6 flex items-center gap-2">
    <a href="/templates" class="hover:text-[var(--color-ink)]">{m.page_templates_title()}</a>
    <span>/</span>
    <span class="text-[var(--color-ink-2)]">{tpl.nameAr}</span>
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

  {#if data.related.length > 0}
    <section class="mt-16">
      <h2 class="text-xl font-semibold mb-4">{m.tpl_related()}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {#each data.related as r (r.id)}
          <TemplateCard template={r} />
        {/each}
      </div>
    </section>
  {/if}
</section>
