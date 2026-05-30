import { NextResponse } from "next/server";
import { allProducts } from "@/lib/products";

export const runtime = "nodejs";

type IncomingItem = { slug: string; quantity: number };

/**
 * Creates a Stripe Checkout Session when STRIPE_SECRET_KEY is configured.
 * Falls back to a clear, non-fatal response in environments where Stripe
 * has not been wired up yet (e.g. preview deploys without secrets), so the
 * storefront stays fully functional for browsing and demos.
 */
export async function POST(request: Request) {
  let body: { items?: IncomingItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const items = (body.items ?? []).filter(
    (i): i is IncomingItem => Boolean(i?.slug) && Number(i?.quantity) > 0
  );

  if (items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const lineItems = items
    .map((item) => {
      const product = allProducts.find((p) => p.slug === item.slug);
      if (!product) return null;
      return {
        product,
        quantity: Math.min(Math.max(1, Math.floor(item.quantity)), 20),
      };
    })
    .filter(Boolean) as { product: (typeof allProducts)[number]; quantity: number }[];

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "http://localhost:3000";

  if (!secretKey) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Checkout is not yet connected. Set STRIPE_SECRET_KEY to enable live payments.",
      },
      { status: 200 }
    );
  }

  try {
    // Stripe is loaded dynamically so the package is only required when
    // payments are actually configured.
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.tagline,
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      success_url: `${siteUrl}/cart?status=success`,
      cancel_url: `${siteUrl}/cart?status=cancelled`,
    });

    return NextResponse.json({ configured: true, url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
}
