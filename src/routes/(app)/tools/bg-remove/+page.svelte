<script lang="ts">
  import { m } from '$lib/i18n';
  import Card from '$lib/components/card.svelte';
  import { Scissors } from 'lucide-svelte';
</script>

<div class="max-w-3xl mx-auto flex flex-col gap-8">
  <header>
    <h1
      class="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.1]"
      style="font-family: var(--font-display); letter-spacing: -0.015em;"
    >
      {m.bg_remove_title()}
    </h1>
  </header>

  <Card>
    <div class="flex flex-col items-center text-center gap-5 py-6">
      <div
        class="w-16 h-16 rounded-[14px] flex items-center justify-center text-white"
        style="background: var(--brand-gradient); box-shadow: 0 8px 24px rgba(91, 141, 239, 0.22);"
      >
        <Scissors size={26} strokeWidth={1.75} />
      </div>
      <p class="text-base text-[var(--color-ink-2)] max-w-[40ch] leading-relaxed">
        {m.bg_remove_coming()}
      </p>
    </div>
  </Card>
</div>
