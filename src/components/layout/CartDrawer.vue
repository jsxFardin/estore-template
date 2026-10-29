<script setup lang="ts">
import { Minus, Plus, Trash2, X } from 'lucide-vue-next'
import { watch } from 'vue'
import { useCart } from '@/composables/useCart'
import { money } from '@/composables/useMoney'

const cart = useCart()
watch(cart.open, (v) => (document.body.style.overflow = v ? 'hidden' : ''))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cart.open.value" class="fixed inset-0 z-[60] bg-black/50" aria-hidden="true" @click="cart.open.value = false" />
    </Transition>
    <Transition name="drawer">
      <aside
        v-if="cart.open.value"
        class="fixed inset-y-0 right-0 z-[61] flex w-[92vw] max-w-md flex-col bg-white text-body"
        role="dialog"
        aria-modal="true"
        aria-label="Cart drawer"
        @keydown.esc="cart.open.value = false"
      >
        <div class="flex items-center justify-between border-b border-line/60 px-5 py-4">
          <h2 class="text-lg font-semibold text-ink">Your Cart</h2>
          <button type="button" class="icon-btn h-9 w-9 text-ink" aria-label="Close drawer" @click="cart.open.value = false">
            <X :size="22" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-5">
          <p v-if="!cart.items.value.length" class="py-10 text-center text-muted">Your cart is empty.</p>
          <ul v-else class="divide-y divide-line/60">
            <li v-for="l in cart.items.value" :key="l.id + (l.variant ?? '')" class="flex gap-3 py-4">
              <img :src="l.product.image" :alt="l.product.name" width="72" height="72" class="h-18 w-18 shrink-0 rounded bg-page object-cover" />
              <div class="min-w-0 flex-1">
                <RouterLink :to="`/product/${l.product.slug}`" class="line-clamp-2 text-sm text-ink hover:text-brand" @click="cart.open.value = false">
                  {{ l.product.name }}
                </RouterLink>
                <p v-if="l.variant" class="mt-0.5 text-xs text-muted">{{ l.variant }}</p>
                <div class="mt-2 flex items-center justify-between">
                  <div class="inline-flex items-center rounded border border-line">
                    <button type="button" class="icon-btn h-7 w-7 rounded-none" aria-label="Decrease quantity" @click="cart.setQty(l.id, l.variant, l.qty - 1)"><Minus :size="14" /></button>
                    <span class="w-7 text-center text-sm font-medium text-ink">{{ l.qty }}</span>
                    <button type="button" class="icon-btn h-7 w-7 rounded-none" aria-label="Increase quantity" @click="cart.setQty(l.id, l.variant, l.qty + 1)"><Plus :size="14" /></button>
                  </div>
                  <span class="text-sm font-bold text-ink">{{ money(cart.unitPrice(l.product) * l.qty) }}</span>
                </div>
              </div>
              <button type="button" class="icon-btn h-8 w-8 self-start text-muted hover:text-brand" aria-label="Remove item" @click="cart.remove(l.id, l.variant)">
                <Trash2 :size="16" />
              </button>
            </li>
          </ul>
        </div>

        <div class="border-t border-line/60 p-5">
          <div class="mb-3 flex items-center justify-between text-base">
            <span>Subtotal</span>
            <span class="font-bold text-ink">{{ money(cart.subtotal.value) }}</span>
          </div>
          <RouterLink to="/cart" class="btn-primary w-full" @click="cart.open.value = false">View cart &amp; checkout</RouterLink>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: transform 0.2s ease-out; transform-origin: top; }
.fade-enter-from,
.fade-leave-to { transform: scaleY(0); }
.drawer-enter-active,
.drawer-leave-active { transition: transform 0.25s ease; }
.drawer-enter-from,
.drawer-leave-to { transform: translateX(100%); }
</style>
