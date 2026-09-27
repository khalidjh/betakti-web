<script lang="ts">
  import { m, getLocale } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import { relativeTime } from '$lib/format';
  import { Plus, Pencil } from 'lucide-svelte';

  const { data } = $props();
  const locale = $derived(getLocale());
  const isAr = $derived(locale === 'ar');

  // The most recently edited project is what the user almost always wants; the
  // rest are secondary.
  const active = $derived(data.recent[0] ?? null);
  const others = $derived(data.recent.slice(1));
</script>

<div class="max-w-4xl mx-auto w-full flex flex-col gap-8">
  {#if active}
    <!-- Pick up where you left off -->
    <section class="flex flex-col gap-3">
      <div class="flex items-center justify-between gap-3">
        <h1
          class="text-xl font-bold"
          style="font-family: var(--font-display); letter-spacing: -0.01em;"
        >
          {m.home_continue()}
        </h1>
        <Button variant="secondary" href="/editor/new?size=square">
          <Plus size={15} strokeWidth={2.2} />
          {m.home_new_design()}
        </Button>
      </div>

      <a
        href="/editor/{active.id}"
        class="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] overflow-hidden hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-2)] transition-all flex flex-col sm:flex-row"
      >
        <div
          class="w-full sm:w-[280px] flex-none aspect-[4/3] sm:aspect-auto sm:min-h-[190px] bg-[var(--color-surface-2)] overflow-hidden"
        >
          {#if active.thumbnailUrl}
            <img
              src={active.thumbnailUrl}
              alt={active.name}
              class="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
            />
          {/if}
        </div>
        <div class="flex-1 min-w-0 p-5 sm:p-6 flex flex-col justify-center gap-2">
          <div
            class="text-lg sm:text-xl font-bold truncate"
            style="font-family: var(--font-display); letter-spacing: -0.01em;"
          >
            {active.name}
          </div>
          <div class="text-sm text-[var(--color-muted)]">{relativeTime(active.updatedAt)}</div>
          <span
            class="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)]"
          >
            <Pencil size={14} strokeWidth={2.2} />
            {m.home_continue()}
            <span aria-hidden="true">{isAr ? '←' : '→'}</span>
          </span>
        </div>
      </a>
    </section>

    {#if others.length > 0}
      <section class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-[var(--color-ink-2)]">{m.home_recent()}</h2>
          <a href="/projects" class="text-sm text-[var(--color-accent)] hover:underline">
            {m.home_see_all()}
          </a>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {#each others as p (p.id)}
            <a
              href="/editor/{p.id}"
              class="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] overflow-hidden hover:border-[var(--color-accent)] transition-colors"
            >
              <div class="w-full aspect-[4/3] bg-[var(--color-surface-2)]">
                {#if p.thumbnailUrl}
                  <img
                    src={p.thumbnailUrl}
                    alt={p.name}
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                {/if}
              </div>
              <div class="p-3">
                <div class="text-sm font-medium truncate">{p.name}</div>
                <div class="text-xs text-[var(--color-muted)]">{relativeTime(p.updatedAt)}</div>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  {:else}
    <!-- Nothing yet: one clear action, nothing to read past. -->
    <section class="flex flex-col items-center text-center gap-5 py-16 sm:py-24">
      <div
        class="w-16 h-16 rounded-[999px] flex items-center justify-center text-white shadow-[var(--shadow-2)]"
        style="background: var(--brand-gradient);"
      >
        <Plus size={30} strokeWidth={2.2} />
      </div>
      <h1
        class="text-[clamp(1.5rem,4vw,2rem)] font-bold leading-tight"
        style="font-family: var(--font-display); letter-spacing: -0.015em;"
      >
        {m.home_empty_title()}
      </h1>
      <Button variant="gradient" href="/editor/new?size=square">{m.home_empty_cta()}</Button>

      <div class="flex flex-col items-center gap-2 mt-6">
        <span class="text-xs text-[var(--color-muted)]">{m.home_pick_size()}</span>
        <div class="flex flex-wrap justify-center gap-2">
          {#each data.canvasSizes as size (size.id)}
            <a
              href="/editor/new?size={size.id}"
              class="px-3 py-1.5 rounded-[999px] border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-ink-2)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              {isAr ? size.nameAr : size.nameEn}
            </a>
          {/each}
        </div>
      </div>
    </section>
  {/if}
</div>
