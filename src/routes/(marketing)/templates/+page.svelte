<script lang="ts">
  import { m, localizeHref, getLocale } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import TemplateCard from '$lib/components/template-card.svelte';
  import CategoryChip from '$lib/components/category-chip.svelte';
  import EmptyState from '$lib/components/empty-state.svelte';
  import Button from '$lib/components/button.svelte';
  import { TEMPLATE_CATEGORIES, type TemplateCategory } from '$lib/data/templates';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();

  function catLabel(cat: TemplateCategory | 'all'): string {
    if (cat === 'all') return m.tpl_cat_all();
    if (cat === 'quotes') return m.tpl_cat_quotes();
    if (cat === 'announcements') return m.tpl_cat_announcements();
    if (cat === 'sales') return m.tpl_cat_sales();
    if (cat === 'events') return m.tpl_cat_events();
    if (cat === 'social') return m.tpl_cat_social();
    if (cat === 'ramadan') return m.tpl_cat_ramadan();
    if (cat === 'eid') return m.tpl_cat_eid();
    if (cat === 'whatsappStatus') return m.tpl_cat_whatsappStatus();
    if (cat === 'graduation') return m.tpl_cat_graduation();
    if (cat === 'wedding') return m.tpl_cat_wedding();
    return m.tpl_cat_nationalDay();
  }

  const active = $derived(data.category ?? 'all');
</script>

<Seo
  title={m.page_templates_title()}
  description={m.marketing_templates_heading()}
  path="/templates"
/>

<section class="relative isolate overflow-hidden">
  <div class="bg-hero-mesh absolute inset-x-0 top-0 h-[420px] -z-10 opacity-90" aria-hidden="true"></div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
    <header class="flex flex-col gap-3">
      <span
        class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
        style="font-family: var(--font-mono);"
      >
        <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
        {data.templates.length}+ {catLabel(active).toLowerCase()}
      </span>
      <h1
        class="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05]"
        style="font-family: var(--font-display); letter-spacing: -0.02em;"
      >
        {m.page_templates_title()}
      </h1>
      <p class="text-lg text-[var(--color-ink-2)] max-w-[52ch] leading-relaxed">
        {m.marketing_templates_heading()}
      </p>
    </header>
  </div>
</section>

<section class="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
  <nav
    class="sticky top-[57px] z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-8 flex gap-2 overflow-x-auto scroll-rail"
    style="background: color-mix(in srgb, var(--color-paper) 88%, transparent); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);"
    aria-label="Categories"
  >
    <CategoryChip label={catLabel('all')} href={localizeHref('/templates')} active={active === 'all'} />
    {#each TEMPLATE_CATEGORIES as cat (cat)}
      <CategoryChip
        label={catLabel(cat)}
        href={localizeHref(`/templates?category=${cat}`)}
        active={active === cat}
      />
    {/each}
  </nav>

  {#if data.templates.length > 0}
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each data.templates as tpl (tpl.id)}
        <TemplateCard template={tpl} locale={getLocale() as 'ar' | 'en'} />
      {/each}
    </div>
  {:else}
    <EmptyState title={m.tpl_empty_title()} description={m.tpl_empty_desc()}>
      {#snippet action()}
        <Button variant="gradient" href={localizeHref('/templates')}>{m.tpl_empty_cta()}</Button>
      {/snippet}
    </EmptyState>
  {/if}
</section>
