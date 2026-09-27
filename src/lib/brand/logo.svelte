<script lang="ts">
  import { m } from '$lib/i18n';

  interface Props {
    size?: number;
    title?: string;
  }
  // Resolved in the markup rather than as a default value, so the accessible
  // name follows the active locale instead of being frozen at init.
  const { size = 32, title }: Props = $props();
</script>

<img
  src="/brand/logo.png"
  width={size}
  height={size}
  alt={title ?? m.app_name()}
  draggable="false"
  style="border-radius: {Math.round(size * 0.22)}px; display: block;"
/>
