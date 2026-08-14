import type { DynamicTemplate, TemplateCategory } from '$lib/data/templates';
import { categoryLabel } from '$lib/data/templates';

/**
 * Derives unique, indexable copy for a single template from its real data
 * (category, canvas size/orientation, background style and the actual text on
 * the design). This is what makes each `/templates/[id]` page substantively
 * different from the next — the cure for "Discovered – currently not indexed",
 * where Google parks near-duplicate, thin pages. Copy is bilingual and lives
 * here (not in Paraglide) to match the rest of the SEO landing system.
 */

type Locale = 'ar' | 'en';
type Bi = { ar: string; en: string };

export interface TemplateContent {
  /** Rich 2–3 sentence intro paragraph. */
  description: string;
  /** Enriched <meta name="description"> (≤ ~160 chars). */
  metaDescription: string;
  /** Short descriptive chips (category, orientation, style, free/pro…). */
  tags: string[];
  /** 3–4 question/answer pairs — also emitted as FAQPage JSON-LD. */
  faq: { q: string; a: string }[];
  /** Actual text found on the design, de-duplicated (may be empty). */
  textOnDesign: string[];
  /** Editable-layer summary line. */
  layersLine: string;
}

/** Per-category topical blurb + the occasions the category is used for. */
const CATEGORY_COPY: Record<TemplateCategory, { blurb: Bi; uses: Bi }> = {
  quotes: {
    blurb: {
      ar: 'قالب اقتباسات وعبارات ملهمة جاهز لمشاركة حكمة أو كلمة تأثّر في متابعينك',
      en: 'a quotes template ready for sharing an inspiring line or a thought that resonates with your audience'
    },
    uses: { ar: 'الاقتباسات والحكم والعبارات اليومية', en: 'quotes, wisdom and daily affirmations' }
  },
  announcements: {
    blurb: {
      ar: 'قالب إعلانات لإيصال خبر أو تحديث مهم بشكل واضح ولافت',
      en: 'an announcement template for delivering important news or an update clearly and with impact'
    },
    uses: { ar: 'الإعلانات والأخبار والتحديثات', en: 'announcements, news and updates' }
  },
  sales: {
    blurb: {
      ar: 'قالب عروض وتخفيضات يبرز سعرك ونسبة الخصم ويحفّز على الشراء',
      en: 'a sale template that highlights your price and discount and drives purchases'
    },
    uses: { ar: 'العروض والتخفيضات والحملات الترويجية', en: 'sales, discounts and promotions' }
  },
  events: {
    blurb: {
      ar: 'قالب مناسبات لدعوة جمهورك لحدث أو فعالية وإبراز موعدها ومكانها',
      en: 'an event template to invite your audience and highlight the date and venue'
    },
    uses: { ar: 'الفعاليات والدعوات والمناسبات', en: 'events, invitations and occasions' }
  },
  social: {
    blurb: {
      ar: 'قالب تواصل اجتماعي متعدد الاستخدامات لبوستات وستوري يومية',
      en: 'a versatile social template for everyday posts and stories'
    },
    uses: { ar: 'منشورات التواصل الاجتماعي اليومية', en: 'everyday social media posts' }
  },
  ramadan: {
    blurb: {
      ar: 'قالب رمضاني بتصميم يليق بالشهر الكريم لتهنئة متابعينك',
      en: 'a Ramadan template with a design fit for the holy month to greet your followers'
    },
    uses: { ar: 'تهاني رمضان والمحتوى الرمضاني', en: 'Ramadan greetings and seasonal content' }
  },
  eid: {
    blurb: {
      ar: 'قالب تهنئة بالعيد بتصميم بهيج لمشاركة الفرحة مع الأهل والمتابعين',
      en: 'an Eid greeting template with a festive design to share the joy with family and followers'
    },
    uses: { ar: 'تهاني العيد', en: 'Eid greetings' }
  },
  whatsappStatus: {
    blurb: {
      ar: 'قالب حالة واتساب بمقاس طولي مناسب للنشر السريع في الستاتس',
      en: 'a WhatsApp status template in a vertical size made for quick status sharing'
    },
    uses: { ar: 'حالات واتساب والستوري', en: 'WhatsApp statuses and stories' }
  },
  graduation: {
    blurb: {
      ar: 'قالب تخرّج للاحتفال بالنجاح وتهنئة الخرّيجين',
      en: 'a graduation template to celebrate success and congratulate graduates'
    },
    uses: { ar: 'تهاني التخرج والنجاح', en: 'graduation and success greetings' }
  },
  wedding: {
    blurb: {
      ar: 'قالب زفاف بتصميم أنيق لدعوات الأفراح والتهاني',
      en: 'a wedding template with an elegant design for invitations and congratulations'
    },
    uses: { ar: 'دعوات وتهاني الأفراح', en: 'wedding invitations and congratulations' }
  },
  nationalDay: {
    blurb: {
      ar: 'قالب اليوم الوطني بهوية تحتفي بالوطن لمشاركة المتابعين الفرحة',
      en: 'a National Day template with a patriotic identity to share the celebration with followers'
    },
    uses: { ar: 'محتوى اليوم الوطني', en: 'National Day content' }
  }
};

type Orientation = 'square' | 'portrait' | 'landscape';

function orientationOf(width: number, height: number): Orientation {
  if (height <= 0 || width <= 0) return 'square';
  const r = width / height;
  if (r >= 0.92 && r <= 1.08) return 'square';
  return r < 1 ? 'portrait' : 'landscape';
}

const ORIENTATION_COPY: Record<Orientation, { name: Bi; platforms: Bi }> = {
  square: {
    name: { ar: 'مربّع', en: 'square' },
    platforms: { ar: 'بوستات انستقرام وفيسبوك', en: 'Instagram and Facebook posts' }
  },
  portrait: {
    name: { ar: 'طولي', en: 'portrait' },
    platforms: {
      ar: 'ستوري انستقرام وحالات واتساب وسناب وتيك توك',
      en: 'Instagram stories, WhatsApp status, Snapchat and TikTok'
    }
  },
  landscape: {
    name: { ar: 'عرضي', en: 'landscape' },
    platforms: { ar: 'منشورات تويتر (X) وأغلفة المنصّات', en: 'X (Twitter) posts and platform covers' }
  }
};

function bgStyleWord(t: DynamicTemplate['background']): Bi {
  switch (t?.type) {
    case 'gradient':
      return { ar: 'خلفية متدرّجة الألوان', en: 'a gradient background' };
    case 'image':
      return { ar: 'خلفية بصورة', en: 'a photo background' };
    case 'pattern':
      return { ar: 'خلفية بنقشة زخرفية', en: 'a patterned background' };
    case 'color':
    default:
      return { ar: 'خلفية بلون موحّد', en: 'a solid-color background' };
  }
}

/** Pull the actual words off the design's text layers, trimmed & de-duplicated. */
function extractText(tpl: DynamicTemplate): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const el of tpl.elements) {
    if (el.type !== 'text') continue;
    const raw = (el as { text?: unknown }).text;
    if (typeof raw !== 'string') continue;
    const text = raw.replace(/\s+/g, ' ').trim();
    if (text.length < 2 || text.length > 120) continue;
    const key = text.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(text);
    if (out.length >= 6) break;
  }
  return out;
}

export function templateContent(tpl: DynamicTemplate, locale: Locale): TemplateContent {
  const pick = (b: Bi) => (locale === 'ar' ? b.ar : b.en);
  const cat = CATEGORY_COPY[tpl.category] ?? CATEGORY_COPY.social;
  const orient = orientationOf(tpl.canvasSize.width, tpl.canvasSize.height);
  const o = ORIENTATION_COPY[orient];
  const style = bgStyleWord(tpl.background);
  const name = locale === 'ar' ? tpl.nameAr : tpl.nameEn;
  const catName = categoryLabel(tpl.category, locale);
  const sizeName = locale === 'ar' ? tpl.canvasSize.nameAr : tpl.canvasSize.nameEn;
  const dims = `${tpl.canvasSize.width}×${tpl.canvasSize.height}`;
  const free = !tpl.isPremium;

  const textLayers = tpl.elements.filter((e) => e.type === 'text').length;
  const imageLayers = tpl.elements.filter((e) => e.type === 'image').length;

  const description =
    locale === 'ar'
      ? `«${name}» ${cat.blurb.ar} على بطاقتي. يأتي ${style.ar} بمقاس ${o.name.ar} (${dims} بكسل) مناسب لـ${o.platforms.ar}، وكل عناصره قابلة للتعديل بالكامل: غيّر النص والألوان والخطوط والصور بنقرة واحدة${free ? ' — مجاناً' : ''}.`
      : `“${name}” is ${cat.blurb.en} on Betakti. It comes with ${style.en} in a ${o.name.en} ${dims}px size, ideal for ${o.platforms.en}, and every element is fully editable — change the text, colors, fonts and images in a click${free ? ', for free' : ''}.`;

  const metaDescription =
    locale === 'ar'
      ? `قالب ${catName} ${o.name.ar} (${dims}) جاهز للتعديل: «${name}». صمّم ${cat.uses.ar} بالعربي على بطاقتي${free ? ' مجاناً' : ''}.`
      : `${o.name.en} ${catName} template ready to edit: “${name}”. Design ${cat.uses.en} in Arabic on Betakti${free ? ', free' : ''}.`;

  const tags = [
    catName,
    `${pick(o.name)} · ${dims}`,
    sizeName,
    pick(style),
    free ? (locale === 'ar' ? 'مجاني' : 'Free') : 'Pro'
  ].filter(Boolean);

  const layersLine =
    locale === 'ar'
      ? `قالب قابل للتعديل بالكامل${textLayers ? ` · ${textLayers} نص` : ''}${imageLayers ? ` · ${imageLayers} صورة` : ''}`
      : `Fully editable${textLayers ? ` · ${textLayers} text layer${textLayers > 1 ? 's' : ''}` : ''}${imageLayers ? ` · ${imageLayers} image${imageLayers > 1 ? 's' : ''}` : ''}`;

  const faq = [
    {
      q: locale === 'ar' ? 'ما مقاس هذا القالب؟' : 'What size is this template?',
      a:
        locale === 'ar'
          ? `مقاس ${sizeName} (${dims} بكسل) بتصميم ${o.name.ar}، مناسب لـ${o.platforms.ar}.`
          : `It is ${sizeName} (${dims}px), a ${o.name.en} layout ideal for ${o.platforms.en}.`
    },
    {
      q: locale === 'ar' ? 'هل أقدر أعدّل القالب؟' : 'Can I edit this template?',
      a:
        locale === 'ar'
          ? 'نعم، القالب قابل للتعديل بالكامل في محرّر بطاقتي: غيّر النصوص والألوان والخطوط العربية وأضف صورك أو شعارك ثم نزّل التصميم بجودة عالية.'
          : 'Yes — it is fully editable in the Betakti editor: change the text, colors and Arabic fonts, add your own photos or logo, then download in high quality.'
    },
    {
      q: locale === 'ar' ? 'هل القالب مجاني؟' : 'Is this template free?',
      a: free
        ? locale === 'ar'
          ? 'نعم، هذا القالب متاح مجاناً. تقدر تستخدمه وتعدّله وتنزّله بدون اشتراك.'
          : 'Yes, this template is free. You can use, edit and download it without a subscription.'
        : locale === 'ar'
          ? 'هذا القالب ضمن باقة Pro. اشترك في بطاقتي للوصول إليه وإلى بقية القوالب والخطوط المميّزة.'
          : 'This template is part of Pro. Subscribe to Betakti to unlock it along with the rest of the premium templates and fonts.'
    },
    {
      q: locale === 'ar' ? 'لأي مناسبة يصلح هذا القالب؟' : 'What is this template good for?',
      a:
        locale === 'ar'
          ? `يصلح لـ${cat.uses.ar}، ويمكن تكييفه بسهولة لأي محتوى آخر تريده.`
          : `It is great for ${cat.uses.en}, and adapts easily to any other content you need.`
    }
  ];

  return {
    description,
    metaDescription,
    tags,
    faq,
    textOnDesign: extractText(tpl),
    layersLine
  };
}
