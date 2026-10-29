<script setup lang="ts">
import { Check, ChevronDown } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Styled replacement for a native <select>: a button opening a listbox. */
const props = defineProps<{ modelValue: string; options: { value: string; label: string }[]; label: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const current = () => props.options.find((o) => o.value === props.modelValue)?.label ?? ''
const pick = (v: string) => {
  emit('update:modelValue', v)
  open.value = false
}
const onDoc = (e: MouseEvent) => {
  if (!root.value?.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onDoc))
onBeforeUnmount(() => document.removeEventListener('click', onDoc))
</script>

<template>
  <div ref="root" class="relative text-sm">
    <button
      type="button"
      class="flex h-10 min-w-44 items-center justify-between gap-3 rounded border border-line bg-white px-3 text-left text-ink hover:border-ink"
      :aria-label="label"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="open = !open"
      @keydown.esc="open = false"
    >
      <span class="truncate">{{ current() }}</span>
      <ChevronDown :size="16" class="shrink-0 text-muted transition-transform" :class="{ 'rotate-180': open }" />
    </button>
    <ul
      v-if="open"
      class="absolute right-0 z-20 mt-1 min-w-full overflow-hidden rounded border border-line bg-white py-1 shadow-float"
      role="listbox"
      :aria-label="label"
    >
      <li v-for="o in options" :key="o.value" role="option" :aria-selected="o.value === modelValue">
        <button type="button" class="flex w-full items-center justify-between gap-3 px-3 py-2 text-left whitespace-nowrap text-ink hover:bg-page" @click="pick(o.value)">
          {{ o.label }}
          <Check v-if="o.value === modelValue" :size="14" class="text-brand" />
        </button>
      </li>
    </ul>
  </div>
</template>
