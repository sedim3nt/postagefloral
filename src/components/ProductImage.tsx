import type { Product } from "@/lib/products";

const palettes: Record<string, { from: string; to: string; accent: string }> = {
  planters: { from: "#e7e1d6", to: "#cdbfa8", accent: "#9caf88" },
  propagation: { from: "#eef1ea", to: "#cdd6c4", accent: "#6b7458" },
  care: { from: "#ece5da", to: "#cbb89c", accent: "#a8927a" },
  lighting: { from: "#f1ecdf", to: "#e3d4ab", accent: "#c9a24b" },
  display: { from: "#e6e0d4", to: "#bfae93", accent: "#3a352e" },
  "gift-sets": { from: "#efe7da", to: "#d8c7ad", accent: "#6b7458" },
};

/**
 * Lightweight, dependency-free product visual. Renders a tasteful gradient
 * "studio" tile with a stylised silhouette — keeps the storefront fully
 * functional and good-looking without shipping binary image assets.
 */
export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const palette = palettes[product.category] ?? palettes.planters;
  return (
    <div
      className={`relative flex aspect-square w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(150deg, ${palette.from}, ${palette.to})`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        className="h-1/2 w-1/2 opacity-90"
        fill="none"
        stroke={palette.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 78 h40 l-5 28 h-30 z" />
        <path d="M60 78 V52" />
        <path d="M60 60 C48 56 42 44 44 34 C56 36 62 48 60 60 Z" />
        <path d="M60 66 C72 62 78 50 76 40 C64 42 58 54 60 66 Z" />
        <circle cx="60" cy="30" r="2.5" fill={palette.accent} stroke="none" />
      </svg>
      <span className="pointer-events-none absolute bottom-3 right-4 font-serif text-[10px] uppercase tracking-[0.25em] text-bark/40">
        Rootbound
      </span>
    </div>
  );
}
