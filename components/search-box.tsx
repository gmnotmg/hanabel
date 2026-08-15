import { Search } from "lucide-react";

export function SearchBox({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  return (
    <form action="/search" className={`relative ${compact ? "max-w-sm" : "mx-1"}`} role="search">
      <label htmlFor="catalog-search" className="sr-only">Cari kategori atau produk</label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search size={18} className="text-[#8c56d4]" />
      </div>
      <input
        id="catalog-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Cari koleksi favorit..."
        className="font-bubbly w-full rounded-full border border-purple-100 bg-white py-3.5 pl-11 pr-4 text-sm font-semibold text-gray-900 shadow-[0_4px_16px_rgba(140,86,212,0.04)] outline-none ring-1 ring-black/[0.03] transition-spring placeholder:text-gray-400 focus:scale-[1.02] focus:border-purple-300 focus:shadow-[0_8px_24px_rgba(140,86,212,0.12)] focus:ring-4 focus:ring-purple-100 active-jelly"
      />
    </form>
  );
}
