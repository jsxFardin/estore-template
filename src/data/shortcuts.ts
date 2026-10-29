import type { Shortcut } from './types'

export const shortcuts: Shortcut[] = [
  { label: 'Best Selling', href: '/tag/best-selling', icon: 'trend', tone: 'green' },
  { label: 'New Arrivals', href: '/tag/new-arrivals', icon: 'sparkle', tone: 'purple' },
  { label: 'Below 500', href: '/shop?max=500', icon: 'tag', tone: 'blue' },
  { label: 'Below 1000', href: '/shop?min=501&max=1000', icon: 'tag', tone: 'orange' },
  { label: 'Below 1500', href: '/shop?min=1001&max=1500', icon: 'tag', tone: 'blue' },
]
