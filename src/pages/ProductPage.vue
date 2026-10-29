<script setup lang="ts">
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { productById, productBySlug, productsByBrand, productsByCategory, productsByListing } from '@/data/products'
import { brandBySlug } from '@/data/brands'
import { categoryLabels } from '@/data/navigation'
import type { Product } from '@/data/types'
import { useCart } from '@/composables/useCart'
import { useWishlist } from '@/composables/useWishlist'
import { discountPercent, money } from '@/composables/useMoney'
import { useHead } from '@/composables/useHead'
import PriceTag from '@/components/ui/PriceTag.vue'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import StarRating from '@/components/ui/StarRating.vue'
import ScrollCarousel from '@/components/ui/ScrollCarousel.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SelectMenu from '@/components/ui/SelectMenu.vue'
import ProductCard from '@/components/home/ProductCard.vue'

const route = useRoute()
const cart = useCart()
const wishlist = useWishlist()

const product = computed(() => productBySlug(route.params.slug as string))
const brand = computed(() => (product.value ? brandBySlug(product.value.brand) : undefined))
const brandName = computed(() => product.value?.brandName ?? brand.value?.name ?? product.value?.brand ?? '')
const brandLogo = computed(() => product.value?.brandLogo ?? brand.value?.logo)
const discount = computed(() => (product.value ? discountPercent(product.value.price, product.value.salePrice) : 0))

// Breadcrumb: the scraped category chain, else the navigation label of the leaf category.
const crumbs = computed(() => {
  const p = product.value
  if (!p) return []
  if (p.breadcrumb?.length) return p.breadcrumb.map((c) => ({ label: c.label, to: `/category/${c.slug}` }))
  const leaf = p.categories.at(-1)
  return leaf ? [{ label: categoryLabels[leaf] ?? p.categoryLabel ?? leaf, to: `/category/${leaf}` }] : []
})
const categoryLabel = computed(() => crumbs.value.at(-1)?.label ?? product.value?.categoryLabel ?? '')

// Gallery
const images = computed(() => {
  const p = product.value
  if (!p) return []
  const list = p.galleryLarge?.length ? p.galleryLarge : [p.image, ...(p.gallery ?? [])]
  return [...new Set(list)]
})
const active = ref(0)
const prev = () => (active.value = (active.value - 1 + images.value.length) % images.value.length)
const next = () => (active.value = (active.value + 1) % images.value.length)

const qty = ref(1)
const openSection = ref(0)
watch(product, (p) => {
  qty.value = 1
  active.value = 0
  openSection.value = 0
  document.title = p?.name ?? 'Product'
}, { immediate: true })

// Frequently bought together: scraped companions, else two products from the same brand and category.
const bundle = computed(() => {
  const p = product.value
  if (!p) return []
  const scraped = (p.fbt ?? []).slice(0, 2).map((t) => {
    const local = productById(t.id)
    return {
      id: t.id,
      name: t.name,
      image: local?.image ?? t.image ?? '',
      price: local ? (local.salePrice ?? local.price) : (t.price ?? t.regular ?? 0),
      regular: local?.price ?? t.regular,
      to: local ? `/product/${local.slug}` : undefined,
      product: local,
    }
  })
  if (scraped.length) return scraped
  return productsByBrand(p.brand)
    .filter((x) => x.id !== p.id)
    .slice(0, 2)
    .map((x) => ({ id: x.id, name: x.name, image: x.image, price: x.salePrice ?? x.price, regular: x.price, to: `/product/${x.slug}`, product: x }))
})
const bundleTotal = computed(() => (product.value ? (product.value.salePrice ?? product.value.price) + bundle.value.reduce((n, b) => n + b.price, 0) : 0))
const addBundle = () => {
  if (!product.value) return
  cart.add(product.value)
  for (const b of bundle.value) if (b.product) cart.add(b.product)
}

const youMayLike = computed(() => (product.value ? productsByCategory(product.value.categories.at(-1) ?? '').filter((x) => x.id !== product.value!.id).slice(0, 10) : []))
const moreFromBrand = computed(() => (product.value ? productsByBrand(product.value.brand).filter((x) => x.id !== product.value!.id).slice(0, 10) : []))
const bestSelling = computed(() => productsByListing('tag:best-selling').filter((x) => x.id !== product.value?.id).slice(0, 10))

const share = async () => {
  const data = { title: product.value?.name, url: location.href }
  try {
    if (navigator.share) await navigator.share(data)
    else {
      await navigator.clipboard.writeText(location.href)
      cart.toast.value = 'Link copied'
      setTimeout(() => (cart.toast.value = null), 2000)
    }
  } catch {
    /* user cancelled */
  }
}

const sortReviews = ref('recent')
const reviewSortOptions = [
  { value: 'recent', label: 'Most recent' },
  { value: 'highest', label: 'Highest rating' },
  { value: 'lowest', label: 'Lowest rating' },
]
const ratingOf = (r: { rating: string }) => Number((r.rating.match(/[\d.]+/) ?? ['0'])[0])
const reviews = computed(() => {
  const list = [...(product.value?.reviews ?? [])]
  if (sortReviews.value === 'highest') list.sort((a, b) => ratingOf(b) - ratingOf(a))
  if (sortReviews.value === 'lowest') list.sort((a, b) => ratingOf(a) - ratingOf(b))
  return list
})

useHead({ title: () => product.value?.name ?? 'Product' })
const rail = (list: Product[]) => list
</script>

<template>
  <div class="container-site py-4 md:py-6">
    <template v-if="product">
      <article class="grid gap-6 md:grid-cols-2 md:gap-10">
        <!-- Gallery -->
        <div class="md:sticky md:top-28 md:self-start">
          <div class="relative overflow-hidden rounded bg-white">
            <img
              :src="images[active]"
              :alt="product.name"
              width="800"
              height="800"
              class="aspect-square w-full object-cover"
              fetchpriority="high"
            />
            <span v-if="discount" class="absolute top-3 left-3 rounded-[3px] bg-badge px-2 py-1 text-xs font-semibold text-badge-text">-{{ discount }}%</span>
            <template v-if="images.length > 1">
              <button type="button" class="icon-btn absolute top-1/2 left-2 h-10 w-10 -translate-y-1/2 border border-line bg-white/90 text-ink hover:bg-white" aria-label="Previous image" @click="prev">
                <ChevronLeft :size="20" />
              </button>
              <button type="button" class="icon-btn absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 border border-line bg-white/90 text-ink hover:bg-white" aria-label="Next image" @click="next">
                <ChevronRight :size="20" />
              </button>
            </template>
          </div>
          <ul v-if="images.length > 1" class="no-scrollbar mt-2 flex gap-2 overflow-x-auto" aria-label="Product images">
            <li v-for="(img, i) in images" :key="img" class="shrink-0">
              <button
                type="button"
                class="block h-[72px] w-[72px] overflow-hidden rounded border bg-white"
                :class="i === active ? 'border-ink' : 'border-line hover:border-ink'"
                :aria-pressed="i === active"
                :aria-label="`Image ${i + 1}`"
                @click="active = i"
              >
                <img :src="img" :alt="''" width="72" height="72" class="h-full w-full object-cover" loading="lazy" />
              </button>
            </li>
          </ul>
        </div>

        <!-- Summary -->
        <div class="min-w-0">
          <Breadcrumbs :items="[...crumbs, { label: product.name }]" />
          <h1 class="text-[22px] leading-tight font-semibold text-ink md:text-[26px]">{{ product.name }}</h1>

          <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-body">
            <RouterLink :to="`/brand/${product.brand}`" class="inline-flex items-center" :aria-label="brandName">
              <img v-if="brandLogo" :src="brandLogo" :alt="brandName" width="155" height="120" class="h-[22px] w-auto max-w-[62px] object-contain object-left" />
              <span v-else class="font-semibold text-ink">{{ brandName }}</span>
            </RouterLink>
            <span v-if="categoryLabel" class="text-muted">·</span>
            <RouterLink v-if="categoryLabel && crumbs.at(-1)" :to="crumbs.at(-1)!.to" class="text-body hover:text-brand">{{ categoryLabel }}</RouterLink>
          </div>

          <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-body">
            <a href="#reviews" class="inline-flex items-center gap-1.5">
              <template v-if="product.rating">
                <span class="font-medium text-ink">{{ product.rating.toFixed(1) }}</span>
                <StarRating :value="product.rating" />
                <span class="text-muted">({{ product.reviewCount ?? 0 }})</span>
              </template>
              <template v-else>
                <StarRating :value="0" />
                <span class="text-muted">No reviews yet</span>
              </template>
            </a>
            <span class="h-3.5 border-l-2 border-muted/60" aria-hidden="true" />
            <span v-if="product.sold">Sold ({{ product.sold.replace(/\s*sold$/i, '') }})</span>
            <span v-if="product.wishlistCount != null" class="inline-flex items-center gap-1" :aria-label="`${product.wishlistCount} people saved this`">
              <Heart :size="14" class="text-accent" fill="currentColor" /> {{ product.wishlistCount }}
            </span>
            <button type="button" class="icon-btn ml-auto h-8 w-8 text-ink hover:bg-page" aria-label="Share product" @click="share">
              <Share2 :size="18" />
            </button>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <PriceTag :price="product.price" :sale-price="product.salePrice" size="lg" />
            <span v-if="discount" class="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-white">-{{ discount }}%</span>
          </div>

          <!-- USP keywords -->
          <ul v-if="product.keywords?.length" class="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Product highlights">
            <li v-for="k in product.keywords" :key="k.label">
              <div class="flex h-full flex-col items-center gap-1.5 rounded bg-white px-2 py-3 text-center">
                <img v-if="k.icon" :src="k.icon" :alt="''" width="35" height="35" class="h-9 w-9 rounded-full bg-page p-1" loading="lazy" />
                <span class="text-xs leading-tight text-ink">{{ k.label }}</span>
              </div>
            </li>
          </ul>

          <!-- Sizes -->
          <div v-if="product.siblings?.length" class="mt-5">
            <p class="mb-2 text-sm font-medium text-ink">Size</p>
            <div class="flex flex-wrap gap-2">
              <RouterLink
                v-for="s in product.siblings"
                :key="s.slug"
                :to="`/product/${s.slug}`"
                class="rounded border px-3 py-1.5 text-sm"
                :class="s.slug === product.slug ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink'"
                :aria-current="s.slug === product.slug ? 'page' : undefined"
              >
                {{ s.label }}
              </RouterLink>
            </div>
          </div>

          <!-- Buy row -->
          <div class="mt-5 flex items-stretch gap-2">
            <div class="inline-flex shrink-0 items-center rounded border border-line bg-white">
              <button type="button" class="icon-btn h-12 w-11 rounded-none" aria-label="Decrease quantity" @click="qty = Math.max(1, qty - 1)"><Minus :size="16" /></button>
              <span class="w-9 text-center text-base font-medium text-ink" aria-live="polite">{{ qty }}</span>
              <button type="button" class="icon-btn h-12 w-11 rounded-none" aria-label="Increase quantity" @click="qty++"><Plus :size="16" /></button>
            </div>
            <button type="button" class="btn-buy h-12 flex-1" @click="cart.add(product, undefined, qty)">
              <ShoppingCart :size="18" /> Add to cart
            </button>
            <button
              type="button"
              class="icon-btn h-12 w-12 shrink-0 border border-line bg-white text-accent hover:border-accent"
              :aria-label="wishlist.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
              :aria-pressed="wishlist.has(product.id)"
              @click="wishlist.toggle(product.id)"
            >
              <Heart :size="20" :fill="wishlist.has(product.id) ? 'currentColor' : 'none'" />
            </button>
          </div>
          <p v-if="product.stock === 'instock'" class="mt-2 text-xs text-stock">In stock</p>

          <!-- Accordion -->
          <div v-if="product.sections?.length" class="mt-6 divide-y divide-line/70 border-y border-line/70">
            <div v-for="(sec, i) in product.sections" :key="sec.title">
              <h2>
                <button
                  type="button"
                  class="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-ink"
                  :aria-expanded="openSection === i"
                  :aria-controls="`sec-${i}`"
                  @click="openSection = openSection === i ? -1 : i"
                >
                  {{ sec.title }}
                  <ChevronDown :size="18" class="shrink-0 transition-transform" :class="{ 'rotate-180': openSection === i }" />
                </button>
              </h2>
              <div v-show="openSection === i" :id="`sec-${i}`" class="pb-4 text-sm leading-relaxed text-body">{{ sec.text }}</div>
            </div>
          </div>
        </div>
      </article>

      <!-- Frequently bought together -->
      <section v-if="bundle.length" class="mt-8 rounded bg-white p-4 md:p-6" aria-labelledby="fbt-title">
        <h2 id="fbt-title" class="section-title mb-4">Frequently bought together</h2>
        <div class="flex flex-col gap-4 md:flex-row md:items-center">
          <ul class="flex flex-1 flex-wrap items-center gap-2">
            <li class="flex items-center gap-2">
              <div class="w-28 text-center">
                <img :src="product.image" :alt="product.name" width="300" height="300" class="mx-auto h-24 w-24 rounded bg-page object-cover" />
                <p class="mt-1 line-clamp-2 text-xs text-ink">{{ product.name }}</p>
                <p class="text-xs font-semibold text-ink">{{ money(product.salePrice ?? product.price) }}</p>
              </div>
            </li>
            <li v-for="b in bundle" :key="b.id" class="flex items-center gap-2">
              <Plus :size="18" class="text-muted" aria-hidden="true" />
              <component :is="b.to ? 'router-link' : 'div'" :to="b.to" class="w-28 text-center">
                <img :src="b.image" :alt="b.name" width="300" height="300" class="mx-auto h-24 w-24 rounded bg-page object-cover" loading="lazy" />
                <p class="mt-1 line-clamp-2 text-xs text-ink">{{ b.name }}</p>
                <p class="text-xs font-semibold text-ink">{{ money(b.price) }}</p>
              </component>
            </li>
          </ul>
          <div class="shrink-0 text-center md:text-left">
            <p class="text-sm text-body">Total for {{ bundle.length + 1 }} items</p>
            <p class="text-xl font-bold text-ink">{{ money(bundleTotal) }}</p>
            <button type="button" class="btn-primary mt-2 w-full" @click="addBundle">Add all {{ bundle.length + 1 }} to cart</button>
          </div>
        </div>
      </section>

      <!-- Reviews -->
      <section id="reviews" class="mt-8 rounded bg-white p-4 md:p-6" aria-labelledby="reviews-title">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 id="reviews-title" class="section-title">Product Reviews</h2>
          <SelectMenu v-if="reviews.length" v-model="sortReviews" :options="reviewSortOptions" label="Sort reviews" />
        </div>
        <div v-if="product.rating" class="mb-4 flex items-center gap-3">
          <span class="text-3xl font-bold text-ink">{{ product.rating.toFixed(1) }}</span>
          <div>
            <StarRating :value="product.rating" :size="18" />
            <p class="text-xs text-muted">{{ product.reviewCount ?? 0 }} review{{ product.reviewCount === 1 ? '' : 's' }}</p>
          </div>
        </div>
        <ul v-if="reviews.length" class="divide-y divide-line/70">
          <li v-for="(r, i) in reviews" :key="i" class="py-4">
            <div class="flex items-center gap-2 text-sm">
              <span class="font-semibold text-ink">{{ r.author || 'Customer' }}</span>
              <StarRating v-if="ratingOf(r)" :value="ratingOf(r)" :size="12" />
              <span v-if="r.date" class="ml-auto text-xs text-muted">{{ r.date }}</span>
            </div>
            <p class="mt-1 text-sm text-body">{{ r.text }}</p>
          </li>
        </ul>
        <p v-else class="text-sm text-muted">No reviews yet. Be the first to review this product.</p>
      </section>

      <section v-if="youMayLike.length" class="mt-8" aria-labelledby="sec-you-may-like">
        <SectionTitle id="sec-you-may-like" title="You May Like" :view-all="crumbs.at(-1)?.to" />
        <ScrollCarousel aria-label="You may like"><div v-for="p in rail(youMayLike)" :key="p.id" class="slide-product"><ProductCard :product="p" /></div></ScrollCarousel>
      </section>
      <section v-if="moreFromBrand.length" class="mt-8" aria-labelledby="sec-more-brand">
        <SectionTitle id="sec-more-brand" :title="`More from ${brandName}`" :view-all="`/brand/${product.brand}`" />
        <ScrollCarousel aria-label="More from this brand"><div v-for="p in rail(moreFromBrand)" :key="p.id" class="slide-product"><ProductCard :product="p" /></div></ScrollCarousel>
      </section>
      <section v-if="bestSelling.length" class="mt-8" aria-labelledby="sec-best-selling-pdp">
        <SectionTitle id="sec-best-selling-pdp" title="Best Selling" view-all="/tag/best-selling" />
        <ScrollCarousel aria-label="Best selling"><div v-for="p in rail(bestSelling)" :key="p.id" class="slide-product"><ProductCard :product="p" /></div></ScrollCarousel>
      </section>
    </template>

    <div v-else class="rounded bg-white p-10 text-center shadow-card">
      <h1 class="text-xl font-semibold text-ink">Product not found</h1>
      <RouterLink to="/shop" class="btn-primary mt-4">Browse all products</RouterLink>
    </div>
  </div>
</template>
