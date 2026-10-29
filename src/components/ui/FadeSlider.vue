<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Auto-playing cross-fade slider with dot pagination (used for wide campaign banners). */
const props = withDefaults(defineProps<{ count: number; interval?: number; ariaLabel?: string }>(), {
  interval: 4500,
})
const active = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
const paused = ref(false)

const start = () => {
  stop()
  if (props.count < 2) return
  timer = setInterval(() => {
    if (!paused.value) active.value = (active.value + 1) % props.count
  }, props.interval)
}
const stop = () => timer && clearInterval(timer)
const goTo = (i: number) => {
  active.value = i
  start()
}
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce) start()
})
onBeforeUnmount(stop)
</script>

<template>
  <div
    class="relative"
    role="region"
    :aria-label="ariaLabel"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
    @focusin="paused = true"
    @focusout="paused = false"
  >
    <slot :active="active" />
    <div v-if="count > 1" class="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5" role="tablist">
      <button
        v-for="i in count"
        :key="i"
        type="button"
        role="tab"
        :aria-selected="active === i - 1"
        :aria-label="`Show banner ${i}`"
        class="h-2.5 w-2.5 rounded-sm transition-colors"
        :class="active === i - 1 ? 'bg-white' : 'bg-white/40 hover:bg-white/70'"
        @click="goTo(i - 1)"
      />
    </div>
  </div>
</template>
