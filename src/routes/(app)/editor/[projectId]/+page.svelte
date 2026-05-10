<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { replaceState } from '$app/navigation';
  import { m } from '$lib/i18n';
  import Logo from '$lib/brand/logo.svelte';
  import IconButton from '$lib/components/icon-button.svelte';
  import LocaleToggle from '$lib/components/locale-toggle.svelte';
  import {
    MousePointer2,
    Type,
    Square,
    Circle,
    Image as ImageIcon,
    Sparkles,
    Feather,
    Palette,
    Undo2,
    Redo2,
    CloudCheck,
    Share2,
    Maximize2,
    ChevronRight,
    Sun,
    Moon,
    Layers as LayersIcon,
    Sliders
  } from 'lucide-svelte';
  import Tooltip from '$lib/components/tooltip.svelte';
  import Sheet from '$lib/components/sheet.svelte';
  import Dialog from '$lib/components/dialog.svelte';
  import Segmented from '$lib/components/segmented.svelte';
  import ToastHost from '$lib/components/toast-host.svelte';
  import { toasts } from '$lib/components/toast.svelte';
  import Stage from '$lib/editor/stage.svelte';
  import Inspector from '$lib/editor/inspector.svelte';
  import CursivePicker from '$lib/editor/cursive-picker.svelte';
  import { ensureCursiveFontLoaded, type CursiveFont } from '$lib/editor/cursive-fonts';
  import {
    createEditor,
    provideEditor,
    createTextElement,
    createShapeElement,
    createStickerElement,
    createImageElement
  } from '$lib/editor/editor.svelte';
  import { attachShortcuts } from '$lib/editor/shortcuts';
  import { startAutosave, type AutosaveHandle } from '$lib/editor/autosave';
  import { ensureClientSignedIn } from '$lib/auth/client';
  import { auth } from '$lib/firebase/client';
  import { onAuthStateChanged } from 'firebase/auth';
  import {
    downloadPng,
    copyPngToClipboard,
    estimateSize,
    type ExportScale
  } from '$lib/editor/export';
  import type { PageData } from './$types';
  import type { ToolName } from '$lib/editor/types';

  const { data }: { data: PageData } = $props();
  // Editor created once from initial project; subsequent data changes go through autosave.
  // eslint-disable-next-line svelte/prefer-svelte-reactivity
  const editor = provideEditor(createEditor(data.project));
  const isPro = $derived(data.isPro);
  let premiumBannerDismissed = $state(false);
  const showPremiumBanner = $derived(data.lockedPremium && !premiumBannerDismissed);

  type Exporter = (pixelRatio: number, withWatermark: boolean) => Promise<string>;
  let exporter: Exporter | null = null;
  let autosave: AutosaveHandle | null = null;
  let isSignedIn = $state(false);

  let showExport = $state(false);
  let showShortcuts = $state(false);
  let showCursive = $state(false);
  let exportScale = $state<ExportScale>(1);
  let fileInput: HTMLInputElement | null = null;
  let currentTheme = $state<'light' | 'dark'>('light');

  // Mobile-only side-panel sheets. Below `lg` the left (Layers/Pages) and
  // right (Inspector) panels are hidden by default and surfaced as overlay
  // sheets via the header buttons.
  let mobileLayersOpen = $state(false);
  let mobileInspectorOpen = $state(false);

  onMount(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    currentTheme = attr === 'dark' ? 'dark' : 'light';
  });

  function setTheme(next: 'light' | 'dark'): void {
    currentTheme = next;
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore
    }
    document.cookie = `theme=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }

  function doSave(): void {
    void autosave?.saveNow().then(() => toasts.push('تم الحفظ', 'success'));
  }

  function openExport(): void {
    showExport = true;
  }

  onMount(() => {
    const detach = attachShortcuts(editor, {
      onSave: doSave,
      onExport: openExport,
      onToggleShortcuts: () => (showShortcuts = !showShortcuts)
    });
    // Sync the client Firebase SDK with the server session cookie before
    // autosave fires, otherwise Firestore writes hit "permission-denied".
    void ensureClientSignedIn().then((u) => {
      isSignedIn = !!u;
    });
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      isSignedIn = !!u;
    });
    autosave = startAutosave({
      editor,
      getExport: () => exporter,
      onFirstCreate: (newId) => {
        replaceState(`/editor/${newId}`, {});
      }
    });
    return () => {
      detach();
      unsubAuth();
      autosave?.stop();
    };
  });

  onDestroy(() => {
    autosave?.stop();
  });

  async function addCursiveSticker(font: CursiveFont, letter: string): Promise<void> {
    await ensureCursiveFontLoaded(font.fontFamily, letter);
    const el = editor.addCentered(
      createStickerElement({
        stickerType: 'cursive',
        content: letter,
        fontFamily: font.fontFamily,
        color: '#111111',
        width: 240,
        height: 240
      })
    );
    editor.selectOnly(el.id);
    editor.setTool('select');
  }

  function pickTool(t: ToolName): void {
    if (t === 'text') {
      const el = editor.addCentered(createTextElement());
      editor.selectOnly(el.id);
      editor.setTool('select');
    } else if (t === 'shape') {
      const el = editor.addCentered(createShapeElement());
      editor.selectOnly(el.id);
      editor.setTool('select');
    } else if (t === 'sticker') {
      const el = editor.addCentered(createStickerElement());
      editor.selectOnly(el.id);
      editor.setTool('select');
    } else if (t === 'image') {
      fileInput?.click();
    } else if (t === 'background') {
      // Clear selection so the inspector falls back to its canvas/background
      // view, where the stock-background picker lives.
      editor.clearSelection();
      editor.setTool(t);
    } else {
      editor.setTool(t);
    }
  }

  function onFilePicked(e: Event): void {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const maxW = 800;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const el = editor.addCentered(
          createImageElement({
            imageSrc: dataUrl,
            width: img.width * scale,
            height: img.height * scale
          })
        );
        editor.selectOnly(el.id);
        editor.setTool('select');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  async function handleDownload(): Promise<void> {
    if (!exporter) return;
    if (data.lockedPremium && !isPro) {
      toasts.push('قالب Pro — يتطلّب الترقية للتصدير', 'error');
      return;
    }
    const withWatermark = !isPro;
    await downloadPng(exporter, { scale: exportScale, withWatermark }, `${editor.project.name}.png`);
    toasts.push('تم التصدير', 'success');
    showExport = false;
  }

  async function handleCopy(): Promise<void> {
    if (!exporter) return;
    const ok = await copyPngToClipboard(exporter, {
      scale: exportScale,
      withWatermark: !isPro
    });
    toasts.push(ok ? 'نُسخ إلى الحافظة' : 'تعذّر النسخ', ok ? 'success' : 'error');
  }

  const SHORTCUTS: Array<{ keys: string; ar: string; en: string }> = [
    { keys: 'Ctrl+Z', ar: 'تراجع', en: 'Undo' },
    { keys: 'Ctrl+Shift+Z', ar: 'إعادة', en: 'Redo' },
    { keys: 'Ctrl+C / V', ar: 'نسخ / لصق', en: 'Copy / Paste' },
    { keys: 'Ctrl+D', ar: 'تكرار', en: 'Duplicate' },
    { keys: 'Delete', ar: 'حذف', en: 'Delete' },
    { keys: 'Arrows', ar: 'تحريك 1 بكسل', en: 'Nudge 1px' },
    { keys: 'Shift+Arrows', ar: 'تحريك 10 بكسل', en: 'Nudge 10px' },
    { keys: 'Ctrl+A', ar: 'تحديد الكل', en: 'Select all' },
    { keys: 'Ctrl+S', ar: 'حفظ', en: 'Save' },
    { keys: 'Ctrl+E', ar: 'تصدير', en: 'Export' },
    { keys: 'T / S / I / K / B', ar: 'أدوات', en: 'Tools' },
    { keys: 'F', ar: 'ملاءمة', en: 'Fit' },
    { keys: ']', ar: 'إخفاء اللوحة', en: 'Toggle inspector' },
    { keys: 'Space+Drag', ar: 'تحريك المشهد', en: 'Pan canvas' },
    { keys: '?', ar: 'الاختصارات', en: 'Shortcuts' }
  ];

  const TOOLS: Array<{
    id: ToolName;
    Icon: typeof MousePointer2;
    label: string;
    key: string;
  }> = [
    { id: 'select', Icon: MousePointer2, label: 'Select', key: 'V' },
    { id: 'text', Icon: Type, label: 'Text', key: 'T' },
    { id: 'shape', Icon: Square, label: 'Shape', key: 'S' },
    { id: 'image', Icon: ImageIcon, label: 'Image', key: 'I' },
    { id: 'sticker', Icon: Sparkles, label: 'Sticker', key: 'K' },
    { id: 'background', Icon: Palette, label: 'Background', key: 'B' }
  ];
</script>

<svelte:head>
  <title>{editor.project.name} · Betakti</title>
</svelte:head>

<div class="flex flex-col h-dvh w-full bg-[var(--color-paper)] text-[var(--color-ink)]">
  <header
    class="h-14 border-b border-[var(--color-border)] flex items-center px-2 sm:px-4 gap-2 sm:gap-3 bg-[var(--color-surface)] flex-none"
    style="padding-top: env(safe-area-inset-top); height: calc(3.5rem + env(safe-area-inset-top));"
  >
    <!-- Mobile: Layers panel toggle -->
    <button
      type="button"
      class="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-[8px] hover:bg-[var(--color-surface-2)] flex-none"
      aria-label="Layers"
      aria-expanded={mobileLayersOpen}
      onclick={() => (mobileLayersOpen = true)}
    >
      <LayersIcon size={18} strokeWidth={1.8} />
    </button>
    <!-- Breadcrumb -->
    <a href="/home" class="hidden lg:flex items-center gap-1.5 px-1 hover:opacity-80 transition-opacity">
      <Logo size={22} />
      <span class="font-semibold text-[15px] hidden sm:inline" style="font-family: var(--font-display);">Betakti<span class="text-[var(--color-accent)]">.</span></span>
    </a>
    <span class="text-[var(--color-muted)] hidden lg:inline"><ChevronRight size={14} /></span>
    <a href="/projects" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors hidden lg:inline">
      {m.nav_projects()}
    </a>
    <span class="text-[var(--color-muted)] hidden lg:inline"><ChevronRight size={14} /></span>
    <input
      class="ui-name-input text-sm font-medium bg-transparent border border-transparent hover:bg-[var(--color-surface-2)] focus:bg-[var(--color-surface-2)] focus:border-[var(--color-accent)] rounded-[8px] px-2.5 py-1 outline-none w-0 flex-1 min-w-0 lg:w-auto lg:flex-none lg:min-w-[160px] lg:max-w-[220px] transition-colors"
      value={editor.project.name}
      onchange={(e) => editor.setName((e.currentTarget as HTMLInputElement).value)}
    />
    {#if !isSignedIn}
      <a
        href="/auth/login"
        class="hidden md:flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-semibold px-2 py-1 rounded-[999px] hover:opacity-80 transition-opacity"
        style="font-family: var(--font-mono); background: color-mix(in srgb, var(--color-ink-2) 12%, transparent); color: var(--color-ink-2);"
      >
        <span class="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
        <span>Login to autosave</span>
      </a>
    {:else}
      <div
        class="hidden sm:flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase font-semibold px-2 py-1 rounded-[999px] flex-none"
        style="font-family: var(--font-mono); {editor.ui.isSaving
          ? 'background: color-mix(in srgb, var(--color-accent) 14%, transparent); color: var(--color-accent);'
          : editor.ui.isDirty
            ? 'background: color-mix(in srgb, var(--color-warning) 18%, transparent); color: var(--color-warning);'
            : 'background: color-mix(in srgb, var(--color-success) 18%, transparent); color: var(--color-success);'}"
      >
        {#if editor.ui.isSaving}
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          <span>Saving…</span>
        {:else if editor.ui.isDirty}
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
          <span>Unsaved</span>
        {:else}
          <CloudCheck size={12} strokeWidth={2.2} />
          <span>Saved</span>
        {/if}
      </div>
    {/if}

    <div class="hidden lg:block flex-1"></div>

    <!-- Right actions -->
    <div class="hidden lg:flex items-center">
      <LocaleToggle />
      <span class="w-px h-5 bg-[var(--color-border)] mx-1"></span>
    </div>
    <div class="hidden md:flex items-center gap-0.5">
      <Tooltip label="Undo" shortcut="Ctrl+Z">
        <IconButton label="Undo" size="sm" onclick={() => editor.undo()} disabled={!editor.canUndo()}>
          <Undo2 size={15} strokeWidth={1.75} />
        </IconButton>
      </Tooltip>
      <Tooltip label="Redo" shortcut="Ctrl+Shift+Z">
        <IconButton label="Redo" size="sm" onclick={() => editor.redo()} disabled={!editor.canRedo()}>
          <Redo2 size={15} strokeWidth={1.75} />
        </IconButton>
      </Tooltip>
    </div>
    <span class="hidden md:inline w-px h-5 bg-[var(--color-border)] mx-1"></span>
    <button
      class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-sm font-semibold text-white rounded-[8px] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] transition-shadow flex-none"
      style="background: var(--brand-gradient)"
      onclick={openExport}
    >
      <Share2 size={14} strokeWidth={2.2} />
      <span class="hidden sm:inline">Export</span>
    </button>

    <!-- Mobile: Inspector panel toggle -->
    <button
      type="button"
      class="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-[8px] hover:bg-[var(--color-surface-2)] flex-none"
      aria-label="Properties"
      aria-expanded={mobileInspectorOpen}
      onclick={() => (mobileInspectorOpen = true)}
    >
      <Sliders size={18} strokeWidth={1.8} />
    </button>
  </header>

  {#if showPremiumBanner}
    <div
      class="on-soft flex items-center gap-3 px-4 py-2 text-sm border-b border-[var(--color-border)]"
      style="background: var(--brand-gradient-soft);"
    >
      <span class="flex-1">قالب Pro — الترقية مطلوبة للتصدير بدون علامة مائية</span>
      <a
        href="/subscription"
        class="px-3 py-1 rounded-[8px] text-white text-xs font-semibold"
        style="background: var(--brand-gradient);">ترقية</a
      >
      <button
        type="button"
        class="text-[var(--color-muted)] hover:text-[var(--color-ink)] text-sm px-2"
        onclick={() => (premiumBannerDismissed = true)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  {/if}

  {#snippet layersPanelBody()}
    <div class="flex flex-col h-full">
      <div class="px-4 py-3 flex items-center justify-between flex-none">
        <span class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);">Pages</span>
        <button class="w-6 h-6 flex items-center justify-center rounded-[6px] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]" aria-label="Add page">+</button>
      </div>
      <div class="px-2 flex flex-col gap-1 flex-none">
        <button
          class="flex items-center gap-3 p-2 rounded-[8px] bg-[var(--color-surface-2)] text-start"
          type="button"
        >
          <div
            class="w-10 h-10 rounded-[6px] flex-none shadow-[var(--shadow-1)]"
            style:background={editor.project.background.type === 'color'
              ? editor.project.background.color
              : 'var(--brand-gradient)'}
          ></div>
          <div class="min-w-0 flex-1">
            <div class="text-[13px] font-medium text-[var(--color-accent)] truncate">{editor.project.name}</div>
            <div class="text-[10px] text-[var(--color-muted)]" style="font-family: var(--font-mono);">
              {editor.project.canvasSize.width} × {editor.project.canvasSize.height}
            </div>
          </div>
        </button>
        <button
          class="flex items-center justify-center gap-1.5 p-2 rounded-[8px] border border-dashed border-[var(--color-border-strong)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] text-xs mt-1"
          type="button"
        >
          + Add page
        </button>
      </div>

      <div class="mt-5 px-4 py-3 flex items-center justify-between border-t border-[var(--color-border)] flex-none">
        <span class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);">Layers</span>
      </div>
      <div class="flex-1 overflow-y-auto px-2 pb-3 flex flex-col gap-0.5 min-h-0">
        {#each editor.project.elements as el (el.id)}
          {@const isSel = editor.selectedIds.includes(el.id)}
          <button
            class="flex items-center gap-2 px-2 py-1.5 rounded-[6px] text-xs text-start hover:bg-[var(--color-surface-2)] {isSel
              ? 'bg-[var(--color-surface-2)] text-[var(--color-accent)]'
              : 'text-[var(--color-ink-2)]'}"
            type="button"
            onclick={() => {
              editor.selectOnly(el.id);
              mobileLayersOpen = false;
            }}
          >
            <span class="w-5 h-5 rounded-[5px] flex-none flex items-center justify-center border border-[var(--color-border)] bg-[var(--color-surface)] {isSel ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}">
              {#if el.type === 'text'}
                <Type size={12} strokeWidth={2} />
              {:else if el.type === 'shape'}
                {#if (el as { shapeType?: string }).shapeType === 'circle'}
                  <Circle size={12} strokeWidth={2} />
                {:else}
                  <Square size={12} strokeWidth={2} />
                {/if}
              {:else if el.type === 'image'}
                <ImageIcon size={12} strokeWidth={2} />
              {:else}
                <Sparkles size={12} strokeWidth={2} />
              {/if}
            </span>
            <span class="truncate flex-1">
              {el.type === 'text'
                ? ('text' in el ? (el as { text: string }).text : 'Text')
                : el.type === 'shape'
                  ? (el as { shapeType?: string }).shapeType ?? 'Shape'
                  : el.type === 'image'
                    ? 'Image'
                    : 'Sticker'}
            </span>
          </button>
        {:else}
          <div class="text-xs text-[var(--color-muted)] px-2 py-2">No layers yet</div>
        {/each}
      </div>
    </div>
  {/snippet}

  <div class="flex-1 flex min-h-0">
    <!-- Left panel (desktop): Pages + Layers -->
    <aside class="hidden lg:flex w-60 border-e border-[var(--color-border)] bg-[var(--color-surface)] flex-col">
      {@render layersPanelBody()}
    </aside>

    <main class="flex-1 relative min-w-0">
      <Stage registerExport={(fn) => (exporter = fn)} />
      <input bind:this={fileInput} type="file" accept="image/*" class="hidden" onchange={onFilePicked} />

      <!-- Floating top toolbar (Figma-style, grouped with dividers).
           On narrow viewports we let it horizontally scroll instead of
           overflowing the canvas. -->
      <div
        class="editor-toolbar absolute top-2 sm:top-4 start-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] shadow-[var(--shadow-2)] p-1 z-10 max-w-[calc(100vw-1rem)] overflow-x-auto scroll-rail"
      >
        {#each TOOLS as tool, idx (tool.id)}
          {#if idx === 1 || idx === 4}
            <span class="w-px h-5 bg-[var(--color-border)] mx-0.5"></span>
          {/if}
          <Tooltip label={tool.label} shortcut={tool.key}>
            <IconButton
              label={tool.label}
              size="sm"
              active={editor.ui.tool === tool.id}
              onclick={() => pickTool(tool.id)}
            >
              <tool.Icon size={16} strokeWidth={1.8} />
            </IconButton>
          </Tooltip>
          {#if tool.id === 'sticker'}
            <Tooltip label="Cursive stickers" shortcut="C">
              <IconButton
                label="Cursive stickers"
                size="sm"
                active={showCursive}
                onclick={() => (showCursive = true)}
              >
                <Feather size={16} strokeWidth={1.8} />
              </IconButton>
            </Tooltip>
          {/if}
        {/each}
      </div>

      <!-- Bottom controls: zoom pill + theme pill (theme pill hidden on mobile) -->
      <div
        class="absolute bottom-3 sm:bottom-4 start-1/2 -translate-x-1/2 flex items-center gap-2"
        style="padding-bottom: env(safe-area-inset-bottom);"
      >
        <div
          class="flex items-center gap-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] shadow-[var(--shadow-2)] px-1 py-1 text-sm"
        >
          <button
            class="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface-2)] rounded-[8px] text-base"
            onclick={() => editor.setZoom(editor.ui.zoom / 1.1)}
            aria-label="Zoom out"
          >
            −
          </button>
          <span
            class="px-2 text-xs w-14 text-center text-[var(--color-ink-2)] font-medium"
            style="font-family: var(--font-mono);"
          >
            {Math.round(editor.ui.zoom * 100)}%
          </span>
          <button
            class="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface-2)] rounded-[8px] text-base"
            onclick={() => editor.setZoom(editor.ui.zoom * 1.1)}
            aria-label="Zoom in"
          >
            +
          </button>
          <span class="w-px h-5 bg-[var(--color-border)] mx-1"></span>
          <button
            class="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface-2)] rounded-[8px] text-[var(--color-ink-2)]"
            onclick={() => editor.fitToScreen()}
            aria-label="Fit to screen"
            title="Fit to screen (F)"
          >
            <Maximize2 size={13} strokeWidth={2} />
          </button>
        </div>

        <div
          class="hidden sm:flex items-center gap-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] shadow-[var(--shadow-2)] p-1"
        >
          <button
            class="flex items-center gap-1.5 px-2.5 h-8 rounded-[8px] text-xs font-medium transition-colors {currentTheme === 'light'
              ? 'bg-[var(--color-surface-2)] text-[var(--color-ink)]'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
            onclick={() => setTheme('light')}
            aria-pressed={currentTheme === 'light'}
          >
            <Sun size={13} strokeWidth={2} /> Light
          </button>
          <button
            class="flex items-center gap-1.5 px-2.5 h-8 rounded-[8px] text-xs font-medium transition-colors {currentTheme === 'dark'
              ? 'bg-[var(--color-surface-2)] text-[var(--color-ink)]'
              : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}"
            onclick={() => setTheme('dark')}
            aria-pressed={currentTheme === 'dark'}
          >
            <Moon size={13} strokeWidth={2} /> Dark
          </button>
        </div>
      </div>
    </main>

    {#if editor.ui.inspectorVisible}
      <aside class="hidden lg:flex w-[320px] border-s border-[var(--color-border)] bg-[var(--color-surface)] flex-col overflow-y-auto">
        <Inspector stockBackgrounds={data.stockBackgrounds} />
      </aside>
    {/if}
  </div>

  <!-- Mobile-only side-panel sheets (kept inside the outer wrapper so the
       layersPanelBody snippet is in scope). -->
  <Sheet
    open={mobileLayersOpen}
    onClose={() => (mobileLayersOpen = false)}
    side="start"
    title="Layers"
    bare
  >
    {@render layersPanelBody()}
  </Sheet>

  <Sheet
    open={mobileInspectorOpen}
    onClose={() => (mobileInspectorOpen = false)}
    side="end"
    title="Properties"
    bare
  >
    <Inspector stockBackgrounds={data.stockBackgrounds} />
  </Sheet>
</div>

<Sheet open={showExport} onClose={() => (showExport = false)} title="Export">
  <div class="flex flex-col gap-4">
    <div>
      <span class="text-xs text-[var(--color-muted)] block mb-2">Resolution</span>
      <Segmented
        options={[
          { value: 1 as ExportScale, label: '1x' },
          { value: 2 as ExportScale, label: '2x' },
          { value: 3 as ExportScale, label: '3x' }
        ]}
        value={exportScale}
        onChange={(v) => {
          if (v === 1 || isPro) exportScale = v;
          else toasts.push('HD exports require Pro', 'error');
        }}
      />
    </div>
    <div class="text-xs text-[var(--color-muted)] space-y-1">
      <div>
        Dimensions: {editor.project.canvasSize.width * exportScale} × {editor.project.canvasSize.height * exportScale}
      </div>
      <div>
        ≈ {estimateSize(editor.project.canvasSize.width, editor.project.canvasSize.height, exportScale)}
      </div>
      {#if !isPro}
        <div class="text-[var(--color-warning)]">A watermark will be added (Free tier).</div>
      {/if}
    </div>
    <button
      class="w-full py-2.5 rounded-[10px] text-white font-medium"
      style="background: var(--brand-gradient)"
      onclick={handleDownload}
    >
      Download PNG
    </button>
    <button
      class="w-full py-2 rounded-[10px] border border-[var(--color-border)] text-sm hover:bg-[var(--color-surface-2)]"
      onclick={handleCopy}
    >
      Copy to clipboard
    </button>
  </div>
</Sheet>

<Dialog open={showShortcuts} onClose={() => (showShortcuts = false)} title="Shortcuts · اختصارات">
  <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
    {#each SHORTCUTS as s (s.keys)}
      <div class="flex items-center gap-2">
        <span class="font-mono text-xs px-2 py-0.5 rounded bg-[var(--color-surface-2)] border border-[var(--color-border)]">
          {s.keys}
        </span>
        <span class="text-[var(--color-ink)]">{s.en}</span>
      </div>
      <div class="text-[var(--color-muted)]">{s.ar}</div>
    {/each}
  </div>
</Dialog>

<CursivePicker
  open={showCursive}
  onClose={() => (showCursive = false)}
  onPick={(font, letter) => {
    void addCursiveSticker(font, letter);
  }}
/>

<ToastHost />
