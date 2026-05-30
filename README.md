# Rootbound — The Living Desk Co.

Minimalist desk planters, glass propagation stations, and plant-care objects for
plant parents and tech workers. Built with Next.js (App Router), TypeScript, and
Tailwind CSS. Implements the MVP from the *Smart Desk Planters & Propagation
Stations* PRD (codename **Rootbound**).

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript + Tailwind CSS
- Stripe Checkout (optional — graceful demo mode without keys)
- Client-side cart persisted to `localStorage`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Stripe redirects |
| `STRIPE_SECRET_KEY` | Enables live Stripe Checkout. Without it, checkout runs in demo mode. |

Never commit real secrets. `.env*` is gitignored.

## Structure

- `src/app` — App Router pages (home, shop, products, collections, cart, guides, about, contact)
- `src/app/api/checkout` — Stripe Checkout session endpoint
- `src/components` — Header, Footer, product cards, cart UI
- `src/lib/products.ts` — product catalog, pricing, and collections
- `src/lib/cart-context.tsx` — cart state

## Deploy

Deploys to Vercel. Set the environment variables in the Vercel project settings.

---

The previous GitHub Pages mirror of postagefloral.com lives in `legacy-mirror/`.
