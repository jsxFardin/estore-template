<script setup lang="ts">
import PromoBar from '@/components/layout/PromoBar.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import MobileTabBar from '@/components/layout/MobileTabBar.vue'
import CartDrawer from '@/components/layout/CartDrawer.vue'
import BackToTop from '@/components/layout/BackToTop.vue'
import CartToast from '@/components/layout/CartToast.vue'
</script>

<template>
  <a
    href="#main"
    class="sr-only z-[100] bg-white px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
  >
    Skip to content
  </a>
  <PromoBar />
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
  <MobileTabBar />
  <CartDrawer />
  <CartToast />
  <BackToTop />
</template>
