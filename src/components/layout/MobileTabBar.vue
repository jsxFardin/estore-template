<script setup lang="ts">
import { Home, LayoutGrid, LogIn, ShoppingCart, Tag } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'

const cart = useCart()
const tabs = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Categories', to: '/categories', icon: LayoutGrid },
  { label: 'Cart', to: '/cart', icon: ShoppingCart, badge: true },
  { label: 'Brands', to: '/brands', icon: Tag },
  { label: 'Login', to: '/account', icon: LogIn },
]
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-line/60 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    aria-label="Mobile shortcuts"
  >
    <RouterLink
      v-for="t in tabs"
      :key="t.to"
      :to="t.to"
      class="flex flex-col items-center gap-1 py-2 text-[11px] font-medium text-ink"
      exact-active-class="text-brand"
      :exact="t.to === '/'"
    >
      <span class="relative">
        <component :is="t.icon" :size="24" :stroke-width="1.75" />
        <span
          v-if="t.badge && cart.count.value"
          class="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] leading-none font-bold text-white"
        >
          {{ cart.count.value }}
        </span>
      </span>
      {{ t.label }}
    </RouterLink>
  </nav>
</template>
