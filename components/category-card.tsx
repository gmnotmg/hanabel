import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";

// Fallback image IDs based on category slug
const getCategoryImage = (slug: string) => {
  const images: Record<string, string> = {
    "perlengkapan-bayi": "photo-1519689680058-324335c77eba", // Baby items
    "pakaian-wanita": "photo-1483985988355-763728e1935b",    // Fashion
    "sepatu-sandal-wanita": "photo-1543163521-1bf539c55dd2", // Heels
    "elektronik": "photo-1505740420928-5e560c06d30e",        // Headphones
    "dekorasi-rumah": "photo-1513694203232-719a280e022f",    // Home decor
    "olahraga-fitness": "photo-1518611012118-696072aa579a",  // Fitness/yoga
  };
  return images[slug] || "photo-1618221118493-9cfa1a1c00ea";
};

export function CategoryCard({ category }: { category: Category }) {
  const imageId = getCategoryImage(category.slug);
  const imageUrl = `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=600&q=80`;

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="group relative flex h-[240px] w-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.02] hover-bounce active-jelly"
    >
      {/* ── Top Area (Image - 5/8 height = 150px) ── */}
      <div className="relative h-[150px] shrink-0 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={category.name} 
          fill 
          sizes="(max-width: 768px) 50vw, 300px" 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      {/* ── Bottom Content (Body - 3/8 height = 90px) ── */}
      <div className="flex flex-1 flex-col justify-center px-4 py-3 sm:px-5">
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
