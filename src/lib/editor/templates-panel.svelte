<script lang="ts">
  import { onMount } from 'svelte';
  import { getEditor } from './editor.svelte';
  import { toasts } from '$lib/components/toast.svelte';
  import type { CanvasBackground, CanvasElement, CanvasSize } from './types';

  interface TemplateRow {
    id: string;
    nameAr: string;
    nameEn: string;
    category: string;
    isPremium: boolean;
    canvasSize: CanvasSize;
    preview: string | null;
  }

  interface Props {
    /** Pro users skip the premium lock. */
    isPro: boolean;
    /** Raised when a premium template lands on a non-Pro canvas. */
    onPremiumApplied?: () => void;
    onApplied?: () => void;
    locale?: 'ar' | 'en';
  }

  const { isPro, onPremiumApplied, onApplied, locale = 'ar' }: Props = $props();
  const editor = getEditor();

  // Module-level would leak between editor sessions in the same tab; component
  // level is enough, since the panel outlives every open/close of the sheet.
  let rows = $state<TemplateRow[] | null>(null);
  let loadError = $state(false);
  let applyingId = $state<string | null>(null);
  let category = $state<string>('all');

  const categories = $derived(
    rows ? ['all', ...Array.from(new Set(rows.map((r) => r.category))).sort()] : ['all']
  );
  const visible = $derived(
    rows ? (category === 'all' ? rows : rows.filter((r) => r.category === category)) : []
  );

  function name(r: TemplateRow): string {
    return locale === 'en' ? r.nameEn || r.nameAr : r.nameAr || r.nameEn;
  }

  // The sheet only mounts this component when it opens, so mounting *is* the
  // lazy-load trigger — the catalogue never costs anything on editor boot.
  onMount(load);

  async function load(): Promise<void> {
    if (rows) return;
    try {
      const res = await fetch('/api/templates');
      if (!res.ok) throw new Error(String(res.status));
      const body = (await res.json()) as { templates: TemplateRow[] };
      rows = body.templates;
      loadError = false;
    } catch {
      loadError = true;
    }
  }

  async function apply(r: TemplateRow): Promise<void> {
    if (applyingId) return;
    applyingId = r.id;
    try {
      const res = await fetch(`/api/templates/${r.id}`);
      if (!res.ok) throw new Error(String(res.status));
      const tpl = (await res.json()) as {
        name: string;
        isPremium: boolean;
        canvasSize: CanvasSize;
        background: CanvasBackground;
        elements: CanvasElement[];
      };
      editor.applyTemplate(tpl);
      if (tpl.isPremium && !isPro) onPremiumApplied?.();
      onApplied?.();
    } catch {
      toasts.push(locale === 'en' ? 'Could not open that template' : 'تعذّر فتح القالب', 'error');
    } finally {
      applyingId = null;
    }
  }
</script>

<div class="flex flex-col h-full min-h-0">
  {#if rows && rows.length > 1}
    <div class="flex gap-1.5 px-3 py-2.5 overflow-x-auto scroll-rail flex-none border-b border-[var(--color-border)]">
      {#each categories as c (c)}
        <button
          class="px-2.5 py-1 rounded-full text-xs whitespace-nowrap border transition-colors {category ===
          c
            ? 'bg-[var(--color-accent)] text-white border-transparent'
            : 'border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
          onclick={() => (category = c)}
        >
          {c === 'all' ? (locale === 'en' ? 'All' : 'الكل') : c}
        </button>
      {/each}
    </div>
  {/if}

  <div class="flex-1 min-h-0 overflow-y-auto p-3">
    {#if loadError}
      <p class="text-sm text-[var(--color-muted)] py-6 text-center">
        {locale === 'en' ? 'Templates are unavailable right now.' : 'القوالب غير متاحة حالياً.'}
      </p>
    {:else if !rows}
      <!-- Skeleton tiles: the grid keeps its shape while the catalogue loads. -->
      <div class="grid grid-cols-2 gap-2.5">
        {#each Array(6) as _, i (i)}
          <div class="aspect-square rounded-[10px] bg-[var(--color-surface-2)] animate-pulse"></div>
        {/each}
      </div>
    {:else}
      <div class="grid grid-cols-2 gap-2.5">
        {#each visible as r (r.id)}
          <button
            class="group relative rounded-[10px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-2)] text-start hover:border-[var(--color-accent)] transition-colors disabled:opacity-60"
            style="aspect-ratio: {r.canvasSize.width} / {r.canvasSize.height};"
            disabled={applyingId !== null}
            onclick={() => apply(r)}
            title={name(r)}
          >
            {#if r.preview}
              <img
                src={r.preview}
                alt={name(r)}
                loading="lazy"
                class="w-full h-full object-cover"
              />
            {:else}
              <span class="absolute inset-0 grid place-items-center text-[11px] text-[var(--color-muted)] px-2 text-center">
                {name(r)}
              </span>
            {/if}

            {#if r.isPremium && !isPro}
              <span
                class="absolute top-1.5 end-1.5 rounded-full bg-black/65 text-white text-[10px] px-1.5 py-0.5 leading-none"
              >
                PRO
              </span>
            {/if}

            {#if applyingId === r.id}
              <span class="absolute inset-0 bg-black/40 grid place-items-center text-white text-xs">
                {locale === 'en' ? 'Opening…' : 'جارٍ الفتح…'}
              </span>
            {/if}
          </button>
        {/each}
      </div>

      {#if visible.length === 0}
        <p class="text-sm text-[var(--color-muted)] py-6 text-center">
          {locale === 'en' ? 'Nothing in this category yet.' : 'لا توجد قوالب في هذا التصنيف.'}
        </p>
      {/if}
    {/if}
  </div>
</div>
