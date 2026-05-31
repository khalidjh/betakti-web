<script lang="ts">
  import { getLocale, t, localizeHref } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import Landing from '$lib/components/landing.svelte';
  import { SITE_URL } from '$lib/seo/config';
  import { breadcrumbList, faqPage } from '$lib/seo/schema';
  import type { Localized } from '$lib/seo/landings';

  const locale = $derived(getLocale() as 'ar' | 'en');

  const ar: Localized = {
    metaTitle: 'إزالة خلفية الصورة بنقرة — أداة قص الخلفية',
    metaDesc:
      'أزل خلفية أي صورة بنقرة واحدة واحصل على قصّ نظيف للأشخاص والمنتجات. أضف الصورة لتصميمك مباشرة بدون خلفية. جرّب أداة إزالة الخلفية من Betakti.',
    eyebrow: 'أدوات · إزالة الخلفية',
    h1: 'إزالة خلفية الصورة بنقرة واحدة',
    intro:
      'احصل على قصّ احترافي نظيف لأي صورة بنقرة واحدة — مثالي لصور الأشخاص والمنتجات والشعارات. أزل الخلفية ثم أضف الصورة مباشرة لتصميمك، وضع خلفية جديدة بلون أو تدرّج أو صورة أخرى.',
    bullets: [
      { title: 'بنقرة واحدة', desc: 'إزالة الخلفية تلقائياً بدون أدوات معقدة.' },
      { title: 'قصّ نظيف', desc: 'حواف دقيقة للأشخاص والمنتجات والشعارات.' },
      { title: 'متكامل مع المحرر', desc: 'أضف الصورة المقصوصة لتصميمك فوراً.' },
      { title: 'خلفيات جديدة', desc: 'استبدل الخلفية بلون أو تدرّج أو صورة.' }
    ],
    steps: [
      { title: 'ارفع صورتك', desc: 'اختر صورة من جهازك.' },
      { title: 'أزل الخلفية', desc: 'تتم إزالة الخلفية تلقائياً بنقرة.' },
      { title: 'أضفها لتصميمك', desc: 'ضع الصورة المقصوصة في تصميمك وصدّر.' }
    ],
    faq: [
      { q: 'هل إزالة الخلفية مجانية؟', a: 'تتوفر إزالة الخلفية ضمن مزايا اشتراك Pro بشكل غير محدود.' },
      { q: 'ما أنواع الصور المدعومة؟', a: 'تعمل الأداة بشكل ممتاز مع صور الأشخاص والمنتجات والشعارات.' },
      { q: 'هل أحتاج برنامجاً؟', a: 'لا، كل شيء يتم من المتصفح بدون تحميل أي برنامج.' }
    ]
  };

  const en: Localized = {
    metaTitle: 'One-Click Background Remover — Clean Cut-outs',
    metaDesc:
      'Remove the background from any image in one click for clean cut-outs of people and products. Drop the cut-out straight into your design. Try Betakti’s background remover.',
    eyebrow: 'Tools · Background remover',
    h1: 'Remove Image Backgrounds in One Click',
    intro:
      'Get a clean, professional cut-out from any image in a single click — perfect for people, products and logos. Remove the background, drop the image straight into your design, and add a new background with a colour, gradient or another image.',
    bullets: [
      { title: 'One click', desc: 'Automatic background removal with no fiddly tools.' },
      { title: 'Clean cut-out', desc: 'Precise edges for people, products and logos.' },
      { title: 'Editor-integrated', desc: 'Drop the cut-out straight into your design.' },
      { title: 'New backgrounds', desc: 'Swap the background for a colour, gradient or image.' }
    ],
    steps: [
      { title: 'Upload your image', desc: 'Choose an image from your device.' },
      { title: 'Remove the background', desc: 'The background is removed automatically in one click.' },
      { title: 'Add it to your design', desc: 'Place the cut-out in your design and export.' }
    ],
    faq: [
      { q: 'Is background removal free?', a: 'Unlimited background removal is included in the Pro plan.' },
      { q: 'What images are supported?', a: 'It works great with photos of people, products and logos.' },
      { q: 'Do I need software?', a: 'No, everything happens in the browser with nothing to install.' }
    ]
  };

  const c = $derived(locale === 'en' ? en : ar);
  const crumbs = $derived([
    { name: t('الرئيسية', 'Home'), href: '/' },
    { name: c.h1, href: '/background-remover' }
  ]);
  const jsonLd = $derived([
    breadcrumbList(crumbs.map((cr) => ({ name: cr.name, url: SITE_URL + localizeHref(cr.href) }))),
    faqPage(c.faq)
  ]);
</script>

<Seo
  title={c.metaTitle}
  description={c.metaDesc}
  path="/background-remover"
  keywords={t(
    'ازالة خلفية الصورة, قص الخلفية, ازالة الخلفية اون لاين, remove background arabic',
    'remove background, background remover, cut out image, transparent background'
  )}
  includeBrand={false}
  {jsonLd}
/>

<Landing content={c} {crumbs} templatesHref="/templates" />
