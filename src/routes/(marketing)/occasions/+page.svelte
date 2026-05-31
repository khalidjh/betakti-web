<script lang="ts">
  import { getLocale, t, localizeHref } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import AppStoreButtons from '$lib/components/app-store-buttons.svelte';
  import { SITE_URL } from '$lib/seo/config';
  import { breadcrumbList } from '$lib/seo/schema';
  import { OCCASION_PAGES } from '$lib/seo/occasions-content';

  const locale = $derived(getLocale() as 'ar' | 'en');

  const crumbs = $derived([
    { name: t('الرئيسية', 'Home'), href: '/' },
    { name: t('المناسبات', 'Occasions'), href: '/occasions' }
  ]);
  const jsonLd = $derived(
    breadcrumbList(crumbs.map((cr) => ({ name: cr.name, url: SITE_URL + localizeHref(cr.href) })))
  );
</script>

<Seo
  title={t('تصاميم المناسبات والأعمال — رمضان، العيد، العروض والمزيد', 'Occasion & business designs — Ramadan, Eid, offers & more')}
  description={t(
    'صمم تهاني وبطاقات وإعلانات بالعربي: رمضان، عيد الفطر، عيد الأضحى، التخرج، الزفاف، عروض الأعمال والإعلانات — قوالب جاهزة وخطوط مميزة.',
    'Design greetings, cards and ads in Arabic: Ramadan, Eid al-Fitr, Eid al-Adha, graduation, weddings, business offers and announcements — ready templates and beautiful fonts.'
  )}
  path="/occasions"
  {jsonLd}
/>

<section class="relative isolate overflow-hidden">
  <div class="bg-hero-mesh absolute inset-x-0 top-0 h-[360px] -z-10 opacity-90" aria-hidden="true"></div>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <h1
      class="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05]"
      style="font-family: var(--font-display); letter-spacing: -0.02em;"
    >
      {t('تصاميم المناسبات', 'Occasion designs')}
    </h1>
    <p class="mt-3 text-lg text-[var(--color-ink-2)] max-w-[60ch] leading-relaxed">
      {t(
        'تهاني وبطاقات جاهزة لكل مناسبة — اختر المناسبة وابدأ التصميم بخطوط عربية وإسلامية أصيلة.',
        'Ready greetings and cards for every occasion — pick an occasion and start designing with authentic Arabic & Islamic fonts.'
      )}
    </p>
    <div class="mt-5">
      <AppStoreButtons size="sm" />
    </div>
  </div>
</section>

<section class="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each OCCASION_PAGES as o (o.slug)}
      {@const cc = locale === 'en' ? o.en : o.ar}
      <a
        href={localizeHref(`/occasions/${o.slug}`)}
        class="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-border-strong)] transition-colors"
      >
        <div class="text-[11px] font-medium tracking-[0.1em] uppercase text-[var(--color-accent)] mb-2" style="font-family: var(--font-mono);">
          {cc.eyebrow}
        </div>
        <h2 class="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
          {cc.h1}
        </h2>
        <p class="mt-1.5 text-sm text-[var(--color-ink-2)] leading-relaxed line-clamp-2">{cc.intro}</p>
      </a>
    {/each}
  </div>
</section>
