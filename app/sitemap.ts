import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { getCategories, getPublishedProducts } from "@/lib/catalog-repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), getPublishedProducts()]);
  return [
    { url: config.siteUrl, lastModified: new Date() },
    ...categories.map((category) => ({ url: `${config.siteUrl}/kategori/${category.slug}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${config.siteUrl}/produk/${product.slug}`, lastModified: new Date(product.updatedAt || Date.now()) })),
  ];
}
