<script setup lang="ts">
import { Heart, ShoppingCart } from 'lucide-vue-next'
import { computed } from 'vue'
import type { Product } from '@/data/types'
import { brandBySlug } from '@/data/brands'
import { useCart } from '@/composables/useCart'
import { useWishlist } from '@/composables/useWishlist'
import { discountPercent } from '@/composables/useMoney'
import PriceTag from '@/components/ui/PriceTag.vue'

const props = defineProps<{ product: Product }>()
const cart = useCart()
const wishlist = useWishlist()
const brand = computed(() => brandBySlug(props.product.brand))
const brandName = computed(() => props.product.brandName ?? brand.value?.name ?? props.product.brand)
const brandLogo = computed(() => props.product.brandLogo ?? brand.value?.logo)
const hoverImage = computed(() => props.product.gallery?.find((g) => g !== props.product.image))
const discount = computed(() => discountPercent(props.product.price, props.product.salePrice))
const link = computed(() => `/product/${props.product.slug}`)
const wished = computed(() => wishlist.has(props.product.id))
</script>

<template>
  <article class="group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-float">
    <div class="relative aspect-square overflow-hidden bg-white">
      <RouterLink :to="link" class="block h-full w-full" :aria-label="product.name" tabindex="-1">
        <img
          :src="product.image"
          :alt="product.name"
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover"
        />
        <img
          v-if="hoverImage"
          :src="hoverImage"
          alt=""
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        />
      </RouterLink>
      <span
        v-if="discount"
        class="absolute top-2 left-2 rounded-[3px] bg-badge px-1.5 py-0.5 text-xs leading-4 font-semibold text-badge-text"
      >
        -{{ discount }}%
      </span>
      <div v-if="product.siblings?.length" class="absolute right-2.5 bottom-2.5 flex flex-col items-end gap-1">
        <RouterLink
          v-for="s in product.siblings"
          :key="s.slug"
          :to="`/product/${s.slug}`"
          class="rounded-[3px] px-1.5 py-0.5 text-xs leading-4 font-medium shadow-card"
          :class="s.slug === product.slug ? 'bg-pill text-white' : 'border border-line bg-white text-ink hover:border-ink'"
          :aria-current="s.slug === product.slug ? 'true' : undefined"
          :aria-label="`${product.name.replace(/\s*\d+\s?(ml|gm|g)$/i, '')} ${s.label}`"
        >
          {{ s.label }}
        </RouterLink>
      </div>
      <button
        type="button"
        class="icon-btn absolute top-1 right-1 h-9 w-9 border border-line/70 bg-white/95 text-accent sm:top-2 sm:right-2 sm:h-8 sm:w-8"
        :aria-label="wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`"
        :aria-pressed="wished"
        @click="wishlist.toggle(product.id)"
      >
        <Heart :size="15" :fill="wished ? 'currentColor' : 'none'" />
      </button>
    </div>

    <div class="flex flex-1 flex-col gap-1 p-2.5 pt-2">
      <div class="flex items-center justify-between gap-2">
        <RouterLink :to="`/brand/${product.brand}`" class="min-w-0 shrink-0" :aria-label="brandName">
          <img
            v-if="brandLogo"
            :src="brandLogo"
            :alt="brandName"
            width="156"
            height="120"
            class="h-3 w-auto max-w-12 object-contain object-left"
            loading="lazy"
          />
          <span v-else class="block truncate text-[11px] font-semibold text-ink">{{ brandName }}</span>
        </RouterLink>
        <span v-if="product.sold" class="truncate text-[11px] leading-3 text-muted">{{ product.sold }}</span>
      </div>
      <h3 class="line-clamp-2 min-h-[2.7em] text-sm leading-[1.35] font-normal text-ink">
        <RouterLink :to="link" class="hover:text-brand">{{ product.name }}</RouterLink>
      </h3>
      <div class="mt-auto flex items-center justify-between gap-2 pt-1">
        <PriceTag :price="product.price" :sale-price="product.salePrice" />
        <button
          type="button"
          class="icon-btn -mr-2 -mb-1 h-10 w-10 rounded text-ink hover:bg-page"
          :aria-label="`Add ${product.name} to cart`"
          @click="cart.add(product)"
        >
          <ShoppingCart :size="18" :stroke-width="1.75" />
        </button>
      </div>
    </div>
  </article>
</template>
