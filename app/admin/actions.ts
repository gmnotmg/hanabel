"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { normalizeAffiliateUrl } from "@/lib/affiliate";
import { requireAdmin } from "@/lib/auth";

const slug = z.string().trim().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Gunakan slug lowercase dengan tanda hubung.");
const status = z.enum(["draft", "published", "archived"]);

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function productPayload(formData: FormData) {
  return {
    category_id: text(formData, "categoryId"),
    name: text(formData, "name"),
    slug: slug.parse(text(formData, "slug")),
    short_description: text(formData, "shortDescription"),
    description: text(formData, "description"),
    highlights: text(formData, "highlights").split("\n").map((item) => item.trim()).filter(Boolean),
    badge: text(formData, "badge") || null,
    is_featured: formData.get("isFeatured") === "on",
    status: status.parse(text(formData, "status") || "draft"),
    affiliate_url: normalizeAffiliateUrl(text(formData, "affiliateUrl")),
    cover_path: text(formData, "coverPath"),
  };
}

export async function signIn(formData: FormData) {
  const { supabase } = await requireAdminSetup();
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/admin/login?error=${encodeURIComponent("Email atau password tidak sesuai.")}`);
  redirect("/admin");
}

async function requireAdminSetup() {
  const { isSupabaseConfigured } = await import("@/lib/config");
  if (!isSupabaseConfigured) redirect("/admin/login?error=setup");
  const { createServerSupabaseClient } = await import("@/lib/supabase/server");
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect("/admin/login?error=setup");
  return { supabase };
}

export async function signOut() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    name: text(formData, "name"),
    slug: slug.parse(text(formData, "slug")),
    description: text(formData, "description"),
    icon_key: text(formData, "iconKey") || "sparkles",
    accent_color: text(formData, "accentColor") || "#eee5ff",
    sort_order: Number(formData.get("sortOrder") ?? 0),
    status: status.parse(text(formData, "status") || "draft"),
  };
  await supabase.from("categories").insert(payload);
  revalidatePath("/");
  revalidatePath("/admin/kategori");
}

export async function updateCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  await supabase.from("categories").update({
    name: text(formData, "name"),
    slug: slug.parse(text(formData, "slug")),
    description: text(formData, "description"),
    icon_key: text(formData, "iconKey") || "sparkles",
    accent_color: text(formData, "accentColor") || "#eee5ff",
    sort_order: Number(formData.get("sortOrder") ?? 0),
    status: status.parse(text(formData, "status") || "draft"),
  }).eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/kategori");
  redirect("/admin/kategori");
}

export async function deleteCategory(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("categories").delete().eq("id", text(formData, "id"));
  revalidatePath("/");
  revalidatePath("/admin/kategori");
}

export async function createProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = productPayload(formData);
  const { data: product, error } = await supabase.from("products").insert({
    category_id: payload.category_id,
    name: payload.name,
    slug: payload.slug,
    short_description: payload.short_description,
    description: payload.description,
    highlights: payload.highlights,
    badge: payload.badge,
    is_featured: payload.is_featured,
    status: payload.status,
    affiliate_url: payload.affiliate_url,
  }).select("id").single();
  if (error || !product) throw new Error(error?.message ?? "Produk gagal dibuat.");

  if (payload.cover_path) {
    await supabase.from("product_images").insert({
      product_id: product.id,
      storage_path: payload.cover_path,
      variant: "card",
      alt_text: payload.name,
      sort_order: 0,
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/produk");
  redirect("/admin/produk");
}

export async function updateProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const payload = productPayload(formData);
  await supabase.from("products").update({
    category_id: payload.category_id,
    name: payload.name,
    slug: payload.slug,
    short_description: payload.short_description,
    description: payload.description,
    highlights: payload.highlights,
    badge: payload.badge,
    is_featured: payload.is_featured,
    status: payload.status,
    affiliate_url: payload.affiliate_url,
  }).eq("id", id);
  if (payload.cover_path) {
    await supabase.from("product_images").upsert({
      product_id: id,
      storage_path: payload.cover_path,
      variant: "card",
      alt_text: payload.name,
      sort_order: 0,
    }, { onConflict: "product_id,variant" });
  }
  revalidatePath("/");
  revalidatePath("/admin/produk");
  redirect("/admin/produk");
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("products").delete().eq("id", text(formData, "id"));
  revalidatePath("/");
  revalidatePath("/admin/produk");
}

export async function updateSiteSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const settingsPayload = {
    brand_name: text(formData, "brandName"),
    handle: text(formData, "handle"),
    bio: text(formData, "bio"),
    avatar_url: text(formData, "avatarUrl"),
    cover_url: text(formData, "coverUrl"),
    disclosure: text(formData, "disclosure"),
    updated_at: new Date().toISOString(),
  };
  const { data: current } = await supabase.from("site_settings").select("id").limit(1).maybeSingle();
  if (current?.id) {
    await supabase.from("site_settings").update(settingsPayload).eq("id", current.id);
  } else {
    await supabase.from("site_settings").insert(settingsPayload);
  }

  await supabase.from("social_links").delete().gte("sort_order", 0);
  const socials = [
    { label: "Facebook", icon: "facebook", href: text(formData, "facebook"), sort_order: 1 },
    { label: "Instagram", icon: "instagram", href: text(formData, "instagram"), sort_order: 2 },
    { label: "Threads", icon: "threads", href: text(formData, "threads"), sort_order: 3 },
    { label: "TikTok", icon: "tiktok", href: text(formData, "tiktok"), sort_order: 4 },
  ].filter((social) => social.href);
  if (socials.length > 0) await supabase.from("social_links").insert(socials);

  revalidatePath("/");
  revalidatePath("/admin/pengaturan");
}
