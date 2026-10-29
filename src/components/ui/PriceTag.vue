<script setup lang="ts">
import { money } from '@/composables/useMoney'

withDefaults(defineProps<{ price: number; salePrice?: number; size?: 'sm' | 'lg' }>(), { size: 'sm' })
</script>

<template>
  <span class="inline-flex flex-wrap items-baseline gap-x-1.5" :class="size === 'lg' ? 'text-xl' : 'text-sm'">
    <template v-if="salePrice && salePrice < price">
      <del class="font-normal text-price-old" :class="size === 'lg' ? 'text-base' : 'text-[13px]'">{{ money(price) }}</del>
      <ins class="font-bold text-accent no-underline">{{ money(salePrice) }}</ins>
    </template>
    <span v-else class="font-bold text-price">{{ money(price) }}</span>
  </span>
</template>
