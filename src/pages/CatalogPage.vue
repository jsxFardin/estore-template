<script setup lang="ts">
import { SlidersHorizontal, X } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { products, productsByBrand, productsByCategory, productsByTag } from '@/data/products'
import { brandBySlug } from '@/data/brands'
import { categoryLabels, navigation } from '@/data/navigation'
import type { NavItem } from '@/data/types'
import ProductCard from '@/components/home/ProductCard.vue'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import SelectMenu from '@/components/ui/SelectMenu.vue'
import FilterSidebar from '@/components/catalog/FilterSidebar.vue'
import { useHead } from '@/composables/useHead'

const route = useRoute()
const PAGE_SIZE = 12
const sort = ref('popular')
const page = ref(1)
const selectedBrands = ref<string[]>([])
const filtersOpen = ref(false)
const sortOptions = [
  { value: 'popular', label: 'Sort by popularity' },
  { value: 'newest', label: 'Sort by latest' },
  { value: 'price-asc', label: 'Sort by price: low to high' },
  { value: 'price-desc', label: 'Sort by price: high to low' },
]

const titleCase = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
const leafOf = (path: string) => path.split('/').filter(Boolean).pop() ?? ''

/** Navigation chain for a category leaf, for the breadcrumb ("Home / Skin Care / Face Care"). */
const chainFor = (leaf: string): { label: string; to: string }[] => {
  const walk = (items: NavItem[], trail: { label: string; to: string }[]): { label: string; to: string }[] | null => {
    for (const it of items) {
      const here = [...trail, { label: it.label, to: it.href }]
      if (leafOf(it.href) === leaf) return here
      if (it.children) {
        const found = walk(it.children, here)
        if (found) return found
      }
    }
    return null
  }
  return walk(navigation.filter((n) => n.href.startsWith('/category/')), []) ?? []
}

const context = computed(() => {
  const name = route.name as string
  if (name === 'category') {
    const path = (route.params.path as string[]).join('/')
    const leaf = leafOf(path)
    const chain = chainFor(leaf)
    return { title: categoryLabels[leaf] ?? titleCase(leaf), items: productsByCategory(path), crumbs: chain.slice(0, -1), leaf }
  }
  if (name === 'brand') {
    const slug = route.params.slug as string
    return { title: brandBySlug(slug)?.name ?? titleCase(slug), items: productsByBrand(slug), crumbs: [{ label: 'Brands', to: '/brands' }], leaf: undefined }
  }
  if (name === 'tag') {
    const slug = route.params.slug as string
    return { title: titleCase(slug), items: productsByTag(slug), crumbs: [], leaf: undefined }
  }
  if (name === 'search') {
    const q = String(route.query.q ?? '').toLowerCase()
    return { title: q ? `Search results for “${q}”` : 'Search', items: products.filter((p) => p.name.toLowerCase().includes(q)), crumbs: [], leaf: undefined }
  }
  const min = Number(route.query.min ?? 0)
  const max = Number(route.query.max ?? Infinity)
  const items = products.filter((p) => {
    const price = p.salePrice ?? p.price
    return price >= min && price <= max
  })
  const title = route.query.max ? `Products ${min ? `${min} – ` : 'below '}${max}` : 'All Products'
  return { title, items, crumbs: [], leaf: undefined }
})

const filtered = computed(() => {
  const list = selectedBrands.value.length ? context.value.items.filter((p) => selectedBrands.value.includes(p.brand)) : [...context.value.items]
  const price = (p: (typeof list)[number]) => p.salePrice ?? p.price
  switch (sort.value) {
    case 'price-asc': return list.sort((a, b) => price(a) - price(b))
    case 'price-desc': return list.sort((a, b) => price(b) - price(a))
    case 'newest': return list.reverse()
    default: return list
  }
})
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const paged = computed(() => filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))
const rangeText = computed(() => {
  const n = filtered.value.length
  if (!n) return 'No results'
  const a = (page.value - 1) * PAGE_SIZE + 1
  const b = Math.min(n, page.value * PAGE_SIZE)
  return n <= PAGE_SIZE ? `Showing all ${n} result${n === 1 ? '' : 's'}` : `Showing ${a}–${b} of ${n} results`
})
watch(() => route.fullPath, () => {
  page.value = 1
  selectedBrands.value = []
  filtersOpen.value = false
})
watch([sort, selectedBrands], () => (page.value = 1))
const goPage = (n: number) => {
  page.value = n
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

useHead({ title: () => context.value.title })
</script>

<template>
  <div class="container-site py-4 md:py-6">
    <Breadcrumbs :items="[...context.crumbs, { label: context.title }]" />
    <div class="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
      <!-- Sidebar (sticky on desktop, drawer-like panel on mobile) -->
      <div class="lg:sticky lg:top-28 lg:self-start">
        <button type="button" class="btn-outline w-full lg:hidden" :aria-expanded="filtersOpen" @click="filtersOpen = !filtersOpen">
          <SlidersHorizontal :size="16" /> Filters
          <X v-if="filtersOpen" :size="16" />
        </button>
        <div class="mt-3 rounded bg-white p-4 lg:mt-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto" :class="filtersOpen ? 'block' : 'hidden lg:block'">
          <FilterSidebar v-model:selected-brands="selectedBrands" :scope="context.items" :active-category="context.leaf" />
        </div>
      </div>

      <div class="min-w-0">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 class="text-2xl font-semibold text-ink">{{ context.title }}</h1>
            <p class="mt-1 text-sm text-muted" aria-live="polite">{{ rangeText }}</p>
          </div>
          <SelectMenu v-model="sort" :options="sortOptions" label="Sort products" />
        </div>

        <div v-if="paged.length" class="grid grid-cols-2 gap-2.5 md:grid-cols-3">
          <ProductCard v-for="p in paged" :key="p.id" :product="p" />
        </div>
        <div v-else class="rounded bg-white p-10 text-center shadow-card">
          <p class="text-base text-ink">No products match this page.</p>
          <RouterLink to="/shop" class="btn-primary mt-4">Browse all products</RouterLink>
        </div>

        <nav v-if="pageCount > 1" class="mt-6 flex flex-wrap items-center justify-center gap-1" aria-label="Pagination">
          <button type="button" class="btn-outline h-9 px-3 py-0 text-xs" :disabled="page === 1" @click="goPage(page - 1)">Previous</button>
          <button
            v-for="n in pageCount"
            :key="n"
            type="button"
            class="h-9 min-w-9 rounded border px-2 text-sm"
            :class="n === page ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-ink'"
            :aria-current="n === page ? 'page' : undefined"
            @click="goPage(n)"
          >
            {{ n }}
          </button>
          <button type="button" class="btn-outline h-9 px-3 py-0 text-xs" :disabled="page === pageCount" @click="goPage(page + 1)">Next</button>
        </nav>
      </div>
    </div>
  </div>
</template>
