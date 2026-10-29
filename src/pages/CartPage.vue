<script setup lang="ts">
import { Minus, Plus, Trash2 } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'
import { money } from '@/composables/useMoney'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useHead } from '@/composables/useHead'

const cart = useCart()
useHead({ title: 'Cart' })
</script>

<template>
  <div class="container-site py-6">
    <Breadcrumbs :items="[{ label: 'Cart' }]" />
    <h1 class="mb-5 text-2xl font-semibold text-ink">Your Cart</h1>
    <div v-if="cart.items.value.length" class="grid gap-6 lg:grid-cols-3">
      <ul class="divide-y divide-line/60 rounded bg-white p-4 shadow-card lg:col-span-2">
        <li v-for="l in cart.items.value" :key="l.id + (l.variant ?? '')" class="flex gap-4 py-4">
          <img :src="l.product.image" :alt="l.product.name" width="96" height="96" class="h-24 w-24 shrink-0 rounded bg-page object-cover" />
          <div class="min-w-0 flex-1">
            <RouterLink :to="`/product/${l.product.slug}`" class="text-sm font-medium text-ink hover:text-brand">{{ l.product.name }}</RouterLink>
            <p v-if="l.variant" class="mt-0.5 text-xs text-muted">{{ l.variant }}</p>
            <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div class="inline-flex items-center rounded border border-line">
                <button type="button" class="icon-btn h-8 w-8 rounded-none" aria-label="Decrease quantity" @click="cart.setQty(l.id, l.variant, l.qty - 1)"><Minus :size="14" /></button>
                <span class="w-8 text-center text-sm font-medium text-ink">{{ l.qty }}</span>
                <button type="button" class="icon-btn h-8 w-8 rounded-none" aria-label="Increase quantity" @click="cart.setQty(l.id, l.variant, l.qty + 1)"><Plus :size="14" /></button>
              </div>
              <span class="font-bold text-ink">{{ money(cart.unitPrice(l.product) * l.qty) }}</span>
            </div>
          </div>
          <button type="button" class="icon-btn h-9 w-9 self-start text-muted hover:text-brand" aria-label="Remove item" @click="cart.remove(l.id, l.variant)"><Trash2 :size="18" /></button>
        </li>
      </ul>
      <aside class="h-fit rounded bg-white p-5 shadow-card">
        <h2 class="text-base font-semibold text-ink">Order summary</h2>
        <dl class="mt-4 space-y-2 text-sm">
          <div class="flex justify-between"><dt>Subtotal</dt><dd class="font-medium text-ink">{{ money(cart.subtotal.value) }}</dd></div>
          <div class="flex justify-between"><dt>Delivery</dt><dd class="text-muted">Calculated at checkout</dd></div>
        </dl>
        <button type="button" class="btn-primary mt-5 w-full" @click="cart.toast.value = 'Checkout needs a backend. This demo stops here.'">Proceed to checkout</button>
        <button type="button" class="mt-2 w-full text-sm text-muted underline hover:text-brand" @click="cart.clear()">Clear cart</button>
      </aside>
    </div>
    <div v-else class="rounded bg-white p-10 text-center shadow-card">
      <p class="text-base text-ink">Your cart is empty.</p>
      <RouterLink to="/shop" class="btn-primary mt-4">Start shopping</RouterLink>
    </div>
  </div>
</template>
