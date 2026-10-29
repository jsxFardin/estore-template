<script setup lang="ts">
defineProps<{ items: { label: string; to?: string }[] }>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="mb-3 text-[13px] text-muted">
    <ol class="flex flex-wrap items-center gap-x-1.5">
      <li><RouterLink to="/" class="hover:text-brand">Home</RouterLink></li>
      <li v-for="(it, i) in items" :key="i" class="flex items-center gap-x-1.5">
        <span aria-hidden="true">/</span>
        <RouterLink v-if="it.to" :to="it.to" class="hover:text-brand">{{ it.label }}</RouterLink>
        <span v-else class="text-ink" aria-current="page">{{ it.label }}</span>
      </li>
    </ol>
  </nav>
</template>
