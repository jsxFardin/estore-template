<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useHead } from '@/composables/useHead'

/** Generic content pages. Replace `pages` with CMS content as needed. */
const pages: Record<string, { title: string; body: string[] }> = {
  about: { title: 'About Us', body: ['Your brand story goes here: who you are, what you sell and why.'] },
  contact: { title: 'Contact Us', body: ['Support email, phone number and opening hours go here.'] },
  career: { title: 'Career', body: ['Open positions go here.'] },
  returns: { title: 'Returns and Exchanges', body: ['Your return and exchange policy goes here.'] },
  privacy: { title: 'Privacy Policy', body: ['How you handle customer data goes here.'] },
  terms: { title: 'Terms and Conditions', body: ['The terms of using this store go here.'] },
  stores: { title: 'Store Locator', body: ['A map or a list of store addresses goes here.'] },
  blog: { title: 'Blog', body: ['Beauty tips, tutorials and news go here.'] },
}
const route = useRoute()
const slug = computed(() => (route.meta.slug as string) ?? (route.params.slug as string))
const page = computed(() => pages[slug.value] ?? { title: 'Page', body: ['Nothing here yet.'] })
useHead({ title: () => page.value.title })
</script>

<template>
  <div class="container-site py-6">
    <Breadcrumbs :items="[{ label: page.title }]" />
    <article class="rounded bg-white p-6 shadow-card md:p-10">
      <h1 class="text-2xl font-semibold text-ink">{{ page.title }}</h1>
      <p v-for="(b, i) in page.body" :key="i" class="mt-4 max-w-2xl text-base leading-relaxed">{{ b }}</p>
    </article>
  </div>
</template>
