import type { ProductGroup } from './types'
import home from './catalog/home.json'

const toLocal = (href: string) => href.replace(/^https?:\/\/[^/]+/, '').replace(/^\/product-tag\//, '/tag/').replace(/^\/product-category\//, '/category/').replace(/\/$/, '') || '/'

/** "Keep Shopping" cards: a title plus a 2x2 grid of product thumbnails. */
export const productGroups: ProductGroup[] = (home.groups as { title: string; href: string; items: { image: string | null; alt: string }[] }[])
  .map((g) => {
    // The source markup repeats each thumbnail inside <noscript>; keep one per image.
    const seen = new Set<string>()
    const items = g.items
      .filter((i) => i.image && !seen.has(i.image) && seen.add(i.image))
      .map((i) => ({ image: i.image!, alt: i.alt }))
    return { title: g.title, href: toLocal(g.href), items }
  })
  .filter((g) => g.items.length >= 4)
