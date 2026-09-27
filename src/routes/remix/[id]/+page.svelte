<script lang="ts">
  import { t } from '$lib/i18n';
  import Seo from '$lib/components/seo.svelte';
  import AppStoreButtons from '$lib/components/app-store-buttons.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const design = $derived(data.design);

  // The card itself is the preview. A link dropped into WhatsApp unfurls
  // showing the design that was shared, which is the whole point: the card
  // travels further than any description of it.
  const ogTitle = $derived(
    design.title || t('تصميم من بطاقتي', 'A design made with Betakti')
  );
  const ogDescription = $derived(
    design.ownerName
      ? t(`صممه ${design.ownerName} في تطبيق بطاقتي`, `Made by ${design.ownerName} with Betakti`)
      : t('صُمم في تطبيق بطاقتي — سوِّ واحد مثله بثواني.', 'Made with Betakti — make one like it in seconds.')
  );
  const portrait = $derived(design.canvasHeight >= design.canvasWidth);
</script>

<Seo
  title={ogTitle}
  description={ogDescription}
  path={`/remix/${design.id}`}
  image={design.thumbnailUrl || undefined}
  type="article"
/>

<div class="max-w-lg mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center gap-8">
  {#if design.thumbnailUrl}
    <img
      src={design.thumbnailUrl}
      alt={ogTitle}
      class="w-full {portrait ? 'max-w-sm' : 'max-w-lg'} rounded-[var(--radius-md)] shadow-lg"
      width={design.canvasWidth}
      height={design.canvasHeight}
    />
  {/if}

  <div class="flex flex-col items-center gap-3 text-center">
    <h1 class="text-2xl sm:text-3xl font-bold" style="font-family: var(--font-display);">
      {ogTitle}
    </h1>
    <p class="text-base text-[var(--color-ink-2)]">
      {design.ownerName
        ? t(`صممه ${design.ownerName} بتطبيق بطاقتي`, `Made by ${design.ownerName} with Betakti`)
        : t('مصمم بتطبيق بطاقتي', 'Made with Betakti')}
    </p>
    <p class="text-base text-[var(--color-ink-2)]">
      {t('حمّل التطبيق وسوِّ واحد مثله — اكتب كلامك وغيّر الخط واللون.', 'Get the app and make one like it — your words, your font, your colours.')}
    </p>
  </div>

  <AppStoreButtons />

  <a
    href="/occasions"
    class="text-sm text-[var(--color-accent)] hover:underline"
  >
    {t('شوف قوالب المناسبات', 'Browse occasion templates')}
  </a>
</div>
