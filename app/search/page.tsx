import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SearchBox } from "@/components/search-box";
import { getSiteSettings, searchCatalog } from "@/lib/catalog-repository";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const [products, settings] = await Promise.all([searchCatalog(q), getSiteSettings()]);

  return (
    <main className="page-shell py-5 sm:py-8">
      <div className="mx-auto max-w-5xl space-y-7">
        <Link href="/" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-lilac-700 hover:text-lilac-600">
          <ArrowLeft aria-hidden="true" size={17} />
          Kembali ke Hanabel
        </Link>
        <header className="surface-card p-6 sm:p-8">
          <p className="eyebrow">Search the edit</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">Cari rekomendasi</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">Temukan produk berdasarkan nama, kebutuhan, atau kategori.</p>
          <div className="mt-6"><SearchBox defaultValue={q} /></div>
        </header>

        {q ? (
          <p className="text-sm font-bold text-ink">Hasil untuk <span className="text-lilac-600">“{q}”</span> · {products.length} produk</p>
        ) : null}

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="surface-card p-9 text-center">
            <SearchX aria-hidden="true" size={28} className="mx-auto text-lilac-400" />
            <h2 className="mt-4 text-lg font-black text-ink">Belum menemukan yang cocok</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Coba kata kunci lain seperti “daily”, “beauty”, atau “rumah”.</p>
          </div>
        )}

        <p className="text-xs leading-5 text-muted">{settings.disclosure}</p>
      </div>
    </main>
  );
}
