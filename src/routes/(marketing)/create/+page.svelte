<script lang="ts">
  import { getLocale, t, localizeHref } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import AppStoreButtons from '$lib/components/app-store-buttons.svelte';
  import { SITE_URL } from '$lib/seo/config';
  import { breadcrumbList } from '$lib/seo/schema';
  import { PLATFORM_PAGES } from '$lib/seo/landings';

  const locale = $derived(getLocale() as 'ar' | 'en');

  const crumbs = $derived([
    { name: t('الرئيسية', 'Home'), href: '/' },
    { name: t('تصميم لكل منصة', 'Create for platforms'), href: '/create' }
  ]);
  const jsonLd = $derived(
    breadcrumbList(crumbs.map((cr) => ({ name: cr.name, url: SITE_URL + localizeHref(cr.href) })))
  );
</script>

<Seo
  title={t('تصميم لكل منصة — انستقرام، واتساب، تيك توك والمزيد', 'Create for every platform — Instagram, WhatsApp, TikTok & more')}
  description={t(
    'صمم بوستات وستوري احترافية بالعربي لكل منصات التواصل: انستقرام، واتساب، سناب شات، تيك توك، يوتيوب وأكثر — بمقاسات جاهزة وقوالب مميزة.',
    'Design professional Arabic posts and stories for every social platform: Instagram, WhatsApp, Snapchat, TikTok, YouTube and more — with ready sizes and great templates.'
  )}
  path="/create"
  {jsonLd}
/>

<section class="relative isolate overflow-hidden">
  <div class="bg-hero-mesh absolute inset-x-0 top-0 h-[360px] -z-10 opacity-90" aria-hidden="true"></div>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <h1
      class="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05]"
      style="font-family: var(--font-display); letter-spacing: -0.02em;"
    >
      {t('تصميم لكل منصة', 'Create for every platform')}
    </h1>
    <p class="mt-3 text-lg text-[var(--color-ink-2)] max-w-[60ch] leading-relaxed">
      {t(
        'اختر المنصة وابدأ من المقاس الصحيح والقوالب الجاهزة — بالعربي وبدعم كامل للكتابة من اليمين لليسار.',
        'Choose your platform and start from the right size and ready-made templates — in Arabic with full right-to-left support.'
      )}
    </p>
    <div class="mt-5">
      <AppStoreButtons size="sm" />
    </div>
  </div>
</section>

<section class="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each PLATFORM_PAGES as p (p.slug)}
      {@const cc = locale === 'en' ? p.en : p.ar}
      <a
        href={localizeHref(`/create/${p.slug}`)}
        class="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-border-strong)] transition-colors"
      >
        <div class="text-[11px] font-medium tracking-[0.1em] uppercase text-[var(--color-accent)] mb-2" style="font-family: var(--font-mono);">
          {locale === 'en' ? p.sizeEn : p.sizeAr}
        </div>
        <h2 class="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
          {cc.h1}
        </h2>
        <p class="mt-1.5 text-sm text-[var(--color-ink-2)] leading-relaxed line-clamp-2">{cc.intro}</p>
      </a>
    {/each}
  </div>
</section>
