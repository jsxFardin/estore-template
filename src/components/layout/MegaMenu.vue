<script setup lang="ts">
import type { NavItem } from '@/data/types'

/** Full-width dropdown panel for a top-level navigation item. */
defineProps<{ item: NavItem }>()
const emit = defineEmits<{ navigate: [] }>()
</script>

<template>
  <div class="container-site py-8">
    <!-- Image-style items (brand logos) -->
    <ul v-if="item.children?.some((c) => c.image)" class="grid grid-cols-6 gap-2.5 xl:grid-cols-10">
      <li v-for="c in item.children" :key="c.href">
        <RouterLink
          :to="c.href"
          class="flex h-full flex-col items-center gap-3 rounded border border-menu-line bg-white p-3 transition-colors hover:border-ink"
          @click="emit('navigate')"
        >
          <img :src="c.image" :alt="c.label" width="500" height="333" loading="lazy" class="h-12 w-auto max-w-full object-contain" />
          <span class="text-[11px] font-semibold text-menu-label">{{ c.label }}</span>
        </RouterLink>
      </li>
    </ul>

    <!-- Column-style items (categories) -->
    <div v-else-if="item.children?.some((c) => c.children?.length)" class="grid grid-cols-4 gap-8">
      <div v-for="c in item.children" :key="c.href">
        <RouterLink :to="c.href" class="mb-2 block text-sm font-semibold tracking-wide text-ink uppercase hover:text-brand" @click="emit('navigate')">
          {{ c.label }}
        </RouterLink>
        <ul v-if="c.children" class="space-y-[7px]">
          <li v-for="g in c.children" :key="g.href">
            <RouterLink :to="g.href" class="block text-sm text-body hover:text-brand" @click="emit('navigate')">{{ g.label }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Flat list -->
    <ul v-else class="grid grid-cols-4 gap-x-8 gap-y-2">
      <li v-for="c in item.children" :key="c.href">
        <RouterLink :to="c.href" class="block text-sm text-body hover:text-brand" @click="emit('navigate')">{{ c.label }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
