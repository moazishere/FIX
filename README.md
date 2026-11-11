# FIX Electronics — Next.js storefront

Next.js 16 (App Router) · React 19 · TypeScript · next-intl (English + Arabic RTL) · Zustand · GSAP

This is the componentised port of the static site in the parent folder (`../index.html`).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en or /ar
npm run build && npm start
```

Optional: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://fix.example.com`) so the sitemap, robots and
canonical/alternate links use your real domain.

## Structure

```
app/[locale]/            layout (html lang/dir, fonts, header/footer), home, /products, product page
components/layout/       announcement bar, header (utility bar, search, widgets, nav), drawer, footer
components/home/         hero, benefits, categories, brands, promos, deals + countdown, rows, trending, reviews, guides
components/product/      card, grid, sort, pagination, finish picker, wish/share/add-to-cart
components/product/page/ product page: gallery (zoom), buy box (quantity), specs table, sticky buy bar
components/cart/         cart + saved sheet, useAddToCart (fly-to-cart)
components/ui/           Icon sprite, Dropdown, Toast, Money, NoteLink, StoreHydrator
lib/                     catalog (typed data), filters (URL ⇄ filters), deals, money, store (persisted), ui, motion
i18n/                    routing, request config, locale-aware Link/router
messages/                en.json, ar.json  (ID-keyed; ICU plurals)
proxy.ts                 locale redirect (Next 16's name for middleware)
```

## How it works

- **Server by default.** Pages, product text, grids and prices' structure render on the server; only
  interactive pieces are client components (carousel, countdown, dropdowns, cart, wishlist, gallery…).
- **All Products page:** `/en/products` — every product, 20 per page, with category chips (counts), an On sale toggle,
  sort and pagination. Filters live in the URL (`/en/products?cat=audio&sort=price-asc&page=2`), so every view is
  server-rendered and shareable; header search, nav, category tiles and footer links all land here. See `lib/filters.ts`.
  The home page only shows a 10-product Best Sellers preview that links to it.
- **Product pages:** `/en/product/arc-pro-elite-controller-sand` — a full, statically generated page
  (gallery, buy box, specs, delivery & returns, related products, recently viewed). Every product link
  opens it directly; there are no pop-ups. Specs and summaries live in `lib/product-content.ts`.
- **Cart, saved items, recently viewed, currency** persist in `localStorage` via `lib/store.ts`
  (`skipHydration` + `<StoreHydrator />` avoid hydration mismatches).
- **Arabic:** `<html dir="rtl">` is set on the server. The CSS uses logical properties, so it mirrors
  itself; the few exceptions (gradients, icons, transforms) are in the "ARABIC + RIGHT-TO-LEFT" block of `app/globals.css`.
- **Motion:** GSAP via `useGSAP()`. Rules that matter here: use `fromTo()` with `HANDBACK` (see `lib/motion.ts`)
  on elements that have CSS transitions; never transform a modal `<dialog>` itself (the photo lightbox
  uses one); respect reduced motion.

## Before launch

- Replace the **sample reviews** (`components/home/Reviews.tsx`) with real ones.
- Ratings, review counts and "newest" order in `lib/catalog.ts` are **placeholders**.
- Have a native Arabic speaker review `messages/ar.json` and the Arabic product names in `lib/catalog.ts`.
- Legal pages, checkout, sign-in and the newsletter are not connected yet (they show a short note).
- Photos are Unsplash images that show real third-party brands; use photos of your own products.
