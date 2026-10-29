<script setup lang="ts">
import { navigation } from '@/data/navigation'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useHead } from '@/composables/useHead'

const groups = navigation.filter((n) => n.href.startsWith('/category/'))
useHead({ title: 'Categories' })
</script>

<template>
  <div class="container-site py-6">
    <Breadcrumbs :items="[{ label: 'Categories' }]" />
    <h1 class="mb-5 text-2xl font-semibold text-ink">All Categories</h1>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <section v-for="g in groups" :key="g.href" class="rounded bg-white p-4 shadow-card">
        <h2 class="mb-2 text-base font-semibold text-ink"><RouterLink :to="g.href" class="hover:text-brand">{{ g.label }}</RouterLink></h2>
        <ul v-if="g.children" class="space-y-1">
          <li v-for="c in g.children" :key="c.href">
            <RouterLink :to="c.href" class="text-sm font-medium text-ink hover:text-brand">{{ c.label }}</RouterLink>
            <ul v-if="c.children" class="mt-1 mb-2 ml-3 flex flex-wrap gap-x-3 gap-y-1">
              <li v-for="s in c.children" :key="s.href"><RouterLink :to="s.href" class="text-xs text-body hover:text-brand">{{ s.label }}</RouterLink></li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
