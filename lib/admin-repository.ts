import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mapCategory, mapProduct } from "@/lib/catalog-repository";
import type { Category, ClickSummary, Product } from "@/lib/types";

export async function getAdminCategories(): Promise<Category[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("categories")
    .select("*, products(id)")
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(mapCategory);
}

export async function getAdminProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(slug, name), product_images(id, storage_path, variant, alt_text, sort_order)")
    .order("updated_at", { ascending: false });
  if (error || !data) return [];
  return data.map(mapProduct);
}

export async function getClickSummary(): Promise<ClickSummary> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { total: 0, byProduct: [], byCategory: [], bySource: [] };
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const { data, error } = await supabase
    .from("click_events")
    .select("source, product:products(name), category:categories(name)")
    .gte("created_at", since.toISOString());
  if (error || !data) return { total: 0, byProduct: [], byCategory: [], bySource: [] };

  const aggregate = (items: string[]) => {
    const counts = new Map<string, number>();
    items.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1));
    return [...counts.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  };
  const productNames = data.map((row) => {
    const product = Array.isArray(row.product) ? row.product[0] : row.product;
    return product?.name ?? "Produk dihapus";
  });
  const categoryNames = data.map((row) => {
    const category = Array.isArray(row.category) ? row.category[0] : row.category;
    return category?.name ?? "Kategori dihapus";
  });
  return {
    total: data.length,
    byProduct: aggregate(productNames),
    byCategory: aggregate(categoryNames),
    bySource: aggregate(data.map((row) => row.source ?? "direct")),
  };
}
