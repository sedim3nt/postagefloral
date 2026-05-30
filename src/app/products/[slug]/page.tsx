import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProducts, getProduct } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { AddToCart } from "@/components/AddToCart";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.slug !== product.slug && p.collection === product.collection)
    .slice(0, 3);

  return (
    <div className="container-page py-12">
      <nav className="text-sm text-bark/55">
        <Link href="/shop" className="hover:text-bark">
          Shop
        </Link>{" "}
        / <span className="text-bark/80">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-bark/10">
          <ProductImage product={product} />
        </div>

        <div>
          <p className="eyebrow">{product.collection}</p>
          <h1 className="mt-2 font-serif text-4xl text-bark">{product.name}</h1>
          <p className="mt-2 text-bark/70">{product.tagline}</p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-medium text-bark">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAt && (
              <span className="text-bark/40 line-through">
                ${product.compareAt.toFixed(2)}
              </span>
            )}
          </div>

          <p className="mt-6 text-bark/80">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2 text-sm text-bark/75">
                <span className="text-moss">●</span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AddToCart slug={product.slug} />
            <p className="mt-3 text-xs text-bark/55">
              Free US shipping over $50 · Ships in branded kraft packaging
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-bark/10 pt-6">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-xs uppercase tracking-wide text-moss">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-sm text-bark/80">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl text-bark">Pairs well with</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
