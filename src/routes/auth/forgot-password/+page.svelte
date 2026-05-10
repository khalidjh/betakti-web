<script lang="ts">
  import { m } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import Input from '$lib/components/input.svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zod4 } from 'sveltekit-superforms/adapters';
  import { forgotSchema } from '$lib/auth/schemas';
  import { sendPasswordReset, mapAuthError } from '$lib/auth/client';

  const { data } = $props();
  let sent = $state(false);
  let authError = $state('');

  const { form, errors, enhance, submitting } = superForm(data.form, {
    SPA: true,
    validators: zod4(forgotSchema),
    onUpdate: async ({ form }) => {
      if (!form.valid) return;
      try {
        await sendPasswordReset(form.data.email);
        sent = true;
      } catch (e) {
        const code = mapAuthError((e as { code?: string })?.code);
        authError =
          code === 'invalid_credentials' ? m.auth_error_invalid_credentials() : m.auth_error_generic();
      }
    }
  });
</script>

<h1
  class="text-[28px] font-bold mb-2 leading-tight"
  style="font-family: var(--font-display); letter-spacing: -0.015em;"
>
  {m.page_forgot_title()}
</h1>
<p class="text-sm text-[var(--color-ink-2)] mb-6">{m.auth_forgot_sub()}</p>

{#if sent}
  <div
    class="text-sm mb-4 p-4 rounded-[10px] border border-[color-mix(in_srgb,var(--color-success)_30%,transparent)]"
    style="background: color-mix(in srgb, var(--color-success) 10%, transparent); color: var(--color-success);"
  >
    {m.auth_forgot_sent()}
  </div>
{:else}
  <form method="POST" use:enhance class="flex flex-col gap-4">
    <Input
      type="email"
      name="email"
      label={m.label_email()}
      autocomplete="email"
      bind:value={$form.email}
      error={$errors.email?.[0]}
      required
    />
    {#if authError}
      <p class="text-sm text-[var(--color-danger)]">{authError}</p>
    {/if}
    <Button variant="gradient" type="submit" disabled={$submitting}>
      {$submitting ? '…' : m.cta_send_reset()}
    </Button>
  </form>
{/if}

<p class="mt-5 text-sm text-[var(--color-muted)] text-center">
  <a href="/auth/login" class="text-[var(--color-accent)] hover:underline font-medium">← {m.cta_sign_in()}</a>
</p>
