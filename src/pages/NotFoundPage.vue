<script setup lang="ts">
import { useHead } from '@/composables/useHead'
useHead({ title: 'Page not found' })
</script>

<template>
  <div class="container-site py-16 text-center">
    <h1 class="text-3xl font-bold text-ink">Page not found</h1>
    <p class="mt-2 text-muted">That address doesn’t match anything in the store.</p>
    <RouterLink to="/" class="btn-primary mt-6">Back to home</RouterLink>
  </div>
</template>
