import type { NavItem } from './types'
import { brands } from './brands'

const cat = (label: string, path: string, children?: NavItem[]): NavItem => ({
  label,
  href: `/category/${path}`,
  children,
})

/** Primary navigation tree (desktop mega menu + mobile drawer). */
export const navigation: NavItem[] = [
  {
    label: 'Brands',
    href: '/brands',
    children: brands.map((b) => ({ label: b.name, href: `/brand/${b.slug}`, image: b.logo })),
  },
  cat('Makeup', 'makeup', [
    cat('Eyes', 'makeup/eyes', [
      cat('Eyeliner', 'makeup/eyes/eyeliner'),
      cat('Eye Shadow', 'makeup/eyes/eye-shadow'),
      cat('Mascara', 'makeup/eyes/mascara'),
      cat('Eyebrow', 'makeup/eyes/eyebrow'),
    ]),
    cat('Lip', 'makeup/lip', [
      cat('Lipstick', 'makeup/lip/lipstick'),
      cat('Liquid Lipstick', 'makeup/lip/liquid-lipstick'),
      cat('Lip Gloss', 'makeup/lip/lip-gloss'),
    ]),
    cat('Face', 'makeup/face', [
      cat('Foundation', 'makeup/face/foundation'),
      cat('Concealer', 'makeup/face/concealer'),
      cat('Pressed Powder', 'makeup/face/pressed-powder'),
      cat('BB Cream', 'makeup/face/bb-cream'),
      cat('Blush', 'makeup/face/blush'),
      cat('Highlighter', 'makeup/face/highlighter'),
    ]),
    cat('Nail', 'makeup/nail', [
      cat('Regular Nail Polish', 'makeup/nail/regular-nail-polish'),
      cat('Gel Nail Polish', 'makeup/nail/gel-nail-polish'),
      cat('Glitter Nail Polish', 'makeup/nail/glitter-nail-polish'),
      cat('Holographic Nail Polish', 'makeup/nail/holographic-nail-polish'),
      cat('Nail Polish Remover', 'makeup/nail/nail-polish-remover'),
    ]),
  ]),
  cat('Skin Care', 'skin-care', [
    cat('Face Care', 'skin-care/face-care', [
      cat('Face Wash', 'skin-care/face-care/face-wash'),
      cat('Moisturizer', 'skin-care/face-care/moisturizer'),
      cat('Gel', 'skin-care/face-care/gel'),
      cat('Sunscreen', 'skin-care/face-care/sunscreen'),
      cat('Serum', 'skin-care/face-care/serum'),
      cat('Toner', 'skin-care/face-care/toner'),
      cat('Makeup Remover', 'skin-care/face-care/makeup-remover'),
      cat('Face Mask', 'skin-care/face-care/face-mask'),
      cat('Face Scrub', 'skin-care/face-care/face-scrub'),
      cat('Face Mist', 'skin-care/face-care/face-mist'),
      cat('Lip Balm', 'skin-care/lip-care/lip-balm'),
    ]),
    cat('Body Care', 'skin-care/body-care', [
      cat('Body Lotion', 'skin-care/body-care/body-lotion'),
      cat('Shower Gel', 'skin-care/body-care/shower-gel'),
      cat('Body Jelly', 'skin-care/body-care/body-jelly'),
      cat('Soap', 'home-care/soap'),
    ]),
  ]),
  cat('Hair Care', 'hair', [
    cat('Shampoo', 'hair/shampoo'),
    cat('Conditioner', 'hair/conditioner'),
    cat('Hair Oil', 'hair/hair-oil'),
    cat('Hair Mask', 'hair/hair-mask'),
    cat('Hair Serum', 'hair/hair-serum'),
    cat('Hair Color', 'hair/hair-color'),
  ]),
  cat('Home Care', 'home-care', [
    cat('Dish Wash', 'home-care/dish-wash'),
    cat('Fabric Care', 'home-care/fabric-care'),
    cat('Toilet Cleaner', 'home-care/toilet-cleaner'),
    cat('Glass Cleaner', 'home-care/glass-cleaner'),
    cat('Floor Cleaner', 'home-care/floor-cleaner'),
    cat('Hand Wash', 'home-care/hand-wash'),
    cat('Soap', 'home-care/soap'),
  ]),
  cat('Oral Care', 'oral-care'),
  { label: 'Blog', href: '/blog' },
]

/** Flat lookup: category path -> label (used by catalog pages for headings). */
export const categoryLabels: Record<string, string> = {}
const walk = (items: NavItem[]) => {
  for (const it of items) {
    if (it.href.startsWith('/category/')) {
      const path = it.href.replace('/category/', '')
      categoryLabels[path] = it.label
      categoryLabels[path.split('/').pop()!] = it.label
    }
    if (it.children) walk(it.children)
  }
}
walk(navigation)
