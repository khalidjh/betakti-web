<script lang="ts">
  import Sheet from '$lib/components/sheet.svelte';
  import { ChevronRight, ChevronLeft } from 'lucide-svelte';
  import { CURSIVE_CATEGORIES, ensureCursiveFontLoaded, type CursiveFont } from './cursive-fonts';

  interface Props {
    open: boolean;
    onClose: () => void;
    onPick: (font: CursiveFont, letter: string) => void;
  }
  const { open, onClose, onPick }: Props = $props();

  let activeFont = $state<CursiveFont | null>(null);

  function close(): void {
    activeFont = null;
    onClose();
  }

  async function pickFont(f: CursiveFont): Promise<void> {
    await ensureCursiveFontLoaded(f.fontFamily, f.letters.join(''));
    activeFont = f;
  }

  function pickLetter(letter: string): void {
    if (!activeFont) return;
    onPick(activeFont, letter);
    close();
  }
</script>

<Sheet open={open} onClose={close} title={activeFont ? activeFont.nameAr : 'مخطوطات'}>
  {#if !activeFont}
    <div class="flex flex-col gap-6">
      {#each CURSIVE_CATEGORIES as cat (cat.id)}
        <section>
          <div class="flex items-baseline justify-between mb-2">
            <h3 class="text-sm font-semibold text-[var(--color-accent)]">{cat.nameAr}</h3>
            <span class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);">
              {cat.nameEn}
            </span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            {#each cat.fonts as f (f.fontFamily)}
              {@const previewLetter = f.previewLetter ?? cat.previewLetter}
              {@const previewSize = f.previewFontSize ?? cat.previewFontSize}
              <button
                type="button"
                class="aspect-square rounded-[12px] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface)] hover:ring-2 hover:ring-[var(--color-accent)] transition-all flex flex-col items-center justify-center p-2 text-[var(--color-ink)]"
                onclick={() => pickFont(f)}
                title="{f.nameAr} · {f.nameEn}"
              >
                <span
                  class="leading-none"
                  style="font-family: '{f.fontFamily}', system-ui; font-size: {previewSize}px;"
                >
                  {previewLetter}
                </span>
                <span class="mt-1 text-[10px] text-[var(--color-muted)] truncate w-full text-center">
                  {f.nameAr}
                </span>
              </button>
            {/each}
          </div>
        </section>
      {/each}
    </div>
  {:else}
    {@const f = activeFont}
    <div class="flex flex-col gap-3">
      <button
        type="button"
        class="self-start flex items-center gap-1 text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        onclick={() => (activeFont = null)}
      >
        <ChevronRight size={14} class="rtl:hidden" />
        <ChevronLeft size={14} class="hidden rtl:inline" />
        كل المخطوطات
      </button>
      <div class="grid grid-cols-3 gap-2">
        {#each f.letters as letter (letter)}
          <button
            type="button"
            class="aspect-square rounded-[12px] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface)] hover:ring-2 hover:ring-[var(--color-accent)] transition-all flex items-center justify-center text-[var(--color-ink)]"
            onclick={() => pickLetter(letter)}
            title={letter}
          >
            <span
              class="leading-none"
              style="font-family: '{f.fontFamily}', system-ui; font-size: 64px;"
            >
              {letter}
            </span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</Sheet>
