<script setup lang="ts">
import { ChevronDown, MapPin, User, X } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { navigation } from '@/data/navigation'
import type { NavItem } from '@/data/types'
import { site } from '@/data/site'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const expanded = ref<Set<string>>(new Set())
const toggle = (key: string) => {
  const next = new Set(expanded.value)
  next.has(key) ? next.delete(key) : next.add(key)
  expanded.value = next
}
const isOpen = (key: string) => expanded.value.has(key)
const hasImages = (item: NavItem) => !!item.children?.some((c) => c.image)

watch(
  () => props.open,
  (v) => {
    document.body.style.overflow = v ? 'hidden' : ''
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-[60] bg-black/50 lg:hidden" aria-hidden="true" @click="emit('close')" />
    </Transition>
    <Transition name="drawer">
      <aside
        v-if="open"
        class="fixed inset-y-0 left-0 z-[61] flex w-[85vw] max-w-sm flex-col bg-white text-body lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        @keydown.esc="emit('close')"
      >
        <div class="flex items-center justify-between border-b border-line/60 px-4 py-3">
          <span class="text-base font-semibold text-ink">{{ site.name }}</span>
          <button type="button" class="icon-btn h-9 w-9 text-ink" aria-label="Close menu" @click="emit('close')">
            <X :size="22" />
          </button>
        </div>

        <nav class="flex-1 overflow-y-auto" aria-label="Mobile navigation">
          <ul>
            <li v-for="item in navigation" :key="item.href" class="border-b border-line/60">
              <div class="flex items-center">
                <RouterLink :to="item.href" class="flex-1 px-4 py-3 text-[15px] font-semibold text-ink" @click="emit('close')">
                  {{ item.label }}
                </RouterLink>
                <button
                  v-if="item.children"
                  type="button"
                  class="icon-btn h-11 w-11 text-ink"
                  :aria-expanded="isOpen(item.href)"
                  :aria-label="`Toggle ${item.label}`"
                  @click="toggle(item.href)"
                >
                  <ChevronDown :size="18" class="transition-transform" :class="{ 'rotate-180': isOpen(item.href) }" />
                </button>
              </div>

              <div v-if="item.children && isOpen(item.href)" class="bg-page pb-2">
                <ul v-if="hasImages(item)" class="grid grid-cols-3 gap-2 px-4 py-2">
                  <li v-for="c in item.children" :key="c.href">
                    <RouterLink :to="c.href" class="flex flex-col items-center gap-1 rounded border border-line/60 bg-white p-2" @click="emit('close')">
                      <img :src="c.image" :alt="c.label" width="500" height="333" loading="lazy" class="h-9 w-auto object-contain" />
                      <span class="text-[11px] font-semibold text-menu-label">{{ c.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
                <ul v-else>
                  <li v-for="c in item.children" :key="c.href">
                    <div class="flex items-center">
                      <RouterLink :to="c.href" class="flex-1 px-6 py-2 text-sm font-medium text-ink" @click="emit('close')">{{ c.label }}</RouterLink>
                      <button
                        v-if="c.children"
                        type="button"
                        class="icon-btn h-9 w-11 text-ink"
                        :aria-expanded="isOpen(c.href)"
                        :aria-label="`Toggle ${c.label}`"
                        @click="toggle(c.href)"
                      >
                        <ChevronDown :size="16" class="transition-transform" :class="{ 'rotate-180': isOpen(c.href) }" />
                      </button>
                    </div>
                    <ul v-if="c.children && isOpen(c.href)">
                      <li v-for="g in c.children" :key="g.href">
                        <RouterLink :to="g.href" class="block px-9 py-1.5 text-sm text-body" @click="emit('close')">{{ g.label }}</RouterLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <div class="grid grid-cols-2 gap-2 border-t border-line/60 p-3 text-sm">
          <RouterLink to="/stores" class="flex items-center justify-center gap-1.5 rounded border border-line py-2 text-ink" @click="emit('close')">
            <MapPin :size="16" /> Store Locator
          </RouterLink>
          <RouterLink to="/account" class="flex items-center justify-center gap-1.5 rounded border border-line py-2 text-ink" @click="emit('close')">
            <User :size="16" /> My Account
          </RouterLink>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.2s ease-out;
  transform-origin: top;
}
.fade-enter-from,
.fade-leave-to {
  transform: scaleY(0);
}
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-100%);
}
</style>
