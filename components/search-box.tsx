import { Search } from "lucide-react";

export function SearchBox({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  return (
    <form action="/search" className={`group relative w-full ${compact ? "max-w-sm" : ""}`} role="search">
      <label htmlFor="catalog-search" className="sr-only">Cari kategori atau produk</label>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4">
        <Search size={18} className="text-slate-400 transition-colors duration-300 group-focus-within:text-[#8c56d4]" />
      </div>
      <input
        id="catalog-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Cari koleksi favorit..."
        className="w-full rounded-2xl border-0 bg-white py-3 pl-11 pr-4 text-[0.9rem] font-medium text-slate-800 outline-none ring-1 ring-inset ring-slate-200 shadow-sm transition-all duration-300 placeholder:text-slate-400 hover:ring-slate-300 focus:ring-2 focus:ring-[#8c56d4]/50 focus:shadow-md"
      />
    </form>
  );
}
