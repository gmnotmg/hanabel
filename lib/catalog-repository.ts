import { config, isSupabaseConfigured } from "@/lib/config";
import { demoCategories, demoProducts, demoSettings } from "@/lib/demo-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Category, Product, ProductImage, SiteSettings } from "@/lib/types";

type RawRecord = Record<string, unknown>;

const asRecord = (value: unknown): RawRecord =>
  value && typeof value === "object" ? (value as RawRecord) : {};

const asString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;

const asNumber = (value: unknown, fallback = 0) =>
  typeof value === "number" ? value : fallback;

function storageUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (!config.supabaseUrl) return path;
  return `${config.supabaseUrl}/storage/v1/object/public/product-media/${path}`;
}

function mapImage(raw: unknown, productId: string): ProductImage {
  const row = asRecord(raw);
  const path = asString(row.storage_path);
  return {
    id: asString(row.id, `${productId}-${path}`),
    productId,
    storagePath: path,
    variant: (asString(row.variant, "card") as ProductImage["variant"]),
    altText: asString(row.alt_text, "Foto produk Hanabel"),
    sortOrder: asNumber(row.sort_order),
    url: storageUrl(path),
  };
}

export function mapProduct(raw: unknown): Product {
  const row = asRecord(raw);
  const category = Array.isArray(row.category)
    ? asRecord(row.category[0])
    : asRecord(row.category);
  const id = asString(row.id);
  const images = Array.isArray(row.product_images)
    ? row.product_images.map((image) => mapImage(image, id))
    : [];

  return {
    id,
    categoryId: asString(row.category_id),
    categorySlug: asString(category.slug, asString(row.category_slug)),
    categoryName: asString(category.name, asString(row.category_name, "Kategori")),
    name: asString(row.name),
    slug: asString(row.slug),
    shortDescription: asString(row.short_description),
    description: asString(row.description),
    highlights: Array.isArray(row.highlights)
      ? row.highlights.filter((item): item is string => typeof item === "string")
      : [],
    badge: asString(row.badge) || undefined,
    isFeatured: Boolean(row.is_featured),
    status: (asString(row.status, "draft") as Product["status"]),
    affiliateUrl: asString(row.affiliate_url),
    images: images.sort((a, b) => a.sortOrder - b.sortOrder),
    createdAt: asString(row.created_at),
    updatedAt: asString(row.updated_at),
  };
}

export function mapCategory(raw: unknown): Category {
  const row = asRecord(raw);
  const products = Array.isArray(row.products) ? row.products : [];
  return {
    id: asString(row.id),
    slug: asString(row.slug),
    name: asString(row.name),
    description: asString(row.description),
    iconKey: asString(row.icon_key, "sparkles"),
    accentColor: asString(row.accent_color, "#eee5ff"),
    sortOrder: asNumber(row.sort_order),
    status: (asString(row.status, "draft") as Category["status"]),
    productCount: asNumber(row.product_count, products.length),
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return demoSettings;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return demoSettings;

  const [{ data: settings }, { data: socials }] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
    supabase
      .from("social_links")
      .select("label, href, icon")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  if (!settings) return demoSettings;
  const row = asRecord(settings);

  return {
    brandName: asString(row.brand_name, demoSettings.brandName),
    handle: asString(row.handle, demoSettings.handle),
    bio: asString(row.bio, demoSettings.bio),
    avatarUrl: asString(row.avatar_url, demoSettings.avatarUrl),
    coverUrl: asString(row.cover_url, demoSettings.coverUrl),
    disclosure: asString(row.disclosure, demoSettings.disclosure),
    socialLinks: Array.isArray(socials) && socials.length > 0
      ? socials.map((social) => {
          const item = asRecord(social);
          return {
            label: asString(item.label),
            href: asString(item.href),
            icon: asString(item.icon, "link") as SiteSettings["socialLinks"][number]["icon"],
          };
        })
      : demoSettings.socialLinks,
  };
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return demoCategories;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return demoCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("*, products(id)")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data.map(mapCategory);
}

export async function getPublishedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return demoProducts;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("products")
    .select(
      "*, category:categories!inner(slug, name), product_images(id, storage_path, variant, alt_text, sort_order)",
    )
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data.map(mapProduct);
}

export async function getFeaturedProducts(limit = 6) {
  const products = await getPublishedProducts();
  return products.filter((product) => product.isFeatured).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return demoProducts.find((product) => product.slug === slug) ?? null;
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select(
      "*, category:categories!inner(slug, name), product_images(id, storage_path, variant, alt_text, sort_order)",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return mapProduct(data);
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string) {
  const products = await getPublishedProducts();
  return products.filter((product) => product.categorySlug === slug);
}

export async function searchCatalog(query: string) {
  const normalized = query.trim().toLocaleLowerCase("id-ID");
  if (!normalized) return [];

  const aliases: Record<string, string[]> = {
    beauty: ["kecantikan", "skincare"],
    skincare: ["kecantikan"],
    fashion: ["fashion", "style"],
    home: ["rumah", "dekorasi"],
    fitness: ["olahraga", "fitness"],
  };
  const terms = [normalized, ...(aliases[normalized] ?? [])];

  const [products, categories] = await Promise.all([
    getPublishedProducts(),
    getCategories(),
  ]);
  const categoryMatches = new Set(
    categories
      .filter((category) => {
        const haystack = `${category.name} ${category.description}`.toLocaleLowerCase("id-ID");
        return terms.some((term) => haystack.includes(term));
      })
      .map((category) => category.slug),
  );

  return products.filter((product) =>
    categoryMatches.has(product.categorySlug) ||
    terms.some((term) =>
      `${product.name} ${product.shortDescription} ${product.description}`
        .toLocaleLowerCase("id-ID")
        .includes(term),
    ),
  );
}
