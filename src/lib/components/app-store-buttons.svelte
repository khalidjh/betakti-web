<script lang="ts">
  import { t } from '$lib/i18n';
  import { APP_STORE_URL, PLAY_STORE_URL } from '$lib/seo/config';

  interface Props {
    /** "dark" = black badges (for light backgrounds), "light" = white badges (for coloured/gradient backgrounds). */
    variant?: 'dark' | 'light';
    size?: 'md' | 'sm';
    class?: string;
  }
  const { variant = 'dark', size = 'md', class: cls = '' }: Props = $props();

  const badge = $derived(
    variant === 'light'
      ? 'bg-white text-[var(--color-ink)] border border-black/5 hover:bg-white/90'
      : 'bg-[#0b0d17] text-white border border-white/10 hover:bg-black'
  );
  const pad = $derived(size === 'sm' ? 'px-3.5 py-2' : 'px-4 py-2.5');
  const iconSize = $derived(size === 'sm' ? 22 : 26);
</script>

<div class="flex flex-wrap items-center gap-3 {cls}">
  <!-- App Store -->
  <a
    href={APP_STORE_URL}
    target="_blank"
    rel="noopener"
    aria-label={t('حمّل من App Store', 'Download on the App Store')}
    class="inline-flex items-center gap-2.5 rounded-[var(--radius-md)] {pad} {badge} transition-colors"
  >
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.26 3.04-.99.99-2.18 1.57-3.42 1.47-.16-1.1.39-2.27 1.21-3.07.92-.9 2.5-1.55 3.47-1.44zM20.5 17.2c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.38 3.52-4.11 3.54-1.53.02-1.93-.99-4.01-.98-2.08.01-2.51.99-4.04.97-1.73-.02-3.05-1.79-4.04-3.36C-.85 16.8-1.06 11.34 1.27 8.5c1.13-1.4 2.91-2.29 4.59-2.29 1.71 0 2.78 1 4.19 1 1.37 0 2.2-1 4.18-1 1.5 0 3.09.82 4.22 2.23-3.71 2.03-3.11 7.33.06 8.76z" />
    </svg>
    <span class="flex flex-col leading-tight text-start">
      <span class="text-[10px] opacity-80">{t('متوفر على', 'Download on the')}</span>
      <span class="text-sm font-semibold -mt-0.5">App Store</span>
    </span>
  </a>

  <!-- Google Play -->
  <a
    href={PLAY_STORE_URL}
    target="_blank"
    rel="noopener"
    aria-label={t('احصل عليه من Google Play', 'Get it on Google Play')}
    class="inline-flex items-center gap-2.5 rounded-[var(--radius-md)] {pad} {badge} transition-colors"
  >
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 2.4c-.27.28-.43.72-.43 1.29v16.62c0 .57.16 1.01.44 1.28l.06.05L13 12.06v-.12L3.66 2.35l-.06.05z" fill="#00d3ff" />
      <path d="M16.2 15.27l-3.2-3.2v-.14l3.2-3.2.07.04 3.79 2.15c1.08.61 1.08 1.62 0 2.24l-3.79 2.15-.07.05z" fill="#ffce00" />
      <path d="M16.27 15.22L13 11.94 3.6 21.6c.36.38.94.42 1.6.05l11.07-6.43z" fill="#ff3a44" />
      <path d="M16.27 8.78L5.2 2.35C4.54 1.98 3.96 2.02 3.6 2.4l9.4 9.54 3.27-3.16z" fill="#00f076" />
    </svg>
    <span class="flex flex-col leading-tight text-start">
      <span class="text-[10px] opacity-80">{t('احصل عليه من', 'Get it on')}</span>
      <span class="text-sm font-semibold -mt-0.5">Google Play</span>
    </span>
  </a>
</div>
