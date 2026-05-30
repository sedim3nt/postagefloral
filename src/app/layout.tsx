import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rootbound.shop";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rootbound — Minimalist Desk Planters & Propagation Stations",
    template: "%s · Rootbound",
  },
  description:
    "Design-forward desk planters, glass propagation stations, and plant care objects for the living desk. Muji meets Kinfolk meets plant TikTok.",
  keywords: [
    "desk propagation station",
    "minimalist plant accessories",
    "indoor plant gifts office",
    "glass propagation tubes",
    "aesthetic desk planter",
    "plant parent gifts",
    "self-watering desk planter",
    "propagation station walnut",
  ],
  openGraph: {
    title: "Rootbound — The Living Desk Collection",
    description:
      "Minimalist desk planters and propagation stations for plant parents and tech workers.",
    url: siteUrl,
    siteName: "Rootbound",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
