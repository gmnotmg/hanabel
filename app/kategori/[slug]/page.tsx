import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { ProductCard } from "@/components/product-card";
import { SearchBox } from "@/components/search-box";
import { getCategoryBySlug, getProductsByCategory, getSiteSettings } from "@/lib/catalog-repository";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return category
    ? { title: category.name, description: category.description }
    : { title: "Kategori tidak ditemukan" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, products, settings] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
    getSiteSettings(),
  ]);
  if (!category) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="space-y-8">
        <Link href="/" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-2 py-1 text-sm font-bold text-[#8c56d4] transition-colors hover:text-purple-600 hover:bg-purple-50">
          <ArrowLeft aria-hidden="true" size={18} />
          Kembali ke Beranda
        </Link>
        <header className="rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.04] overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-4 flex items-center gap-2 text-[0.8rem] font-bold text-slate-400">
                <Link href="/" className="transition-colors hover:text-[#8c56d4]">Home</Link>
                <ChevronRight aria-hidden="true" size={14} />
                <span className="text-slate-600">{category.name}</span>
              </div>
              <p className="text-[0.75rem] font-bold tracking-widest text-[#8c56d4] uppercase mb-2">Explore collection</p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{category.name}</h1>
              <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate-500">{category.description}</p>
            </div>
            <div className="w-full">
              <SearchBox compact />
            </div>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
          <p className="text-[0.95rem] font-bold text-slate-800"><span className="text-[#8c56d4]">{products.length}</span> rekomendasi pilihan</p>
          <span className="rounded-full bg-white px-4 py-1.5 text-[0.75rem] font-bold text-slate-500 shadow-sm ring-1 ring-black/5">Harga di Shopee</span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.04] p-12 text-center flex flex-col items-center justify-center">
            <p className="text-lg font-black text-slate-900">Belum ada produk di kategori ini.</p>
            <p className="mt-2 text-[0.9rem] text-slate-500">Coba jelajahi kategori lainnya.</p>
          </div>
        )}

        <div className="pt-4">
          <AffiliateDisclosure text={settings.disclosure} />
        </div>
      </div>
    </main>
  );
}
