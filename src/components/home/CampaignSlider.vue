<script setup lang="ts">
import FadeSlider from '@/components/ui/FadeSlider.vue'
import { campaignBanners } from '@/data/banners'
</script>

<template>
  <section class="container-site py-4" aria-label="Campaigns">
    <FadeSlider v-slot="{ active }" :count="campaignBanners.length" aria-label="Campaign banners">
      <div class="relative overflow-hidden rounded bg-brand-section" :class="campaignBanners.some((b) => b.mobileImage) ? 'aspect-video md:aspect-[3.2/1]' : 'aspect-[3.2/1]'">
        <RouterLink
          v-for="(b, i) in campaignBanners"
          :key="b.id"
          :to="b.href"
          class="absolute inset-0 transition-opacity duration-700"
          :class="active === i ? 'opacity-100' : 'pointer-events-none opacity-0'"
          :aria-hidden="active !== i"
          :tabindex="active === i ? 0 : -1"
        >
          <picture>
            <source v-if="b.mobileImage" media="(max-width: 767px)" :srcset="b.mobileImage" />
            <img
              :src="b.image"
              :alt="b.alt"
              width="1536"
              height="480"
              :loading="i === 0 ? 'eager' : 'lazy'"
              class="h-full w-full object-cover"
            />
          </picture>
        </RouterLink>
      </div>
    </FadeSlider>
  </section>
</template>
