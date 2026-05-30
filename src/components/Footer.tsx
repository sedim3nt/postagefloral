import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-bark/10 bg-stone/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-lg text-bark">Rootbound</p>
          <p className="mt-2 max-w-xs text-sm text-bark/70">
            Minimalist desk planters, propagation stations, and care objects for
            the people who turned their workspace into a garden.
          </p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-bark/70">
            <li><Link href="/shop" className="hover:text-bark">All products</Link></li>
            <li><Link href="/collections/living-desk" className="hover:text-bark">The Living Desk</Link></li>
            <li><Link href="/collections/gift-sets" className="hover:text-bark">Gift sets</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Learn</p>
          <ul className="mt-3 space-y-2 text-sm text-bark/70">
            <li><Link href="/guides" className="hover:text-bark">Care guides</Link></li>
            <li><Link href="/about" className="hover:text-bark">Our story</Link></li>
            <li><Link href="/contact" className="hover:text-bark">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">The desk dispatch</p>
          <p className="mt-3 text-sm text-bark/70">
            Propagation tips and new drops. No spam, just plants.
          </p>
          <form
            className="mt-3 flex gap-2"
            action="/contact"
            method="get"
          >
            <input
              type="email"
              name="email"
              placeholder="you@email.com"
              className="w-full rounded-full border border-bark/20 bg-linen px-4 py-2 text-sm focus:border-moss focus:outline-none"
            />
            <button type="submit" className="btn-primary px-4 py-2 text-xs">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-bark/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-bark/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Rootbound · Nrvana LLC. All rights reserved.</p>
          <p>Curated, not stocked. Shipped from the US.</p>
        </div>
      </div>
    </footer>
  );
}
