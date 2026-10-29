<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { navigation } from '@/data/navigation'
import type { NavItem } from '@/data/types'
import MegaMenu from './MegaMenu.vue'

/** Desktop primary navigation with hover-intent mega menu; folds overflow into "More" on laptops. */
const openIndex = ref<number | null>(null)
const root = ref<HTMLElement | null>(null)
const panelTop = ref(0)
let timer: ReturnType<typeof setTimeout> | undefined
const visibleCount = 5

const enter = (i: number) => {
  clearTimeout(timer)
  const header = root.value?.closest('header')
  panelTop.value = header ? Math.round(header.getBoundingClientRect().bottom) : 0
  timer = setTimeout(() => (openIndex.value = i), 80)
}
const leave = () => {
  clearTimeout(timer)
  timer = setTimeout(() => (openIndex.value = null), 120)
}
const close = () => {
  clearTimeout(timer)
  openIndex.value = null
}
const toggle = (i: number) => (openIndex.value = openIndex.value === i ? null : i)

const more = computed<NavItem>(() => ({ label: 'More', href: '/categories', children: navigation.slice(visibleCount) }))
const items = computed(() => navigation)
</script>

<template>
  <nav ref="root" class="relative" aria-label="Primary navigation" @mouseleave="leave" @keydown.esc="close">
    <ul class="flex items-center gap-1 xl:gap-2">
      <li
        v-for="(item, i) in items"
        :key="item.href"
        :class="i >= visibleCount ? 'hidden xl:block' : ''"
        @mouseenter="enter(i)"
      >
        <RouterLink
          :to="item.href"
          class="flex h-[55px] items-center gap-1 px-2 text-base font-semibold whitespace-nowrap text-white transition-colors hover:text-white/85"
          :aria-expanded="item.children ? openIndex === i : undefined"
          :aria-haspopup="item.children ? 'true' : undefined"
          @click="close"
          @keydown.enter.prevent="item.children ? toggle(i) : $router.push(item.href)"
        >
          {{ item.label }}
          <ChevronDown v-if="item.children" :size="14" class="opacity-80 transition-transform" :class="{ 'rotate-180': openIndex === i }" />
        </RouterLink>
      </li>
      <li class="xl:hidden" @mouseenter="enter(-1)">
        <button
          type="button"
          class="flex h-[55px] items-center gap-1 px-2 text-base font-semibold text-white"
          :aria-expanded="openIndex === -1"
          aria-haspopup="true"
          @click="toggle(-1)"
        >
          More <ChevronDown :size="14" class="opacity-80" :class="{ 'rotate-180': openIndex === -1 }" />
        </button>
      </li>
    </ul>

    <Transition name="menu">
      <div
        v-if="openIndex !== null && (openIndex === -1 ? more.children?.length : items[openIndex]?.children?.length)"
        class="fixed inset-x-0 z-40 bg-white text-body shadow-float"
        :style="{ top: `${panelTop}px` }"
        @mouseenter="enter(openIndex)"
      >
        <MegaMenu :item="openIndex === -1 ? more : items[openIndex]!" @navigate="close" />
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.15s ease;
}
.menu-enter-from,
.menu-leave-to {
  transform: translateY(-6px);
}
</style>
