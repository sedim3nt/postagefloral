import type { MetadataRoute } from "next";
import { allProducts, collections } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rootbound.shop";
  const staticRoutes = ["", "/shop", "/guides", "/about", "/contact", "/cart"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })
  );

  const productRoutes = allProducts.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
