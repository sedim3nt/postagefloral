import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about a product, an order, or wholesale? Get in touch with the Rootbound team.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <p className="eyebrow">Say hello</p>
      <h1 className="mt-2 font-serif text-4xl text-bark">Contact</h1>
      <p className="mt-3 max-w-xl text-bark/70">
        Questions about a product, an order, or carrying Rootbound in your shop?
        Send a note and we&apos;ll get back within two business days.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <ContactForm />
        <div className="space-y-6 text-sm text-bark/75">
          <div>
            <p className="eyebrow">Email</p>
            <p className="mt-1">hello@rootbound.shop</p>
          </div>
          <div>
            <p className="eyebrow">Shipping & returns</p>
            <p className="mt-1">
              Free US shipping over $50. 30-day returns on unused items in
              original packaging.
            </p>
          </div>
          <div>
            <p className="eyebrow">Wholesale</p>
            <p className="mt-1">
              Interested in carrying the collection? Mention &ldquo;wholesale&rdquo;
              and we&apos;ll send our line sheet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
