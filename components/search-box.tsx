import { Search } from "lucide-react";

export function SearchBox({ defaultValue = "", compact = false }: { defaultValue?: string; compact?: boolean }) {
  return (
    <form action="/search" className={`relative ${compact ? "max-w-sm" : "w-full"}`} role="search">
      <label htmlFor="catalog-search" className="sr-only">Cari produk atau kategori</label>
      <Search aria-hidden="true" size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lilac-400" />
      <input
        id="catalog-search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Cari produk atau kategori..."
        className="focus-ring min-h-12 w-full rounded-2xl border border-lilac-100 bg-white/90 pl-11 pr-4 text-sm text-ink shadow-sm outline-none placeholder:text-muted/60"
      />
    </form>
  );
}
