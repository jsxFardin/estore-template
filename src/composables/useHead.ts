import { watchEffect } from 'vue'
import { site } from '@/data/site'

/** Minimal document title helper. */
export function useHead(opts: { title: string | (() => string) }) {
  watchEffect(() => {
    const t = typeof opts.title === 'function' ? opts.title() : opts.title
    document.title = t === site.title ? t : `${t} | ${site.name}`
  })
}
