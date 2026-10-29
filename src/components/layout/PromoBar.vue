<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { site } from '@/data/site'

const dismissed = ref(false)
</script>

<template>
  <div
    v-if="site.promoBar.enabled && !dismissed"
    class="relative bg-promo px-7 py-1 text-center text-xs leading-4 font-medium text-white md:px-8 md:py-[5px] md:text-[14.4px] md:leading-[1.3rem]"
    role="region"
    aria-label="Announcement"
  >
    <p>
      <template v-for="(seg, i) in site.promoBar.segments" :key="i">
        <span v-if="seg.highlight" class="text-promo-highlight">{{ seg.text }}</span>
        <template v-else>{{ seg.text }}</template>
      </template>
    </p>
    <button
      type="button"
      class="icon-btn absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 text-white/80 hover:text-white"
      aria-label="Dismiss announcement"
      @click="dismissed = true"
    >
      <X :size="16" />
    </button>
  </div>
</template>
