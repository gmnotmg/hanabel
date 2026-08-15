import { Search } from "lucide-react";

export function SearchBox({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  return (
    <form action="/search" className={`group relative ${compact ? "max-w-sm" : "mx-1"}`} role="search">
      <label htmlFor="catalog-search" className="sr-only">Cari kategori atau produk</label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search size={18} className="text-slate-400 transition-colors duration-300 group-focus-within:text-[#8c56d4]" />
      </div>
      <input
        id="catalog-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Cari koleksi favorit..."
        className="w-full rounded-full border-0 bg-white py-3.5 pl-11 pr-4 text-[0.9rem] font-medium text-slate-800 outline-none ring-1 ring-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out placeholder:text-slate-400 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:ring-black/10 focus:scale-[1.01] focus:ring-2 focus:ring-[#8c56d4]/40 focus:shadow-[0_8px_20px_rgba(140,86,212,0.12)]"
      />
    </form>
  );
}
