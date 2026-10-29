<script setup lang="ts">
import { Check } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'

const cart = useCart()
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="cart.toast.value"
        class="fixed bottom-24 left-1/2 z-[70] flex max-w-[90vw] -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-white shadow-float lg:bottom-8"
        role="status"
        aria-live="polite"
      >
        <Check :size="16" class="shrink-0 text-chip-green" />
        <span class="truncate">{{ cart.toast.value }}</span>
        <button type="button" class="ml-1 shrink-0 font-semibold underline" @click="cart.open.value = true">View cart</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.toast-enter-from,
.toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>
