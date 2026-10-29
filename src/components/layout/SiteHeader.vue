<script setup lang="ts">
import { MapPin, Menu, Search, ShoppingCart, User, X } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { useScrollDirection } from '@/composables/useScrollDirection'
import { money } from '@/composables/useMoney'
import SiteLogo from '@/components/ui/SiteLogo.vue'
import SearchBox from './SearchBox.vue'
import MainNav from './MainNav.vue'
import MobileDrawer from './MobileDrawer.vue'

const cart = useCart()
const { hidden } = useScrollDirection()
const drawer = ref(false)
const mobileSearch = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => {
  drawer.value = false
  mobileSearch.value = false
})
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-brand text-white transition-transform duration-300"
    :class="hidden && !drawer ? '-translate-y-full' : 'translate-y-0'"
  >
    <!-- Desktop / tablet -->
    <div class="container-site hidden lg:block">
      <div class="flex items-center gap-6 pt-2.5">
        <RouterLink to="/stores" class="flex shrink-0 items-center gap-1 text-sm font-medium hover:underline">
          <MapPin :size="16" :stroke-width="2" /> Store Locator
        </RouterLink>
        <div class="flex-1"><SearchBox /></div>
        <RouterLink to="/account" class="flex shrink-0 items-center gap-1.5 text-sm font-medium hover:underline">
          <User :size="16" :stroke-width="2" /> My Account
        </RouterLink>
      </div>
      <div class="flex items-center justify-between gap-4">
        <SiteLogo />
        <MainNav class="min-w-0" />
        <button
          type="button"
          class="flex shrink-0 items-center gap-1 text-[15px] font-semibold whitespace-nowrap"
          :aria-label="`Cart, ${cart.count.value} items`"
          @click="cart.open.value = true"
        >
          <span>{{ money(cart.subtotal.value) }}</span>
          <span class="relative ml-1 inline-flex">
            <ShoppingCart :size="22" :stroke-width="2" />
            <span class="absolute -top-2.5 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[11px] leading-none font-bold text-brand">
              {{ cart.count.value }}
            </span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile -->
    <div class="flex h-14 items-center justify-between px-3 lg:hidden">
      <button type="button" class="icon-btn h-10 w-10" aria-label="Open menu" :aria-expanded="drawer" @click="drawer = true">
        <Menu :size="26" :stroke-width="2" />
      </button>
      <SiteLogo size="sm" />
      <button type="button" class="icon-btn h-10 w-10" :aria-label="mobileSearch ? 'Close search' : 'Open search'" :aria-expanded="mobileSearch" @click="mobileSearch = !mobileSearch">
        <X v-if="mobileSearch" :size="24" />
        <Search v-else :size="24" :stroke-width="2" />
      </button>
    </div>
    <Transition name="slide">
      <div v-if="mobileSearch" class="px-3 pb-3 lg:hidden">
        <SearchBox id="mobile-search" autofocus @submitted="mobileSearch = false" />
      </div>
    </Transition>
  </header>

  <MobileDrawer :open="drawer" @close="drawer = false" />
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-110%);
}
</style>
