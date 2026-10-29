<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { navigation } from '@/data/navigation'
import { brands } from '@/data/brands'
import { products } from '@/data/products'
import { skinTypes } from '@/data/skinTypes'
import type { NavItem, Product } from '@/data/types'

/**
 * Sticky filter column: category tree with counts, brands (show more), skin type.
 * Category counts are store-wide; brand counts reflect the current page's scope.
 */
const props = defineProps<{ scope: Product[]; selectedBrands: string[]; activeCategory?: string }>()
const emit = defineEmits<{ 'update:selectedBrands': [value: string[]] }>()

const leaf = (href: string) => href.split('/').filter(Boolean).pop() ?? ''
const countFor = (slug: string) => products.filter((p) => p.categories.includes(slug)).length
const categories = computed(() => navigation.filter((n) => n.href.startsWith('/category/')))
const expanded = ref<Set<string>>(new Set(props.activeCategory ? [props.activeCategory] : []))
const toggle = (key: string) => {
  const next = new Set(expanded.value)
  next.has(key) ? next.delete(key) : next.add(key)
  expanded.value = next
}
const hasCount = (item: NavItem) => countFor(leaf(item.href)) > 0
const showsChildren = (s: NavItem) =>
  !!s.children?.length && !!props.activeCategory && (props.activeCategory === leaf(s.href) || s.children.some((g) => leaf(g.href) === props.activeCategory))

const brandCounts = computed(() =>
  brands
    .map((b) => ({ ...b, count: props.scope.filter((p) => p.brand === b.slug).length }))
    .filter((b) => b.count > 0)
    .sort((a, b) => b.count - a.count),
)
const showAllBrands = ref(false)
const visibleBrands = computed(() => (showAllBrands.value ? brandCounts.value : brandCounts.value.slice(0, 6)))
const toggleBrand = (slug: string) => {
  const set = new Set(props.selectedBrands)
  set.has(slug) ? set.delete(slug) : set.add(slug)
  emit('update:selectedBrands', [...set])
}
</script>

<template>
  <aside class="space-y-6 text-sm" aria-label="Filters">
    <section>
      <h2 class="mb-2 text-[15px] font-semibold text-ink">Categories</h2>
      <ul class="space-y-0.5">
        <li v-for="c in categories" :key="c.href">
          <div class="flex items-center">
            <RouterLink
              :to="c.href"
              class="flex flex-1 items-center justify-between py-1.5 text-body hover:text-brand"
              :class="{ 'font-semibold text-ink': activeCategory === leaf(c.href) }"
            >
              <span>{{ c.label }}</span>
              <span class="text-xs text-muted">({{ countFor(leaf(c.href)) }})</span>
            </RouterLink>
            <button
              v-if="c.children?.length"
              type="button"
              class="icon-btn h-7 w-7 text-muted hover:text-ink"
              :aria-expanded="expanded.has(leaf(c.href))"
              :aria-label="`Toggle ${c.label}`"
              @click="toggle(leaf(c.href))"
            >
              <ChevronDown :size="14" class="transition-transform" :class="{ 'rotate-180': expanded.has(leaf(c.href)) }" />
            </button>
          </div>
          <ul v-if="c.children?.length && expanded.has(leaf(c.href))" class="mb-1 ml-3 border-l border-line/70 pl-3">
            <li v-for="s in c.children" :key="s.href">
              <RouterLink
                :to="s.href"
                class="flex items-center justify-between py-1 text-body hover:text-brand"
                :class="{ 'font-semibold text-ink': activeCategory === leaf(s.href), 'opacity-50': !hasCount(s) }"
              >
                <span>{{ s.label }}</span>
                <span class="text-xs text-muted">({{ countFor(leaf(s.href)) }})</span>
              </RouterLink>
              <ul v-if="showsChildren(s)" class="ml-3 border-l border-line/70 pl-3">
                <li v-for="g in s.children" :key="g.href">
                  <RouterLink
                    :to="g.href"
                    class="flex items-center justify-between py-1 text-body hover:text-brand"
                    :class="{ 'font-semibold text-ink': activeCategory === leaf(g.href), 'opacity-50': !hasCount(g) }"
                  >
                    <span>{{ g.label }}</span>
                    <span class="text-xs text-muted">({{ countFor(leaf(g.href)) }})</span>
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <section v-if="brandCounts.length">
      <h2 class="mb-2 text-[15px] font-semibold text-ink">Brands</h2>
      <ul class="space-y-1">
        <li v-for="b in visibleBrands" :key="b.slug">
          <label class="flex cursor-pointer items-center gap-2 py-0.5 text-body">
            <input type="checkbox" class="h-4 w-4 rounded border-line" :checked="selectedBrands.includes(b.slug)" @change="toggleBrand(b.slug)" />
            <span class="flex-1">{{ b.name }}</span>
            <span class="text-xs text-muted">({{ b.count }})</span>
          </label>
        </li>
      </ul>
      <button v-if="brandCounts.length > 6" type="button" class="mt-1 text-xs font-medium text-brand underline underline-offset-2" @click="showAllBrands = !showAllBrands">
        {{ showAllBrands ? 'Show less' : `Show more (${brandCounts.length - 6})` }}
      </button>
    </section>

    <section>
      <h2 class="mb-2 text-[15px] font-semibold text-ink">Skin Type</h2>
      <ul class="space-y-0.5">
        <li v-for="s in skinTypes" :key="s.label">
          <RouterLink :to="s.href" class="block py-1 text-body hover:text-brand">{{ s.label }}</RouterLink>
        </li>
      </ul>
    </section>
  </aside>
</template>
