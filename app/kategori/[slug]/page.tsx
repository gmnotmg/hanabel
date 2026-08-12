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
    <main className="page-shell py-5 sm:py-8">
      <div className="mx-auto max-w-5xl space-y-7">
        <Link href="/" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-lilac-700 hover:text-lilac-600">
          <ArrowLeft aria-hidden="true" size={17} />
          Kembali ke Hanabel
        </Link>
        <header className="surface-card overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold text-muted">
                <Link href="/" className="soft-link">Home</Link>
                <ChevronRight aria-hidden="true" size={14} />
                <span>{category.name}</span>
              </div>
              <p className="eyebrow">Explore collection</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">{category.name}</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{category.description}</p>
            </div>
            <SearchBox compact />
          </div>
        </header>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-ink"><span className="text-lilac-600">{products.length}</span> rekomendasi untuk kamu</p>
          <span className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-muted">Tanpa harga</span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="surface-card p-8 text-center">
            <p className="font-black text-ink">Belum ada produk di kategori ini.</p>
            <p className="mt-2 text-sm text-muted">Coba lihat kategori lainnya.</p>
          </div>
        )}

        <AffiliateDisclosure text={settings.disclosure} />
      </div>
    </main>
  );
}
