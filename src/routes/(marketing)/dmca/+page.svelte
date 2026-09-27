<script lang="ts">
  import { m, t } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  const updated = '2026-09-27';
  const contact = 'eiddesigner37@gmail.com';
</script>

<Seo
  title={t('إشعار حقوق الملكية (DMCA)', 'Copyright notices (DMCA)')}
  description={t(
    'كيف تبلّغ بطاقتي عن محتوى ينتهك حقوق الملكية، وكيف نتعامل مع البلاغ.',
    'How to report content on Betakti that infringes your copyright, and how we handle it.'
  )}
  path="/dmca"
/>

<div class="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col gap-6">
  <header class="flex flex-col gap-3 mb-2">
    <span
      class="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-[var(--color-muted)]"
      style="font-family: var(--font-mono);"
    >
      <span class="inline-block w-6 h-px bg-[var(--color-border-strong)]" aria-hidden="true"></span>
      {m.legal_updated()}: {updated}
    </span>
    <h1
      class="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05]"
      style="font-family: var(--font-display); letter-spacing: -0.02em;"
    >
      {t('إشعار حقوق الملكية', 'Copyright notices')}
    </h1>
  </header>

  <p class="text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed">
    {t(
      'لو شفت في بطاقتي محتوى يخص حقوقك — تصميم أو خط أو صورة — راسلنا ونشيله بعد ما نتأكد.',
      'If you find content on Betakti that infringes your rights — a design, a font or an image — write to us and we will take it down once we have verified the claim.'
    )}
  </p>

  <div class="flex flex-col gap-3">
    <h2 class="text-lg font-semibold" style="font-family: var(--font-display);">
      {t('وش نحتاج في البلاغ', 'What the report needs')}
    </h2>
    <ul class="flex flex-col gap-2 text-base text-[var(--color-ink-2)] leading-relaxed">
      <li>{t('رابط المحتوى داخل بطاقتي، أو صورة منه.', 'A link to the content on Betakti, or a screenshot of it.')}</li>
      <li>{t('وصف العمل الأصلي ورابطه إن وجد.', 'A description of the original work, and a link to it if there is one.')}</li>
      <li>{t('اسمك وصفتك: صاحب الحق أو من يمثله.', 'Your name, and whether you are the rights holder or represent them.')}</li>
      <li>{t('طريقة للتواصل معك.', 'A way to reach you.')}</li>
      <li>
        {t(
          'إقرار بأن المعلومات صحيحة، وأن الاستخدام غير مصرّح به.',
          'A statement that the information is accurate and that the use is not authorised.'
        )}
      </li>
    </ul>
  </div>

  <div class="flex flex-col gap-3">
    <h2 class="text-lg font-semibold" style="font-family: var(--font-display);">
      {t('وش يصير بعدها', 'What happens next')}
    </h2>
    <p class="text-base text-[var(--color-ink-2)] leading-relaxed">
      {t(
        'نراجع البلاغ ونرد عليك. لو كان المحتوى منشور من مستخدم، نشيله ونبلّغه، ويقدر يعترض إذا عنده حق فيه.',
        'We review the report and reply. If the content was published by a user, we remove it and tell them, and they can dispute it if the work is theirs.'
      )}
    </p>
  </div>

  <p class="text-sm text-[var(--color-muted)] pt-4 border-t border-[var(--color-border)]">
    {m.legal_contact()}:
    <a href="mailto:{contact}" class="text-[var(--color-accent)] hover:underline font-medium">{contact}</a>
  </p>
</div>
