<script setup lang="ts">
import ScrollCarousel from '@/components/ui/ScrollCarousel.vue'
import { productGroups } from '@/data/productGroups'
</script>

<template>
  <section class="container-site py-4" aria-labelledby="keep-shopping">
    <h2 id="keep-shopping" class="section-title mb-4">Keep Shopping</h2>
    <ScrollCarousel aria-label="Shopping collections" :dots="false">
      <article v-for="g in productGroups" :key="g.title" class="slide-group rounded bg-white p-2.5 shadow-card">
        <h3 class="mb-2.5 truncate text-[13px] font-bold text-ink md:text-base">
          <RouterLink :to="g.href" class="hover:text-brand">{{ g.title }}</RouterLink>
        </h3>
        <div class="grid grid-cols-2 gap-2.5">
          <RouterLink
            v-for="(it, i) in g.items.slice(0, 4)"
            :key="i"
            :to="g.href"
            class="aspect-square overflow-hidden rounded border border-tile-faint bg-tile-faint"
            :aria-label="g.title"
            tabindex="-1"
          >
            <img :src="it.image" :alt="it.alt" width="150" height="150" loading="lazy" class="h-full w-full object-cover" />
          </RouterLink>
        </div>
      </article>
    </ScrollCarousel>
  </section>
</template>
