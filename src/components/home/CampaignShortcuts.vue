<script setup lang="ts">
import { Sparkles, Tag, TrendingUp } from 'lucide-vue-next'
import { shortcuts } from '@/data/shortcuts'

const icons = { trend: TrendingUp, sparkle: Sparkles, tag: Tag }
const tones = {
  green: 'bg-chip-green-bg text-chip-green',
  purple: 'bg-chip-purple-bg text-chip-purple',
  blue: 'bg-chip-blue-bg text-chip-blue',
  orange: 'bg-chip-orange-bg text-chip-orange',
}
</script>

<template>
  <section class="bg-white py-4" aria-label="Quick links">
    <ul class="container-site flex flex-wrap justify-center gap-1.5 md:gap-2.5 lg:flex-nowrap">
      <li v-for="s in shortcuts" :key="s.label" class="lg:flex-1">
        <RouterLink
          :to="s.href"
          class="flex h-9 items-center justify-between gap-1.5 rounded border border-line bg-white px-2 text-[13px] text-chip-text transition-colors hover:border-ink md:h-[58px] md:gap-3 md:px-4 md:text-sm"
        >
          <span>{{ s.label }}</span>
          <span class="icon-btn h-6 w-6 shrink-0 md:h-8 md:w-8" :class="tones[s.tone]" aria-hidden="true">
            <component :is="icons[s.icon]" :size="14" class="md:hidden" /><component :is="icons[s.icon]" :size="16" class="hidden md:block" />
          </span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
