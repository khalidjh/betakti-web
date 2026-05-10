<script lang="ts">
  import { m } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import Accordion from '$lib/components/accordion.svelte';
  import { reveal } from '$lib/actions/reveal';

  const tiers = [
    {
      id: 'monthly' as const,
      price: m.price_monthly_price(),
      period: m.price_per_month(),
      highlighted: false
    },
    {
      id: 'yearly' as const,
      price: m.price_yearly_price(),
      period: m.price_per_year(),
      highlighted: true
    },
    {
      id: 'lifetime' as const,
      price: m.price_lifetime_price(),
      period: m.price_one_time(),
      highlighted: false
    }
  ];

  function planLabel(id: 'monthly' | 'yearly' | 'lifetime'): string {
    if (id === 'monthly') return m.sub_plan_monthly();
    if (id === 'yearly') return m.sub_plan_yearly();
    return m.sub_plan_lifetime();
  }

  const faq = [
    { q: m.price_faq_1_q(), a: m.price_faq_1_a() },
    { q: m.price_faq_2_q(), a: m.price_faq_2_a() },
    { q: m.price_faq_3_q(), a: m.price_faq_3_a() },
    { q: m.price_faq_4_q(), a: m.price_faq_4_a() },
    { q: m.price_faq_5_q(), a: m.price_faq_5_a() },
    { q: m.price_faq_6_q(), a: m.price_faq_6_a() }
  ];
</script>

<svelte:head>
  <title>{m.page_pricing_title()} · Betakti</title>
  <meta name="description" content={m.sub_headline()} />
  <meta property="og:title" content="{m.page_pricing_title()} · Betakti" />
  <meta property="og:description" content={m.sub_headline()} />
  <meta property="og:image" content="/brand/logo.png" />
</svelte:head>

<section class="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
  <header use:reveal class="text-center flex flex-col gap-4 items-center mb-10 sm:mb-16">
    <span
      class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
      style="font-family: var(--font-mono);"
    >
      <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
      {m.page_pricing_title()}
    </span>
    <h1
      class="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] max-w-[22ch]"
      style="font-family: var(--font-display); letter-spacing: -0.02em;"
    >
      {m.sub_headline()}
    </h1>
    <p class="text-lg text-[var(--color-ink-2)] max-w-[52ch] leading-relaxed">{m.sub_headline_en()}</p>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 sm:mb-16">
    {#each tiers as tier (tier.id)}
      <div
        use:reveal={{ delay: 60 }}
        class="relative rounded-[14px] p-5 sm:p-6 bg-[var(--color-surface)] flex flex-col gap-4 {tier.highlighted
          ? 'border-transparent shadow-[var(--shadow-2)]'
          : 'border border-[var(--color-border)] shadow-[var(--shadow-1)]'}"
        style={tier.highlighted
          ? 'background-image: linear-gradient(var(--color-surface), var(--color-surface)), var(--brand-gradient); background-origin: border-box; background-clip: padding-box, border-box; border: 2px solid transparent;'
          : ''}
      >
        {#if tier.highlighted}
          <div
            class="absolute -top-3 start-5 text-xs font-bold px-2 py-0.5 rounded-[999px] text-white"
            style="background: var(--brand-gradient);"
          >
            {m.sub_save_badge()}
          </div>
        {/if}
        <h3 class="font-semibold text-lg">{planLabel(tier.id)}</h3>
        <div class="flex items-baseline gap-1">
          <span class="text-4xl font-bold">{tier.price}</span>
          <span class="text-sm text-[var(--color-muted)]">{m.price_currency()}</span>
        </div>
        <span class="text-xs text-[var(--color-muted)]">{tier.period}</span>
        <Button
          variant={tier.highlighted ? 'gradient' : 'secondary'}
          href="/auth/register?next=/subscription"
        >
          {m.sub_subscribe()}
        </Button>
      </div>
    {/each}
  </div>

  <section use:reveal class="max-w-3xl mx-auto">
    <h2 class="text-2xl md:text-3xl font-bold mb-6" style="font-family: var(--font-display);">
      {m.price_faq_heading()}
    </h2>
    <Accordion items={faq} />
  </section>
</section>
