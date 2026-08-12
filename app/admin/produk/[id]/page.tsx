import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminProductForm } from "@/components/admin-product-form";
import { updateProduct } from "@/app/admin/actions";
import { getAdminCategories, getAdminProducts } from "@/lib/admin-repository";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/config";
import { AdminSetupNotice } from "@/components/admin-setup-notice";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured) return <AdminSetupNotice />;
  await requireAdmin();
  const { id } = await params;
  const [categories, products] = await Promise.all([getAdminCategories(), getAdminProducts()]);
  const product = products.find((item) => item.id === id);
  if (!product) notFound();
  return <div className="mx-auto max-w-3xl space-y-7"><Link href="/admin/produk" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-lilac-700"><ArrowLeft aria-hidden="true" size={17} /> Kembali ke produk</Link><section className="surface-card p-6 sm:p-8"><p className="eyebrow">Edit product</p><h1 className="mt-1 text-2xl font-black tracking-tight text-ink">{product.name}</h1><div className="mt-6"><AdminProductForm categories={categories.filter((category) => category.status !== "archived")} product={product} action={updateProduct} /></div></section></div>;
}
