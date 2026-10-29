<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { site } from '@/data/site'

const props = defineProps<{ autofocus?: boolean; id?: string }>()
const emit = defineEmits<{ submitted: [] }>()
const router = useRouter()
const q = ref('')

// Typed placeholder that cycles through search hints (static text when motion is reduced).
const hint = ref(site.search.placeholder)
let timer: ReturnType<typeof setTimeout> | undefined
const typeHints = () => {
  const hints = site.search.hints
  if (!hints?.length) return
  let i = 0
  const step = (pos: number, deleting: boolean) => {
    const full = hints[i % hints.length]!
    hint.value = full.slice(0, pos)
    if (!deleting && pos < full.length) timer = setTimeout(() => step(pos + 1, false), 55)
    else if (!deleting) timer = setTimeout(() => step(pos, true), 1800)
    else if (pos > 0) timer = setTimeout(() => step(pos - 1, true), 25)
    else { i++; timer = setTimeout(() => step(0, false), 300) }
  }
  step(0, false)
}
onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) typeHints()
})
onBeforeUnmount(() => clearTimeout(timer))
const submit = () => {
  const term = q.value.trim()
  router.push(term ? { path: '/search', query: { q: term } } : '/shop')
  emit('submitted')
}
</script>

<template>
  <form role="search" class="relative w-full" @submit.prevent="submit">
    <label :for="props.id ?? 'site-search'" class="sr-only">Search for products</label>
    <input
      :id="props.id ?? 'site-search'"
      v-model="q"
      type="search"
      :placeholder="hint"
      :autofocus="autofocus"
      autocomplete="off"
      class="h-[37px] w-full rounded-full border-0 bg-white pr-12 pl-4 text-base text-ink md:text-xs placeholder:text-menu-label focus:ring-2 focus:ring-ink/20 focus:outline-none"
    />
    <button type="submit" class="icon-btn absolute top-0 right-0 h-[37px] w-11 text-ink" aria-label="Search">
      <Search :size="22" :stroke-width="2" />
    </button>
  </form>
</template>
