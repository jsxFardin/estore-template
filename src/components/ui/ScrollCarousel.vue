<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Native scroll-snap carousel. Children are the slides; give them a width
 * (e.g. `.slide-product`) and the track handles snapping, arrows and dots.
 */
const props = withDefaults(
  defineProps<{
    gap?: number
    dots?: boolean
    arrows?: boolean
    ariaLabel?: string
    /** Dot colour for use on dark/brand backgrounds. */
    light?: boolean
  }>(),
  { gap: 10, dots: true, arrows: true, light: false },
)

const track = ref<HTMLElement | null>(null)
const pages = ref(1)
const page = ref(0)
const atStart = ref(true)
const atEnd = ref(false)

const measure = () => {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  pages.value = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth))
  page.value = Math.min(pages.value - 1, Math.round(el.scrollLeft / el.clientWidth))
  atStart.value = el.scrollLeft <= 2
  atEnd.value = el.scrollLeft >= max - 2
}

let raf = 0
const onScroll = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(measure)
}
const go = (dir: 1 | -1) => {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
}
const goTo = (i: number) => {
  const el = track.value
  if (!el) return
  el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
}

let ro: ResizeObserver | undefined
onMounted(() => {
  measure()
  ro = new ResizeObserver(measure)
  if (track.value) ro.observe(track.value)
})
onBeforeUnmount(() => ro?.disconnect())

defineExpose({ go, goTo })
</script>

<template>
  <div class="group/carousel relative">
    <div
      ref="track"
      class="snap-track"
      :style="{ gap: `${props.gap}px` }"
      role="region"
      :aria-label="ariaLabel"
      tabindex="0"
      @scroll.passive="onScroll"
      @keydown.left.prevent="go(-1)"
      @keydown.right.prevent="go(1)"
    >
      <slot />
    </div>

    <template v-if="arrows">
      <button
        type="button"
        class="icon-btn absolute top-[40%] left-1 z-10 hidden h-8 w-8 -translate-y-1/2 border border-line bg-white/90 text-ink opacity-0 transition-opacity group-hover/carousel:opacity-80 hover:!opacity-100 focus-visible:opacity-100 md:inline-flex"
        :class="{ 'pointer-events-none !opacity-0': atStart }"
        aria-label="Previous"
        @click="go(-1)"
      >
        <ChevronLeft :size="18" />
      </button>
      <button
        type="button"
        class="icon-btn absolute top-[40%] right-1 z-10 hidden h-8 w-8 -translate-y-1/2 border border-line bg-white/90 text-ink opacity-0 transition-opacity group-hover/carousel:opacity-80 hover:!opacity-100 focus-visible:opacity-100 md:inline-flex"
        :class="{ 'pointer-events-none !opacity-0': atEnd }"
        aria-label="Next"
        @click="go(1)"
      >
        <ChevronRight :size="18" />
      </button>
    </template>

    <div v-if="dots && pages > 1" class="mt-3 flex justify-center gap-1.5" role="tablist" aria-label="Slides">
      <button
        v-for="i in pages"
        :key="i"
        type="button"
        role="tab"
        :aria-selected="page === i - 1"
        :aria-label="`Go to slide ${i}`"
        class="h-2 w-2 rounded-full transition-colors"
        :class="
          page === i - 1
            ? light ? 'bg-white' : 'bg-accent'
            : light ? 'bg-white/50' : 'bg-dot'
        "
        @click="goTo(i - 1)"
      />
    </div>
  </div>
</template>
