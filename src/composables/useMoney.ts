import { site } from '@/data/site'

/** Formats an amount using the store currency symbol, e.g. "৳ 1,000". */
export const money = (amount: number) => `${site.currency} ${amount.toLocaleString('en-US')}`

export const discountPercent = (price: number, sale?: number) =>
  sale && sale < price ? Math.round(((price - sale) / price) * 100) : 0
