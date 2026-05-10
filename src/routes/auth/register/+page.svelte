<script lang="ts">
  import { m } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import Input from '$lib/components/input.svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';
  import { registerSchema } from '$lib/auth/schemas';
  import { registerWithEmail, signInWithGoogle, mapAuthError } from '$lib/auth/client';
  import { goto } from '$app/navigation';

  const { data } = $props();

  const { form, errors, enhance, submitting } = superForm(data.form, {
    SPA: true,
    validators: zod4(registerSchema),
    onUpdate: async ({ form }) => {
      if (!form.valid) return;
      try {
        await registerWithEmail(form.data.email, form.data.password, form.data.displayName);
        await goto(data.next);
      } catch (e) {
        authError = mapErrorMessage(mapAuthError((e as { code?: string })?.code));
      }
    }
  });

  let authError = $state('');
  let googleBusy = $state(false);

  function mapErrorMessage(key: string): string {
    if (key === 'invalid_credentials') return m.auth_error_invalid_credentials();
    if (key === 'email_in_use') return m.auth_error_email_in_use();
    if (key === 'weak_password') return m.auth_error_weak_password();
    return m.auth_error_generic();
  }

  async function handleGoogle(): Promise<void> {
    googleBusy = true;
    authError = '';
    try {
      await signInWithGoogle();
      await goto(data.next);
    } catch (e) {
      authError = mapErrorMessage(mapAuthError((e as { code?: string })?.code));
    } finally {
      googleBusy = false;
    }
  }
</script>

<h1
  class="text-[28px] font-bold mb-2 leading-tight"
  style="font-family: var(--font-display); letter-spacing: -0.015em;"
>
  {m.page_register_title()}
</h1>
<p class="text-sm text-[var(--color-ink-2)] mb-6">{m.auth_have_account()} <a href="/auth/login" class="text-[var(--color-accent)] font-medium">{m.cta_sign_in()}</a></p>

<form method="POST" use:enhance class="flex flex-col gap-4">
  <Input
    name="displayName"
    label={m.label_display_name()}
    autocomplete="name"
    bind:value={$form.displayName}
    error={$errors.displayName?.[0]}
    required
  />
  <Input
    type="email"
    name="email"
    label={m.label_email()}
    autocomplete="email"
    bind:value={$form.email}
    error={$errors.email?.[0]}
    required
  />
  <Input
    type="password"
    name="password"
    label={m.label_password()}
    autocomplete="new-password"
    bind:value={$form.password}
    error={$errors.password?.[0]}
    required
  />
  {#if authError}
    <p class="text-sm text-[var(--color-danger)]">{authError}</p>
  {/if}
  <Button variant="gradient" type="submit" disabled={$submitting}>
    {$submitting ? '…' : m.cta_create_account()}
  </Button>
</form>

<div class="my-5 flex items-center gap-3 text-xs text-[var(--color-muted)]">
  <div class="flex-1 h-px bg-[var(--color-border)]"></div>
  <span>{m.auth_or()}</span>
  <div class="flex-1 h-px bg-[var(--color-border)]"></div>
</div>

<div class="flex flex-col gap-2">
  <Button variant="secondary" type="button" onclick={handleGoogle} disabled={googleBusy}>
    {m.cta_continue_google()}
  </Button>
</div>

<p class="mt-5 text-xs text-[var(--color-muted)] text-center leading-relaxed">
  <a href="/terms" class="text-[var(--color-accent)] hover:underline">{m.marketing_footer_terms()}</a>
  <span class="mx-2">·</span>
  <a href="/privacy" class="text-[var(--color-accent)] hover:underline">{m.marketing_footer_privacy()}</a>
</p>
