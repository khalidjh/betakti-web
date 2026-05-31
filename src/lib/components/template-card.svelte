<script lang="ts">
  import type { DynamicTemplate } from '$lib/data/templates';
  import ProBadge from '$lib/components/pro-badge.svelte';
  import { m, localizeHref } from '$lib/i18n';

  interface Props {
    template: DynamicTemplate;
    locale?: 'ar' | 'en';
    href?: string;
  }
  const { template, locale = 'ar', href }: Props = $props();
  const name = $derived(locale === 'ar' ? template.nameAr : template.nameEn);
  const link = $derived(localizeHref(href ?? `/templates/${template.id}`));
  const aspect = $derived(`${template.canvasSize.width} / ${template.canvasSize.height}`);

  // Fallback preview: build a flat CSS preview from background when no thumbnailUrl.
  const bgStyle = $derived.by(() => {
    const bg = template.background;
    if (!bg) return 'background: var(--color-surface-2);';
    if (bg.type === 'color') return `background:${bg.color};`;
    if (bg.type === 'gradient') {
      const stops = bg.stops.map((s) => `${s.color} ${Math.round(s.offset * 100)}%`).join(', ');
      return `background: linear-gradient(${bg.angle}deg, ${stops});`;
    }
    if (bg.type === 'image') return `background:#0b0d17 url(${bg.src}) center/cover;`;
    return 'background: var(--color-surface-2);';
  });
</script>

<a
  href={link}
  class="group relative block overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-1)] transition-all duration-[var(--duration-standard)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5"
>
  <div class="relative w-full overflow-hidden" style="aspect-ratio: {aspect};">
    {#if template.thumbnailUrl}
      <img
        src={template.thumbnailUrl}
        alt={name}
        loading="lazy"
        class="w-full h-full object-cover"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center" style={bgStyle}>
        <span class="text-sm text-white/80 font-semibold px-3 text-center drop-shadow">{name}</span>
      </div>
    {/if}

    {#if template.isPremium}
      <div class="absolute top-2 end-2">
        <ProBadge size="sm" />
      </div>
    {/if}

    <div
      class="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-standard)] ease-[var(--ease-out)] bg-gradient-to-t from-black/50 via-transparent to-transparent"
    >
      <span
        class="px-3 py-1.5 rounded-[999px] text-xs font-semibold text-white shadow-[var(--shadow-1)]"
        style="background: var(--brand-gradient);"
      >
        {m.tpl_use()}
      </span>
    </div>
  </div>

  <div class="px-3 py-2 text-sm font-medium text-[var(--color-ink)] truncate">{name}</div>
</a>
