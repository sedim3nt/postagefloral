import { NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

// Stripe signature verification requires the raw, unparsed request body, so
// this route must run on the Node.js runtime (the Edge runtime mangles bodies).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook receiver for the Postagefloral storefront.
 *
 * On `checkout.session.completed` it emails the store owner an order summary
 * (customer email, line items, amount total, session id) via Gmail SMTP and
 * logs the same summary to the server console.
 *
 * Returns 400 for a missing/invalid signature, 200 on success.
 */
export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    console.error("Stripe webhook misconfigured: missing secret key or webhook secret.");
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 400 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  // Read the RAW body for signature verification — do NOT JSON.parse it.
  const rawBody = await request.text();

  const stripe = new Stripe(secretKey);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Fetch line items for a readable order summary. If this lookup fails we
    // still acknowledge the event so Stripe does not retry indefinitely.
    let lineItemsText = "(unavailable)";
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 100,
      });
      lineItemsText = lineItems.data
        .map((li) => {
          const amount =
            li.amount_total != null
              ? `$${(li.amount_total / 100).toFixed(2)}`
              : "n/a";
          return `  - ${li.quantity} x ${li.description ?? "item"} (${amount})`;
        })
        .join("\n");
      if (!lineItemsText) lineItemsText = "(no line items)";
    } catch (err) {
      console.error("Failed to list line items for session", session.id, err);
    }

    const customerEmail =
      session.customer_details?.email ?? session.customer_email ?? "(unknown)";
    const amountTotal =
      session.amount_total != null
        ? `$${(session.amount_total / 100).toFixed(2)} ${(
            session.currency ?? "usd"
          ).toUpperCase()}`
        : "(unknown)";

    const summary = [
      "New order received — Postagefloral",
      "",
      `Session ID:     ${session.id}`,
      `Customer email: ${customerEmail}`,
      `Amount total:   ${amountTotal}`,
      "",
      "Line items:",
      lineItemsText,
    ].join("\n");

    console.log("[stripe webhook] checkout.session.completed\n" + summary);

    const ownerEmail = process.env.OWNER_EMAIL;
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (ownerEmail && gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        await transporter.sendMail({
          from: gmailUser,
          to: ownerEmail,
          subject: `New order — ${customerEmail} — ${amountTotal}`,
          text: summary,
        });
        console.log("[stripe webhook] owner notification email sent.");
      } catch (err) {
        // Never fail the webhook because of email trouble; just log it.
        console.error("[stripe webhook] failed to send owner email:", err);
      }
    } else {
      console.warn(
        "[stripe webhook] email not sent: OWNER_EMAIL / GMAIL_USER / GMAIL_APP_PASSWORD not all set."
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
