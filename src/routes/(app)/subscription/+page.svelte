<script lang="ts">
  import { m } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import Dialog from '$lib/components/dialog.svelte';
  import Card from '$lib/components/card.svelte';
  import ProBadge from '$lib/components/pro-badge.svelte';
  import { browser } from '$app/environment';
  import {
    Palette,
    Type,
    Scissors,
    Download,
    Cloud,
    LifeBuoy,
    Sparkles
  } from 'lucide-svelte';

  type PlanId = 'monthly' | 'yearly' | 'lifetime';
  const { data } = $props();

  const benefits = [
    { Icon: Palette, t: m.sub_benefit_1_t, d: m.sub_benefit_1_d },
    { Icon: Type, t: m.sub_benefit_2_t, d: m.sub_benefit_2_d },
    { Icon: Scissors, t: m.sub_benefit_3_t, d: m.sub_benefit_3_d },
    { Icon: Download, t: m.sub_benefit_4_t, d: m.sub_benefit_4_d },
    { Icon: Cloud, t: m.sub_benefit_5_t, d: m.sub_benefit_5_d },
    { Icon: LifeBuoy, t: m.sub_benefit_6_t, d: m.sub_benefit_6_d }
  ] as const;

  let selectedPlan = $state<PlanId | null>(null);
  let dialogOpen = $state(false);
  let mountError = $state('');

  function planLabel(id: PlanId): string {
    if (id === 'monthly') return m.sub_plan_monthly();
    if (id === 'yearly') return m.sub_plan_yearly();
    return m.sub_plan_lifetime();
  }

  async function startCheckout(planId: PlanId): Promise<void> {
    selectedPlan = planId;
    dialogOpen = true;
    mountError = '';

    if (!browser) return;
    if (!data.moyasarKey) {
      mountError = 'Moyasar publishable key not configured (PUBLIC_MOYASAR_PUBLISHABLE_KEY)';
      return;
    }

    const plan = data.plans.find((p) => p.id === planId);
    if (!plan) return;

    await tryMountMoyasar(planId, plan.amount);
  }

  // Docs: https://docs.moyasar.com/guides/card-payments/basic-integration/
  // and https://docs.moyasar.com/guides/references/form-configuration/
  // CDN pattern: https://cdn.moyasar.com/mpf/{version}/moyasar.js (+ moyasar.css).
  // TODO: verify latest version — pinned to 1.7.3 per docs (2026-04).
  const MOYASAR_VERSION = '1.7.3';

  async function tryMountMoyasar(planId: PlanId, amount: number): Promise<void> {
    try {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[data-moyasar-sdk="true"]'
      );
      if (!existing) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = `https://cdn.moyasar.com/mpf/${MOYASAR_VERSION}/moyasar.js`;
          s.async = true;
          s.dataset.moyasarSdk = 'true';
          s.onload = () => resolve();
          s.onerror = () => reject(new Error('failed to load SDK'));
          document.head.appendChild(s);
        });
        const cssExists = document.querySelector('link[data-moyasar-css="true"]');
        if (!cssExists) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = `https://cdn.moyasar.com/mpf/${MOYASAR_VERSION}/moyasar.css`;
          link.dataset.moyasarCss = 'true';
          document.head.appendChild(link);
        }
      }
      await new Promise((r) => setTimeout(r, 50));
      const w = window as unknown as {
        Moyasar?: {
          init: (opts: Record<string, unknown>) => void;
        };
      };
      if (!w.Moyasar) {
        mountError = 'Moyasar SDK not available';
        return;
      }
      w.Moyasar.init({
        element: '#moyasar-form',
        amount,
        currency: 'SAR',
        description: `Betakti Pro — ${planId}`,
        publishable_api_key: data.moyasarKey,
        callback_url: `${window.location.origin}/api/moyasar/callback?plan=${planId}`,
        methods: ['creditcard', 'applepay', 'stcpay'],
        supported_networks: ['visa', 'mastercard', 'mada'],
        metadata: { plan: planId, userId: data.userId }
      });
    } catch (e) {
      mountError = (e as Error).message ?? 'unable to mount';
    }
  }
</script>

<div class="relative isolate -m-4 sm:-m-6 lg:-m-8">
  <div class="bg-hero-mesh absolute inset-x-0 top-0 h-[520px] -z-10" aria-hidden="true"></div>

  <div class="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10 p-4 sm:p-6 lg:p-8">
    {#if data.status === 'success'}
      <div
        class="rounded-[14px] bg-[color-mix(in_srgb,var(--color-success)_14%,transparent)] border border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] text-[var(--color-success)] px-4 py-3 text-sm"
      >
        {m.sub_success()}
      </div>
    {:else if data.status === 'failed'}
      <div
        class="rounded-[14px] bg-[color-mix(in_srgb,var(--color-danger)_14%,transparent)] border border-[color-mix(in_srgb,var(--color-danger)_30%,transparent)] text-[var(--color-danger)] px-4 py-3 text-sm"
      >
        {m.sub_failed()}
      </div>
    {/if}

    <header class="text-center flex flex-col items-center gap-4 pt-6">
      <span
        class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase text-[var(--color-accent)]"
        style="font-family: var(--font-mono);"
      >
        <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
        Betakti Pro
        <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
      </span>
      <div
        class="w-16 h-16 rounded-[16px] flex items-center justify-center text-white shadow-[var(--shadow-2)]"
        style="background: var(--brand-gradient);"
      >
        <Sparkles size={28} />
      </div>
      <h1
        class="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] max-w-[22ch]"
        style="font-family: var(--font-display); letter-spacing: -0.02em;"
      >
        {m.sub_headline()}
      </h1>
      <p class="text-lg text-[var(--color-ink-2)] max-w-[52ch] leading-relaxed">{m.sub_headline_en()}</p>
      {#if data.isPro}
        <div class="mt-2"><ProBadge size="md" /></div>
      {/if}
    </header>

    <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {#each benefits as b}
        <Card>
          <div class="flex items-start gap-3">
            <div
              class="w-10 h-10 rounded-[10px] flex items-center justify-center text-white flex-none"
              style="background: var(--brand-gradient);"
            >
              <b.Icon size={18} />
            </div>
            <div>
              <h3 class="font-semibold mb-0.5">{b.t()}</h3>
              <p class="text-sm text-[var(--color-muted)]">{b.d()}</p>
            </div>
          </div>
        </Card>
      {/each}
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {#each data.plans as plan (plan.id)}
        <div
          class="relative rounded-[16px] p-5 sm:p-6 bg-[var(--color-surface)] border flex flex-col gap-5 transition-all hover:-translate-y-0.5 {plan.highlighted
            ? 'border-transparent shadow-[var(--shadow-3)] sm:scale-[1.03]'
            : 'border-[var(--color-border)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)]'}"
          style={plan.highlighted
            ? 'background-image: linear-gradient(var(--color-surface), var(--color-surface)), var(--brand-gradient); background-origin: border-box; background-clip: padding-box, border-box; border: 2px solid transparent;'
            : ''}
        >
          {#if plan.highlighted}
            <div
              class="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3 py-1 rounded-[999px] text-white shadow-[var(--shadow-1)] whitespace-nowrap"
              style="background: var(--brand-gradient);"
            >
              {m.sub_save_badge()}
            </div>
          {/if}
          <div class="flex flex-col gap-1">
            <h3 class="font-semibold text-base">{planLabel(plan.id)}</h3>
            <span class="text-[11px] tracking-wider uppercase text-[var(--color-muted)]" style="font-family: var(--font-mono);">
              {plan.id === 'lifetime' ? m.price_one_time() : plan.id === 'yearly' ? m.price_per_year() : m.price_per_month()}
            </span>
          </div>
          <div class="flex items-baseline gap-1.5">
            <span class="text-5xl font-bold" style="font-family: var(--font-display); letter-spacing: -0.02em;">{plan.displayAmount}</span>
            <span class="text-sm text-[var(--color-muted)]">SAR</span>
          </div>
          <Button
            variant={plan.highlighted ? 'gradient' : 'primary'}
            type="button"
            onclick={() => startCheckout(plan.id)}
          >
            {m.sub_subscribe()}
          </Button>
        </div>
      {/each}
    </section>

    <div class="text-center">
      <button
        type="button"
        class="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] underline"
      >
        {m.sub_restore()}
      </button>
    </div>
  </div>
</div>

<Dialog open={dialogOpen} onClose={() => (dialogOpen = false)} title={m.sub_subscribe()}>
  {#if mountError}
    <p class="text-sm text-[var(--color-danger)] mb-3">{mountError}</p>
    <p class="text-xs text-[var(--color-muted)]">
      TODO: configure <code>PUBLIC_MOYASAR_PUBLISHABLE_KEY</code> and verify Moyasar SDK integration.
    </p>
  {/if}
  <div id="moyasar-form" class="min-h-[220px]"></div>
  {#if selectedPlan}
    <p class="text-xs text-[var(--color-muted)] mt-3">Plan: {planLabel(selectedPlan)}</p>
  {/if}
</Dialog>
