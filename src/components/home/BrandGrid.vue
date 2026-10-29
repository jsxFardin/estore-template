<script setup lang="ts">
import { computed } from 'vue'
import { brands } from '@/data/brands'
import ScrollCarousel from '@/components/ui/ScrollCarousel.vue'

/** 16 logos per page (2 rows of 8 on desktop); pages become slides with dot pagination. */
const PAGE = 16
const pages = computed(() => Array.from({ length: Math.ceil(brands.length / PAGE) }, (_, i) => brands.slice(i * PAGE, (i + 1) * PAGE)))
</script>

<template>
  <section class="bg-white py-4" aria-labelledby="shop-by-brand">
    <div class="container-site">
      <h2 id="shop-by-brand" class="section-title mb-3">Shop by Brand</h2>
      <ScrollCarousel aria-label="Brands" :gap="10" :arrows="false">
        <ul v-for="(page, i) in pages" :key="i" class="grid w-full grid-cols-4 gap-2.5 md:grid-cols-6 lg:grid-cols-8">
          <li v-for="b in page" :key="b.slug">
            <RouterLink
              :to="`/brand/${b.slug}`"
              class="flex aspect-[144/75] items-center justify-center rounded bg-tile p-1.5 transition-colors hover:bg-line/60"
              :aria-label="b.name"
            >
              <img :src="b.logo" :alt="b.name" width="500" height="333" loading="lazy" class="h-full w-auto max-w-[92%] object-contain mix-blend-multiply" />
            </RouterLink>
          </li>
        </ul>
      </ScrollCarousel>
    </div>
  </section>
</template>
