import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Rootbound is a curated brand of minimalist desk planters and propagation stations — design curation as the moat, not commodity listings.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Our story</p>
      <h1 className="mt-2 max-w-2xl font-serif text-4xl text-bark">
        We curate the living desk — we don&apos;t stock a warehouse.
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-bark/80">
          <p>
            The desk plant never left after remote work. Somewhere between the
            second monitor and the coffee mug, a small living thing took root —
            and propagation stations turned watching roots grow into one of the
            internet&apos;s quietest obsessions.
          </p>
          <p>
            Rootbound exists for that intersection of tech workers, plant
            parents, and aesthetic home-office culture. Think Muji meets Kinfolk
            meets plant TikTok. Not garden-center planters — design-forward
            objects worth leaving out on a desk people actually photograph.
          </p>
          <p>
            We curate ten to fifteen pieces that tell one cohesive story instead
            of selling everything. Design curation is the whole point. Every
            order ships in kraft packaging with a dried sprig and a hand-stamped
            card, because the unboxing moment is part of the product.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-bark/10 bg-linen p-6">
            <p className="eyebrow">The collection</p>
            <h2 className="mt-2 font-serif text-xl text-bark">The Living Desk</h2>
            <p className="mt-2 text-sm text-bark/70">
              Root Watch, Breath, Understory, Tend, and Canopy Light — five
              objects that turn a flat surface into something that breathes.
            </p>
          </div>
          <div className="rounded-2xl border border-bark/10 bg-linen p-6">
            <p className="eyebrow">How we ship</p>
            <h2 className="mt-2 font-serif text-xl text-bark">US fulfillment</h2>
            <p className="mt-2 text-sm text-bark/70">
              Curated designs, branded packaging, and a care card with every
              order. Free US shipping over $50.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Link href="/shop" className="btn-primary">
          Shop the collection
        </Link>
      </div>

      <p className="mt-16 text-xs text-bark/50">
        Rootbound is a SpiritTree / Nrvana LLC brand.
      </p>
    </div>
  );
}
