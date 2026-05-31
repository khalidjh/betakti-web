<script lang="ts">
  import { m, getLocale, localizeHref, t } from '$lib/i18n';
  import Button from '$lib/components/button.svelte';
  import AppStoreButtons from '$lib/components/app-store-buttons.svelte';
  import FeatureCard from '$lib/components/feature-card.svelte';
  import TemplateCard from '$lib/components/template-card.svelte';
  import Seo from '$lib/components/seo.svelte';
  import { organization, webSite, softwareApplication } from '$lib/seo/schema';
  import { APP_PRICE_MONTHLY_USD, APP_PRICE_YEARLY_USD } from '$lib/seo/config';
  import { reveal } from '$lib/actions/reveal';
  import type { PageData } from './$types';

  import { page } from '$app/state';
  const { data }: { data: PageData } = $props();
  const isRtl = $derived(page.data.locale === 'ar');
  const locale = $derived(getLocale() as 'ar' | 'en');

  const homeJsonLd = $derived([organization(), webSite(locale), softwareApplication(locale)]);

  const pricingTiers = [
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
</script>

<Seo
  title="Betakti · {m.marketing_hero_headline()}"
  description={m.marketing_hero_sub()}
  path="/"
  includeBrand={false}
  jsonLd={homeJsonLd}
/>

<!-- Hero -->
<section class="relative overflow-hidden isolate">
  <!-- Soft gradient mesh backdrop -->
  <div class="bg-hero-mesh absolute inset-0 -z-10" aria-hidden="true"></div>

  <div
    dir={isRtl ? 'rtl' : 'ltr'}
    class="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center"
  >
    <!-- Left: copy -->
    <div class="flex flex-col gap-6 text-start" use:reveal>
      <span
        class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
        style="font-family: var(--font-mono);"
      >
        <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
        {m.marketing_hero_eyebrow()}
      </span>

      <h1
        class="font-bold text-[clamp(2.75rem,6.5vw,5.25rem)]"
        style="font-family: var(--font-display); letter-spacing: -0.02em; line-height: {isRtl ? 1.35 : 1.02};"
      >
        {m.marketing_hero_headline_lead()}
        <br />
        <span
          class="font-semibold inline-block"
          class:italic={!isRtl}
          style="background: var(--brand-gradient); -webkit-background-clip: text; background-clip: text; color: transparent; {isRtl ? 'margin-top: 0.1em;' : ''}"
        >
          {m.marketing_hero_headline_italic()}
        </span>
      </h1>

      <p class="text-lg md:text-xl text-[var(--color-ink-2)] max-w-[46ch] leading-relaxed">
        {m.marketing_hero_sub()}
      </p>

      <div class="flex flex-wrap items-center gap-3">
        <Button variant="gradient" href={localizeHref('/auth/register')}>{m.marketing_hero_cta_primary()}</Button>
        <Button variant="ghost" href={localizeHref('/templates')}>{m.marketing_hero_cta_secondary()} →</Button>
      </div>

      <div class="flex flex-col gap-2">
        <span class="text-xs font-medium text-[var(--color-muted)]">{t('أو حمّل التطبيق مجاناً', 'Or download the free app')}</span>
        <AppStoreButtons size="sm" />
      </div>

      <p class="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
        <svg
          class="w-3.5 h-3.5 text-[var(--color-teal)]"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M10 2 L3 5 V10 C3 14 6 17 10 18 C14 17 17 14 17 10 V5 Z" />
          <path d="M7 10 L9 12 L13 8" />
        </svg>
        {m.marketing_hero_note_free()}
      </p>
    </div>

    <!-- Right: floating composition (hidden on mobile — overlap at <768px) -->
    <div use:reveal={{ delay: 120 }} class="hidden md:block relative w-full h-[440px] md:h-[480px]">
      <!-- Card 1: Eid Mubarak poster -->
      <div
        class="absolute top-5 start-0 w-[220px] p-5 rounded-[14px] bg-[var(--color-surface)]"
        style="transform: rotate(-5deg); box-shadow: 0 20px 50px rgba(11, 13, 23, 0.14), 0 6px 14px rgba(11, 13, 23, 0.08); font-family: var(--font-display);"
      >
        <div
          class="aspect-square rounded-[8px] mb-3.5 flex items-center justify-center text-white text-[32px] leading-none p-2 text-center"
          style="background: linear-gradient(135deg, var(--color-accent), var(--color-violet)); font-weight: 600;"
        >
          عيد<br />مبارك
        </div>
        <div class="text-[15px] leading-tight text-[var(--color-ink)]" style="font-family: var(--font-sans); font-weight: 600;">
          {m.marketing_hero_card_eid_sub()}
        </div>
        <div class="text-[10px] mt-1 text-[var(--color-muted)] tracking-wider" style="font-family: var(--font-mono);">
          1080 × 1080
        </div>
      </div>

      <!-- Card 2: AI Styled offer -->
      <div
        class="absolute top-20 end-5 w-[180px] p-[18px] rounded-[14px] flex flex-col gap-2.5 text-white"
        style="transform: rotate(6deg); background: var(--brand-gradient); box-shadow: 0 20px 50px rgba(11, 13, 23, 0.18), 0 6px 14px rgba(11, 13, 23, 0.1); font-family: var(--font-display);"
      >
        <span
          class="inline-flex items-center gap-1 self-start px-2 py-[3px] rounded-full text-[10px] tracking-wider"
          style="background: rgba(255, 255, 255, 0.22); font-family: var(--font-sans); font-weight: 500;"
        >
          ✦ {m.marketing_hero_card_ai()}
        </span>
        <div class="text-[40px] leading-none" style="letter-spacing: -0.02em; font-weight: 600;">30%</div>
        <div class="text-[11px] leading-snug opacity-95" style="font-family: var(--font-sans); font-weight: 500;">
          {m.marketing_hero_card_offer_sub()}
        </div>
      </div>

      <!-- Card 3: Presence indicator -->
      <div
        class="absolute bottom-3 end-0 flex items-center gap-2.5 px-4 py-3 rounded-[14px] bg-[var(--color-surface)]"
        style="transform: rotate(-4deg); box-shadow: 0 20px 50px rgba(11, 13, 23, 0.14), 0 6px 14px rgba(11, 13, 23, 0.08); font-family: var(--font-sans);"
      >
        <span class="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] flex-shrink-0"></span>
        <span class="text-[12px] leading-tight text-[var(--color-ink)] font-medium">
          {m.marketing_hero_presence()}
        </span>
      </div>

      <!-- Subtle glow behind composition -->
      <div
        class="absolute inset-0 -z-10 pointer-events-none"
        style="background: radial-gradient(ellipse 400px 300px at 50% 50%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 70%);"
        aria-hidden="true"
      ></div>
    </div>
  </div>

  <!-- Trusted-by strip -->
  <div
    class="border-t border-[var(--color-border)]"
    use:reveal={{ delay: 200 }}
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
      <span
        class="text-[11px] tracking-[0.16em] text-[var(--color-muted)]"
        style="font-family: var(--font-mono); font-weight: 500;"
      >
        {m.marketing_hero_trusted()}
      </span>
    </div>
  </div>
</section>

<!-- Feature highlights: alternating rows -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
  <div use:reveal class="text-center mb-10 sm:mb-16 flex flex-col gap-3 items-center">
    <span
      class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
      style="font-family: var(--font-mono);"
    >
      <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
      {m.marketing_features_title()}
    </span>
    <h2
      class="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] max-w-[24ch]"
      style="font-family: var(--font-display); letter-spacing: -0.015em;"
    >
      {m.marketing_features_title()}
    </h2>
  </div>

  <!-- Row 1: text left, visual right -->
  <div use:reveal class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center py-8 sm:py-12 md:py-16">
    <div class="flex flex-col gap-5 text-start">
      <span
        class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
        style="font-family: var(--font-mono);"
      >
        <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
        {m.marketing_feature_1_eyebrow()}
      </span>
      <h3
        class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.1]"
        style="font-family: var(--font-display); letter-spacing: -0.015em;"
      >
        {m.marketing_feature_1_t()}
      </h3>
      <p class="text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-[44ch]">
        {m.marketing_feature_1_d()}
      </p>
    </div>

    <!-- Type-sample visual card -->
    <div
      class="rounded-[20px] p-6 sm:p-10 md:p-12 border border-[var(--color-border)] shadow-[var(--shadow-2)] flex flex-col gap-6 sm:gap-8"
      style="background: var(--brand-gradient-soft);"
    >
      <div class="flex flex-col gap-2">
        <span
          class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]"
          style="font-family: var(--font-mono);"
        >
          English · Cabinet Grotesk
        </span>
        <span
          class="text-4xl md:text-5xl leading-[1.05] text-[var(--color-ink)]"
          style="font-family: var(--font-display); font-weight: 700; letter-spacing: -0.015em;"
        >
          Design, beautifully.
        </span>
      </div>
      <div class="h-px bg-[var(--color-border)]"></div>
      <div class="flex flex-col gap-2" dir="rtl">
        <span
          class="text-[10px] tracking-[0.16em] uppercase text-[var(--color-muted)]"
          style="font-family: var(--font-mono);"
        >
          العربية · IBM Plex Sans Arabic
        </span>
        <span
          class="text-4xl md:text-5xl leading-[1.2] text-[var(--color-ink)]"
          style="font-family: var(--font-arabic); font-weight: 600;"
        >
          صمّم ببساطة وجمال
        </span>
      </div>
    </div>
  </div>

  <!-- Row 2: visual left, text right -->
  <div use:reveal class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center py-8 sm:py-12 md:py-16">
    <!-- Canvas mockup visual -->
    <div
      class="order-2 md:order-1 relative rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-2)] p-6 sm:p-8 md:p-10 flex items-center justify-center aspect-[4/3] overflow-hidden"
    >
      <div
        class="absolute inset-0 opacity-60"
        style="background: var(--brand-gradient-soft);"
        aria-hidden="true"
      ></div>
      <!-- Layered mock cards -->
      <div class="relative w-full max-w-[260px]">
        <div
          class="absolute -top-3 -start-3 w-[150px] h-[90px] rounded-[12px] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-1)] flex items-center justify-center text-[var(--color-ink)]"
          style="transform: rotate(-6deg); font-family: var(--font-display); font-weight: 700; font-size: 22px;"
        >
          Aa
        </div>
        <div
          class="relative mx-auto w-full aspect-square rounded-[14px] shadow-[var(--shadow-2)] overflow-hidden flex items-center justify-center text-white"
          style="background: var(--brand-gradient); font-family: var(--font-display); font-size: 60px; font-weight: 700;"
        >
          ✦
        </div>
        <div
          class="absolute -bottom-3 -end-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-[10px] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-1)] text-[11px] font-medium text-[var(--color-ink-2)]"
          style="transform: rotate(4deg); font-family: var(--font-sans);"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span>
          3 layers
        </div>
      </div>
    </div>
    <div class="order-1 md:order-2 flex flex-col gap-5 text-start">
      <span
        class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-teal)]"
        style="font-family: var(--font-mono);"
      >
        <span class="inline-block w-6 h-px bg-[var(--color-teal)]" aria-hidden="true"></span>
        {m.marketing_feature_2_eyebrow()}
      </span>
      <h3
        class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.1]"
        style="font-family: var(--font-display); letter-spacing: -0.015em;"
      >
        {m.marketing_feature_2_t()}
      </h3>
      <p class="text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-[44ch]">
        {m.marketing_feature_2_d()}
      </p>
    </div>
  </div>

  <!-- Row 3: text left, visual right -->
  <div use:reveal class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center py-8 sm:py-12 md:py-16">
    <div class="flex flex-col gap-5 text-start">
      <span
        class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-accent)]"
        style="font-family: var(--font-mono);"
      >
        <span class="inline-block w-6 h-px bg-[var(--color-accent)]" aria-hidden="true"></span>
        {m.marketing_feature_3_eyebrow()}
      </span>
      <h3
        class="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.1]"
        style="font-family: var(--font-display); letter-spacing: -0.015em;"
      >
        {m.marketing_feature_3_t()}
      </h3>
      <p class="text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-[44ch]">
        {m.marketing_feature_3_d()}
      </p>
    </div>

    <!-- Export-size tiles visual -->
    <div class="grid grid-cols-3 gap-3">
      {#each [
        { label: 'Instagram', ratio: '1:1', bg: 'linear-gradient(135deg, var(--color-accent), var(--color-violet))' },
        { label: 'Story', ratio: '9:16', bg: 'linear-gradient(135deg, var(--color-teal), var(--color-accent))' },
        { label: 'Reel cover', ratio: '9:16', bg: 'linear-gradient(135deg, var(--color-violet), var(--color-accent))' },
        { label: 'Print A4', ratio: '210×297', bg: 'var(--color-surface-2)', dark: false },
        { label: 'Twitter', ratio: '16:9', bg: 'linear-gradient(135deg, var(--color-teal), var(--color-violet))' },
        { label: 'Poster', ratio: '48×72', bg: 'var(--color-surface-2)', dark: false }
      ] as tile, i (tile.label)}
        <div
          class="aspect-square rounded-[12px] border border-[var(--color-border)] shadow-[var(--shadow-1)] flex flex-col justify-end p-3"
          style="background: {tile.bg};"
        >
          <div
            class="text-[11px] leading-tight {tile.dark === false
              ? 'text-[var(--color-ink-2)]'
              : 'text-white/95'}"
            style="font-family: var(--font-sans); font-weight: 600;"
          >
            {tile.label}
          </div>
          <div
            class="text-[9px] tracking-wider {tile.dark === false
              ? 'text-[var(--color-muted)]'
              : 'text-white/70'}"
            style="font-family: var(--font-mono);"
          >
            {tile.ratio}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Template gallery preview -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
  <div use:reveal class="flex items-end justify-between mb-6">
    <h2 class="text-2xl md:text-3xl font-bold" style="font-family: var(--font-display);">
      {m.marketing_templates_heading()}
    </h2>
    <a
      href={localizeHref('/templates')}
      class="text-sm text-[var(--color-accent)] hover:underline font-medium"
    >
      {m.marketing_templates_see_all()} →
    </a>
  </div>
  {#if data.previews.length > 0}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" use:reveal>
      {#each data.previews as tpl (tpl.id)}
        <TemplateCard template={tpl} {locale} />
      {/each}
    </div>
  {:else}
    <!-- Placeholder grid of gradient tiles if Firestore unreachable at build time -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" use:reveal>
      {#each [1, 2, 3, 4, 5, 6, 7, 8] as n (n)}
        <div
          class="aspect-square rounded-[14px] border border-[var(--color-border)] shadow-[var(--shadow-1)]"
          style="background: linear-gradient({(n * 45) % 360}deg, var(--color-teal), var(--color-violet));"
        ></div>
      {/each}
    </div>
  {/if}
</section>

<!-- Pricing strip -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
  <div use:reveal class="text-center mb-8">
    <h2 class="text-3xl md:text-4xl font-bold" style="font-family: var(--font-display);">
      {m.marketing_pricing_heading()}
    </h2>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
    {#each pricingTiers as tier (tier.id)}
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
        <h3 class="font-semibold">{planLabel(tier.id)}</h3>
        <div class="flex items-baseline gap-1">
          <span class="text-4xl font-bold">{tier.price}</span>
          <span class="text-sm text-[var(--color-muted)]">{m.price_currency()}</span>
        </div>
        <span class="text-xs text-[var(--color-muted)]">{tier.period}</span>
        <Button
          variant={tier.highlighted ? 'gradient' : 'secondary'}
          href={localizeHref('/auth/register?next=/subscription')}
        >
          {m.marketing_pricing_cta()}
        </Button>
      </div>
    {/each}
  </div>

  <!-- Mobile app pricing -->
  <div use:reveal class="max-w-4xl mx-auto mt-6 rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div class="flex flex-col gap-1">
      <span class="font-semibold text-[var(--color-ink)]">{t('متوفر أيضاً على تطبيق الجوال', 'Also available on the mobile app')}</span>
      <span class="text-sm text-[var(--color-ink-2)]">
        {t(
          `${m.sub_plan_monthly()}: $${APP_PRICE_MONTHLY_USD} · ${m.sub_plan_yearly()}: $${APP_PRICE_YEARLY_USD}`,
          `${m.sub_plan_monthly()}: $${APP_PRICE_MONTHLY_USD} · ${m.sub_plan_yearly()}: $${APP_PRICE_YEARLY_USD}`
        )}
      </span>
    </div>
    <AppStoreButtons size="sm" />
  </div>

  <div use:reveal class="text-center mt-6">
    <a href={localizeHref('/pricing')} class="text-sm text-[var(--color-accent)] hover:underline font-medium">
      {t('عرض كل التفاصيل', 'See full pricing')} →
    </a>
  </div>
</section>

<!-- Stats row -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
  <div
    use:reveal
    class="on-soft grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-[20px] p-6 sm:p-8 text-center"
    style="background: var(--brand-gradient-soft);"
  >
    <div>
      <div class="text-2xl md:text-3xl font-bold">{m.marketing_stats_designs()}</div>
    </div>
    <div>
      <div class="text-2xl md:text-3xl font-bold">{m.marketing_stats_fonts()}</div>
    </div>
    <div>
      <!-- TODO: replace with verified app-store rating once publicly available -->
      <div class="text-2xl md:text-3xl font-bold">{m.marketing_stats_rating()}</div>
    </div>
  </div>
</section>

<!-- Final CTA -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
  <div
    use:reveal
    class="on-soft rounded-[20px] p-6 sm:p-10 md:p-14 flex flex-col items-center gap-5 text-center"
    style="background: var(--brand-gradient-soft);"
  >
    <h2
      class="text-3xl md:text-4xl font-bold max-w-[28ch]"
      style="font-family: var(--font-display);"
    >
      {m.marketing_final_cta_title()}
    </h2>
    <p class="max-w-[48ch]">{m.marketing_final_cta_sub()}</p>
    <Button variant="gradient" href={localizeHref('/auth/register')}>{m.marketing_final_cta_button()}</Button>
    <AppStoreButtons class="justify-center mt-2" />
  </div>
</section>
