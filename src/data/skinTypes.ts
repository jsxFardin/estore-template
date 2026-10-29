import type { CategoryIcon } from './types'

/** "Shop by Skin Type" strip after the brand grid. `icon` is a lucide-vue-next component name. */
export const skinTypes: CategoryIcon[] = [
  { label: 'Normal', href: '/tag/normal-skin', icon: 'Smile' },
  { label: 'Acne-Prone', href: '/tag/anti-acne', icon: 'CircleDot' },
  { label: 'Sensitive', href: '/tag/sensitive-skin', icon: 'Feather' },
  { label: 'Hyperpigmentation', href: '/tag/dark-spot', icon: 'Sun' },
  { label: 'Oily', href: '/tag/oily-skin', icon: 'Droplets' },
  { label: 'Dry', href: '/tag/dry-skin', icon: 'Wind' },
  { label: 'Combination', href: '/tag/combination-skin', icon: 'Blend' },
  { label: 'Fragrance-free', href: '/tag/fragrance-free', icon: 'ShieldCheck' },
]
