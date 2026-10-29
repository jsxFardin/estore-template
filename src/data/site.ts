/**
 * Brand / storefront configuration.
 * Replace these values with your own brand name, logo, promo copy and links.
 */
export const site = {
  name: 'Velora',
  tagline: 'Beauty',
  /** Optional: path to an SVG/PNG logo. When empty, a text wordmark is rendered. */
  logo: '',
  title: 'Velora | Premium Cosmetics & Skincare',
  description: 'Makeup, skincare, hair care and home care from your favourite brands.',
  currency: '৳',
  locale: 'en-BD',
  promoBar: {
    enabled: true,
    /** Segments allow highlighted words; keep plain text in `text`. */
    segments: [
      { text: 'Free delivery on ' },
      { text: 'Makeup', highlight: true },
      { text: ' & ' },
      { text: 'Skin care', highlight: true },
      { text: ' purchases above ' },
      { text: '1500BDT', highlight: true },
    ],
  },
  search: {
    placeholder: 'Search for products...',
    /** Cycled through with a typing effect; leave empty for a static placeholder. */
    hints: ["Try 'Lily Whipped Shea Body Wash'", "Search 'Vitamin C Serum'", "Try 'Nior Red Carpet Foundation'", "Search 'Sunscreen SPF 50'"],
  },
  social: [
    { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { name: 'TikTok', href: 'https://www.tiktok.com/', icon: 'tiktok' },
    { name: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
  ],
  /** One strip image, or several badges; the footer renders whatever is listed. */
  payments: [
    { name: 'bKash, Visa, MasterCard, American Express, SSLCommerz', image: '/images/payments/footer-payment-icons.svg', width: 389, height: 41 },
  ],
  footer: {
    newsletter: {
      title: 'Keep in Touch',
      copy: 'Receive emails or texts about our latest sales, new arrivals, special offers, tips and more.',
      placeholder: 'Your email address',
      button: 'Sign Up',
    },
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/page/about' },
          { label: 'Contact Us', href: '/page/contact' },
          { label: 'Career', href: '/page/career' },
        ],
      },
      {
        title: 'Get Help',
        links: [
          { label: 'Store Locator', href: '/stores' },
          { label: 'Returns and Exchanges', href: '/page/returns' },
          { label: 'Privacy Policy', href: '/page/privacy' },
          { label: 'Terms and Conditions', href: '/page/terms' },
        ],
      },
    ],
    copyright: `©${new Date().getFullYear()} Velora. All rights reserved.`,
  },
}

export type SiteConfig = typeof site
