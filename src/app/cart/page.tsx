"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { allProducts } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";

const FREE_SHIPPING_THRESHOLD = 50;

function CartStatusBanner() {
  const params = useSearchParams();
  const status = params.get("status");
  if (status === "success") {
    return (
      <div className="mb-6 rounded-xl border border-moss/40 bg-moss/10 p-4 text-sm text-moss">
        Order placed — thank you. A confirmation is on its way to your inbox.
      </div>
    );
  }
  if (status === "cancelled") {
    return (
      <div className="mb-6 rounded-xl border border-clay/50 bg-clay/10 p-4 text-sm text-bark/80">
        Checkout cancelled. Your cart is still here whenever you&apos;re ready.
      </div>
    );
  }
  return null;
}

export default function CartPage() {
  const { items, subtotal, setQuantity, remove, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const lineItems = items
    .map((i) => {
      const product = allProducts.find((p) => p.slug === i.slug);
      return product ? { product, quantity: i.quantity } : null;
    })
    .filter(Boolean) as { product: (typeof allProducts)[number]; quantity: number }[];

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 6.95;
  const total = subtotal + shipping;

  async function checkout() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.configured === false) {
        setMessage(
          "Demo storefront — payments aren't connected yet. Add STRIPE_SECRET_KEY to enable live checkout."
        );
      } else {
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page py-16">
      <Suspense fallback={null}>
        <CartStatusBanner />
      </Suspense>

      <h1 className="font-serif text-4xl text-bark">Your cart</h1>

      {lineItems.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-bark/10 bg-linen p-10 text-center">
          <p className="text-bark/70">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary mt-5">
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <ul className="divide-y divide-bark/10 border-y border-bark/10">
            {lineItems.map(({ product, quantity }) => (
              <li key={product.slug} className="flex gap-4 py-5">
                <Link
                  href={`/products/${product.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-bark/10"
                >
                  <ProductImage product={product} />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="font-serif text-lg text-bark hover:text-moss"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-bark/60">{product.tagline}</p>
                    </div>
                    <p className="font-medium text-bark">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-4 pt-3">
                    <div className="flex items-center rounded-full border border-bark/20">
                      <button
                        type="button"
                        aria-label="Decrease"
                        className="px-3 py-1 text-bark/70 hover:text-bark"
                        onClick={() => setQuantity(product.slug, quantity - 1)}
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-sm">{quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase"
                        className="px-3 py-1 text-bark/70 hover:text-bark"
                        onClick={() => setQuantity(product.slug, quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-bark/50 underline hover:text-bark"
                      onClick={() => remove(product.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-bark/10 bg-linen p-6">
            <h2 className="font-serif text-xl text-bark">Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-bark/70">Subtotal</dt>
                <dd className="text-bark">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-bark/70">Shipping</dt>
                <dd className="text-bark">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </dd>
              </div>
            </dl>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="mt-2 text-xs text-moss">
                ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} away from free shipping
              </p>
            )}
            <div className="mt-4 flex justify-between border-t border-bark/10 pt-4 text-base font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="btn-primary mt-6 w-full"
              onClick={checkout}
              disabled={loading}
            >
              {loading ? "Starting checkout…" : "Checkout"}
            </button>
            {message && (
              <p className="mt-3 text-xs text-bark/70">{message}</p>
            )}
            <button
              type="button"
              className="mt-3 w-full text-xs text-bark/50 underline hover:text-bark"
              onClick={clear}
            >
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
