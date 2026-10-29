# Storefront homepage (Vue 3 + Vite + Tailwind v4)

A responsive cosmetics-store homepage built as a layout study of the Herlan storefront.
Branding, navigation and catalogue data live in `src/data/`, so the page can be re-skinned without touching components.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # vue-tsc type check, then a production build into dist/
npm run preview   # serve the production build
```

## Refresh the catalogue

`scripts/scrape_herlan.py` reads public pages from the reference store (the homepage, tag, brand and category listings, and each product's detail page) and writes `src/data/catalog/*.json` plus the images under `public/images/`. Product details include the category chain, rating and review count, USP keywords, the description accordion, the large gallery, "frequently bought together" companions and reviews. It sends one request at a time with a short delay and only visits pages that robots.txt allows. A full run takes about 20 minutes and downloads roughly 150 MB of images.

```bash
python -m venv .venv
.venv/bin/pip install "scrapling[fetchers]>=0.5"
.venv/bin/python scripts/scrape_herlan.py
```

The product photos, banners and logos belong to the store and its brands. They are here so the layout can be judged with real material. Replace them with your own assets before publishing.

## Where to edit things

| What | File |
| --- | --- |
| Brand name, logo, promo bar, social links, payment strip, footer links | `src/data/site.ts` |
| Header, mega menu and mobile drawer navigation | `src/data/navigation.ts` |
| Which listings feed the homepage sliders and the curated rails | `src/data/productSections.ts` |
| "Shop by Skin Type" strip and the sidebar's skin-type links | `src/data/skinTypes.ts` |
| Quick filter chips (Best Selling, Below 500 and so on) | `src/data/shortcuts.ts` |
| Round category icon strip | `src/data/categories.ts` |
| Square collection tiles | `src/data/tags.ts` |
| Products, brands, hero slides, campaign banner, Keep Shopping groups | `src/data/catalog/*.json` (generated) |
| Colours, fonts, shadows, slide widths | `src/style.css` (the `@theme` block) |

The catalogue JSON is generated. Edit the TypeScript modules next to it if you want to override or extend what the scraper produced.

## Structure

- `src/components/layout/`: promo bar, header, mega menu, mobile drawer, bottom tab bar, cart drawer, footer
- `src/components/home/`: hero slider, shortcut chips, Keep Shopping groups, campaign slider, category icons, product sliders, product card, brand grid, collection tiles
- `src/components/ui/`: scroll-snap carousel, fade slider, section title, logo, price tag, breadcrumbs
- `src/components/catalog/`: filter sidebar (categories with counts, brands, skin type)
- `src/pages/`: home, catalogue (shop, category, brand, tag, search; sidebar, sort, pagination), product (gallery, rating, USPs, accordion, bundle, reviews, rails), brands, categories, cart, wishlist, account, info pages, 404
- `src/composables/`: cart and wishlist state in localStorage, money formatting, scroll direction, document title

Cart, wishlist, search, sorting and navigation all run in the browser. There is no backend, so checkout and sign-in stop at a message.
