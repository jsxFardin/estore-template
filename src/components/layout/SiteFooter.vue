<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import { useMediaQuery } from '@/composables/useMediaQuery'
import { site } from '@/data/site'
import SocialIcon from '@/components/ui/SocialIcon.vue'

const isDesktop = useMediaQuery('(min-width: 768px)')
const email = ref('')
const status = ref('')
const subscribe = () => {
  status.value = `${email.value} is on the list.`
  email.value = ''
}
</script>

<template>
  <footer class="bg-footer pb-[calc(62px+env(safe-area-inset-bottom))] text-white/95 lg:pb-0">
    <div class="container-site grid gap-10 pt-14 pb-10 md:grid-cols-12 md:gap-8">
      <section class="min-w-0 md:col-span-5" aria-labelledby="newsletter-title">
        <h2 id="newsletter-title" class="min-w-0 text-2xl font-medium break-words text-white">{{ site.footer.newsletter.title }}</h2>
        <p class="mt-2 max-w-md text-[13px] leading-relaxed text-footer-text">{{ site.footer.newsletter.copy }}</p>
        <form class="mt-5 flex w-full max-w-md gap-2" @submit.prevent="subscribe">
          <label for="footer-email" class="sr-only">Email address</label>
          <input
            id="footer-email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            :placeholder="site.footer.newsletter.placeholder"
            class="h-11 min-w-0 flex-1 rounded-full border border-footer-input-line bg-transparent px-4 text-base text-white md:text-sm placeholder:text-footer-placeholder focus:border-white focus:outline-none"
          />
          <button type="submit" class="h-11 shrink-0 rounded-full bg-white px-5 whitespace-nowrap text-[14.7px] font-medium text-footer-btn-text hover:bg-tile">
            {{ site.footer.newsletter.button }}
          </button>
        </form>
        <p class="mt-2 min-h-5 text-xs text-footer-text" aria-live="polite" role="status">{{ status }}</p>
      </section>

      <div class="grid gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-2 md:pl-8">
        <nav v-for="col in site.footer.columns" :key="col.title" :aria-label="col.title">
          <details class="group" :open="isDesktop">
            <summary class="flex cursor-pointer list-none items-center justify-between border-b border-footer-line pb-3.5 text-[15.2px] font-semibold text-white md:pointer-events-none [&::-webkit-details-marker]:hidden">
              {{ col.title }}
              <ChevronDown :size="18" class="text-footer-text transition-transform group-open:rotate-180 md:hidden" aria-hidden="true" />
            </summary>
            <ul class="mt-4 space-y-2.5">
              <li v-for="l in col.links" :key="l.href">
                <RouterLink :to="l.href" class="text-[14.2px] text-footer-text transition-colors hover:text-white">{{ l.label }}</RouterLink>
              </li>
            </ul>
          </details>
        </nav>
      </div>
    </div>

    <div class="border-t border-footer-line">
      <div class="container-site flex flex-col items-center gap-5 py-6 md:flex-row md:justify-between">
        <nav class="flex items-center gap-5" aria-label="Social media links">
          <a v-for="s in site.social" :key="s.name" :href="s.href" target="_blank" rel="noopener noreferrer" :aria-label="s.name" class="text-white hover:text-footer-text">
            <SocialIcon :name="s.icon" :size="24" />
          </a>
        </nav>
        <div class="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <p class="text-sm font-medium text-white">Pay With</p>
          <ul class="flex flex-wrap justify-center gap-2">
            <li v-for="p in site.payments" :key="p.name">
              <img :src="p.image" :alt="p.name" :width="p.width ?? 120" :height="p.height ?? 40" loading="lazy" class="h-9 w-auto" />
            </li>
          </ul>
        </div>
        <p class="text-[13px] text-footer-text">{{ site.footer.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
h2 {
  overflow-wrap: break-word;
  min-width: 0;
}
</style>
