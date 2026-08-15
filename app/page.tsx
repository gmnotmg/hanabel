import Link from "next/link";
import { ArrowRight, LayoutGrid, Search, Sparkles, Compass } from "lucide-react";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { BrandHeader } from "@/components/brand-header";
import { CategoryCard } from "@/components/category-card";
import { SearchBox } from "@/components/search-box";
import { getCategories, getSiteSettings } from "@/lib/catalog-repository";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getCategories(),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 pb-12 pt-5 sm:pb-16 sm:pt-8">
      <div className="w-full space-y-6 sm:space-y-8">
        
        {/* ── Top Hero / Profile Card ── */}
        <BrandHeader settings={settings} />



        {/* ── New / Top Picks (Grid) ── */}
        <section id="kategori" className="scroll-mt-4 space-y-4" aria-labelledby="category-heading">
          <div className="flex items-center justify-between">
            <h2
              id="category-heading"
              className="text-[1.1rem] font-bold tracking-tight text-[#8c56d4]"
            >
              Kategori
            </h2>
            <Link href="#kategori" className="text-[0.75rem] font-semibold text-slate-500 transition-colors hover:text-[#8c56d4]">
              Lihat Semua
            </Link>
          </div>

          <SearchBox />

          {/* Cards (Grid Layout - Movie Poster style) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <AffiliateDisclosure text={settings.disclosure} />

        <footer className="mt-4 mb-4 flex flex-col items-center gap-4 rounded-3xl p-4 text-[0.7rem] font-medium text-gray-400">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#8c56d4]" />
            <p>© {new Date().getFullYear()} Hanabel Official</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
