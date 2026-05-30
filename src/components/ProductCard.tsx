import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-bark/10 bg-linen transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-bark/5"
    >
      <div className="relative">
        <ProductImage product={product} />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-bark px-3 py-1 text-[11px] font-medium tracking-wide text-linen">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-lg text-bark">{product.name}</h3>
          <div className="text-right">
            <span className="text-base font-medium text-bark">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAt && (
              <span className="ml-1 text-xs text-bark/40 line-through">
                ${product.compareAt.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <p className="mt-1 text-sm text-bark/65">{product.tagline}</p>
        <span className="mt-4 text-sm font-medium text-moss group-hover:text-bark">
          View details →
        </span>
      </div>
    </Link>
  );
}
