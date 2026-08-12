import Link from "next/link";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { AdminProductForm } from "@/components/admin-product-form";
import { createProduct, deleteProduct } from "@/app/admin/actions";
import { getAdminCategories, getAdminProducts } from "@/lib/admin-repository";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/config";
import { AdminSetupNotice } from "@/components/admin-setup-notice";

export default async function AdminProductsPage() {
  if (!isSupabaseConfigured) return <AdminSetupNotice />;
  await requireAdmin();
  const [categories, products] = await Promise.all([getAdminCategories(), getAdminProducts()]);
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Catalog management</p><h1 className="mt-2 text-3xl font-black tracking-tight text-ink">Produk</h1><p className="mt-2 text-sm text-muted">Atur produk, kurasi, gambar, dan link Shopee.</p></div><Link href="#new" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-black text-white hover:bg-lilac-600"><Plus aria-hidden="true" size={17} /> Produk baru</Link></header>
      <section id="new" className="surface-card scroll-mt-6 p-6 sm:p-8"><p className="eyebrow">Create</p><h2 className="mt-1 text-xl font-black text-ink">Tambah produk</h2><p className="mt-2 text-sm text-muted">Isi informasi yang membantu pengunjung memutuskan untuk mengecek Shopee.</p><div className="mt-6"><AdminProductForm categories={categories.filter((category) => category.status !== "archived")} action={createProduct} /></div></section>
      <section className="surface-card overflow-hidden"><div className="border-b border-lilac-100 px-6 py-5"><p className="eyebrow">All content</p><h2 className="mt-1 text-xl font-black text-ink">Daftar produk</h2></div><div className="divide-y divide-lilac-100">{products.map((product) => <div key={product.id} className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-black text-ink">{product.name}</h3><span className={`rounded-full px-2 py-1 text-[0.62rem] font-black ${product.status === "published" ? "bg-mint/50 text-[#27684d]" : product.status === "draft" ? "bg-butter/60 text-[#8b6012]" : "bg-slate-100 text-slate-500"}`}>{product.status}</span>{product.isFeatured ? <span className="rounded-full bg-lilac-100 px-2 py-1 text-[0.62rem] font-black text-lilac-700">featured</span> : null}</div><p className="mt-1 truncate text-xs text-muted">{product.categoryName} · /produk/{product.slug}</p></div><div className="flex shrink-0 gap-2"><Link href={`/admin/produk/${product.id}`} className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-lilac-100 px-3 text-xs font-black text-lilac-700 hover:bg-lilac-50"><Edit3 aria-hidden="true" size={14} /> Edit</Link><form action={deleteProduct}><input type="hidden" name="id" value={product.id} /><button type="submit" className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-rose-100 px-3 text-xs font-black text-rose-600 hover:bg-rose-50"><Trash2 aria-hidden="true" size={14} /> Hapus</button></form></div></div>)}{products.length === 0 ? <p className="px-6 py-8 text-sm text-muted">Belum ada produk.</p> : null}</div></section>
    </div>
  );
}
