import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white bg-white/95 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/produk/${product.slug}`} className="focus-ring block shrink-0">
        <div className="relative aspect-[1.15] overflow-hidden bg-lilac-50">
          {cover?.url ? (
            <Image
              src={cover.url}
              alt={cover.altText || product.name}
              fill
              sizes="(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 260px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl font-black text-lilac-300">H</div>
          )}
          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
            {product.badge ? (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-black text-lilac-700 shadow-sm backdrop-blur">
                {product.badge}
              </span>
            ) : <span />}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-lilac-600 shadow-sm backdrop-blur">
              <ArrowUpRight aria-hidden="true" size={16} />
            </span>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.66rem] font-black uppercase tracking-[0.15em] text-lilac-500">{product.categoryName}</p>
        <Link href={`/produk/${product.slug}`} className="focus-ring mt-1 block">
          <h3 className="line-clamp-2 min-h-10 text-base font-black leading-5 tracking-tight text-ink">{product.name}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-muted">{product.shortDescription}</p>
        <Link
          href={`/go/${product.slug}`}
          className="focus-ring mt-auto inline-flex min-h-10 w-full shrink-0 items-center justify-center gap-1.5 sm:gap-2 rounded-2xl bg-lilac-50 px-2 sm:px-3 text-[0.7rem] sm:text-[0.75rem] font-black text-lilac-700 transition hover:bg-lilac-600 hover:text-white whitespace-nowrap"
        >
          Lihat di Shopee
          <ExternalLink aria-hidden="true" size={14} />
        </Link>
      </div>
    </article>
  );
}
