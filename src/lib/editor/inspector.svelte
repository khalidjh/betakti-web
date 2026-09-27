<script lang="ts">
  import NumericInput from '$lib/components/numeric-input.svelte';
  import Tooltip from '$lib/components/tooltip.svelte';
  import {
    AlignStartVertical,
    AlignCenterVertical,
    AlignEndVertical,
    AlignStartHorizontal,
    AlignCenterHorizontal,
    AlignEndHorizontal,
    AlignHorizontalDistributeCenter,
    AlignVerticalDistributeCenter,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Bold,
    Italic,
    Underline,
    FlipHorizontal,
    FlipVertical,
    ChevronUp,
    ChevronDown,
    ArrowUpToLine,
    ArrowDownToLine,
    Mountain,
    Cloud,
    Waves,
    Trees,
    Building2,
    Layers,
    Sparkles,
    Square as SquareIcon,
    Feather,
    Zap,
    Sunset,
    Snowflake,
    Moon,
    Contrast,
    Upload,
    Loader2
  } from 'lucide-svelte';
  import { getEditor } from './editor.svelte';
  import type { CanvasElement, ImageElement, ShapeElement, StickerElement, TextElement } from './types';
  import { prepareImageFile, uploadAsset, type PreparedImage } from './assets';
  import { toasts } from '$lib/components/toast.svelte';
  import { auth } from '$lib/firebase/client';
  import { FONT_GROUPS } from './fonts';
  import {
    BACKGROUND_PRESETS,
    STOCK_IMAGES,
    previewCss,
    stockThumbUrl,
    stockFullUrl,
    type BackgroundPresetCategory,
    type StockImageCategory
  } from './stock-backgrounds';

  interface RemoteBackground {
    id: string;
    url: string;
    thumbnailUrl: string;
    category: string;
  }

  interface InspectorProps {
    stockBackgrounds?: RemoteBackground[];
  }
  const { stockBackgrounds = [] }: InspectorProps = $props();

  const editor = getEditor();
  let fontPickerOpen = $state(false);
  let bgTab = $state<'images' | 'colors'>('images');
  let bgUploadInput = $state<HTMLInputElement | null>(null);
  let bgLoadingSrc = $state<string | null>(null);

  async function selectBgImage(fullUrl: string): Promise<void> {
    bgLoadingSrc = fullUrl;
    try {
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('image load failed'));
        img.src = fullUrl;
      });
      editor.setBackground({ type: 'image', src: fullUrl, fit: 'cover' });
    } catch {
      // fall through — clear loading state regardless
    } finally {
      if (bgLoadingSrc === fullUrl) bgLoadingSrc = null;
    }
  }

  async function handleBgUpload(e: Event): Promise<void> {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    let prepared: PreparedImage;
    try {
      prepared = await prepareImageFile(file);
    } catch {
      toasts.push('تعذّر قراءة الصورة', 'error');
      return;
    }
    editor.setBackground({ type: 'image', src: prepared.previewSrc, fit: 'cover' });

    if (!auth.currentUser) return; // autosave sweeps it once they sign in
    try {
      const src = await uploadAsset(prepared.blob, prepared.ext);
      // Swap the reference underneath rather than through setBackground: the
      // image is unchanged, so this is neither a history step nor a reason to
      // clobber a background the user picked while the upload was in flight.
      const bg = editor.project.background;
      if (bg.type === 'image' && bg.src === prepared.previewSrc) bg.src = src;
    } catch {
      // Keep the inline copy — uploadInlineImages retries on the next save.
    }
  }

  const imageIcons: Record<StockImageCategory, typeof Mountain> = {
    Landscape: Mountain,
    Sky: Cloud,
    Sea: Waves,
    Forest: Trees,
    Urban: Building2,
    Texture: Layers,
    Abstract: Sparkles
  };
  const presetIcons: Record<BackgroundPresetCategory, typeof Mountain> = {
    Solid: SquareIcon,
    Soft: Feather,
    Vivid: Zap,
    Sunset: Sunset,
    Cool: Snowflake,
    Dark: Moon,
    Mono: Contrast
  };

  const selected = $derived<CanvasElement | null>(
    editor.selectedIds.length === 1 ? editor.getElement(editor.selectedIds[0]!) ?? null : null
  );
  const multiCount = $derived(editor.selectedIds.length);

  function patchSelected(patch: Partial<CanvasElement>, commit = true): void {
    if (!selected) return;
    editor.updateElement(selected.id, patch, commit);
  }
</script>

<div class="p-4 flex flex-col gap-5">
  <div
    class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]"
    style="font-family: var(--font-mono);"
  >
    Properties
  </div>

  {#if multiCount >= 2}
    <div class="flex flex-col gap-2">
      <span
        class="text-[10px] tracking-[0.14em] uppercase text-[var(--color-muted)]"
        style="font-family: var(--font-mono);"
      >
        Align · {multiCount} selected
      </span>
      <div class="grid grid-cols-6 gap-1 p-1 rounded-[10px] bg-[var(--color-surface-2)]">
        <Tooltip label="Align left">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" onclick={() => editor.alignSelected('left')} type="button">
            <AlignStartVertical size={14} strokeWidth={1.8} />
          </button>
        </Tooltip>
        <Tooltip label="Center horizontally">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" onclick={() => editor.alignSelected('centerX')} type="button">
            <AlignCenterVertical size={14} strokeWidth={1.8} />
          </button>
        </Tooltip>
        <Tooltip label="Align right">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" onclick={() => editor.alignSelected('right')} type="button">
            <AlignEndVertical size={14} strokeWidth={1.8} />
          </button>
        </Tooltip>
        <Tooltip label="Align top">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" onclick={() => editor.alignSelected('top')} type="button">
            <AlignStartHorizontal size={14} strokeWidth={1.8} />
          </button>
        </Tooltip>
        <Tooltip label="Center vertically">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" onclick={() => editor.alignSelected('centerY')} type="button">
            <AlignCenterHorizontal size={14} strokeWidth={1.8} />
          </button>
        </Tooltip>
        <Tooltip label="Align bottom">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" onclick={() => editor.alignSelected('bottom')} type="button">
            <AlignEndHorizontal size={14} strokeWidth={1.8} />
          </button>
        </Tooltip>
      </div>
      {#if multiCount >= 3}
        <div class="grid grid-cols-2 gap-1 p-1 rounded-[10px] bg-[var(--color-surface-2)]">
          <Tooltip label="Distribute horizontally">
            <button class="w-full h-8 flex items-center justify-center gap-1.5 text-xs rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" onclick={() => editor.distributeSelected('h')} type="button">
              <AlignHorizontalDistributeCenter size={14} strokeWidth={1.8} /> Horizontal
            </button>
          </Tooltip>
          <Tooltip label="Distribute vertically">
            <button class="w-full h-8 flex items-center justify-center gap-1.5 text-xs rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" onclick={() => editor.distributeSelected('v')} type="button">
              <AlignVerticalDistributeCenter size={14} strokeWidth={1.8} /> Vertical
            </button>
          </Tooltip>
        </div>
      {/if}
    </div>
  {:else if !selected}
    <div class="text-sm text-[var(--color-muted)] py-2">
      Select an element to edit it.
    </div>
    <div>
      <h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Canvas</h3>
      <div class="grid grid-cols-2 gap-2">
        <NumericInput
          label="W"
          suffix="px"
          value={editor.project.canvasSize.width}
          onChange={(v) => {
            editor.project.canvasSize = { ...editor.project.canvasSize, width: v };
            editor.commit();
          }}
        />
        <NumericInput
          label="H"
          suffix="px"
          value={editor.project.canvasSize.height}
          onChange={(v) => {
            editor.project.canvasSize = { ...editor.project.canvasSize, height: v };
            editor.commit();
          }}
        />
      </div>
    </div>

    {@const groupedPresets = (() => {
      const groups = new Map<BackgroundPresetCategory, typeof BACKGROUND_PRESETS>();
      for (const p of BACKGROUND_PRESETS) {
        const list = groups.get(p.category) ?? [];
        list.push(p);
        groups.set(p.category, list);
      }
      return [...groups.entries()];
    })()}
    {@const useRemote = stockBackgrounds.length > 0}
    {@const groupedRemote = (() => {
      if (!useRemote) return [] as [string, RemoteBackground[]][];
      const groups = new Map<string, RemoteBackground[]>();
      for (const im of stockBackgrounds) {
        const list = groups.get(im.category) ?? [];
        list.push(im);
        groups.set(im.category, list);
      }
      return [...groups.entries()];
    })()}
    {@const groupedImages = (() => {
      const groups = new Map<StockImageCategory, typeof STOCK_IMAGES>();
      for (const im of STOCK_IMAGES) {
        const list = groups.get(im.category) ?? [];
        list.push(im);
        groups.set(im.category, list);
      }
      return [...groups.entries()];
    })()}
    <div>
      <h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">
        Stock backgrounds
      </h3>
      <div class="grid grid-cols-2 gap-1 p-1 rounded-[10px] bg-[var(--color-surface-2)] mb-3">
        <button
          type="button"
          class="h-8 flex items-center justify-center gap-1.5 text-xs font-medium rounded-[6px] transition-colors {bgTab === 'images'
            ? 'bg-[var(--color-surface)] text-[var(--color-ink)]'
            : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
          onclick={() => (bgTab = 'images')}
          aria-pressed={bgTab === 'images'}
        >
          Images
        </button>
        <button
          type="button"
          class="h-8 flex items-center justify-center gap-1.5 text-xs font-medium rounded-[6px] transition-colors {bgTab === 'colors'
            ? 'bg-[var(--color-surface)] text-[var(--color-ink)]'
            : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
          onclick={() => (bgTab = 'colors')}
          aria-pressed={bgTab === 'colors'}
        >
          Colors
        </button>
      </div>

      {#if bgTab === 'images'}
        <div class="flex flex-col gap-3">
          <div>
            <input
              bind:this={bgUploadInput}
              type="file"
              accept="image/*"
              class="hidden"
              onchange={handleBgUpload}
            />
            <button
              type="button"
              class="w-full h-9 flex items-center justify-center gap-2 text-xs font-medium rounded-[8px] border border-dashed border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-ink-2)] transition-colors"
              onclick={() => bgUploadInput?.click()}
            >
              <Upload size={13} strokeWidth={2} />
              Upload from device
            </button>
          </div>
          {#if useRemote}
            {#each groupedRemote as [cat, imgs] (cat)}
              {@const RemoteCatIcon = imageIcons[cat as StockImageCategory] ?? Mountain}
              <div>
                <div class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5" style="font-family: var(--font-mono);">
                  <RemoteCatIcon size={11} strokeWidth={2} />
                  <span>{cat}</span>
                </div>
                <div class="grid grid-cols-3 gap-1.5">
                  {#each imgs as im (im.id)}
                    <button
                      type="button"
                      class="relative aspect-square w-full rounded-[8px] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-[1.04] transition-all shadow-[var(--shadow-1)] overflow-hidden bg-[var(--color-surface-2)] disabled:opacity-100 disabled:cursor-wait"
                      disabled={bgLoadingSrc !== null}
                      onclick={() => selectBgImage(im.url)}
                      aria-label={im.id}
                      aria-busy={bgLoadingSrc === im.url}
                    >
                      <img
                        src={im.thumbnailUrl}
                        alt=""
                        loading="lazy"
                        class="w-full h-full object-cover block"
                      />
                      {#if bgLoadingSrc === im.url}
                        <span class="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                          <Loader2 size={18} strokeWidth={2.2} class="animate-spin" />
                        </span>
                      {/if}
                    </button>
                  {/each}
                </div>
              </div>
            {/each}
          {:else}
          {#each groupedImages as [cat, imgs] (cat)}
            {@const ImageCatIcon = imageIcons[cat]}
            <div>
              <div class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5" style="font-family: var(--font-mono);">
                <ImageCatIcon size={11} strokeWidth={2} />
                <span>{cat}</span>
              </div>
              <div class="grid grid-cols-3 gap-1.5">
                {#each imgs as im (im.seed)}
                  {@const fullUrl = stockFullUrl(im.seed)}
                  <Tooltip label={im.seed}>
                    <button
                      type="button"
                      class="relative aspect-square w-full rounded-[8px] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-[1.04] transition-all shadow-[var(--shadow-1)] overflow-hidden bg-[var(--color-surface-2)] disabled:opacity-100 disabled:cursor-wait"
                      disabled={bgLoadingSrc !== null}
                      onclick={() => selectBgImage(fullUrl)}
                      aria-label={im.seed}
                      aria-busy={bgLoadingSrc === fullUrl}
                    >
                      <img
                        src={stockThumbUrl(im.seed)}
                        alt=""
                        loading="lazy"
                        class="w-full h-full object-cover block"
                      />
                      {#if bgLoadingSrc === fullUrl}
                        <span class="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                          <Loader2 size={18} strokeWidth={2.2} class="animate-spin" />
                        </span>
                      {/if}
                    </button>
                  </Tooltip>
                {/each}
              </div>
            </div>
          {/each}
          {/if}
        </div>
      {:else}
        <div class="flex flex-col gap-3">
          <div>
            <div class="text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5" style="font-family: var(--font-mono);">
              Custom
            </div>
            <input
              type="color"
              class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"
              value={editor.project.background.type === 'color' ? editor.project.background.color : '#ffffff'}
              oninput={(e) =>
                editor.setBackground({ type: 'color', color: (e.currentTarget as HTMLInputElement).value })}
            />
          </div>
          {#each groupedPresets as [cat, presets] (cat)}
            {@const PresetCatIcon = presetIcons[cat]}
            <div>
              <div class="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] mb-1.5" style="font-family: var(--font-mono);">
                <PresetCatIcon size={11} strokeWidth={2} />
                <span>{cat}</span>
              </div>
              <div class="grid grid-cols-4 gap-1.5">
                {#each presets as p (p.id)}
                  <Tooltip label={p.id.split('-').slice(1).join(' ')}>
                    <button
                      type="button"
                      class="aspect-square w-full rounded-[8px] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-[1.04] transition-all shadow-[var(--shadow-1)]"
                      style:background={previewCss(p.background)}
                      onclick={() => editor.setBackground(p.background)}
                      aria-label={p.id}
                    ></button>
                  </Tooltip>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else}
    <div>
      <h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Transform</h3>
      <div class="grid grid-cols-2 gap-2">
        <NumericInput label="X" suffix="px" value={selected.x} onChange={(v) => patchSelected({ x: v })} />
        <NumericInput label="Y" suffix="px" value={selected.y} onChange={(v) => patchSelected({ y: v })} />
        <NumericInput label="W" suffix="px" value={selected.width} onChange={(v) => patchSelected({ width: v })} />
        <NumericInput label="H" suffix="px" value={selected.height} onChange={(v) => patchSelected({ height: v })} />
        <NumericInput
          label="R"
          suffix="°"
          value={(selected.rotation * 180) / Math.PI}
          onChange={(v) => patchSelected({ rotation: (v * Math.PI) / 180 })}
        />
      </div>
    </div>

    {#if selected.type === 'text'}
      {@const t = selected as TextElement}
      <div>
        <h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Text</h3>
        <textarea
          class="w-full text-sm p-2 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] mb-2 resize-none"
          rows="3"
          value={t.text}
          oninput={(e) => patchSelected({ text: (e.currentTarget as HTMLTextAreaElement).value } as Partial<TextElement>)}
        ></textarea>
        <div class="relative mb-2">
          <button
            type="button"
            class="w-full flex items-center justify-between gap-2 text-sm px-2 py-1.5 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] text-left"
            onclick={() => (fontPickerOpen = !fontPickerOpen)}
          >
            <span class="truncate" style:font-family={t.fontFamily}>{t.text || t.fontFamily}</span>
            <span class="text-xs text-[var(--color-muted)] shrink-0">{t.fontFamily}</span>
          </button>
          {#if fontPickerOpen}
            <div
              class="absolute z-30 right-0 left-0 mt-1 max-h-72 overflow-y-auto rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg"
            >
              {#each FONT_GROUPS as group (group.label)}
                <div class="sticky top-0 bg-[var(--color-surface-2)] px-2 py-1 text-[10px] uppercase tracking-wide text-[var(--color-muted)]">
                  {group.label}
                </div>
                {#each group.fonts as f (f)}
                  <button
                    type="button"
                    class="w-full flex items-center justify-between gap-2 text-left px-2 py-1.5 hover:bg-[var(--color-surface-2)] {t.fontFamily === f ? 'bg-[var(--color-surface-2)]' : ''}"
                    onclick={() => {
                      patchSelected({ fontFamily: f } as Partial<TextElement>);
                      fontPickerOpen = false;
                    }}
                  >
                    <span class="truncate text-base" style:font-family={f}>{t.text || f}</span>
                    <span class="shrink-0 text-[10px] font-light text-[var(--color-muted)]">{f}</span>
                  </button>
                {/each}
              {/each}
            </div>
          {/if}
        </div>
        <div class="grid grid-cols-2 gap-2 mb-2">
          <NumericInput label="Sz" suffix="px" value={t.fontSize} onChange={(v) => patchSelected({ fontSize: v } as Partial<TextElement>)} />
          <NumericInput label="Lh" value={t.lineHeight} step={0.05} onChange={(v) => patchSelected({ lineHeight: v } as Partial<TextElement>)} />
        </div>
        <label class="block mb-3">
          <input
            type="range"
            min="8"
            max="800"
            step="1"
            value={t.fontSize}
            class="w-full accent-[var(--color-accent)]"
            oninput={(e) =>
              patchSelected({ fontSize: parseInt((e.currentTarget as HTMLInputElement).value, 10) } as Partial<TextElement>, false)}
            onchange={() => editor.commit()}
            aria-label="Font size"
          />
        </label>
        <div class="grid grid-cols-3 gap-1 p-1 rounded-[8px] bg-[var(--color-surface-2)] mb-2">
          <Tooltip label="Bold (Ctrl+B)">
            <button
              class="w-full h-7 flex items-center justify-center rounded-[6px] {t.isBold ? 'bg-[var(--color-surface)] text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]'}"
              type="button"
              onclick={() => patchSelected({ isBold: !t.isBold } as Partial<TextElement>)}
              aria-label="Bold"
            >
              <Bold size={13} strokeWidth={2.2} />
            </button>
          </Tooltip>
          <Tooltip label="Italic (Ctrl+I)">
            <button
              class="w-full h-7 flex items-center justify-center rounded-[6px] {t.isItalic ? 'bg-[var(--color-surface)] text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]'}"
              type="button"
              onclick={() => patchSelected({ isItalic: !t.isItalic } as Partial<TextElement>)}
              aria-label="Italic"
            >
              <Italic size={13} strokeWidth={2.2} />
            </button>
          </Tooltip>
          <Tooltip label="Underline (Ctrl+U)">
            <button
              class="w-full h-7 flex items-center justify-center rounded-[6px] {t.isUnderline ? 'bg-[var(--color-surface)] text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]'}"
              type="button"
              onclick={() => patchSelected({ isUnderline: !t.isUnderline } as Partial<TextElement>)}
              aria-label="Underline"
            >
              <Underline size={13} strokeWidth={2.2} />
            </button>
          </Tooltip>
        </div>
        <div class="grid grid-cols-3 gap-1 p-1 rounded-[8px] bg-[var(--color-surface-2)] mb-3">
          <Tooltip label="Align left">
            <button
              class="w-full h-7 flex items-center justify-center rounded-[6px] {t.textAlignment === 'left' ? 'bg-[var(--color-surface)] text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]'}"
              type="button"
              onclick={() => patchSelected({ textAlignment: 'left' } as Partial<TextElement>)}
              aria-label="Align left"
            >
              <AlignLeft size={13} strokeWidth={2} />
            </button>
          </Tooltip>
          <Tooltip label="Align center">
            <button
              class="w-full h-7 flex items-center justify-center rounded-[6px] {t.textAlignment === 'center' ? 'bg-[var(--color-surface)] text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]'}"
              type="button"
              onclick={() => patchSelected({ textAlignment: 'center' } as Partial<TextElement>)}
              aria-label="Align center"
            >
              <AlignCenter size={13} strokeWidth={2} />
            </button>
          </Tooltip>
          <Tooltip label="Align right">
            <button
              class="w-full h-7 flex items-center justify-center rounded-[6px] {t.textAlignment === 'right' ? 'bg-[var(--color-surface)] text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]'}"
              type="button"
              onclick={() => patchSelected({ textAlignment: 'right' } as Partial<TextElement>)}
              aria-label="Align right"
            >
              <AlignRight size={13} strokeWidth={2} />
            </button>
          </Tooltip>
        </div>
        <label class="block">
          <span class="text-xs text-[var(--color-muted)] block mb-1">Color</span>
          <input
            type="color"
            class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"
            value={t.color}
            oninput={(e) => patchSelected({ color: (e.currentTarget as HTMLInputElement).value } as Partial<TextElement>)}
          />
        </label>
      </div>
    {/if}

    {#if selected.type === 'shape'}
      {@const s = selected as ShapeElement}
      <div>
        <h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Shape</h3>
        <label class="block mb-2">
          <span class="text-xs text-[var(--color-muted)] block mb-1">Fill</span>
          <input
            type="color"
            class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"
            value={s.fillColor}
            oninput={(e) => patchSelected({ fillColor: (e.currentTarget as HTMLInputElement).value } as Partial<ShapeElement>)}
          />
        </label>
        <label class="block mb-2">
          <span class="text-xs text-[var(--color-muted)] block mb-1">Stroke</span>
          <input
            type="color"
            class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"
            value={s.strokeColor ?? '#000000'}
            oninput={(e) => patchSelected({ strokeColor: (e.currentTarget as HTMLInputElement).value } as Partial<ShapeElement>)}
          />
        </label>
        <div class="grid grid-cols-2 gap-2">
          <NumericInput label="Sw" suffix="px" value={s.strokeWidth} onChange={(v) => patchSelected({ strokeWidth: v } as Partial<ShapeElement>)} />
          {#if s.shapeType === 'rectangle'}
            <NumericInput label="Cr" suffix="px" value={s.cornerRadius} onChange={(v) => patchSelected({ cornerRadius: v } as Partial<ShapeElement>)} />
          {/if}
        </div>
      </div>
    {/if}

    {#if selected.type === 'sticker'}
      {@const st = selected as StickerElement}
      {#if st.stickerType === 'cursive' || st.stickerType === 'custom'}
        <div>
          <h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Sticker</h3>
          <label class="block">
            <span class="text-xs text-[var(--color-muted)] block mb-1">Color</span>
            <input
              type="color"
              class="w-full h-9 rounded-[8px] border border-[var(--color-border)] cursor-pointer"
              value={st.color ?? '#111111'}
              oninput={(e) => patchSelected({ color: (e.currentTarget as HTMLInputElement).value } as Partial<StickerElement>)}
            />
          </label>
        </div>
      {/if}
    {/if}

    {#if selected.type === 'image'}
      {@const im = selected as ImageElement}
      <div>
        <h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Image</h3>
        <div class="grid grid-cols-2 gap-2 mb-3 p-1 rounded-[8px] bg-[var(--color-surface-2)]">
          <Tooltip label="Flip horizontal">
            <button
              type="button"
              class="w-full h-7 flex items-center justify-center gap-1.5 rounded-[6px] text-xs {im.flipHorizontal ? 'bg-[var(--color-surface)] text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]'}"
              onclick={() => patchSelected({ flipHorizontal: !im.flipHorizontal } as Partial<ImageElement>)}
              aria-label="Flip horizontal"
            >
              <FlipHorizontal size={13} strokeWidth={1.8} /> H
            </button>
          </Tooltip>
          <Tooltip label="Flip vertical">
            <button
              type="button"
              class="w-full h-7 flex items-center justify-center gap-1.5 rounded-[6px] text-xs {im.flipVertical ? 'bg-[var(--color-surface)] text-[var(--color-accent)]' : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface)]'}"
              onclick={() => patchSelected({ flipVertical: !im.flipVertical } as Partial<ImageElement>)}
              aria-label="Flip vertical"
            >
              <FlipVertical size={13} strokeWidth={1.8} /> V
            </button>
          </Tooltip>
        </div>
        <label class="block mb-2 text-xs">
          <span class="text-[var(--color-muted)]">Brightness ({im.brightness.toFixed(2)})</span>
          <input type="range" min="-1" max="1" step="0.05" value={im.brightness} oninput={(e) => patchSelected({ brightness: parseFloat((e.currentTarget as HTMLInputElement).value) } as Partial<ImageElement>, false)} onchange={() => editor.commit()} class="w-full" />
        </label>
        <label class="block mb-2 text-xs">
          <span class="text-[var(--color-muted)]">Contrast ({im.contrast.toFixed(2)})</span>
          <input type="range" min="-1" max="1" step="0.05" value={im.contrast} oninput={(e) => patchSelected({ contrast: parseFloat((e.currentTarget as HTMLInputElement).value) } as Partial<ImageElement>, false)} onchange={() => editor.commit()} class="w-full" />
        </label>
        <label class="block mb-2 text-xs">
          <span class="text-[var(--color-muted)]">Saturation ({im.saturation.toFixed(2)})</span>
          <input type="range" min="-2" max="2" step="0.1" value={im.saturation} oninput={(e) => patchSelected({ saturation: parseFloat((e.currentTarget as HTMLInputElement).value) } as Partial<ImageElement>, false)} onchange={() => editor.commit()} class="w-full" />
        </label>
        <NumericInput label="Cr" suffix="px" value={im.cornerRadius} onChange={(v) => patchSelected({ cornerRadius: v } as Partial<ImageElement>)} />
      </div>
    {/if}

    <div>
      <h3 class="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2" style="font-family: var(--font-mono);">Order</h3>
      <div class="grid grid-cols-4 gap-1 p-1 rounded-[8px] bg-[var(--color-surface-2)]">
        <Tooltip label="Bring forward">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button" onclick={() => editor.bringForward(selected!.id)} aria-label="Bring forward">
            <ChevronUp size={14} strokeWidth={2} />
          </button>
        </Tooltip>
        <Tooltip label="Send backward">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button" onclick={() => editor.sendBackward(selected!.id)} aria-label="Send backward">
            <ChevronDown size={14} strokeWidth={2} />
          </button>
        </Tooltip>
        <Tooltip label="Bring to front">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button" onclick={() => editor.bringToFront(selected!.id)} aria-label="Bring to front">
            <ArrowUpToLine size={14} strokeWidth={2} />
          </button>
        </Tooltip>
        <Tooltip label="Send to back">
          <button class="w-full h-8 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface)] text-[var(--color-ink-2)]" type="button" onclick={() => editor.sendToBack(selected!.id)} aria-label="Send to back">
            <ArrowDownToLine size={14} strokeWidth={2} />
          </button>
        </Tooltip>
      </div>
    </div>
  {/if}
</div>
