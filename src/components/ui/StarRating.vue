<script setup lang="ts">
import { Star } from 'lucide-vue-next'

withDefaults(defineProps<{ value: number; size?: number }>(), { size: 14 })
</script>

<template>
  <span class="inline-flex items-center gap-px" role="img" :aria-label="`Rated ${value.toFixed(1)} out of 5`">
    <span v-for="i in 5" :key="i" class="relative inline-block" :style="{ width: `${size}px`, height: `${size}px` }">
      <Star :size="size" class="absolute inset-0 text-line" fill="currentColor" :stroke-width="0" />
      <span class="absolute inset-0 overflow-hidden" :style="{ width: `${Math.max(0, Math.min(1, value - (i - 1))) * 100}%` }">
        <Star :size="size" class="text-rating" fill="currentColor" :stroke-width="0" />
      </span>
    </span>
  </span>
</template>
