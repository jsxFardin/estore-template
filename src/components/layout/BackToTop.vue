<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false)
const onScroll = () => (visible.value = window.scrollY > 600)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <Transition name="fade">
    <button
      v-if="visible"
      type="button"
      class="icon-btn fixed right-4 bottom-8 z-40 hidden h-11 w-11 border-2 border-ink bg-white text-ink shadow-float hover:bg-ink hover:text-white lg:inline-flex"
      aria-label="Back to top"
      @click="toTop"
    >
      <ArrowUp :size="20" />
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: transform 0.2s ease-out; }
.fade-enter-from,
.fade-leave-to { transform: scale(0.6); }
</style>
