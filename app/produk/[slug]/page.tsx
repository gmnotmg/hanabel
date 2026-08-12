import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { ProductGallery } from "@/components/product-gallery";
import { ShareButton } from "@/components/share-button";
import { getProductBySlug, getSiteSettings } from "@/lib/catalog-repository";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product
    ? { title: product.name, description: product.shortDescription }
    : { title: "Produk tidak ditemukan" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()]);
  if (!product) notFound();

  return (
    <main className="page-shell py-5 sm:py-8">
      <div className="mx-auto max-w-5xl space-y-7">
        <Link href={`/kategori/${product.categorySlug}`} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-lilac-700 hover:text-lilac-600">
          <ArrowLeft aria-hidden="true" size={17} />
          Kembali ke {product.categoryName}
        </Link>

        <article className="grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-10">
          <ProductGallery images={product.images} productName={product.name} />
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-lilac-100 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] text-lilac-700">{product.categoryName}</span>
              {product.badge ? <span className="rounded-full bg-blush/40 px-3 py-1.5 text-[0.68rem] font-black text-[#a34c7d]">{product.badge}</span> : null}
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-base leading-7 text-muted">{product.description}</p>

            <div className="mt-7 rounded-3xl border border-lilac-100 bg-white/70 p-5">
              <p className="eyebrow">Kenapa masuk pilihan Hanabel</p>
              <ul className="mt-4 space-y-3">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-sm font-semibold text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-[#27684d]"><Check aria-hidden="true" size={13} strokeWidth={3} /></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={`/go/${product.slug}`} className="focus-ring inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-ink px-5 text-sm font-black text-white shadow-lg shadow-ink/10 transition hover:bg-lilac-600">
                Lihat di Shopee
                <ExternalLink aria-hidden="true" size={17} />
              </Link>
              <ShareButton title={product.name} />
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">Harga, stok, dan variasi dapat berubah mengikuti halaman Shopee.</p>
          </div>
        </article>

        <AffiliateDisclosure text={settings.disclosure} />
      </div>
    </main>
  );
}
