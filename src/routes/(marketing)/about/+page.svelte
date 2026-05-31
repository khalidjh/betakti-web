<script lang="ts">
  import { getLocale, t, localizeHref } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import Button from '$lib/components/button.svelte';
  import AppStoreButtons from '$lib/components/app-store-buttons.svelte';
  import { SITE_URL } from '$lib/seo/config';
  import { breadcrumbList, organization } from '$lib/seo/schema';

  const locale = $derived(getLocale() as 'ar' | 'en');

  const crumbs = $derived([
    { name: t('الرئيسية', 'Home'), href: '/' },
    { name: t('عن Betakti', 'About'), href: '/about' }
  ]);
  const jsonLd = $derived([
    organization(),
    breadcrumbList(crumbs.map((cr) => ({ name: cr.name, url: SITE_URL + localizeHref(cr.href) })))
  ]);

  const stats = [
    { value: '40,000+', ar: 'مصمم ومبدع', en: 'creators & studios' },
    { value: '60+', ar: 'خط عربي', en: 'Arabic fonts' },
    { value: '10K+', ar: 'تصميم', en: 'designs created' },
    { value: '4.8★', ar: 'تقييم المستخدمين', en: 'user rating' }
  ];
</script>

<Seo
  title={t('عن Betakti — استوديو التصميم العربي', 'About Betakti — the Arabic-first design studio')}
  description={t(
    'Betakti استوديو تصميم عربي أولاً يساعد صناع المحتوى وأصحاب الأعمال على تصميم بوستات وستوري احترافية بسهولة، بخطوط عربية وإسلامية وقوالب جاهزة.',
    'Betakti is an Arabic-first design studio that helps creators and businesses design professional posts and stories with ease — with Arabic & Islamic fonts and ready templates.'
  )}
  path="/about"
  {jsonLd}
/>

<section class="relative isolate overflow-hidden">
  <div class="bg-hero-mesh absolute inset-x-0 top-0 h-[360px] -z-10 opacity-90" aria-hidden="true"></div>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <h1
      class="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05]"
      style="font-family: var(--font-display); letter-spacing: -0.02em;"
    >
      {t('صُنع لصنّاع المحتوى العرب', 'Made for Arabic creators')}
    </h1>
    <p class="mt-4 text-lg text-[var(--color-ink-2)] leading-relaxed">
      {t(
        'Betakti (بطاقتي) هو استوديو تصميم عربي أولاً يجعل تصميم بوستات وستوري احترافية في متناول الجميع — بدون خبرة سابقة وبدون برامج معقدة.',
        'Betakti (بطاقتي) is an Arabic-first design studio that puts professional post and story design within everyone’s reach — no prior experience and no complex software.'
      )}
    </p>
  </div>
</section>

<section class="max-w-3xl mx-auto px-4 sm:px-6 pb-6">
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {#each stats as s (s.value)}
      <div class="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center">
        <div class="text-2xl font-bold" style="font-family: var(--font-display);">{s.value}</div>
        <div class="text-xs text-[var(--color-muted)] mt-1">{locale === 'en' ? s.en : s.ar}</div>
      </div>
    {/each}
  </div>
</section>

<section class="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6 text-[var(--color-ink-2)] leading-relaxed">
  <div>
    <h2 class="text-xl font-bold text-[var(--color-ink)] mb-2" style="font-family: var(--font-display);">
      {t('مهمتنا', 'Our mission')}
    </h2>
    <p>
      {t(
        'نؤمن أن المحتوى العربي يستحق أدوات تصميم تحترم لغته. لذلك بنينا Betakti حول العربية أولاً: تشكيل دقيق، كتابة من اليمين لليسار بشكل طبيعي، وعشرات الخطوط العربية والإسلامية الأصيلة — كل ذلك في محرر سهل وسريع.',
        'We believe Arabic content deserves design tools that respect its language. That’s why we built Betakti Arabic-first: precise diacritics, natural right-to-left typesetting, and dozens of authentic Arabic & Islamic fonts — all in a fast, easy editor.'
      )}
    </p>
  </div>
  <div>
    <h2 class="text-xl font-bold text-[var(--color-ink)] mb-2" style="font-family: var(--font-display);">
      {t('ماذا تستطيع أن تصمم', 'What you can create')}
    </h2>
    <p>
      {t(
        'بوستات وستوري لانستقرام وواتساب وسناب شات وتيك توك ويوتيوب، تهاني المناسبات مثل رمضان والعيد والتخرج، دعوات الزفاف، وتصاميم الأعمال والعروض والإعلانات — كلها من المتصفح وبدون أي تطبيق.',
        'Posts and stories for Instagram, WhatsApp, Snapchat, TikTok and YouTube; occasion greetings for Ramadan, Eid and graduation; wedding invitations; and business, offer and announcement designs — all in the browser with no app.'
      )}
    </p>
  </div>

  <div class="flex flex-wrap gap-3 pt-2">
    <Button variant="gradient" href={localizeHref('/auth/register')}>{t('ابدأ مجاناً', 'Start free')}</Button>
    <Button variant="ghost" href={localizeHref('/contact')}>{t('تواصل معنا', 'Contact us')} →</Button>
  </div>

  <div class="flex flex-col gap-2 pt-2">
    <span class="text-xs font-medium text-[var(--color-muted)]">{t('حمّل تطبيق Betakti', 'Download the Betakti app')}</span>
    <AppStoreButtons size="sm" />
  </div>
</section>
