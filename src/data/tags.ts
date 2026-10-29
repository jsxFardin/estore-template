import type { TagTile } from './types'
import { productsByTag } from './products'

/** Square collection tiles under "Shop by Brand"; each uses the first product image carrying that tag. */
const collections: { slug: string; label: string }[] = [
  { slug: 'puja-unfiltered-2026', label: 'Puja Unfiltered' },
  { slug: 'unwrap-the-glow', label: 'Unwrap the Glow' },
  { slug: 'autumn-velvet-glow', label: 'Autumn Velvet Glow' },
  { slug: 'winter-shea-ritual-2026', label: 'Winter Shea Ritual' },
  { slug: 'shower-ritual-collection', label: 'Shower Ritual' },
  { slug: 'complete-grooming', label: 'Complete Grooming' },
  { slug: 'facebasemust', label: 'Face Base Musts' },
  { slug: 'gift-for-her', label: 'Gift for Her' },
  { slug: 'giftforhim', label: 'Gift for Him' },
  { slug: 'best-seller', label: 'Best Sellers' },
]

const used = new Set<string>()
export const tagTiles: TagTile[] = collections
  .map((c) => {
    // Prefer a photo no other tile already shows.
    const pick = productsByTag(c.slug).find((p) => !used.has(p.image)) ?? productsByTag(c.slug)[0]
    if (pick) used.add(pick.image)
    return { label: c.label, href: `/tag/${c.slug}`, image: pick?.image ?? '' }
  })
  .filter((t) => t.image)
