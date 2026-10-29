import { computed } from 'vue'
import { useStorage } from './useStorage'
import { productById } from '@/data/products'

const ids = useStorage<string[]>('wishlist', [])

export function useWishlist() {
  const has = (id: string) => ids.value.includes(id)
  const toggle = (id: string) => {
    ids.value = has(id) ? ids.value.filter((x) => x !== id) : [...ids.value, id]
  }
  const items = computed(() => ids.value.map(productById).filter(Boolean))
  const count = computed(() => ids.value.length)
  return { ids, has, toggle, items, count }
}
