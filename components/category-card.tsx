import Link from "next/link";
import { Activity, ArrowUpRight, House, Palette, Sparkles, Shirt } from "lucide-react";
import type { Category } from "@/lib/types";

const icons = {
  dress: Shirt,
  beauty: Palette,
  sparkles: Sparkles,
  home: House,
  activity: Activity,
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = icons[category.iconKey as keyof typeof icons] ?? Sparkles;

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="focus-ring group flex min-h-[142px] items-center gap-4 rounded-3xl border border-white bg-white/90 p-4 shadow-card transition duration-200 hover:-translate-y-1 hover:border-lilac-200 hover:shadow-soft"
    >
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lilac-700"
        style={{ backgroundColor: category.accentColor }}
      >
        <Icon aria-hidden="true" size={25} strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3">
          <span className="text-base font-black tracking-tight text-ink">{category.name}</span>
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lilac-50 text-lilac-600 transition group-hover:bg-lilac-600 group-hover:text-white">
            <ArrowUpRight aria-hidden="true" size={17} />
          </span>
        </span>
        <span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted">{category.description}</span>
        <span className="mt-3 inline-flex rounded-full bg-lilac-50 px-2.5 py-1 text-[0.68rem] font-bold text-lilac-600">
          {category.productCount ?? 0} pilihan
        </span>
      </span>
    </Link>
  );
}
