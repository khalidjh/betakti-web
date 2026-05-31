import {
  SITE_URL,
  LOGO_IMAGE,
  APP_DOWNLOAD_URL,
  APP_PRICE_MONTHLY_USD,
  APP_PRICE_YEARLY_USD,
  APP_PRICE_CURRENCY
} from './config';

/** Reusable JSON-LD builders. All return plain objects for the <Seo> component. */

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url
    }))
  };
}

export function faqPage(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

export function softwareApplication(locale: 'ar' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Betakti',
    alternateName: 'بطاقتي',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web, iOS, Android',
    description:
      locale === 'ar'
        ? 'استوديو تصميم عربي لإنشاء بوستات وستوري احترافية لانستقرام وواتساب وسناب وتيك توك، مع قوالب جاهزة وخطوط عربية وإسلامية.'
        : 'An Arabic-first design studio for creating professional posts and stories for Instagram, WhatsApp, Snapchat and TikTok — with ready-made templates and Arabic & Islamic fonts.',
    url: SITE_URL,
    downloadUrl: APP_DOWNLOAD_URL,
    installUrl: APP_DOWNLOAD_URL,
    image: LOGO_IMAGE,
    offers: [
      { '@type': 'Offer', price: '0', priceCurrency: 'SAR', name: 'Free' },
      // Mobile (App Store / Google Play) subscriptions
      { '@type': 'Offer', price: APP_PRICE_MONTHLY_USD, priceCurrency: APP_PRICE_CURRENCY, name: 'Pro Monthly (App)' },
      { '@type': 'Offer', price: APP_PRICE_YEARLY_USD, priceCurrency: APP_PRICE_CURRENCY, name: 'Pro Yearly (App)' },
      // Web (Moyasar) subscriptions
      { '@type': 'Offer', price: '19', priceCurrency: 'SAR', name: 'Pro Monthly (Web)' },
      { '@type': 'Offer', price: '139', priceCurrency: 'SAR', name: 'Pro Yearly (Web)' },
      { '@type': 'Offer', price: '299', priceCurrency: 'SAR', name: 'Pro Lifetime (Web)' }
    ],
    aggregateRating: {
      // Confirmed App Store rating (iTunes API). Kept to verifiable numbers only.
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '8025',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

export function webSite(locale: 'ar' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Betakti',
    alternateName: 'بطاقتي',
    url: SITE_URL,
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/templates?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Betakti',
    alternateName: 'بطاقتي',
    url: SITE_URL,
    logo: LOGO_IMAGE,
    sameAs: ['https://twitter.com/betakti', 'https://instagram.com/betakti']
  };
}
