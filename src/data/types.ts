export interface NavItem {
  label: string
  href: string
  /** Optional logo image for image-style menu items (Brands menu). */
  image?: string
  children?: NavItem[]
}

export interface Brand {
  slug: string
  name: string
  logo: string
}

export interface Product {
  id: string
  sku?: string
  slug: string
  name: string
  /** Brand slug, see brands.ts */
  brand: string
  brandName?: string
  /** Small brand mark shown on the product card. */
  brandLogo?: string
  image: string
  gallery?: string[]
  /** Regular price in the store currency. */
  price: number
  /** Discounted price, if on sale. */
  salePrice?: number
  /** Display string such as "4K+ sold". */
  sold?: string
  /** Variant labels shown as pills on the product image (e.g. sizes). */
  variants?: string[]
  /** Same product in other sizes; pills link to these. */
  siblings?: { label: string; slug: string }[]
  /** Category slugs the product belongs to, most general first. */
  categories: string[]
  categoryLabel?: string
  tags: string[]
  stock?: string
  /** Category chain from the product page, most general first. */
  breadcrumb?: { label: string; slug: string }[]
  rating?: number
  reviewCount?: number
  wishlistCount?: number
  /** USP badges (e.g. "72 Hours Moisture Lock") with icon images. */
  keywords?: { label: string; href: string; icon?: string }[]
  /** Accordion content: Description, Ingredients, Directions… */
  sections?: { title: string; text: string }[]
  /** Larger gallery images for the product page. */
  galleryLarge?: string[]
  /** "Frequently bought together" companions. */
  fbt?: { id: string; name: string; href: string; price?: number; regular?: number; image?: string }[]
  reviews?: { author: string; rating: string; text: string; date: string }[]
}

export interface ProductSection {
  id: string
  title: string
  viewAll: string
  /** Ordered ids from a scraped listing, e.g. "tag:new-arrivals" (see catalog/listings.json). */
  listing?: string
  /** Or pick products by tag / brand, or supply explicit ids. */
  tag?: string
  brand?: string
  productIds?: string[]
  theme?: 'light' | 'brand'
}

export interface PromoSlide {
  id: string
  title: string
  subtitle: string
  image: string
  href: string
}

export interface CampaignBanner {
  id: string
  image: string
  /** Optional art cropped for phones (16:9); without it the wide image is shown uncropped. */
  mobileImage?: string
  alt: string
  href: string
}

export interface Shortcut {
  label: string
  href: string
  icon: 'trend' | 'sparkle' | 'tag'
  tone: 'green' | 'purple' | 'blue' | 'orange'
}

export interface ProductGroup {
  title: string
  href: string
  items: { image: string; alt: string }[]
}

export interface CategoryIcon {
  label: string
  href: string
  /** lucide-vue-next icon component name. */
  icon: string
}

export interface TagTile {
  label: string
  href: string
  image: string
}
