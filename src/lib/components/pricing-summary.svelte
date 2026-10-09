<script lang="ts">
  import { m, t, localizeHref } from '$lib/i18n';
  import AppStoreButtons from '$lib/components/app-store-buttons.svelte';
  import { APP_PRICE_MONTHLY_USD, APP_PRICE_YEARLY_USD } from '$lib/seo/config';

  interface Props {
    /** Constrain width / spacing for embedding inside landing pages. */
    compact?: boolean;
  }
  const { compact = false }: Props = $props();

  const webPlans = [
    { label: () => m.sub_plan_monthly(), price: () => m.price_monthly_price() },
    { label: () => m.sub_plan_yearly(), price: () => m.price_yearly_price() },
    { label: () => m.sub_plan_lifetime(), price: () => m.price_lifetime_price() }
  ];
  const appPlans = [
    { label: () => m.sub_plan_monthly(), price: APP_PRICE_MONTHLY_USD },
    { label: () => m.sub_plan_yearly(), price: APP_PRICE_YEARLY_USD }
  ];
</script>

<section class="{compact ? 'max-w-5xl' : 'max-w-5xl'} mx-auto px-4 sm:px-6 py-10 sm:py-14">
  <h2
    class="text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-2"
    style="font-family: var(--font-display); letter-spacing: -0.01em;"
  >
    {t('أسعار بسيطة وواضحة', 'Simple, clear pricing')}
  </h2>
  <p class="text-[var(--color-ink-2)] mb-8 max-w-[60ch]">
    {t(
      'التطبيق مجاني، وبرو يفتح كل القوالب والخطوط بدون علامة مائية.',
      'The app is free; Pro unlocks every template and font, with no watermark.'
    )}
  </p>

  <!-- Web plans are hidden until web subscriptions are ready. -->
  <div class="grid grid-cols-1 gap-4 max-w-xl">
    <!-- App -->
    <div class="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 flex flex-col gap-4">
      <div class="flex items-center justify-between gap-2">
        <h3 class="font-semibold text-[var(--color-ink)]">{t('على تطبيق الجوال', 'On the mobile app')}</h3>
        <span class="text-[11px] font-medium uppercase tracking-wide text-[var(--color-muted)]" style="font-family: var(--font-mono);">USD</span>
      </div>
      <ul class="flex flex-col gap-2.5">
        {#each appPlans as plan (plan.label())}
          <li class="flex items-baseline justify-between border-b border-[var(--color-border)] pb-2 last:border-0 last:pb-0">
            <span class="text-sm text-[var(--color-ink-2)]">{plan.label()}</span>
            <span class="font-semibold text-[var(--color-ink)]">${plan.price}</span>
          </li>
        {/each}
      </ul>
      <AppStoreButtons size="sm" />
    </div>
  </div>

  <div class="mt-5">
    <a href={localizeHref('/pricing')} class="text-sm text-[var(--color-accent)] hover:underline font-medium">
      {t('عرض كل التفاصيل والمزايا ←', 'See full pricing & features →')}
    </a>
  </div>
</section>
