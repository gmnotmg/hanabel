import Link from "next/link";
import { BarChart3, ExternalLink, FolderKanban, LayoutDashboard, LogOut, Package, Settings2 } from "lucide-react";
import { signOut } from "@/app/admin/actions";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/produk", label: "Produk", icon: Package },
  { href: "/admin/kategori", label: "Kategori", icon: FolderKanban },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
] as const;

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#fbf9ff]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col lg:flex-row">
        <aside className="border-b border-lilac-100 bg-white/70 px-4 py-4 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
          <div className="flex items-center justify-between lg:block">
            <Link href="/admin" className="focus-ring inline-flex items-center gap-3 rounded-2xl px-2 py-1">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f6a7d7] to-[#8f4bd1] text-xl font-black italic text-white">H</span>
              <span><span className="block text-sm font-black text-ink">Hanabel</span><span className="block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-lilac-500">Admin studio</span></span>
            </Link>
            <Link href="/" className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-xs font-bold text-muted hover:bg-lilac-50 hover:text-lilac-700 lg:mt-8"><ExternalLink aria-hidden="true" size={14} /> Public</Link>
          </div>
          <nav className="mt-5 flex gap-2 overflow-x-auto lg:mt-10 lg:block lg:space-y-2" aria-label="Admin navigation">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="focus-ring inline-flex min-h-11 shrink-0 items-center gap-3 rounded-2xl px-3 text-sm font-bold text-muted transition hover:bg-lilac-50 hover:text-lilac-700 lg:flex">
                <Icon aria-hidden="true" size={17} />
                {label}
              </Link>
            ))}
            <Link href="/admin/pengaturan" className="focus-ring inline-flex min-h-11 shrink-0 items-center gap-3 rounded-2xl px-3 text-sm font-bold text-muted transition hover:bg-lilac-50 hover:text-lilac-700 lg:flex"><Settings2 aria-hidden="true" size={17} /> Pengaturan</Link>
          </nav>
          <form action={signOut} className="mt-5 hidden lg:block lg:pt-5">
            <button type="submit" className="focus-ring inline-flex min-h-11 w-full items-center gap-3 rounded-2xl px-3 text-sm font-bold text-muted transition hover:bg-rose-50 hover:text-rose-600"><LogOut aria-hidden="true" size={17} /> Keluar</button>
          </form>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
