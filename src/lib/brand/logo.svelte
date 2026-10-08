<script lang="ts">
  import { m } from '$lib/i18n';

  interface Props {
    size?: number;
    title?: string;
    /** `mark` is the bare 3D logo, as the app's own header shows it; `tile`
     *  is the app icon (the mark on its #030824 field), as on a home screen. */
    variant?: 'mark' | 'tile';
  }
  // Resolved in the markup rather than as a default value, so the accessible
  // name follows the active locale instead of being frozen at init.
  const { size = 32, title, variant = 'mark' }: Props = $props();
</script>

<img
  src={variant === 'tile' ? '/brand/logo.png' : '/brand/mark.png'}
  width={size}
  height={size}
  alt={title ?? m.app_name()}
  draggable="false"
  style="display: block; {variant === 'tile' ? `border-radius: ${Math.round(size * 0.22)}px;` : ''}"
/>
