<script setup lang="ts">
import { computed } from 'vue'
import type { Product, ProductSection } from '@/data/types'
import { productById, productsByBrand, productsByListing, productsByTag } from '@/data/products'
import ScrollCarousel from '@/components/ui/ScrollCarousel.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProductCard from './ProductCard.vue'

const props = defineProps<{ section: ProductSection }>()
/** Rails read better when colour/size variants of one product don't sit side by side. */
const spread = (list: (Product | undefined)[]) => {
  const seen = new Set<string>()
  const first: Product[] = []
  const rest: Product[] = []
  for (const p of list) {
    if (!p) continue
    const key = `${p.brand}|${p.name.toLowerCase().replace(/[–-].*$/, '').split(' ').slice(0, 3).join(' ')}`
    if (seen.has(key)) rest.push(p)
    else {
      seen.add(key)
      first.push(p)
    }
  }
  return [...first, ...rest]
}
const items = computed(() => {
  const s = props.section
  if (s.productIds) return s.productIds.map(productById).filter(Boolean)
  if (s.listing) return spread(productsByListing(s.listing))
  if (s.tag) return spread(productsByTag(s.tag))
  if (s.brand) return spread(productsByBrand(s.brand))
  return []
})
const brand = computed(() => props.section.theme === 'brand')
</script>

<template>
  <section
    v-if="items.length"
    :class="brand ? 'bg-brand-section bg-brand-glow' : ''"
    :aria-labelledby="`sec-${section.id}`"
  >
    <div class="container-site py-4">
      <SectionTitle :id="`sec-${section.id}`" :title="section.title" :view-all="section.viewAll" :light="brand" />
      <ScrollCarousel :aria-label="section.title" :light="brand">
        <div v-for="p in items" :key="p!.id" class="slide-product">
          <ProductCard :product="p!" />
        </div>
      </ScrollCarousel>
    </div>
  </section>
</template>
