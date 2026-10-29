import type { CampaignBanner } from './types'
import home from './catalog/home.json'

const toLocal = (href: string) => href.replace(/^https?:\/\/[^/]+/, '').replace(/^\/product-tag\//, '/tag/').replace(/^\/product-category\//, '/category/').replace(/\/$/, '') || '/'

/** Wide campaign slider below "Keep Shopping" (3.2:1 desktop, 16:9 mobile). */
export const campaignBanners: CampaignBanner[] = (home.banners as { href: string; image: string | null; mobileImage?: string | null; alt: string }[])
  .filter((b) => b.image)
  .map((b, i) => ({ id: `campaign-${i}`, image: b.image!, mobileImage: b.mobileImage ?? undefined, alt: b.alt || 'Campaign banner', href: toLocal(b.href) }))
