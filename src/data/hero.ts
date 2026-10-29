import type { PromoSlide } from './types'
import home from './catalog/home.json'

const toLocal = (href: string) => href.replace(/^https?:\/\/[^/]+/, '').replace(/^\/product-tag\//, '/tag/').replace(/^\/product-category\//, '/category/').replace(/\/$/, '') || '/'

/** Top promotional card slider (about three cards visible on desktop). */
export const heroSlides: PromoSlide[] = (home.hero as { href: string; image: string | null; title: string; subtitle: string }[])
  .filter((s) => s.image)
  .map((s, i) => ({ id: `promo-${i}`, title: s.title, subtitle: s.subtitle, image: s.image!, href: toLocal(s.href) }))
