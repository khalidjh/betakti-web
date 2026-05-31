<script lang="ts">
  import { getLocale } from '$lib/i18n';
  import { addLocalePrefix, type Locale } from '$lib/locale-path';
  import { SITE_URL, DEFAULT_OG_IMAGE, TWITTER_HANDLE } from '$lib/seo/config';

  interface Props {
    /** Page <title>. Brand suffix is appended automatically unless includeBrand=false. */
    title: string;
    description: string;
    /** Base (Arabic/root) path, e.g. "/pricing". Drives canonical + hreflang. */
    path: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    keywords?: string;
    /** JSON-LD object(s) injected as ld+json script tags. */
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
    noindex?: boolean;
    includeBrand?: boolean;
  }

  const {
    title,
    description,
    path,
    image = DEFAULT_OG_IMAGE,
    type = 'website',
    keywords,
    jsonLd,
    noindex = false,
    includeBrand = true
  }: Props = $props();

  const locale = $derived(getLocale() as Locale);
  const fullTitle = $derived(includeBrand ? `${title} · Betakti` : title);

  const arUrl = $derived(SITE_URL + addLocalePrefix(path, 'ar'));
  const enUrl = $derived(SITE_URL + addLocalePrefix(path, 'en'));
  const canonical = $derived(locale === 'en' ? enUrl : arUrl);
  const ogLocale = $derived(locale === 'ar' ? 'ar_AR' : 'en_US');
  const ogLocaleAlt = $derived(locale === 'ar' ? 'en_US' : 'ar_AR');

  const ogImage = $derived(image.startsWith('http') ? image : SITE_URL + image);

  const blocks = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);
</script>

<svelte:head>
  <title>{fullTitle}</title>
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow, max-image-preview:large" />
  {/if}

  <link rel="canonical" href={canonical} />
  <link rel="alternate" hreflang="ar" href={arUrl} />
  <link rel="alternate" hreflang="en" href={enUrl} />
  <link rel="alternate" hreflang="x-default" href={arUrl} />

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content="Betakti" />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:locale" content={ogLocale} />
  <meta property="og:locale:alternate" content={ogLocaleAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={TWITTER_HANDLE} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  {#each blocks as block, i (i)}
    {@html `<script type="application/ld+json">${JSON.stringify(block)}<` + `/script>`}
  {/each}
</svelte:head>
