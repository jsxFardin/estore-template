<script setup lang="ts">
import ScrollCarousel from '@/components/ui/ScrollCarousel.vue'
import { tagTiles } from '@/data/tags'
</script>

<template>
  <section class="container-site py-4" aria-label="Collections">
    <ScrollCarousel :gap="6" :dots="false" aria-label="Collections">
      <RouterLink
        v-for="t in tagTiles"
        :key="t.label"
        :to="t.href"
        class="group relative aspect-square transition-opacity hover:opacity-90 w-[calc((100%-18px)/4)] overflow-hidden rounded-lg bg-tile md:w-[calc((100%-30px)/6)] lg:w-[calc((100%-48px)/9)]"
      >
        <img :src="t.image" :alt="t.label" width="400" height="400" loading="lazy" class="h-full w-full object-cover" />
        <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 pt-6 pb-2 text-[11px] leading-tight font-semibold text-white sm:text-xs">
          {{ t.label }}
        </span>
      </RouterLink>
    </ScrollCarousel>
  </section>
</template>
