<script lang="ts">
  import { enhance } from '$app/forms';
  import { Trash2, Eye, EyeOff, Plus } from 'lucide-svelte';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }
  const { data }: Props = $props();

  const SUGGESTED_CATEGORIES = [
    'Landscape',
    'Sky',
    'Sea',
    'Forest',
    'Urban',
    'Texture',
    'Abstract'
  ] as const;

  let formCategory = $state<string>(SUGGESTED_CATEGORIES[0]);

  const grouped = $derived.by(() => {
    const map = new Map<string, typeof data.rows>();
    for (const row of data.rows) {
      const list = map.get(row.category) ?? [];
      list.push(row);
      map.set(row.category, list);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  });

  const counts = $derived({
    total: data.rows.length,
    approved: data.rows.filter((r) => r.status === 'approved').length,
    removed: data.rows.filter((r) => r.status === 'removed').length
  });
</script>

<div class="max-w-6xl mx-auto flex flex-col gap-8">
  <div class="flex items-end justify-between gap-4">
    <div>
      <h1 class="text-2xl font-semibold mb-1">Background images</h1>
      <p class="text-sm text-[var(--color-muted)]">
        {counts.approved} approved · {counts.removed} hidden · {counts.total} total
      </p>
    </div>
  </div>

  <section class="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
    <h2
      class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)] mb-3"
      style="font-family: var(--font-mono);"
    >
      Add background
    </h2>
    <form
      method="POST"
      action="?/add"
      use:enhance={() =>
        ({ update }) =>
          update({ reset: true })}
      class="grid grid-cols-1 md:grid-cols-[1fr_1fr_180px_100px_auto] gap-2 items-end"
    >
      <label class="flex flex-col gap-1 text-xs">
        <span class="text-[var(--color-muted)]">Full image URL *</span>
        <input
          name="url"
          type="url"
          required
          placeholder="https://images.pexels.com/…/large.jpg"
          class="h-9 px-2 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-sm"
        />
      </label>
      <label class="flex flex-col gap-1 text-xs">
        <span class="text-[var(--color-muted)]">Thumbnail URL (optional)</span>
        <input
          name="thumbnailUrl"
          type="url"
          placeholder="https://images.pexels.com/…/small.jpg"
          class="h-9 px-2 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-sm"
        />
      </label>
      <label class="flex flex-col gap-1 text-xs">
        <span class="text-[var(--color-muted)]">Category</span>
        <select
          name="category"
          bind:value={formCategory}
          class="h-9 px-2 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-sm"
        >
          {#each SUGGESTED_CATEGORIES as cat (cat)}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </label>
      <label class="flex flex-col gap-1 text-xs">
        <span class="text-[var(--color-muted)]">Sort</span>
        <input
          name="sortOrder"
          type="number"
          value="100"
          class="h-9 px-2 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface-2)] text-sm"
        />
      </label>
      <button
        type="submit"
        class="h-9 px-4 rounded-[8px] bg-[var(--color-ink)] text-[var(--color-paper)] text-sm font-medium flex items-center gap-1.5 hover:opacity-90"
      >
        <Plus size={14} strokeWidth={2.4} /> Add
      </button>
    </form>
  </section>

  {#if grouped.length === 0}
    <div
      class="rounded-[14px] border border-dashed border-[var(--color-border)] p-12 text-center text-sm text-[var(--color-muted)]"
    >
      No backgrounds yet. Add the first one above.
    </div>
  {:else}
    {#each grouped as [cat, rows] (cat)}
      <section>
        <h2
          class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)] mb-3"
          style="font-family: var(--font-mono);"
        >
          {cat} · {rows.length}
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {#each rows as row (row.id)}
            <article
              class="rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden flex flex-col {row.status ===
              'removed'
                ? 'opacity-50'
                : ''}"
            >
              <div class="aspect-video bg-[var(--color-surface-2)]">
                <img
                  src={row.thumbnailUrl}
                  alt=""
                  loading="lazy"
                  class="w-full h-full object-cover block"
                />
              </div>
              <div class="p-3 flex flex-col gap-2">
                <div class="flex items-center justify-between text-[11px] text-[var(--color-muted)]">
                  <span
                    class="px-1.5 py-0.5 rounded-[4px] {row.status === 'approved'
                      ? 'bg-[var(--color-surface-2)] text-[var(--color-ink)]'
                      : 'bg-[var(--color-surface-2)]'}"
                  >
                    {row.status}
                  </span>
                  <span>sort {row.sortOrder}</span>
                </div>
                <a
                  href={row.url}
                  target="_blank"
                  rel="noreferrer"
                  class="text-[11px] truncate text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                  title={row.url}
                >
                  {row.url}
                </a>
                <div class="flex items-center gap-1.5">
                  <form method="POST" action="?/setStatus" use:enhance class="flex-1">
                    <input type="hidden" name="id" value={row.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={row.status === 'approved' ? 'removed' : 'approved'}
                    />
                    <button
                      type="submit"
                      class="w-full h-8 flex items-center justify-center gap-1.5 text-xs rounded-[6px] bg-[var(--color-surface-2)] hover:bg-[var(--color-border)]"
                    >
                      {#if row.status === 'approved'}
                        <EyeOff size={13} strokeWidth={1.8} /> Hide
                      {:else}
                        <Eye size={13} strokeWidth={1.8} /> Show
                      {/if}
                    </button>
                  </form>
                  <form
                    method="POST"
                    action="?/delete"
                    use:enhance={({ cancel }) => {
                      if (!confirm('Delete this background?')) cancel();
                      return ({ update }) => update();
                    }}
                  >
                    <input type="hidden" name="id" value={row.id} />
                    <button
                      type="submit"
                      class="h-8 w-8 flex items-center justify-center rounded-[6px] bg-[var(--color-surface-2)] hover:bg-[var(--color-border)] text-[var(--color-ink-2)]"
                      aria-label="Delete"
                    >
                      <Trash2 size={13} strokeWidth={1.8} />
                    </button>
                  </form>
                </div>
              </div>
            </article>
          {/each}
        </div>
      </section>
    {/each}
  {/if}
</div>
