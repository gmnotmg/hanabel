import Link from "next/link";
import { ArrowRight, Heart, Layers3, Package, Sparkles } from "lucide-react";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { BrandHeader } from "@/components/brand-header";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { SearchBox } from "@/components/search-box";
import { getCategories, getFeaturedProducts, getPublishedProducts, getSiteSettings } from "@/lib/catalog-repository";
import { formatCount } from "@/lib/utils";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, categories, featured, products] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getFeaturedProducts(6),
    getPublishedProducts(),
  ]);

  return (
    <main className="page-shell py-5 sm:py-8">
      <div className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
        <BrandHeader settings={settings} />

        <section className="grid grid-cols-3 gap-3" aria-label="Ringkasan katalog Hanabel">
          <div className="surface-card p-4 sm:p-5">
            <Package aria-hidden="true" size={18} className="text-lilac-500" />
            <p className="mt-4 text-xl font-black tracking-tight text-ink">{formatCount(products.length)}</p>
            <p className="mt-1 text-[0.68rem] font-semibold text-muted">Produk pilihan</p>
          </div>
          <div className="surface-card p-4 sm:p-5">
            <Layers3 aria-hidden="true" size={18} className="text-lilac-500" />
            <p className="mt-4 text-xl font-black tracking-tight text-ink">{formatCount(categories.length)}</p>
            <p className="mt-1 text-[0.68rem] font-semibold text-muted">Kategori aktif</p>
          </div>
          <div className="surface-card p-4 sm:p-5">
            <Heart aria-hidden="true" size={18} className="text-lilac-500" />
            <p className="mt-4 text-xl font-black tracking-tight text-ink">Kurasi</p>
            <p className="mt-1 text-[0.68rem] font-semibold text-muted">Dipilih Hanabel</p>
          </div>
        </section>

        <section id="rekomendasi" className="scroll-mt-6 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Start here</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-ink sm:text-3xl">Pilihan Hanabel</h2>
              <p className="mt-2 text-sm text-muted">Temuan yang sedang kami suka dan layak kamu cek.</p>
            </div>
            <Sparkles aria-hidden="true" size={24} className="hidden text-blush sm:block" />
          </div>
          {featured.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {featured.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="surface-card p-6 text-sm text-muted">Belum ada pilihan unggulan.</div>
          )}
        </section>

        <section className="space-y-4" aria-labelledby="search-heading">
          <div>
            <p className="eyebrow">Find your next favorite</p>
            <h2 id="search-heading" className="mt-1 text-2xl font-black tracking-tight text-ink sm:text-3xl">Cari yang kamu butuhkan</h2>
          </div>
          <SearchBox />
        </section>

        <section className="space-y-4" aria-labelledby="category-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Explore by mood</p>
              <h2 id="category-heading" className="mt-1 text-2xl font-black tracking-tight text-ink sm:text-3xl">Kategori produk</h2>
            </div>
            <span className="rounded-full bg-lilac-100 px-3 py-1.5 text-xs font-black text-lilac-700">{categories.length} kategori</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
          </div>
        </section>

        <AffiliateDisclosure text={settings.disclosure} />

        <footer className="flex flex-col gap-4 border-t border-lilac-200/60 pb-4 pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hanabel Official</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="soft-link">Privasi</Link>
            <Link href="/admin/login" className="soft-link">Admin</Link>
            <Link href="#rekomendasi" className="inline-flex items-center gap-1 font-bold text-lilac-600">Ke atas <ArrowRight aria-hidden="true" size={13} /></Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
