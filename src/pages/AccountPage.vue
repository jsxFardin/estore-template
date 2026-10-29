<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumbs from '@/components/ui/Breadcrumbs.vue'
import { useHead } from '@/composables/useHead'

const mode = ref<'login' | 'register'>('login')
const message = ref('')
const submit = () => (message.value = 'Sign-in needs a backend. This demo stops here.')
useHead({ title: 'My Account' })
</script>

<template>
  <div class="container-site py-6">
    <Breadcrumbs :items="[{ label: 'My Account' }]" />
    <div class="mx-auto max-w-md rounded bg-white p-6 shadow-card">
      <div class="mb-5 grid grid-cols-2 rounded bg-page p-1 text-sm font-semibold" role="tablist">
        <button type="button" role="tab" :aria-selected="mode === 'login'" class="rounded py-2 whitespace-nowrap" :class="mode === 'login' ? 'bg-white text-ink shadow-card' : 'text-muted'" @click="mode = 'login'">Log in</button>
        <button type="button" role="tab" :aria-selected="mode === 'register'" class="rounded py-2 whitespace-nowrap" :class="mode === 'register' ? 'bg-white text-ink shadow-card' : 'text-muted'" @click="mode = 'register'">Create Account</button>
      </div>
      <h1 class="text-2xl font-bold text-auth-ink">{{ mode === 'login' ? 'Log in' : 'Create Account' }}</h1>
      <form class="mt-4 space-y-3" @submit.prevent="submit">
        <div v-if="mode === 'register'">
          <label for="name" class="mb-1 block text-sm font-medium text-ink">Full name</label>
          <input id="name" type="text" required class="input" autocomplete="name" />
        </div>
        <div>
          <label for="email" class="mb-1 block text-sm font-medium text-ink">Email or phone</label>
          <input id="email" type="text" required class="input" autocomplete="username" />
        </div>
        <div>
          <label for="password" class="mb-1 block text-sm font-medium text-ink">Password</label>
          <input id="password" type="password" required class="input" :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" />
        </div>
        <button type="submit" class="btn-primary w-full">{{ mode === 'login' ? 'Log in' : 'Create account' }}</button>
        <p class="min-h-5 text-center text-xs text-muted" role="status">{{ message }}</p>
      </form>
      <RouterLink to="/wishlist" class="mt-2 block text-center text-sm text-ink underline hover:text-brand">View my wishlist</RouterLink>
    </div>
  </div>
</template>
