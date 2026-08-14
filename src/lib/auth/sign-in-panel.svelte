<script lang="ts">
  /**
   * Sign-in / sign-up without leaving the page.
   *
   * The editor lets guests design before they have an account, and their work
   * lives only in memory — navigating to /auth/login would throw it away. Every
   * call here (popup, email, register) authenticates through the Firebase SDK
   * and swaps the session cookie over `fetch`, so the page never unloads.
   */
  import { m } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import Input from '$lib/components/input.svelte';
  import { invalidateAll } from '$app/navigation';
  import {
    signInWithEmail,
    registerWithEmail,
    signInWithGoogle,
    mapAuthError
  } from '$lib/auth/client';

  interface Props {
    /** Runs after the session cookie and server data are both live. */
    onSuccess?: () => void;
    /** Line shown above the form explaining why we're asking. */
    reason?: string;
  }
  const { onSuccess, reason }: Props = $props();

  let mode = $state<'signin' | 'register'>('signin');
  let email = $state('');
  let password = $state('');
  let busy = $state(false);
  let authError = $state('');

  function messageFor(code: unknown): string {
    const key = mapAuthError(code);
    if (key === 'invalid_credentials') return m.auth_error_invalid_credentials();
    if (key === 'email_in_use') return m.auth_error_email_in_use();
    if (key === 'weak_password') return m.auth_error_weak_password();
    return m.auth_error_generic();
  }

  async function run(fn: () => Promise<void>): Promise<void> {
    busy = true;
    authError = '';
    try {
      await fn();
      // Pull down the new session's data (isPro, user) before handing back —
      // otherwise the caller acts on stale guest state.
      await invalidateAll();
      onSuccess?.();
    } catch (e) {
      authError = messageFor((e as { code?: string })?.code);
    } finally {
      busy = false;
    }
  }

  function submit(e: SubmitEvent): void {
    e.preventDefault();
    if (!email || !password) return;
    void run(() =>
      mode === 'signin'
        ? signInWithEmail(email, password)
        : registerWithEmail(email, password, '')
    );
  }
</script>

<div class="flex flex-col gap-4">
  {#if reason}
    <p class="text-sm text-[var(--color-ink-2)]">{reason}</p>
  {/if}

  <Button variant="secondary" type="button" onclick={() => void run(signInWithGoogle)} disabled={busy}>
    {m.cta_continue_google()}
  </Button>

  <div class="flex items-center gap-3 text-xs text-[var(--color-muted)]">
    <div class="flex-1 h-px bg-[var(--color-border)]"></div>
    <span>{m.auth_or()}</span>
    <div class="flex-1 h-px bg-[var(--color-border)]"></div>
  </div>

  <form class="flex flex-col gap-3" onsubmit={submit}>
    <Input
      type="email"
      name="email"
      label={m.label_email()}
      autocomplete="email"
      bind:value={email}
      required
    />
    <Input
      type="password"
      name="password"
      label={m.label_password()}
      autocomplete={mode === 'signin' ? 'current-password' : 'new-password'}
      bind:value={password}
      required
    />
    {#if authError}
      <p class="text-sm text-[var(--color-danger)]">{authError}</p>
    {/if}
    <Button variant="gradient" type="submit" disabled={busy}>
      {busy ? '…' : mode === 'signin' ? m.cta_sign_in() : m.cta_create_account()}
    </Button>
  </form>

  <p class="text-sm text-[var(--color-muted)] text-center">
    {mode === 'signin' ? m.auth_no_account() : m.auth_have_account()}
    <button
      type="button"
      class="text-[var(--color-accent)] font-medium hover:underline"
      onclick={() => {
        mode = mode === 'signin' ? 'register' : 'signin';
        authError = '';
      }}
    >
      {mode === 'signin' ? m.cta_create_account() : m.cta_sign_in()}
    </button>
  </p>
</div>
