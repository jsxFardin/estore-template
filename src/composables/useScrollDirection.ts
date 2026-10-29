import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Tracks whether the header should be hidden (scrolling down past a threshold). */
export function useScrollDirection(threshold = 120) {
  const hidden = ref(false)
  const scrolled = ref(false)
  let last = 0
  let ticking = false
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const y = window.scrollY
      scrolled.value = y > 8
      if (y > threshold && y > last + 4) hidden.value = true
      else if (y < last - 4 || y <= threshold) hidden.value = false
      last = y
      ticking = false
    })
  }
  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
  return { hidden, scrolled }
}
