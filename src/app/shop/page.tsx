import type { Metadata } from "next";
import { allProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop all",
  description:
    "Shop the full Rootbound collection — desk planters, propagation stations, care tools, grow lights, and gift sets.",
};

export default function ShopPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Curated, not stocked</p>
      <h1 className="mt-2 font-serif text-4xl text-bark">Shop all</h1>
      <p className="mt-3 max-w-xl text-bark/70">
        Every object in the collection earns its place on your desk. Eight
        pieces, one cohesive living-desk story.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
