import type { TemplateCategory } from '$lib/data/templates';

export interface FaqItem {
  q: string;
  a: string;
}

export interface Localized {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  intro: string;
  bullets: { title: string; desc: string }[];
  steps: { title: string; desc: string }[];
  faq: FaqItem[];
}

export interface LandingPage {
  slug: string;
  /** Template category to deep-link into /templates?category=… */
  category?: TemplateCategory;
  /** Recommended canvas size for this use case. */
  width: number;
  height: number;
  sizeAr: string;
  sizeEn: string;
  keywords: string;
  ar: Localized;
  en: Localized;
}

// ─────────────────────────────────────────────────────────────────────────────
// Platform / use-case landing pages  →  /create/[type]
// ─────────────────────────────────────────────────────────────────────────────

export const PLATFORM_PAGES: LandingPage[] = [
  {
    slug: 'instagram-post',
    category: 'social',
    width: 1080,
    height: 1080,
    sizeAr: 'مربع 1080×1080',
    sizeEn: 'Square 1080×1080',
    keywords: 'تصميم بوست انستقرام, تصميم منشور انستقرام, بوست انستقرام مربع, instagram post maker arabic',
    ar: {
      metaTitle: 'تصميم بوست انستقرام بالعربي — قوالب جاهزة مجاناً',
      metaDesc:
        'صمم بوست انستقرام احترافي بالعربي في دقائق. قوالب مربعة 1080×1080 جاهزة، خطوط عربية مميزة، وتصدير بجودة عالية. ابدأ مجاناً مع Betakti.',
      eyebrow: 'انستقرام · بوست مربع',
      h1: 'تصميم بوست انستقرام بالعربي',
      intro:
        'أنشئ منشورات انستقرام تلفت الأنظار بمقاس مربع 1080×1080 مثالي للفيد. اختر من قوالب عربية جاهزة، عدّل النص والألوان بنقرات، وصدّر صورتك بجودة عالية بدون علامة مائية — كل ذلك من المتصفح بدون أي تطبيق.',
      bullets: [
        { title: 'مقاس مثالي للفيد', desc: 'قماش مربع 1080×1080 يظهر بأفضل جودة على انستقرام.' },
        { title: 'خطوط عربية أصيلة', desc: 'عشرات الخطوط العربية والإسلامية مع دعم كامل للكتابة من اليمين لليسار.' },
        { title: 'قوالب جاهزة', desc: 'اقتباسات، عروض، إعلانات ومناسبات — ابدأ من قالب وعدّله على ذوقك.' },
        { title: 'تصدير نظيف', desc: 'حمّل بصيغة PNG عالية الدقة أو شارك مباشرة على انستقرام.' }
      ],
      steps: [
        { title: 'اختر قالباً', desc: 'تصفّح قوالب البوست المربع واختر الأنسب لمحتواك.' },
        { title: 'عدّل التصميم', desc: 'غيّر النص، الألوان، الخطوط والصور بسهولة على القماش.' },
        { title: 'صدّر وشارك', desc: 'احفظ بجودة عالية وانشره على انستقرام مباشرة.' }
      ],
      faq: [
        { q: 'ما هو مقاس بوست انستقرام المربع؟', a: 'المقاس المربع القياسي هو 1080×1080 بكسل، وهو الأنسب للظهور في الفيد.' },
        { q: 'هل أحتاج خبرة في التصميم؟', a: 'لا. تبدأ من قالب جاهز وتعدّله بالسحب والإفلات، بدون أي خبرة سابقة.' },
        { q: 'هل يمكنني التصميم بالعربي؟', a: 'نعم، Betakti مصمم للعربية أولاً مع خطوط عربية أصيلة ودعم RTL كامل.' }
      ]
    },
    en: {
      metaTitle: 'Instagram Post Maker — Free Arabic Templates',
      metaDesc:
        'Design a professional Instagram post in minutes. Ready-made square 1080×1080 templates, beautiful Arabic fonts, and HD export. Start free with Betakti.',
      eyebrow: 'Instagram · Square post',
      h1: 'Instagram Post Maker',
      intro:
        'Create scroll-stopping Instagram posts at the perfect 1080×1080 square size. Pick a ready-made template, edit text and colours in a few clicks, and export in high quality with no watermark — all in your browser, no app required.',
      bullets: [
        { title: 'Perfect feed size', desc: 'A 1080×1080 square canvas that looks crisp in the Instagram feed.' },
        { title: 'Authentic Arabic fonts', desc: 'Dozens of Arabic & Islamic fonts with full right-to-left support.' },
        { title: 'Ready-made templates', desc: 'Quotes, offers, announcements and occasions — start from a template and make it yours.' },
        { title: 'Clean export', desc: 'Download high-resolution PNG or share straight to Instagram.' }
      ],
      steps: [
        { title: 'Pick a template', desc: 'Browse square post templates and choose one that fits your content.' },
        { title: 'Edit the design', desc: 'Change text, colours, fonts and images right on the canvas.' },
        { title: 'Export & share', desc: 'Save in high quality and post to Instagram.' }
      ],
      faq: [
        { q: 'What size is an Instagram post?', a: 'The standard square size is 1080×1080 pixels, which looks best in the feed.' },
        { q: 'Do I need design skills?', a: 'No. Start from a ready template and edit it visually — no experience needed.' },
        { q: 'Can I design in Arabic?', a: 'Yes. Betakti is Arabic-first with authentic Arabic fonts and full RTL support.' }
      ]
    }
  },
  {
    slug: 'instagram-story',
    category: 'social',
    width: 1080,
    height: 1920,
    sizeAr: 'عمودي 1080×1920',
    sizeEn: 'Vertical 1080×1920',
    keywords: 'تصميم ستوري انستقرام, ستوري انستقرام بالعربي, instagram story maker arabic, قوالب ستوري',
    ar: {
      metaTitle: 'تصميم ستوري انستقرام بالعربي — قوالب 1080×1920',
      metaDesc:
        'صمم ستوري انستقرام عمودي 1080×1920 بقوالب عربية جاهزة وخطوط مميزة. حرّك النصوص، أضف صورك وصدّر بجودة عالية مجاناً مع Betakti.',
      eyebrow: 'انستقرام · ستوري',
      h1: 'تصميم ستوري انستقرام',
      intro:
        'أنشئ ستوري انستقرام بمقاس عمودي 1080×1920 يملأ الشاشة بالكامل. ابدأ من قوالب عربية أنيقة، أضف نصوصك وصورك، واحصل على ستوري احترافي جاهز للنشر في دقائق.',
      bullets: [
        { title: 'ملء الشاشة', desc: 'مقاس عمودي 9:16 يغطي شاشة الهاتف بالكامل.' },
        { title: 'قوالب جاهزة', desc: 'قوالب لكل مناسبة: عروض، اقتباسات، إعلانات ومناسبات.' },
        { title: 'خطوط عربية', desc: 'خطوط عربية وإسلامية حصرية تعطي ستوريك طابعاً مميزاً.' },
        { title: 'تصدير سريع', desc: 'حمّل بجودة عالية وشارك مباشرة على انستقرام أو واتساب.' }
      ],
      steps: [
        { title: 'اختر قالب ستوري', desc: 'تصفح قوالب المقاس العمودي 1080×1920.' },
        { title: 'أضف محتواك', desc: 'اكتب النص، ضع صورك واختر الألوان المناسبة.' },
        { title: 'انشر ستوريك', desc: 'صدّر بجودة عالية وشاركه على انستقرام.' }
      ],
      faq: [
        { q: 'ما مقاس ستوري انستقرام؟', a: 'المقاس القياسي للستوري هو 1080×1920 بكسل بنسبة 9:16.' },
        { q: 'هل القوالب مجانية؟', a: 'نعم، هناك قوالب مجانية كثيرة، وقوالب احترافية إضافية مع اشتراك Pro.' },
        { q: 'هل يمكن إضافة صوري الخاصة؟', a: 'بالتأكيد، يمكنك رفع صورك من الجهاز وإضافتها للتصميم.' }
      ]
    },
    en: {
      metaTitle: 'Instagram Story Maker — Arabic Templates 1080×1920',
      metaDesc:
        'Design a 1080×1920 vertical Instagram story with ready Arabic templates and beautiful fonts. Add your text and photos, export in HD — free with Betakti.',
      eyebrow: 'Instagram · Story',
      h1: 'Instagram Story Maker',
      intro:
        'Create full-screen Instagram stories at the vertical 1080×1920 size. Start from elegant Arabic templates, add your text and images, and get a polished story ready to publish in minutes.',
      bullets: [
        { title: 'Full screen', desc: 'A vertical 9:16 canvas that fills the whole phone screen.' },
        { title: 'Ready templates', desc: 'Templates for every moment: offers, quotes, announcements and occasions.' },
        { title: 'Arabic fonts', desc: 'Exclusive Arabic & Islamic fonts that give your story character.' },
        { title: 'Fast export', desc: 'Download in HD and share straight to Instagram or WhatsApp.' }
      ],
      steps: [
        { title: 'Pick a story template', desc: 'Browse vertical 1080×1920 templates.' },
        { title: 'Add your content', desc: 'Write text, drop in photos and choose colours.' },
        { title: 'Publish your story', desc: 'Export in HD and share to Instagram.' }
      ],
      faq: [
        { q: 'What size is an Instagram story?', a: 'The standard story size is 1080×1920 pixels at a 9:16 ratio.' },
        { q: 'Are the templates free?', a: 'Yes, many templates are free, with extra premium ones on the Pro plan.' },
        { q: 'Can I add my own photos?', a: 'Absolutely — upload images from your device and add them to the design.' }
      ]
    }
  },
  {
    slug: 'whatsapp-status',
    category: 'whatsappStatus',
    width: 1080,
    height: 1920,
    sizeAr: 'عمودي 1080×1920',
    sizeEn: 'Vertical 1080×1920',
    keywords: 'تصميم حالة واتساب, حالات واتساب, تصميم حالة واتس بالعربي, whatsapp status design arabic',
    ar: {
      metaTitle: 'تصميم حالة واتساب بالعربي — قوالب حالات جاهزة',
      metaDesc:
        'صمم حالة واتساب مميزة بالعربي بمقاس 1080×1920. قوالب حالات جاهزة، خطوط عربية وإسلامية، اقتباسات وأدعية — صدّر وشارك على واتساب فوراً.',
      eyebrow: 'واتساب · حالة',
      h1: 'تصميم حالة واتساب',
      intro:
        'اصنع حالات واتساب جميلة تعبّر عنك: اقتباسات، أدعية، تهاني ومناسبات. ابدأ من قوالب عربية جاهزة بمقاس 1080×1920، عدّل النص والخلفية، وشارك حالتك على واتساب مباشرة.',
      bullets: [
        { title: 'مقاس الحالة المثالي', desc: 'تصميم عمودي 1080×1920 يظهر كامل في حالة واتساب.' },
        { title: 'اقتباسات وأدعية', desc: 'قوالب جاهزة للأدعية، الاقتباسات والتهاني بالخط العربي.' },
        { title: 'خطوط إسلامية', desc: 'خطوط بسملة وأذكار ومخطوطات إسلامية أنيقة.' },
        { title: 'مشاركة فورية', desc: 'صدّر الصورة وشاركها على واتساب في ثوانٍ.' }
      ],
      steps: [
        { title: 'اختر قالب حالة', desc: 'تصفح قوالب حالات واتساب الجاهزة.' },
        { title: 'اكتب رسالتك', desc: 'أضف نصك أو دعاءك واختر خطاً عربياً مناسباً.' },
        { title: 'شارك الحالة', desc: 'حمّل التصميم وضعه في حالة واتساب.' }
      ],
      faq: [
        { q: 'ما مقاس حالة واتساب؟', a: 'أفضل مقاس لحالة واتساب هو 1080×1920 بكسل (عمودي).' },
        { q: 'هل توجد قوالب أدعية؟', a: 'نعم، يوجد قوالب أدعية وأذكار واقتباسات جاهزة بخطوط عربية.' },
        { q: 'هل المشاركة على واتساب مباشرة؟', a: 'تصدّر الصورة بجودة عالية ثم تشاركها على واتساب بسهولة.' }
      ]
    },
    en: {
      metaTitle: 'WhatsApp Status Maker — Arabic Status Templates',
      metaDesc:
        'Design a standout WhatsApp status in Arabic at 1080×1920. Ready status templates, Arabic & Islamic fonts, quotes and duas — export and share to WhatsApp instantly.',
      eyebrow: 'WhatsApp · Status',
      h1: 'WhatsApp Status Maker',
      intro:
        'Make beautiful WhatsApp statuses that speak for you: quotes, duas, greetings and occasions. Start from ready Arabic templates at 1080×1920, edit the text and background, and share to WhatsApp right away.',
      bullets: [
        { title: 'Perfect status size', desc: 'A vertical 1080×1920 design that fills the WhatsApp status screen.' },
        { title: 'Quotes & duas', desc: 'Ready templates for duas, quotes and greetings in Arabic type.' },
        { title: 'Islamic fonts', desc: 'Elegant Basmala, Athkar and Islamic calligraphy fonts.' },
        { title: 'Instant share', desc: 'Export and share to WhatsApp in seconds.' }
      ],
      steps: [
        { title: 'Pick a status template', desc: 'Browse ready WhatsApp status templates.' },
        { title: 'Write your message', desc: 'Add your text or dua and pick a fitting Arabic font.' },
        { title: 'Share the status', desc: 'Download the design and set it as your WhatsApp status.' }
      ],
      faq: [
        { q: 'What size is a WhatsApp status?', a: 'The best size for a WhatsApp status is 1080×1920 pixels (vertical).' },
        { q: 'Are there dua templates?', a: 'Yes, there are ready dua, athkar and quote templates in Arabic fonts.' },
        { q: 'Can I share directly to WhatsApp?', a: 'You export a high-quality image, then share it to WhatsApp easily.' }
      ]
    }
  },
  {
    slug: 'snapchat',
    category: 'social',
    width: 1080,
    height: 1920,
    sizeAr: 'عمودي 1080×1920',
    sizeEn: 'Vertical 1080×1920',
    keywords: 'تصميم سناب شات, تصميم سناب بالعربي, snapchat design arabic, قوالب سناب',
    ar: {
      metaTitle: 'تصميم سناب شات بالعربي — قوالب جاهزة 1080×1920',
      metaDesc:
        'صمم سناب شات احترافي بالعربي بمقاس 1080×1920. قوالب عربية جاهزة، خطوط مميزة وتصدير بجودة عالية. ابدأ مجاناً مع Betakti.',
      eyebrow: 'سناب شات · عمودي',
      h1: 'تصميم سناب شات',
      intro:
        'أنشئ تصاميم سناب شات تلفت متابعينك بمقاس عمودي يملأ الشاشة. ابدأ من قوالب عربية جاهزة، عدّل النصوص والصور، وصدّر تصميمك جاهزاً للنشر على سناب شات.',
      bullets: [
        { title: 'مقاس ملء الشاشة', desc: 'تصميم عمودي 1080×1920 مثالي لسناب شات.' },
        { title: 'قوالب جاهزة', desc: 'قوالب لكل المناسبات والعروض جاهزة للتعديل.' },
        { title: 'خطوط عربية', desc: 'خطوط عربية حصرية لطابع مميز.' },
        { title: 'تصدير عالي الجودة', desc: 'حمّل بجودة عالية وشارك على سناب شات.' }
      ],
      steps: [
        { title: 'اختر قالباً', desc: 'تصفح قوالب المقاس العمودي.' },
        { title: 'عدّل التصميم', desc: 'أضف نصوصك وصورك وألوانك.' },
        { title: 'انشر على سناب', desc: 'صدّر وشارك تصميمك.' }
      ],
      faq: [
        { q: 'ما أفضل مقاس لسناب شات؟', a: 'المقاس العمودي 1080×1920 بكسل هو الأنسب لسناب شات.' },
        { q: 'هل أحتاج تطبيقاً؟', a: 'لا، تصمم من المتصفح مباشرة بدون تحميل أي تطبيق.' }
      ]
    },
    en: {
      metaTitle: 'Snapchat Design Maker — Arabic Templates 1080×1920',
      metaDesc:
        'Create a professional Snapchat design in Arabic at 1080×1920. Ready Arabic templates, beautiful fonts and HD export. Start free with Betakti.',
      eyebrow: 'Snapchat · Vertical',
      h1: 'Snapchat Design Maker',
      intro:
        'Make Snapchat designs that grab your followers with a full-screen vertical size. Start from ready Arabic templates, edit text and images, and export your design ready to post on Snapchat.',
      bullets: [
        { title: 'Full-screen size', desc: 'A vertical 1080×1920 design that is perfect for Snapchat.' },
        { title: 'Ready templates', desc: 'Templates for every occasion and offer, ready to edit.' },
        { title: 'Arabic fonts', desc: 'Exclusive Arabic fonts for a distinctive look.' },
        { title: 'HD export', desc: 'Download in high quality and share on Snapchat.' }
      ],
      steps: [
        { title: 'Pick a template', desc: 'Browse vertical-format templates.' },
        { title: 'Edit the design', desc: 'Add your text, photos and colours.' },
        { title: 'Post to Snapchat', desc: 'Export and share your design.' }
      ],
      faq: [
        { q: 'What is the best Snapchat size?', a: 'A vertical 1080×1920 pixel canvas works best for Snapchat.' },
        { q: 'Do I need an app?', a: 'No, you design directly in the browser with nothing to install.' }
      ]
    }
  },
  {
    slug: 'tiktok',
    category: 'social',
    width: 1080,
    height: 1920,
    sizeAr: 'عمودي 1080×1920',
    sizeEn: 'Vertical 1080×1920',
    keywords: 'تصميم تيك توك, غلاف تيك توك, tiktok design arabic, تصميم كفر تيك توك',
    ar: {
      metaTitle: 'تصميم تيك توك بالعربي — أغلفة وقوالب 1080×1920',
      metaDesc:
        'صمم أغلفة وتصاميم تيك توك بالعربي بمقاس 1080×1920. قوالب جاهزة وخطوط عربية مميزة وتصدير بجودة عالية. مجاناً مع Betakti.',
      eyebrow: 'تيك توك · عمودي',
      h1: 'تصميم تيك توك',
      intro:
        'صمم أغلفة فيديوهات تيك توك وتصاميم تجذب المشاهدين بمقاس عمودي 1080×1920. ابدأ من قالب عربي، أضف عنوانك بخط جذاب، وصدّر بجودة عالية.',
      bullets: [
        { title: 'مقاس عمودي', desc: 'تصميم 1080×1920 مناسب لأغلفة وتصاميم تيك توك.' },
        { title: 'عناوين جذابة', desc: 'خطوط عربية كبيرة وواضحة تلفت الانتباه.' },
        { title: 'قوالب جاهزة', desc: 'ابدأ من قالب وعدّله بسرعة.' },
        { title: 'تصدير سريع', desc: 'احفظ بجودة عالية واستخدمه كغلاف لفيديوهاتك.' }
      ],
      steps: [
        { title: 'اختر قالباً', desc: 'تصفح قوالب المقاس العمودي.' },
        { title: 'أضف العنوان', desc: 'اكتب عنوان الفيديو بخط واضح وجذاب.' },
        { title: 'صدّر الغلاف', desc: 'حمّل التصميم واستخدمه على تيك توك.' }
      ],
      faq: [
        { q: 'ما مقاس تصميم تيك توك؟', a: 'المقاس العمودي 1080×1920 بكسل هو الأنسب لتيك توك.' },
        { q: 'هل يمكن تصميم غلاف فيديو؟', a: 'نعم، يمكنك تصميم غلاف جذاب لفيديوهات تيك توك بسهولة.' }
      ]
    },
    en: {
      metaTitle: 'TikTok Design Maker — Arabic Covers 1080×1920',
      metaDesc:
        'Design TikTok covers and graphics in Arabic at 1080×1920. Ready templates, bold Arabic fonts and HD export. Free with Betakti.',
      eyebrow: 'TikTok · Vertical',
      h1: 'TikTok Design Maker',
      intro:
        'Design TikTok video covers and graphics that pull viewers in at the vertical 1080×1920 size. Start from an Arabic template, add your title in an eye-catching font, and export in high quality.',
      bullets: [
        { title: 'Vertical size', desc: 'A 1080×1920 design suited to TikTok covers and graphics.' },
        { title: 'Bold titles', desc: 'Large, clear Arabic fonts that grab attention.' },
        { title: 'Ready templates', desc: 'Start from a template and edit it fast.' },
        { title: 'Fast export', desc: 'Save in HD and use it as a cover for your videos.' }
      ],
      steps: [
        { title: 'Pick a template', desc: 'Browse vertical-format templates.' },
        { title: 'Add the title', desc: 'Write the video title in a clear, catchy font.' },
        { title: 'Export the cover', desc: 'Download the design and use it on TikTok.' }
      ],
      faq: [
        { q: 'What size is a TikTok design?', a: 'A vertical 1080×1920 pixel canvas works best for TikTok.' },
        { q: 'Can I design a video cover?', a: 'Yes, you can easily design an eye-catching cover for TikTok videos.' }
      ]
    }
  },
  {
    slug: 'youtube-thumbnail',
    category: 'announcements',
    width: 1280,
    height: 720,
    sizeAr: 'أفقي 1280×720',
    sizeEn: 'Landscape 1280×720',
    keywords: 'تصميم صورة مصغرة يوتيوب, ثامنيل يوتيوب, youtube thumbnail maker arabic, غلاف يوتيوب',
    ar: {
      metaTitle: 'تصميم صورة مصغرة يوتيوب بالعربي — ثامنيل 1280×720',
      metaDesc:
        'صمم صورة مصغرة (ثامنيل) ليوتيوب بالعربي بمقاس 1280×720. قوالب جاهزة، خطوط عربية واضحة وتصدير عالي الجودة. مجاناً مع Betakti.',
      eyebrow: 'يوتيوب · صورة مصغرة',
      h1: 'تصميم صورة مصغرة يوتيوب',
      intro:
        'اصنع صورة مصغرة (ثامنيل) تزيد نسبة النقر على فيديوهاتك بمقاس 1280×720. ابدأ من قالب عربي جاهز، أضف عنواناً واضحاً وصورة جذابة، وصدّر بجودة عالية.',
      bullets: [
        { title: 'مقاس يوتيوب القياسي', desc: 'تصميم أفقي 1280×720 بنسبة 16:9.' },
        { title: 'عناوين واضحة', desc: 'خطوط عربية كبيرة تُقرأ بسهولة على الجوال.' },
        { title: 'قوالب جاهزة', desc: 'قوالب احترافية تزيد نسبة النقر.' },
        { title: 'تصدير عالي الجودة', desc: 'حمّل بجودة HD جاهزة للرفع على يوتيوب.' }
      ],
      steps: [
        { title: 'اختر قالباً', desc: 'تصفح قوالب الصورة المصغرة الأفقية.' },
        { title: 'أضف العنوان والصورة', desc: 'اكتب عنواناً جذاباً وأضف صورتك.' },
        { title: 'صدّر الثامنيل', desc: 'حمّل التصميم وارفعه على يوتيوب.' }
      ],
      faq: [
        { q: 'ما مقاس الصورة المصغرة في يوتيوب؟', a: 'المقاس القياسي هو 1280×720 بكسل بنسبة 16:9.' },
        { q: 'كيف أجعل الثامنيل يجذب النقر؟', a: 'استخدم عنواناً قصيراً بخط كبير وألوان متباينة وصورة واضحة.' }
      ]
    },
    en: {
      metaTitle: 'YouTube Thumbnail Maker — Arabic 1280×720',
      metaDesc:
        'Design a YouTube thumbnail in Arabic at 1280×720. Ready templates, clear Arabic fonts and HD export. Free with Betakti.',
      eyebrow: 'YouTube · Thumbnail',
      h1: 'YouTube Thumbnail Maker',
      intro:
        'Create a thumbnail that boosts your click-through rate at 1280×720. Start from a ready Arabic template, add a clear title and a striking image, and export in high quality.',
      bullets: [
        { title: 'Standard YouTube size', desc: 'A 1280×720 landscape design at a 16:9 ratio.' },
        { title: 'Clear titles', desc: 'Large Arabic fonts that read easily on mobile.' },
        { title: 'Ready templates', desc: 'Professional templates that lift click-through.' },
        { title: 'HD export', desc: 'Download in HD, ready to upload to YouTube.' }
      ],
      steps: [
        { title: 'Pick a template', desc: 'Browse landscape thumbnail templates.' },
        { title: 'Add title & image', desc: 'Write a catchy title and add your image.' },
        { title: 'Export the thumbnail', desc: 'Download the design and upload to YouTube.' }
      ],
      faq: [
        { q: 'What size is a YouTube thumbnail?', a: 'The standard size is 1280×720 pixels at a 16:9 ratio.' },
        { q: 'How do I make a clickable thumbnail?', a: 'Use a short title in a large font, contrasting colours and a clear image.' }
      ]
    }
  },
  {
    slug: 'twitter-post',
    category: 'announcements',
    width: 1600,
    height: 900,
    sizeAr: 'أفقي 1600×900',
    sizeEn: 'Landscape 1600×900',
    keywords: 'تصميم بوست تويتر, تصميم منشور اكس, twitter post maker arabic, تصميم تغريدة',
    ar: {
      metaTitle: 'تصميم بوست تويتر (اكس) بالعربي — قوالب 1600×900',
      metaDesc:
        'صمم منشور تويتر/اكس بالعربي بمقاس 1600×900. قوالب جاهزة وخطوط عربية وتصدير بجودة عالية. ابدأ مجاناً مع Betakti.',
      eyebrow: 'تويتر / اكس',
      h1: 'تصميم بوست تويتر (اكس)',
      intro:
        'أنشئ صور منشورات تويتر/اكس احترافية بالعربي بمقاس أفقي 1600×900. ابدأ من قالب جاهز، أضف اقتباسك أو خبرك، وصدّر صورة تلفت الأنظار في التايملاين.',
      bullets: [
        { title: 'مقاس مثالي للتايملاين', desc: 'تصميم أفقي 1600×900 يظهر كامل في تويتر/اكس.' },
        { title: 'اقتباسات وأخبار', desc: 'قوالب مناسبة للاقتباسات والإعلانات والأخبار.' },
        { title: 'خطوط عربية', desc: 'خطوط عربية واضحة لمحتوى احترافي.' },
        { title: 'تصدير نظيف', desc: 'حمّل بجودة عالية وارفع الصورة على تويتر.' }
      ],
      steps: [
        { title: 'اختر قالباً', desc: 'تصفح قوالب المقاس الأفقي.' },
        { title: 'أضف النص', desc: 'اكتب اقتباسك أو خبرك بخط عربي مناسب.' },
        { title: 'انشر التغريدة', desc: 'صدّر الصورة وأرفقها بتغريدتك.' }
      ],
      faq: [
        { q: 'ما أفضل مقاس لصورة تويتر؟', a: 'المقاس الأفقي 1600×900 بكسل (16:9) من أفضل المقاسات لتويتر/اكس.' },
        { q: 'هل القوالب بالعربي؟', a: 'نعم، جميع القوالب تدعم العربية مع خطوط أصيلة وRTL كامل.' }
      ]
    },
    en: {
      metaTitle: 'Twitter (X) Post Maker — Arabic Templates 1600×900',
      metaDesc:
        'Design a Twitter/X post in Arabic at 1600×900. Ready templates, Arabic fonts and HD export. Start free with Betakti.',
      eyebrow: 'Twitter / X',
      h1: 'Twitter (X) Post Maker',
      intro:
        'Create professional Twitter/X post images in Arabic at the landscape 1600×900 size. Start from a ready template, add your quote or news, and export an image that stands out in the timeline.',
      bullets: [
        { title: 'Perfect for the timeline', desc: 'A 1600×900 landscape design that shows fully on Twitter/X.' },
        { title: 'Quotes & news', desc: 'Templates suited to quotes, announcements and news.' },
        { title: 'Arabic fonts', desc: 'Clear Arabic fonts for professional content.' },
        { title: 'Clean export', desc: 'Download in HD and upload the image to Twitter.' }
      ],
      steps: [
        { title: 'Pick a template', desc: 'Browse landscape-format templates.' },
        { title: 'Add text', desc: 'Write your quote or news in a fitting Arabic font.' },
        { title: 'Post the tweet', desc: 'Export the image and attach it to your tweet.' }
      ],
      faq: [
        { q: 'What is the best Twitter image size?', a: 'A landscape 1600×900 pixels (16:9) is one of the best sizes for Twitter/X.' },
        { q: 'Are the templates in Arabic?', a: 'Yes, all templates support Arabic with authentic fonts and full RTL.' }
      ]
    }
  },
  {
    slug: 'facebook-post',
    category: 'announcements',
    width: 1200,
    height: 630,
    sizeAr: 'أفقي 1200×630',
    sizeEn: 'Landscape 1200×630',
    keywords: 'تصميم بوست فيسبوك, منشور فيسبوك بالعربي, facebook post maker arabic',
    ar: {
      metaTitle: 'تصميم بوست فيسبوك بالعربي — قوالب جاهزة 1200×630',
      metaDesc:
        'صمم منشور فيسبوك احترافي بالعربي بمقاس 1200×630. قوالب جاهزة، خطوط عربية وتصدير بجودة عالية. ابدأ مجاناً مع Betakti.',
      eyebrow: 'فيسبوك · منشور',
      h1: 'تصميم بوست فيسبوك',
      intro:
        'أنشئ منشورات فيسبوك جذابة بالعربي بمقاس 1200×630 المثالي. ابدأ من قالب جاهز، أضف نصك وصورك، وصدّر منشوراً احترافياً جاهزاً للنشر.',
      bullets: [
        { title: 'مقاس فيسبوك المثالي', desc: 'تصميم 1200×630 يظهر بأفضل شكل في المنشورات.' },
        { title: 'قوالب جاهزة', desc: 'إعلانات، عروض ومناسبات جاهزة للتعديل.' },
        { title: 'خطوط عربية', desc: 'خطوط عربية أصيلة بدعم RTL كامل.' },
        { title: 'تصدير سريع', desc: 'حمّل بجودة عالية وانشر على فيسبوك.' }
      ],
      steps: [
        { title: 'اختر قالباً', desc: 'تصفح قوالب منشورات فيسبوك.' },
        { title: 'عدّل المحتوى', desc: 'أضف نصك وصورك وألوانك.' },
        { title: 'انشر المنشور', desc: 'صدّر وانشر على فيسبوك.' }
      ],
      faq: [
        { q: 'ما مقاس منشور فيسبوك؟', a: 'المقاس الموصى به للصور المشاركة هو 1200×630 بكسل.' },
        { q: 'هل أحتاج برنامج تصميم؟', a: 'لا، تصمم مباشرة من المتصفح بدون أي برامج.' }
      ]
    },
    en: {
      metaTitle: 'Facebook Post Maker — Arabic Templates 1200×630',
      metaDesc:
        'Design a professional Facebook post in Arabic at 1200×630. Ready templates, Arabic fonts and HD export. Start free with Betakti.',
      eyebrow: 'Facebook · Post',
      h1: 'Facebook Post Maker',
      intro:
        'Create engaging Facebook posts in Arabic at the ideal 1200×630 size. Start from a ready template, add your text and photos, and export a professional post ready to publish.',
      bullets: [
        { title: 'Ideal Facebook size', desc: 'A 1200×630 design that looks best in posts.' },
        { title: 'Ready templates', desc: 'Announcements, offers and occasions ready to edit.' },
        { title: 'Arabic fonts', desc: 'Authentic Arabic fonts with full RTL support.' },
        { title: 'Fast export', desc: 'Download in HD and publish to Facebook.' }
      ],
      steps: [
        { title: 'Pick a template', desc: 'Browse Facebook post templates.' },
        { title: 'Edit the content', desc: 'Add your text, photos and colours.' },
        { title: 'Publish the post', desc: 'Export and publish to Facebook.' }
      ],
      faq: [
        { q: 'What size is a Facebook post?', a: 'The recommended size for shared images is 1200×630 pixels.' },
        { q: 'Do I need design software?', a: 'No, you design straight from the browser with no software.' }
      ]
    }
  },
  {
    slug: 'linkedin-post',
    category: 'announcements',
    width: 1200,
    height: 627,
    sizeAr: 'أفقي 1200×627',
    sizeEn: 'Landscape 1200×627',
    keywords: 'تصميم بوست لينكد إن, منشور لينكدإن, linkedin post maker arabic',
    ar: {
      metaTitle: 'تصميم بوست لينكد إن بالعربي — قوالب 1200×627',
      metaDesc:
        'صمم منشور لينكد إن احترافي بالعربي بمقاس 1200×627. قوالب أعمال جاهزة، خطوط عربية وتصدير عالي الجودة. مجاناً مع Betakti.',
      eyebrow: 'لينكد إن · منشور',
      h1: 'تصميم بوست لينكد إن',
      intro:
        'أنشئ منشورات لينكد إن احترافية بالعربي بمقاس 1200×627. ابدأ من قوالب أعمال أنيقة، أضف رسالتك المهنية، وصدّر تصميماً يعكس صورتك الاحترافية.',
      bullets: [
        { title: 'مقاس احترافي', desc: 'تصميم 1200×627 مناسب لمنشورات لينكد إن.' },
        { title: 'قوالب أعمال', desc: 'قوالب رسمية وأنيقة للمحتوى المهني.' },
        { title: 'خطوط عربية', desc: 'خطوط عربية واضحة للمحتوى الرسمي.' },
        { title: 'تصدير عالي الجودة', desc: 'حمّل بجودة عالية وانشر على لينكد إن.' }
      ],
      steps: [
        { title: 'اختر قالباً', desc: 'تصفح قوالب الأعمال الأفقية.' },
        { title: 'أضف رسالتك', desc: 'اكتب محتواك المهني بخط واضح.' },
        { title: 'انشر', desc: 'صدّر وانشر على لينكد إن.' }
      ],
      faq: [
        { q: 'ما مقاس منشور لينكد إن؟', a: 'المقاس الموصى به للصور هو 1200×627 بكسل.' },
        { q: 'هل القوالب مناسبة للأعمال؟', a: 'نعم، هناك قوالب رسمية وأنيقة مناسبة للمحتوى المهني.' }
      ]
    },
    en: {
      metaTitle: 'LinkedIn Post Maker — Arabic Templates 1200×627',
      metaDesc:
        'Design a professional LinkedIn post in Arabic at 1200×627. Business templates, Arabic fonts and HD export. Free with Betakti.',
      eyebrow: 'LinkedIn · Post',
      h1: 'LinkedIn Post Maker',
      intro:
        'Create professional LinkedIn posts in Arabic at 1200×627. Start from elegant business templates, add your professional message, and export a design that reflects your professional image.',
      bullets: [
        { title: 'Professional size', desc: 'A 1200×627 design suited to LinkedIn posts.' },
        { title: 'Business templates', desc: 'Formal, elegant templates for professional content.' },
        { title: 'Arabic fonts', desc: 'Clear Arabic fonts for formal content.' },
        { title: 'HD export', desc: 'Download in high quality and publish to LinkedIn.' }
      ],
      steps: [
        { title: 'Pick a template', desc: 'Browse landscape business templates.' },
        { title: 'Add your message', desc: 'Write your professional content in a clear font.' },
        { title: 'Publish', desc: 'Export and publish to LinkedIn.' }
      ],
      faq: [
        { q: 'What size is a LinkedIn post?', a: 'The recommended image size is 1200×627 pixels.' },
        { q: 'Are the templates business-ready?', a: 'Yes, there are formal, elegant templates suited to professional content.' }
      ]
    }
  }
];

export function platformBySlug(slug: string): LandingPage | undefined {
  return PLATFORM_PAGES.find((p) => p.slug === slug);
}
