<script lang="ts">
  import { m } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import Input from '$lib/components/input.svelte';
  import Dialog from '$lib/components/dialog.svelte';
  import EmptyState from '$lib/components/empty-state.svelte';
  import { relativeTime } from '$lib/format';
  import { enhance } from '$app/forms';
  import { MoreVertical, Plus } from 'lucide-svelte';

  const { data } = $props();

  let openMenuId = $state<string | null>(null);
  let renameFor = $state<{ id: string; name: string } | null>(null);
  let deleteFor = $state<{ id: string; name: string } | null>(null);
  let prefersReducedMotion = $state(false);

  $effect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = mq.matches;
    const onChange = (e: MediaQueryListEvent) => (prefersReducedMotion = e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  });

  function toggleMenu(id: string): void {
    openMenuId = openMenuId === id ? null : id;
  }

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
</script>

<div class="relative isolate overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-10">
  <div class="bg-hero-mesh absolute inset-0 -z-10 opacity-80" aria-hidden="true"></div>
  <header class="max-w-6xl mx-auto flex items-end justify-between gap-4 flex-wrap pt-4">
    <div class="flex flex-col gap-2">
      <span
        class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
        style="font-family: var(--font-mono);"
      >
        <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
        {data.projects.length} · {m.projects_title().toLowerCase()}
      </span>
      <h1
        class="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.1]"
        style="font-family: var(--font-display); letter-spacing: -0.015em;"
      >
        {m.projects_title()}
      </h1>
    </div>
    <Button variant="gradient" href="/home">{m.home_start_new()}</Button>
  </header>
</div>

<div class="max-w-6xl mx-auto flex flex-col gap-8 pt-4">

  {#if data.projects.length === 0}
    <EmptyState title={m.home_empty_title()} description={m.home_empty_desc()}>
      {#snippet icon()}
        <Plus size={28} strokeWidth={2.2} />
      {/snippet}
      {#snippet action()}
        <Button variant="gradient" href="/home">{m.home_empty_cta()}</Button>
      {/snippet}
    </EmptyState>
  {:else}
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each data.projects as p, i (p.id)}
        <div
          class="relative group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] overflow-hidden hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 transition-all"
          style:animation={prefersReducedMotion
            ? 'none'
            : `fade-in-up 240ms var(--ease-out) ${i * 20}ms both`}
        >
          <a href="/editor/{p.id}" class="block">
            <div
              class="w-full aspect-[4/3]"
              style={p.thumbnailUrl ? 'background: var(--color-surface-2);' : `background: ${gradientFor(p.id)};`}
            >
              {#if p.thumbnailUrl}
                <img src={p.thumbnailUrl} alt={p.name} class="w-full h-full object-cover" loading="lazy" />
              {/if}
            </div>
            <div class="p-3">
              <div class="text-sm font-medium truncate">{p.name}</div>
              <div class="text-[11px] text-[var(--color-muted)] mt-0.5" style="font-family: var(--font-mono);">{relativeTime(p.updatedAt)}</div>
            </div>
          </a>
          <button
            type="button"
            class="project-menu-btn absolute top-2 end-2 w-9 h-9 rounded-[8px] bg-[var(--color-surface)]/90 backdrop-blur border border-[var(--color-border)] flex items-center justify-center transition-opacity"
            aria-label="Menu"
            onclick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMenu(p.id);
            }}
          >
            <MoreVertical size={16} />
          </button>
          {#if openMenuId === p.id}
            <div
              class="absolute top-11 end-2 z-10 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[10px] shadow-[var(--shadow-2)] py-1 min-w-[160px]"
            >
              <button
                type="button"
                class="w-full text-start px-3 py-1.5 text-sm hover:bg-[var(--color-surface-2)]"
                onclick={() => {
                  renameFor = { id: p.id, name: p.name };
                  openMenuId = null;
                }}
              >
                {m.projects_rename()}
              </button>
              <form method="POST" action="?/duplicate" use:enhance class="contents">
                <input type="hidden" name="id" value={p.id} />
                <button
                  type="submit"
                  class="w-full text-start px-3 py-1.5 text-sm hover:bg-[var(--color-surface-2)]"
                  onclick={() => (openMenuId = null)}
                >
                  {m.projects_duplicate()}
                </button>
              </form>
              <button
                type="button"
                class="w-full text-start px-3 py-1.5 text-sm text-[var(--color-danger)] hover:bg-[var(--color-surface-2)]"
                onclick={() => {
                  deleteFor = { id: p.id, name: p.name };
                  openMenuId = null;
                }}
              >
                {m.projects_delete()}
              </button>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<Dialog open={renameFor !== null} onClose={() => (renameFor = null)} title={m.projects_rename()}>
  {#if renameFor}
    <form
      method="POST"
      action="?/rename"
      use:enhance={() => {
        return async ({ update }) => {
          await update();
          renameFor = null;
        };
      }}
      class="flex flex-col gap-4"
    >
      <input type="hidden" name="id" value={renameFor.id} />
      <Input name="name" label={m.projects_new_name()} value={renameFor.name} required />
      <div class="flex justify-end gap-2">
        <Button variant="ghost" type="button" onclick={() => (renameFor = null)}>
          {m.projects_cancel()}
        </Button>
        <Button variant="primary" type="submit">{m.projects_save()}</Button>
      </div>
    </form>
  {/if}
</Dialog>

<Dialog
  open={deleteFor !== null}
  onClose={() => (deleteFor = null)}
  title={m.projects_confirm_delete_title()}
>
  {#if deleteFor}
    <p class="text-sm text-[var(--color-muted)] mb-4">{m.projects_confirm_delete_body()}</p>
    <form
      method="POST"
      action="?/delete"
      use:enhance={() => {
        return async ({ update }) => {
          await update();
          deleteFor = null;
        };
      }}
      class="flex justify-end gap-2"
    >
      <input type="hidden" name="id" value={deleteFor.id} />
      <Button variant="ghost" type="button" onclick={() => (deleteFor = null)}>
        {m.projects_cancel()}
      </Button>
      <button
        type="submit"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[var(--color-danger)] text-white font-medium text-sm hover:opacity-95"
      >
        {m.projects_delete()}
      </button>
    </form>
  {/if}
</Dialog>

<style>
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* On precise pointers (mouse), keep the kebab hidden until hover for a
     cleaner grid. On touch (coarse pointer), there is no hover so always
     show it. */
  @media (hover: hover) and (pointer: fine) {
    .project-menu-btn {
      opacity: 0;
    }
    .group:hover .project-menu-btn,
    .project-menu-btn:focus,
    .project-menu-btn[aria-expanded='true'] {
      opacity: 1;
    }
  }
</style>
