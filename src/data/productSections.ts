import type { ProductSection } from './types'
import home from './catalog/home.json'

/** Horizontal product sliders on the homepage, in display order. */
export const productSections: ProductSection[] = [
  { id: 'new-arrivals', title: 'New Arrivals', viewAll: '/tag/new-arrivals', listing: 'tag:new-arrivals', theme: 'brand' },
  { id: 'autumn-velvet-glow', title: 'Autumn Velvet Glow', viewAll: '/tag/autumn-velvet-glow', listing: 'tag:autumn-velvet-glow' },
  { id: 'best-selling', title: 'Best Selling', viewAll: '/tag/best-selling', listing: 'tag:best-selling' },
]

/** Brand spotlight sliders rendered after "Shop by Brand". */
export const brandSections: ProductSection[] = [
  { id: 'nior', title: 'Nior - Amp up the glam', viewAll: '/brand/nior', listing: 'brand:nior' },
  { id: 'glorin', title: 'Glorin Jewels - Adorned With Grace', viewAll: '/brand/glorin', listing: 'brand:glorin' },
]

/**
 * Curated rails after the brand spotlights, in the reference's order. Each title is matched
 * against the scraped "Keep Shopping" groups to find its tag; a rail with no products is skipped.
 */
const groupTag = (title: string) => {
  const g = (home.groups as { title: string; href: string }[]).find((x) => x.title === title)
  return g?.href.match(/\/product-tag\/([^/]+)/)?.[1]
}
const RAILS = [
  'Viral Beauty', 'Hydration Hero', 'Customer Favorites', 'Trending Now', 'Gift Under Tk 500', 'Gift Under Tk 1000',
  'Oily Skin Solutions', 'Sensitive Skin Care', 'Anti-Aging & Skin Repair', 'Brightening & Glow', 'Dry Skin Rescue',
  'Sun Protection Essential', 'Korean Beauty', 'Authentic International Brand', 'Staff Favorites', 'Dark Spot Treatment',
  'Luxury Beauty', 'Just Restocked', 'Herlan Top Picks',
]
export const extraSections: ProductSection[] = RAILS.flatMap((title) => {
  const slug = groupTag(title)
  return slug ? [{ id: slug, title, viewAll: `/tag/${slug}`, listing: `tag:${slug}` }] : []
})
