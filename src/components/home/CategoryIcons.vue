<script setup lang="ts">
import { Baby, Blend, Brush, CircleDot, Droplets, Eye, Feather, Flower2, Gem, Gift, Heart, Leaf, Palette, Scissors, ShieldCheck, Smile, Sparkles, SprayCan, Sun, Wind } from 'lucide-vue-next'
import { computed, type Component } from 'vue'
import type { CategoryIcon } from '@/data/types'
import { categoryIcons } from '@/data/categories'

const props = withDefaults(defineProps<{ items?: CategoryIcon[]; title?: string; label?: string }>(), { label: 'Shop by category' })
const list = computed(() => props.items ?? categoryIcons)

/** Icons available to `categories.ts`; add more here when you add new category entries. */
const icons: Record<string, Component> = { Baby, Blend, Brush, CircleDot, Droplets, Eye, Feather, Flower2, Gem, Gift, Heart, Leaf, Palette, Scissors, Smile, ShieldCheck, Sparkles, SprayCan, Sun, Wind }
const icon = (name: string) => icons[name] ?? Sparkles
</script>

<template>
  <section class="bg-white py-4" :aria-label="title ? undefined : label" :aria-labelledby="title ? 'skin-type-title' : undefined">
    <h2 v-if="title" id="skin-type-title" class="section-title container-site mb-3">{{ title }}</h2>
    <ul
      :class="[list.length <= 8 ? 'cat-grid-8' : 'cat-grid', list.length <= 8 ? 'grid-rows-2 sm:grid-rows-1' : 'grid-rows-2 md:grid-rows-1']"
      class="container-site no-scrollbar grid snap-x snap-mandatory grid-flow-col overflow-x-auto"
    >
      <li v-for="c in list" :key="c.label" class="min-w-0 snap-start">
        <RouterLink :to="c.href" class="group flex flex-col items-center gap-2 px-1 py-2 text-center">
          <span
            class="icon-btn h-14 w-14 bg-circle text-ink transition-colors group-hover:bg-brand group-hover:text-white sm:h-16 sm:w-16"
            aria-hidden="true"
          >
            <component :is="icon(c.icon)" :size="26" :stroke-width="1.5" />
          </span>
          <span class="line-clamp-2 text-[12px] leading-tight text-ink sm:text-sm">{{ c.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
