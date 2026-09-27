<script lang="ts">
  import { m, getLocale } from '$lib/i18n';
  import ProBadge from '$lib/components/pro-badge.svelte';
  import EmptyState from '$lib/components/empty-state.svelte';
  import Button from '$lib/components/button.svelte';
  import { relativeTime } from '$lib/format';
  import { Sparkles, Scissors, Plus } from 'lucide-svelte';

  const { data } = $props();
  const locale = $derived(getLocale());
  const isAr = $derived(locale === 'ar');

  const fallbackGradients = [
    'linear-gradient(135deg, #2de2e6, #5b8def)',
    'linear-gradient(135deg, #6b4eff, #8b5cf6)',
    'linear-gradient(135deg, #5b8def, #8b5cf6)',
    'linear-gradient(135deg, #2de2e6, #8b5cf6)',
    'linear-gradient(135deg, #6b4eff, #2de2e6)',
    'linear-gradient(135deg, #8b5cf6, #2de2e6)'
  ];
  function gradientFor(id: string): string {
    let h = 0;
    for (let j = 0; j < id.length; j++) h = (h * 31 + id.charCodeAt(j)) | 0;
    return fallbackGradients[Math.abs(h) % fallbackGradients.length];
  }

  function occasionTitle(id: string): string {
    switch (id) {
      case 'ramadan':
        return m.occ_ramadan();
      case 'eid_fitr':
        return m.occ_eid_fitr();
      case 'eid_adha':
        return m.occ_eid_adha();
      case 'national_day':
        return m.occ_national_day();
      case 'foundation_day':
        return m.occ_foundation_day();
      case 'new_year':
        return m.occ_new_year();
      case 'hijri_new_year':
        return m.occ_hijri_new_year();
      default:
        return '';
    }
  }
</script>

<div class="relative isolate overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-12">
  <div class="bg-hero-mesh absolute inset-0 -z-10 opacity-80" aria-hidden="true"></div>

  <div class="max-w-6xl mx-auto flex flex-col gap-12">
    <header class="flex items-end justify-between gap-4 flex-wrap pt-4">
      <div class="flex flex-col gap-2">
        <span
          class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
          style="font-family: var(--font-mono);"
        >
          <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
          {new Intl.DateTimeFormat(isAr ? 'ar-SA' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}
        </span>
        <h1
          class="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.1]"
          style="font-family: var(--font-display); letter-spacing: -0.015em;"
        >
          {m.page_home_title()}
        </h1>
      </div>
    </header>

    <section class="flex flex-col gap-4">
      <h2
        class="text-xl font-bold"
        style="font-family: var(--font-display); letter-spacing: -0.01em;"
      >
        {m.home_start_new()}
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {#each data.canvasSizes as size (size.id)}
          {@const sizeGradients: Record<string, string> = {
            square: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
            story: 'linear-gradient(135deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)',
            fb_post: 'linear-gradient(135deg, #0866ff 0%, #1877f2 100%)',
            x_post: 'linear-gradient(135deg, #000000 0%, #2f2f2f 100%)',
            yt_thumb: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
            pin: 'linear-gradient(135deg, #e60023 0%, #bd081c 100%)',
            li_post: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)'
          }}
          {@const defaultGradient = 'linear-gradient(135deg, #6b4eff, #2de2e6)'}
          <a
            href="/editor/new?size={size.id}"
            class="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] p-4 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 transition-all flex flex-col gap-3"
          >
            <div
              class="w-full aspect-[4/3] rounded-[10px] flex items-center justify-center overflow-hidden"
              style="background: var(--brand-gradient-soft);"
            >
              <div
                class="rounded-[6px] shadow-[var(--shadow-1)] transition-transform group-hover:scale-105"
                style="background: {sizeGradients[size.id] ?? defaultGradient}; width: {Math.min(70, (size.width / size.height) * 50)}%; aspect-ratio: {size.width} / {size.height}; max-height: 72%;"
              ></div>
            </div>
            <div class="flex items-center justify-between gap-2">
              <span class="text-sm font-medium truncate">{isAr ? size.nameAr : size.nameEn}</span>
              <span class="text-[10px] tracking-wider text-[var(--color-muted)]" style="font-family: var(--font-mono);">{size.width}×{size.height}</span>
            </div>
          </a>
        {/each}
      </div>
    </section>
  </div>
</div>

<div class="max-w-6xl mx-auto flex flex-col gap-12 pt-4">

  {#if data.occasion}
    <section>
      <div
        class="on-soft rounded-[14px] p-5 sm:p-8 flex items-center justify-between gap-4 flex-wrap border border-[var(--color-border)]"
        style="background: var(--brand-gradient-soft);"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-[999px] flex items-center justify-center text-white"
            style="background: var(--brand-gradient);"
          >
            <Sparkles size={22} />
          </div>
          <div>
            <h3 class="text-xl font-bold">{occasionTitle(data.occasion.id)}</h3>
            <p class="text-sm">{m.home_occasion_cta()}</p>
          </div>
        </div>
        <Button variant="gradient" href="/templates?occasion={data.occasion.category}">
          {m.home_occasion_cta()}
        </Button>
      </div>
    </section>
  {/if}

  {#each data.sections as section (section.id)}
    <section class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <h2
        class="text-xl font-bold"
        style="font-family: var(--font-display); letter-spacing: -0.01em;"
      >
        {isAr ? section.titleAr : section.titleEn}
      </h2>
        <a
          href="/templates?section={section.section}"
          class="text-sm text-[var(--color-accent)] hover:underline"
        >
          {m.home_see_all()}
        </a>
      </div>
      <div class="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x scroll-rail">
        {#each section.templates as tpl (tpl.id)}
          <a
            href="/editor/new?templateId={tpl.id}"
            class="group flex-none w-40 snap-start bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] overflow-hidden hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 transition-all"
          >
            <div class="relative w-full aspect-[3/4]" style={tpl.thumbnailUrl ? '' : `background: ${gradientFor(tpl.id)};`}>
              {#if tpl.thumbnailUrl}
                <img
                  src={tpl.thumbnailUrl}
                  alt={isAr ? tpl.nameAr : tpl.nameEn}
                  loading="lazy"
                  class="w-full h-full object-cover"
                />
              {/if}
              {#if tpl.isPremium}
                <div class="absolute top-2 end-2"><ProBadge /></div>
              {/if}
            </div>
            <div class="p-2.5 text-sm font-medium truncate">{isAr ? tpl.nameAr : tpl.nameEn}</div>
          </a>
        {/each}
      </div>
    </section>
  {/each}

  <section class="flex flex-col gap-3">
    <h2
      class="text-xl font-bold"
      style="font-family: var(--font-display); letter-spacing: -0.01em;"
    >
      {m.home_tools()}
    </h2>
    <a
      href="/tools/bg-remove"
      class="group relative block rounded-[14px] p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 transition-all overflow-hidden"
      style="background: var(--brand-gradient-soft);"
    >
      <div class="flex items-center gap-4">
        <div
          class="w-14 h-14 rounded-[12px] flex items-center justify-center text-white flex-none shadow-[var(--shadow-1)]"
          style="background: var(--brand-gradient);"
        >
          <Scissors size={24} />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-base">{m.home_tool_bg_remove()}</div>
          <div class="text-sm text-[var(--color-ink-2)]">{m.home_tool_bg_remove_desc()}</div>
        </div>
        <span class="text-[var(--color-accent)] text-lg opacity-0 group-hover:opacity-100 transition-opacity">{isAr ? '←' : '→'}</span>
      </div>
    </a>
  </section>

  <section class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <h2
        class="text-xl font-bold"
        style="font-family: var(--font-display); letter-spacing: -0.01em;"
      >
        {m.home_recent()}
      </h2>
      {#if data.recent.length > 0}
        <a href="/projects" class="text-sm text-[var(--color-accent)] hover:underline">
          {m.home_see_all()}
        </a>
      {/if}
    </div>
    {#if data.recent.length === 0}
      <EmptyState title={m.home_empty_title()} description={m.home_empty_desc()}>
        {#snippet icon()}
          <Plus size={28} strokeWidth={2.2} />
        {/snippet}
        {#snippet action()}
          <Button variant="gradient" href="/editor/new?size=square">{m.home_empty_cta()}</Button>
        {/snippet}
      </EmptyState>
    {:else}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {#each data.recent as p (p.id)}
          <a
            href="/editor/{p.id}"
            class="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] overflow-hidden hover:border-[var(--color-accent)] transition-colors"
          >
            <div class="w-full aspect-[4/3] bg-[var(--color-surface-2)]">
              {#if p.thumbnailUrl}
                <img src={p.thumbnailUrl} alt={p.name} class="w-full h-full object-cover" loading="lazy" />
              {/if}
            </div>
            <div class="p-3">
              <div class="text-sm font-medium truncate">{p.name}</div>
              <div class="text-xs text-[var(--color-muted)]">{relativeTime(p.updatedAt)}</div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </section>
</div>
