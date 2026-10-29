<script setup lang="ts">
import ScrollCarousel from '@/components/ui/ScrollCarousel.vue'
import { heroSlides } from '@/data/hero'
</script>

<template>
  <section class="container-site py-4" aria-label="Promotions">
    <ScrollCarousel aria-label="Promotional offers" :dots="false">
      <RouterLink
        v-for="(s, i) in heroSlides"
        :key="s.id"
        :to="s.href"
        class="slide-hero group overflow-hidden rounded bg-white shadow-card transition-shadow hover:shadow-float"
      >
        <img
          :src="s.image"
          :alt="s.title"
          width="900"
          height="600"
          :loading="i < 3 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : undefined"
          class="aspect-[3/2] w-full object-cover"
        />
        <div class="px-2.5 pt-2.5 pb-3">
          <h2 class="truncate text-[17.6px] leading-tight font-semibold tracking-[-0.5px] text-ink">{{ s.title }}</h2>
          <p class="mt-1.5 line-clamp-2 text-base leading-snug text-subtle">{{ s.subtitle }}</p>
        </div>
      </RouterLink>
    </ScrollCarousel>
  </section>
</template>
