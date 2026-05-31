<script lang="ts">
  import { getLocale, t, localizeHref } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import Landing from '$lib/components/landing.svelte';
  import { SITE_URL } from '$lib/seo/config';
  import { breadcrumbList, faqPage } from '$lib/seo/schema';
  import type { Localized } from '$lib/seo/landings';

  const locale = $derived(getLocale() as 'ar' | 'en');

  const ar: Localized = {
    metaTitle: 'خطوط عربية وإسلامية للتصميم — أكثر من 60 خطاً',
    metaDesc:
      'صمم بأكثر من 60 خطاً عربياً وإسلامياً: خطوط رمضان والعيد، الحج والعمرة، البسملة والأذكار، وخطوط ديواني وكوفي ونسخ. كل الخطوط جاهزة للاستخدام مجاناً.',
    eyebrow: 'خطوط · عربي أولاً',
    h1: 'خطوط عربية وإسلامية للتصميم',
    intro:
      'Betakti مبني للعربية أولاً. استخدم أكثر من 60 خطاً عربياً وإسلامياً مع دعم كامل للتشكيل والكتابة من اليمين لليسار — من خطوط النسخ والكوفي والديواني، إلى خطوط رمضان والعيد والحج والبسملة والأذكار. اختر الخط، اكتب نصك، وشاهد التصميم يكتمل فوراً.',
    bullets: [
      { title: 'تشكيل دقيق', desc: 'دعم كامل للحركات والتشكيل بدون أخطاء في العرض.' },
      { title: 'RTL أصلي', desc: 'كتابة من اليمين لليسار بشكل طبيعي وسليم.' },
      { title: 'خطوط إسلامية', desc: 'خطوط البسملة والأذكار والحج والعمرة ومخطوطات أنيقة.' },
      { title: 'خطوط المناسبات', desc: 'خطوط مخصصة لرمضان والعيد والتخرج.' }
    ],
    steps: [
      { title: 'اكتب نصك', desc: 'أضف عنصر نص واكتب بالعربية مباشرة.' },
      { title: 'اختر الخط', desc: 'جرّب عشرات الخطوط العربية حتى يناسبك.' },
      { title: 'صدّر التصميم', desc: 'احفظ بجودة عالية مع الحفاظ على دقة الخط.' }
    ],
    faq: [
      { q: 'كم عدد الخطوط العربية المتاحة؟', a: 'أكثر من 60 خطاً عربياً وإسلامياً، مع إضافة خطوط جديدة باستمرار.' },
      { q: 'هل أستطيع رفع خطي الخاص؟', a: 'نعم، يتيح اشتراك Pro رفع خطوطك الخاصة واستخدامها فوراً.' },
      { q: 'هل التشكيل مدعوم؟', a: 'نعم، يدعم Betakti التشكيل والحركات بدقة في جميع الخطوط العربية.' }
    ]
  };

  const en: Localized = {
    metaTitle: 'Arabic & Islamic Fonts for Design — 60+ Fonts',
    metaDesc:
      'Design with 60+ Arabic & Islamic fonts: Ramadan and Eid fonts, Hajj and Umrah, Basmala and Athkar, plus Diwani, Kufi and Naskh. All fonts ready to use for free.',
    eyebrow: 'Fonts · Arabic-first',
    h1: 'Arabic & Islamic Fonts for Design',
    intro:
      'Betakti is built Arabic-first. Use 60+ Arabic and Islamic fonts with full diacritics and right-to-left support — from Naskh, Kufi and Diwani to Ramadan, Eid, Hajj, Basmala and Athkar fonts. Pick a font, type your text, and watch the design come together instantly.',
    bullets: [
      { title: 'Precise diacritics', desc: 'Full support for harakat and tashkeel with no rendering errors.' },
      { title: 'Native RTL', desc: 'Natural, correct right-to-left typesetting.' },
      { title: 'Islamic fonts', desc: 'Basmala, Athkar, Hajj and Umrah fonts and elegant calligraphy.' },
      { title: 'Occasion fonts', desc: 'Dedicated fonts for Ramadan, Eid and graduations.' }
    ],
    steps: [
      { title: 'Type your text', desc: 'Add a text element and type in Arabic right away.' },
      { title: 'Pick a font', desc: 'Try dozens of Arabic fonts until one fits.' },
      { title: 'Export the design', desc: 'Save in high quality with crisp type.' }
    ],
    faq: [
      { q: 'How many Arabic fonts are available?', a: 'More than 60 Arabic & Islamic fonts, with new ones added regularly.' },
      { q: 'Can I upload my own font?', a: 'Yes, the Pro plan lets you upload and use your own fonts instantly.' },
      { q: 'Are diacritics supported?', a: 'Yes, Betakti renders tashkeel and harakat precisely across all Arabic fonts.' }
    ]
  };

  const c = $derived(locale === 'en' ? en : ar);
  const crumbs = $derived([
    { name: t('الرئيسية', 'Home'), href: '/' },
    { name: c.h1, href: '/arabic-fonts' }
  ]);
  const jsonLd = $derived([
    breadcrumbList(crumbs.map((cr) => ({ name: cr.name, url: SITE_URL + localizeHref(cr.href) }))),
    faqPage(c.faq)
  ]);
</script>

<Seo
  title={c.metaTitle}
  description={c.metaDesc}
  path="/arabic-fonts"
  keywords={t(
    'خطوط عربية, خطوط اسلامية, خطوط رمضان, خط ديواني, خط كوفي, arabic fonts, islamic calligraphy fonts',
    'arabic fonts, islamic fonts, ramadan fonts, diwani font, kufi font, arabic calligraphy'
  )}
  includeBrand={false}
  {jsonLd}
/>

<Landing content={c} {crumbs} templatesHref="/templates" />
