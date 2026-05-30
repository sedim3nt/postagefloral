import Link from "next/link";
import { products, giftSets } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone/60 to-linen" />
        <div className="container-page grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="eyebrow">The Living Desk Collection</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-bark sm:text-5xl lg:text-6xl">
              Your desk, but alive.
            </h1>
            <p className="mt-5 max-w-md text-lg text-bark/75">
              Minimalist planters, propagation stations, and care objects for the
              people who turned their workspace into a quiet little garden. Muji
              meets Kinfolk meets plant TikTok.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">
                Shop the collection
              </Link>
              <Link href="/collections/gift-sets" className="btn-secondary">
                Gift sets →
              </Link>
            </div>
            <p className="mt-6 text-sm text-bark/55">
              Free US shipping over $50 · Curated, not stocked
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] w-full rounded-3xl bg-gradient-to-br from-sage/40 via-stone to-clay/40 p-8 shadow-xl shadow-bark/10">
              <div className="flex h-full flex-col justify-between">
                <div className="self-end rounded-2xl bg-linen/80 px-4 py-3 text-right backdrop-blur">
                  <p className="font-serif text-sm text-bark">Root Watch</p>
                  <p className="text-xs text-bark/60">propagation station</p>
                </div>
                <svg
                  viewBox="0 0 120 120"
                  className="mx-auto h-40 w-40 opacity-90"
                  fill="none"
                  stroke="#3a352e"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M30 80 h60" />
                  <path d="M40 80 V60 M60 80 V52 M80 80 V60" />
                  <path d="M40 60 C32 56 30 48 32 42 C40 44 44 52 40 60Z" />
                  <path d="M60 52 C50 48 46 38 48 30 C58 32 64 44 60 52Z" />
                  <path d="M80 60 C88 56 90 48 88 42 C80 44 76 52 80 60Z" />
                </svg>
                <div className="rounded-2xl bg-linen/80 px-4 py-3 backdrop-blur">
                  <p className="text-xs text-bark/60">From</p>
                  <p className="font-serif text-lg text-bark">$26.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="container-page grid gap-6 py-6 sm:grid-cols-3">
        {[
          {
            title: "Design is the moat",
            body: "Not commodity Amazon listings — a curated aesthetic brand built around the living-desk story.",
          },
          {
            title: "Genuinely low-maintenance",
            body: "Self-watering reservoirs and battery-free tools, for plants that survive a busy week.",
          },
          {
            title: "An unboxing moment",
            body: "Kraft packaging, a dried sprig, and a hand-stamped card with every order.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-bark/10 bg-linen p-6"
          >
            <h3 className="font-serif text-lg text-bark">{item.title}</h3>
            <p className="mt-2 text-sm text-bark/70">{item.body}</p>
          </div>
        ))}
      </section>

      {/* Featured products */}
      <section className="container-page py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">The Living Desk</p>
            <h2 className="mt-2 font-serif text-3xl text-bark">
              Five objects, one cohesive desk
            </h2>
          </div>
          <Link href="/shop" className="hidden text-sm font-medium text-moss hover:text-bark sm:block">
            See all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Gift sets band */}
      <section className="bg-moss/10 py-16">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Bundled & boxed</p>
              <h2 className="mt-2 font-serif text-3xl text-bark">Gift sets</h2>
            </div>
            <Link
              href="/collections/gift-sets"
              className="hidden text-sm font-medium text-moss hover:text-bark sm:block"
            >
              All gift sets →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {giftSets.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-page grid items-center gap-10 py-20 lg:grid-cols-2">
        <div className="aspect-[5/4] rounded-3xl bg-gradient-to-tr from-moss/30 via-stone to-sage/30" />
        <div>
          <p className="eyebrow">Why Rootbound</p>
          <h2 className="mt-3 font-serif text-3xl text-bark">
            Watching roots grow is oddly addictive.
          </h2>
          <p className="mt-4 text-bark/75">
            The desk plant never left after remote work, and propagation stations
            are trending for a reason — there&apos;s something grounding about a
            small living thing on the corner of a busy desk. We curate a tight
            collection that tells one story, instead of selling everything.
          </p>
          <Link href="/about" className="btn-secondary mt-6">
            Read our story
          </Link>
        </div>
      </section>
    </>
  );
}
