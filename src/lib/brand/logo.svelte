<script lang="ts">
  interface Props {
    size?: number;
    title?: string;
  }
  const { size = 32, title = 'Betakti' }: Props = $props();
</script>

<img
  src="/brand/logo.png"
  width={size}
  height={size}
  alt={title}
  draggable="false"
  style="border-radius: {Math.round(size * 0.22)}px; display: block;"
/>
