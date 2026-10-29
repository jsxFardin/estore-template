<script setup lang="ts">
import { useWishlist } from '@/composables/useWishlist'
import ProductCard from '@/components/home/ProductCard.vue'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useHead } from '@/composables/useHead'

const wishlist = useWishlist()
useHead({ title: 'Wishlist' })
</script>

<template>
  <div class="container-site py-6">
    <Breadcrumbs :items="[{ label: 'Wishlist' }]" />
    <h1 class="mb-5 text-2xl font-semibold text-ink">Wishlist</h1>
    <div v-if="wishlist.items.value.length" class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <ProductCard v-for="p in wishlist.items.value" :key="p!.id" :product="p!" />
    </div>
    <div v-else class="rounded bg-white p-10 text-center shadow-card">
      <p class="text-base text-ink">You haven’t saved anything yet.</p>
      <RouterLink to="/shop" class="btn-primary mt-4">Browse products</RouterLink>
    </div>
  </div>
</template>
