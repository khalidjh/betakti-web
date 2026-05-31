<script lang="ts">
  import { getLocale, t, localizeHref } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import Landing from '$lib/components/landing.svelte';
  import { SITE_URL } from '$lib/seo/config';
  import { breadcrumbList, faqPage } from '$lib/seo/schema';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const page = $derived(data.page);
  const locale = $derived(getLocale() as 'ar' | 'en');
  const c = $derived(locale === 'en' ? page.en : page.ar);
  const path = $derived(`/occasions/${page.slug}`);

  const crumbs = $derived([
    { name: t('الرئيسية', 'Home'), href: '/' },
    { name: t('المناسبات', 'Occasions'), href: '/occasions' },
    { name: c.h1, href: path }
  ]);

  const jsonLd = $derived([
    breadcrumbList(crumbs.map((cr) => ({ name: cr.name, url: SITE_URL + localizeHref(cr.href) }))),
    faqPage(c.faq)
  ]);
</script>

<Seo
  title={c.metaTitle}
  description={c.metaDesc}
  {path}
  keywords={page.keywords}
  includeBrand={false}
  {jsonLd}
/>

<Landing
  content={c}
  {crumbs}
  templatesHref={`/templates?category=${page.category}`}
/>
