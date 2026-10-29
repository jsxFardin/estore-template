import { computed, ref } from 'vue'
import { useStorage } from './useStorage'
import { productById } from '@/data/products'
import type { Product } from '@/data/types'

export interface CartLine {
  id: string
  qty: number
  variant?: string
}

const lines = useStorage<CartLine[]>('cart', [])
const open = ref(false)
const toast = ref<string | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | undefined

const unitPrice = (p: Product) => p.salePrice ?? p.price

export function useCart() {
  const items = computed(() =>
    lines.value
      .map((l) => ({ ...l, product: productById(l.id)! }))
      .filter((l) => l.product),
  )
  const count = computed(() => items.value.reduce((n, l) => n + l.qty, 0))
  const subtotal = computed(() => items.value.reduce((n, l) => n + l.qty * unitPrice(l.product), 0))

  const add = (p: Product, variant?: string, qty = 1) => {
    const v = variant ?? p.variants?.[0]
    const found = lines.value.find((l) => l.id === p.id && l.variant === v)
    if (found) found.qty += qty
    else lines.value.push({ id: p.id, qty, variant: v })
    toast.value = `${p.name} added to cart`
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (toast.value = null), 2500)
  }
  const remove = (id: string, variant?: string) => {
    lines.value = lines.value.filter((l) => !(l.id === id && l.variant === variant))
  }
  const setQty = (id: string, variant: string | undefined, qty: number) => {
    const found = lines.value.find((l) => l.id === id && l.variant === variant)
    if (!found) return
    if (qty <= 0) remove(id, variant)
    else found.qty = qty
  }
  const clear = () => (lines.value = [])

  return { items, count, subtotal, add, remove, setQty, clear, open, toast, unitPrice }
}
