import { Search } from "lucide-react";

export function SearchBox({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  return (
    <form action="/search" className={`group relative ${compact ? "max-w-sm" : "mx-1"}`} role="search">
      <label htmlFor="catalog-search" className="sr-only">Cari kategori atau produk</label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search size={18} className="text-slate-400 transition-colors group-focus-within:text-[#8c56d4]" />
      </div>
      <input
        id="catalog-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Cari koleksi favorit..."
        className="w-full rounded-[20px] border-0 bg-purple-50/50 py-3.5 pl-[2.75rem] pr-4 text-[0.85rem] font-medium text-slate-800 outline-none ring-1 ring-inset ring-purple-100/50 transition-all placeholder:text-slate-400 hover:bg-purple-50/80 focus:bg-white focus:ring-2 focus:ring-purple-300 focus:shadow-[0_4px_16px_rgba(140,86,212,0.08)]"
      />
    </form>
  );
}
