import type { Product } from './types'
import raw from './catalog/products.json'
import listings from './catalog/listings.json'

/**
 * Catalogue pulled from the reference store by scripts/scrape_herlan.py.
 * Prices, sold counts and images are a snapshot; re-run the script to refresh.
 */
interface RawProduct {
  id: string
  sku?: string | null
  slug: string
  name: string
  brand: string
  brandName?: string | null
  brandLogo?: string | null
  image?: string | null
  gallery?: string[]
  price: number
  salePrice?: number | null
  sold?: string | null
  variants?: string[]
  categories: string[]
  categoryLabel?: string | null
  tags: string[]
  stock?: string | null
  breadcrumb?: { label: string; slug: string }[]
  rating?: number | null
  reviewCount?: number | null
  wishlistCount?: number | null
  keywords?: { label: string; href: string; icon?: string | null }[]
  sections?: { title: string; text: string }[]
  galleryLarge?: string[]
  fbt?: { id: string; name: string; href: string; price?: number | null; regular?: number | null; image?: string | null }[]
  reviews?: { author: string; rating: string; text: string; date: string }[]
}

const clean = <T>(v: T | null | undefined): T | undefined => (v == null ? undefined : v)

/** Drops the store's "Variant: … | Buy this Product" prefix the review markup carries. */
const cleanReviews = (list?: { author: string; rating: string; text: string; date: string }[]) => {
  const out = (list ?? [])
    .map((r) => ({ ...r, text: r.text.replace(/^Variant:[^|]*\|\s*/i, '').replace(/^Buy this Product\s*/i, '').trim() }))
    .filter((r) => r.text)
  return out.length ? out : undefined
}

export const products: Product[] = (raw as RawProduct[])
  .filter((p) => p.image)
  .map((p) => ({
    id: p.id,
    sku: clean(p.sku),
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    brandName: clean(p.brandName),
    brandLogo: clean(p.brandLogo),
    image: p.image!,
    gallery: p.gallery?.length ? p.gallery : undefined,
    price: p.price,
    salePrice: clean(p.salePrice),
    sold: clean(p.sold),
    variants: p.variants?.length ? p.variants : undefined,
    categories: p.categories,
    categoryLabel: clean(p.categoryLabel),
    tags: p.tags,
    stock: clean(p.stock),
    breadcrumb: p.breadcrumb?.length ? p.breadcrumb : undefined,
    rating: clean(p.rating),
    reviewCount: clean(p.reviewCount),
    wishlistCount: clean(p.wishlistCount),
    keywords: p.keywords?.length ? p.keywords.map((k) => ({ label: k.label, href: k.href, icon: clean(k.icon) })) : undefined,
    sections: p.sections?.length ? p.sections : undefined,
    galleryLarge: p.galleryLarge?.length ? p.galleryLarge : undefined,
    fbt: p.fbt?.length ? p.fbt.map((t) => ({ id: t.id, name: t.name, href: t.href, price: clean(t.price), regular: clean(t.regular), image: clean(t.image) })) : undefined,
    reviews: cleanReviews(p.reviews),
  }))

// Size variants are separate products on the source store ("… 250ml", "… 500ml");
// group them by base name so cards can show size pills that link to the sibling.
const SIZE = /\s*[-–]?\s*(\d+(?:\.\d+)?\s?(?:ml|gm|g|kg|ltr|l|pcs))\s*$/i
const families = new Map<string, Product[]>()
for (const p of products) {
  const m = p.name.match(SIZE)
  if (!m) continue
  const key = `${p.brand}|${p.name.replace(SIZE, '').trim().toLowerCase()}`
  families.set(key, [...(families.get(key) ?? []), p])
}
for (const fam of families.values()) {
  if (fam.length < 2) continue
  const sizes = fam.map((p) => ({ label: p.name.match(SIZE)![1]!.replace(/\s+/g, ''), slug: p.slug }))
  for (const p of fam) {
    const own = p.name.match(SIZE)![1]!.replace(/\s+/g, '')
    p.siblings = [{ label: own, slug: p.slug }, ...sizes.filter((s) => s.slug !== p.slug)]
    p.variants = p.siblings.map((s) => s.label)
  }
}

const byId = new Map(products.map((p) => [p.id, p]))

export const productById = (id: string) => byId.get(id)
export const productBySlug = (slug: string) => products.find((x) => x.slug === slug)
export const productsByTag = (tag: string) => products.filter((x) => x.tags.includes(tag))
export const productsByBrand = (brand: string) => products.filter((x) => x.brand === brand)
/** Matches a navigation path such as "skin-care/face-care/face-wash" on its last segment. */
export const productsByCategory = (path: string) => {
  const leaf = path.split('/').filter(Boolean).pop() ?? ''
  return products.filter((x) => x.categories.includes(leaf))
}
/** Ordered products from a scraped listing key, e.g. "tag:new-arrivals". */
export const productsByListing = (key: string) =>
  ((listings as Record<string, string[]>)[key] ?? []).map(productById).filter((p): p is Product => !!p)
