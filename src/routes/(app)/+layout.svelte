<script lang="ts">
  import type { Snippet } from 'svelte';
  import Logo from '$lib/brand/logo.svelte';
  import { m } from '$lib/i18n';
  import { page } from '$app/stores';
  import { goto, invalidateAll } from '$app/navigation';
  import { signOut } from '$lib/auth/client';
  import { Home, FolderOpen, Settings, CreditCard, LogOut, Shield, Menu, X } from 'lucide-svelte';
  import LocaleToggle from '$lib/components/locale-toggle.svelte';
  import ThemeToggle from '$lib/components/theme-toggle.svelte';

  interface Props {
    children: Snippet;
    data: {
      user: {
        uid: string;
        email: string | null;
        subscription: 'free' | 'pro' | null;
        isAdmin: boolean;
      };
    };
  }
  const { children, data }: Props = $props();

  const navItems = [
    { href: '/home', label: m.nav_home, Icon: Home },
    { href: '/projects', label: m.nav_projects, Icon: FolderOpen },
    { href: '/settings', label: m.nav_settings, Icon: Settings },
    { href: '/subscription', label: m.nav_subscription, Icon: CreditCard }
  ] as const;

  function initial(email: string | null): string {
    return (email ?? '?').trim().charAt(0).toUpperCase();
  }

  async function handleSignOut(): Promise<void> {
    await signOut();
    await invalidateAll();
    await goto('/');
  }

  let menuOpen = $state(false);
  let menuRoot = $state<HTMLDivElement | null>(null);
  let drawerOpen = $state(false);

  function handleDocClick(e: MouseEvent): void {
    if (!menuOpen || !menuRoot) return;
    if (!menuRoot.contains(e.target as Node)) menuOpen = false;
  }

  function closeDrawer(): void {
    drawerOpen = false;
  }

  // Close the drawer whenever route changes.
  $effect(() => {
    $page.url.pathname;
    drawerOpen = false;
  });

  // Editor route owns its own header and uses the full viewport height; opt
  // it out of the (app) layout's mobile top bar and content padding.
  const isEditor = $derived($page.url.pathname.startsWith('/editor'));
</script>

<svelte:window onclick={handleDocClick} />

<div class="min-h-dvh flex">
  <!-- Mobile top bar — hidden on editor routes (editor has its own header) -->
  <header
    class="lg:hidden fixed top-0 inset-x-0 z-40 h-14 items-center justify-between px-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur {isEditor ? 'hidden' : 'flex'}"
    style="padding-top: env(safe-area-inset-top); height: calc(3.5rem + env(safe-area-inset-top));"
  >
    <button
      type="button"
      class="w-10 h-10 inline-flex items-center justify-center rounded-[10px] hover:bg-[var(--color-surface-2)]"
      aria-label="Open menu"
      aria-expanded={drawerOpen}
      onclick={() => (drawerOpen = true)}
    >
      <Menu size={20} />
    </button>
    <a href="/home" class="flex items-center gap-2">
      <Logo size={24} />
      <span class="font-semibold">{m.app_name()}</span>
    </a>
    <div class="w-10 h-10"></div>
  </header>

  <!-- Drawer overlay -->
  {#if drawerOpen}
    <button
      type="button"
      class="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      aria-label="Close menu"
      onclick={closeDrawer}
    ></button>
  {/if}

  <aside
    class="app-drawer fixed lg:sticky top-0 start-0 z-50 lg:z-auto h-dvh w-[260px] lg:w-60 self-start
           border-e border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex flex-col gap-2
           transition-transform duration-200 ease-out"
    class:is-open={drawerOpen}
    style="padding-top: max(env(safe-area-inset-top), 1rem); padding-bottom: max(env(safe-area-inset-bottom), 1rem);"
  >
    <div class="flex items-center justify-between mb-4 px-1">
      <a href="/home" class="flex items-center gap-2" onclick={closeDrawer}>
        <Logo size={28} />
        <span class="font-semibold text-lg">{m.app_name()}</span>
      </a>
      <button
        type="button"
        class="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-[10px] hover:bg-[var(--color-surface-2)]"
        aria-label="Close menu"
        onclick={closeDrawer}
      >
        <X size={18} />
      </button>
    </div>

    <nav class="flex flex-col gap-1">
      {#each navItems as item (item.href)}
        {@const active = $page.url.pathname === item.href || $page.url.pathname.startsWith(item.href + '/')}
        <a
          href={item.href}
          class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm transition-colors {active
            ? 'bg-[var(--color-surface-2)] font-medium text-[var(--color-ink)]'
            : 'text-[var(--color-ink-2)] hover:bg-[var(--color-surface-2)]'}"
        >
          <item.Icon size={16} />
          {item.label()}
        </a>
      {/each}
    </nav>

    <div class="mt-auto relative" bind:this={menuRoot}>
      <button
        type="button"
        class="w-full flex items-center gap-2.5 px-2 py-2 rounded-[10px] hover:bg-[var(--color-surface-2)] transition-colors"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onclick={() => (menuOpen = !menuOpen)}
      >
        <div
          class="w-8 h-8 rounded-[999px] flex items-center justify-center text-white text-sm font-semibold flex-none"
          style="background: var(--brand-gradient);"
        >
          {initial(data.user.email)}
        </div>
        <div class="min-w-0 flex-1 text-start">
          <div class="text-xs text-[var(--color-muted)] truncate">{data.user.email ?? ''}</div>
          <div class="text-xs font-medium">
            {data.user.subscription === 'pro' ? m.subscription_pro() : m.subscription_free()}
          </div>
        </div>
      </button>

      {#if menuOpen}
        <div
          class="absolute bottom-full start-0 end-0 mb-2 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-3)] p-2 flex flex-col gap-1"
          role="menu"
        >
          <div class="flex items-center justify-center gap-2 py-1.5">
            <ThemeToggle />
            <LocaleToggle />
          </div>
          <div class="h-px bg-[var(--color-border)] my-1"></div>
          {#if data.user.isAdmin}
            <a
              href="/admin/backgrounds"
              class="flex items-center gap-2 px-3 py-2 rounded-[8px] text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface-2)] text-start"
              role="menuitem"
              onclick={() => (menuOpen = false)}
            >
              <Shield size={16} />
              Admin
            </a>
            <div class="h-px bg-[var(--color-border)] my-1"></div>
          {/if}
          <button
            type="button"
            class="flex items-center gap-2 px-3 py-2 rounded-[8px] text-sm text-[var(--color-ink-2)] hover:bg-[var(--color-surface-2)] text-start"
            onclick={handleSignOut}
            role="menuitem"
          >
            <LogOut size={16} />
            {m.nav_sign_out()}
          </button>
        </div>
      {/if}
    </div>
  </aside>

  <main
    class="flex-1 min-w-0 bg-[var(--color-paper)] {isEditor
      ? 'p-0 lg:p-0 h-dvh overflow-hidden'
      : 'p-4 sm:p-6 lg:p-8 pt-[calc(3.5rem+env(safe-area-inset-top)+1rem)] lg:pt-8'}"
  >
    {@render children()}
  </main>
</div>

<style>
  /* Direction-aware drawer transform: closed state slides off-screen toward
     the inline-start edge regardless of LTR/RTL. */
  .app-drawer {
    transform: translateX(-100%);
  }
  :global([dir='rtl']) .app-drawer {
    transform: translateX(100%);
  }
  .app-drawer.is-open {
    transform: translateX(0);
  }
  @media (min-width: 1024px) {
    .app-drawer,
    :global([dir='rtl']) .app-drawer {
      transform: translateX(0);
    }
  }
</style>
