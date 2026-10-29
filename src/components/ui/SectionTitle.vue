<script setup lang="ts">
defineProps<{ title: string; viewAll?: string; light?: boolean }>()
</script>

<template>
  <div class="mb-3 flex items-center justify-between gap-4">
    <h2 class="section-title" :class="{ 'text-white': light }">{{ title }}</h2>
    <RouterLink v-if="viewAll" :to="viewAll" class="view-all" :class="light ? 'text-white' : 'text-ink'">
      View all
    </RouterLink>
  </div>
</template>
