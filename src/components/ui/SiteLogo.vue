<script setup lang="ts">
import { site } from '@/data/site'

/** Configurable brand mark: image when `site.logo` is set, otherwise a text wordmark. */
withDefaults(defineProps<{ tone?: 'light' | 'dark'; size?: 'sm' | 'md' }>(), { tone: 'light', size: 'md' })
</script>

<template>
  <RouterLink to="/" class="inline-flex shrink-0 items-center" :aria-label="`${site.name} home`">
    <img v-if="site.logo" :src="site.logo" :alt="site.name" :class="size === 'sm' ? 'h-7' : 'h-8'" class="w-auto" />
    <span v-else class="flex flex-col leading-none" :class="tone === 'light' ? 'text-white' : 'text-ink'">
      <span
        class="font-bold uppercase"
        :class="size === 'sm' ? 'text-[19px]' : 'text-[22px]'"
        >{{ site.name }}</span
      >
      <span class="mt-0.5 text-[10px] font-medium opacity-90">{{ site.tagline }}</span>
    </span>
  </RouterLink>
</template>
