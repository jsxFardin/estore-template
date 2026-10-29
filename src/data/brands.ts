import type { Brand } from './types'
import home from './catalog/home.json'

/** Brand catalogue from the reference store's Brands menu (logos downloaded by the scraper). */
export const brands: Brand[] = (home.brands as { slug: string; name: string; logo: string | null }[])
  .filter((b) => b.slug && b.logo)
  .map((b) => ({ slug: b.slug, name: b.name || b.slug, logo: b.logo! }))

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug)
