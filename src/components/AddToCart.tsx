"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-bark/20">
        <button
          type="button"
          aria-label="Decrease quantity"
          className="px-4 py-2 text-lg text-bark/70 hover:text-bark"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-medium">{qty}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          className="px-4 py-2 text-lg text-bark/70 hover:text-bark"
          onClick={() => setQty((q) => Math.min(20, q + 1))}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          add(slug, qty);
          setAdded(true);
          setTimeout(() => setAdded(false), 1800);
        }}
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
    </div>
  );
}
