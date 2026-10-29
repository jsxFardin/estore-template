<script setup lang="ts">
import { brands } from '@/data/brands'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useHead } from '@/composables/useHead'

useHead({ title: 'Brands' })
</script>

<template>
  <div class="container-site py-6">
    <Breadcrumbs :items="[{ label: 'Brands' }]" />
    <h1 class="mb-5 text-2xl font-semibold text-ink">Shop by Brand</h1>
    <ul class="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
      <li v-for="b in brands" :key="b.slug">
        <RouterLink :to="`/brand/${b.slug}`" class="flex flex-col items-center gap-2 rounded border border-line/60 bg-white p-3 transition-colors hover:border-ink">
          <img :src="b.logo" :alt="b.name" width="500" height="333" loading="lazy" class="h-14 w-auto object-contain" />
          <span class="text-xs font-semibold text-menu-label">{{ b.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
