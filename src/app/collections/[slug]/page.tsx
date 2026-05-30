import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, allProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return { title: "Not found" };
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const items = collection.productSlugs
    .map((s) => allProducts.find((p) => p.slug === s))
    .filter(Boolean) as typeof allProducts;

  return (
    <div className="container-page py-16">
      <p className="eyebrow">Collection</p>
      <h1 className="mt-2 font-serif text-4xl text-bark">{collection.name}</h1>
      <p className="mt-3 max-w-xl text-bark/70">{collection.description}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
