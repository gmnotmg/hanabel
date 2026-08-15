import Link from "next/link";
import type { Category } from "@/lib/types";

// Fallback image colors based on category slug
const getCategoryGradient = (slug: string) => {
  const gradients: Record<string, string> = {
    "fashion-style": "from-fuchsia-500 to-pink-500",
    kecantikan: "from-rose-400 to-orange-400",
    "dekorasi-rumah": "from-amber-400 to-orange-500",
    elektronik: "from-blue-500 to-cyan-500",
    "kesehatan-wellness": "from-emerald-400 to-teal-500",
    "olahraga-fitness": "from-violet-500 to-indigo-500",
  };
  return gradients[slug] || "from-purple-500 to-indigo-500";
};

export function CategoryCard({ category }: { category: Category }) {
  const bgGradient = getCategoryGradient(category.slug);

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.02] hover-bounce active-jelly"
    >
      {/* ── Top Area (Image Placeholder) ── */}
      <div className={`relative h-40 w-full bg-gradient-to-br ${bgGradient} flex items-center justify-center p-6`}>
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        <h3 className="relative text-2xl font-black tracking-tight text-white drop-shadow-lg text-center leading-tight px-2">
          {category.name}
        </h3>
      </div>

      {/* ── Bottom Content ── */}
      <div className="flex flex-1 flex-col justify-center p-4 pb-5 sm:p-5">
        <div>
          <h4 className="text-[0.9rem] font-bold text-slate-900 tracking-tight line-clamp-2 leading-snug">
            Koleksi {category.name}
          </h4>
          
          {/* Meta Info */}
          <div className="mt-1 flex items-center gap-2 text-[0.7rem] font-semibold text-slate-500 overflow-hidden">
            <span className="shrink-0">{category.productCount ?? 0} Item</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300" />
            <span className="text-slate-400 truncate">
              {category.tags?.join(", ")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
