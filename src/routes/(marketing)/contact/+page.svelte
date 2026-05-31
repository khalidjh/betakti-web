<script lang="ts">
  import { t, localizeHref } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import { SITE_URL } from '$lib/seo/config';
  import { breadcrumbList } from '$lib/seo/schema';

  const crumbs = $derived([
    { name: t('الرئيسية', 'Home'), href: '/' },
    { name: t('تواصل معنا', 'Contact'), href: '/contact' }
  ]);
  const jsonLd = $derived([
    breadcrumbList(crumbs.map((cr) => ({ name: cr.name, url: SITE_URL + localizeHref(cr.href) }))),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Betakti — Contact',
      url: SITE_URL + localizeHref('/contact')
    }
  ]);

  const SUPPORT_EMAIL = 'eiddesigner37@gmail.com';

  const channels = $derived([
    {
      icon: '✉️',
      title: t('الدعم عبر البريد', 'Email support'),
      desc: t('للاستفسارات والدعم الفني والاقتراحات.', 'For questions, support and suggestions.'),
      action: SUPPORT_EMAIL,
      href: `mailto:${SUPPORT_EMAIL}`
    },
    {
      icon: '𝕏',
      title: t('تويتر / اكس', 'Twitter / X'),
      desc: t('تابع آخر التحديثات والقوالب الجديدة.', 'Follow updates and new templates.'),
      action: '@betakti',
      href: 'https://twitter.com/betakti'
    },
    {
      icon: '📷',
      title: t('انستقرام', 'Instagram'),
      desc: t('أمثلة تصاميم وإلهام يومي.', 'Design examples and daily inspiration.'),
      action: '@betakti',
      href: 'https://instagram.com/betakti'
    }
  ]);
</script>

<Seo
  title={t('تواصل معنا — دعم Betakti', 'Contact us — Betakti support')}
  description={t(
    'تواصل مع فريق Betakti للدعم الفني والاستفسارات والاقتراحات. راسلنا عبر البريد أو تابعنا على تويتر وانستقرام.',
    'Get in touch with the Betakti team for support, questions and suggestions. Email us or follow us on Twitter and Instagram.'
  )}
  path="/contact"
  {jsonLd}
/>

<section class="relative isolate overflow-hidden">
  <div class="bg-hero-mesh absolute inset-x-0 top-0 h-[300px] -z-10 opacity-90" aria-hidden="true"></div>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
    <h1
      class="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05]"
      style="font-family: var(--font-display); letter-spacing: -0.02em;"
    >
      {t('تواصل معنا', 'Contact us')}
    </h1>
    <p class="mt-4 text-lg text-[var(--color-ink-2)] leading-relaxed">
      {t(
        'يسعدنا سماع رأيك. اختر الطريقة الأنسب للتواصل مع فريق Betakti.',
        'We’d love to hear from you. Choose the easiest way to reach the Betakti team.'
      )}
    </p>
  </div>
</section>

<section class="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {#each channels as ch (ch.title)}
      <a
        href={ch.href}
        target={ch.href.startsWith('http') ? '_blank' : undefined}
        rel={ch.href.startsWith('http') ? 'noreferrer' : undefined}
        class="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-border-strong)] transition-colors"
      >
        <div class="text-2xl mb-3" aria-hidden="true">{ch.icon}</div>
        <h2 class="font-semibold text-[var(--color-ink)]">{ch.title}</h2>
        <p class="mt-1 text-sm text-[var(--color-ink-2)] leading-relaxed">{ch.desc}</p>
        <div class="mt-3 text-sm font-medium text-[var(--color-accent)]">{ch.action}</div>
      </a>
    {/each}
  </div>
</section>
