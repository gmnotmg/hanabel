import Link from "next/link";
import { ArrowUpRight, BarChart3, FolderKanban, Package, Plus } from "lucide-react";
import { AdminSetupNotice } from "@/components/admin-setup-notice";
import { getClickSummary, getAdminCategories, getAdminProducts } from "@/lib/admin-repository";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/config";
import { formatCount } from "@/lib/utils";

export default async function AdminOverviewPage() {
  if (!isSupabaseConfigured) return <AdminSetupNotice />;
  await requireAdmin();
  const [products, categories, clicks] = await Promise.all([getAdminProducts(), getAdminCategories(), getClickSummary()]);
  const published = products.filter((product) => product.status === "published").length;
  const drafts = products.filter((product) => product.status === "draft").length;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Good morning, curator</p><h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">Dashboard Hanabel</h1><p className="mt-2 text-sm text-muted">Pantau katalog dan performa link affiliate dalam 30 hari terakhir.</p></div><Link href="/admin/produk#new" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-black text-white hover:bg-lilac-600"><Plus aria-hidden="true" size={17} /> Tambah produk</Link></header>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Produk published", value: published, icon: Package },
          { label: "Draft menunggu", value: drafts, icon: Package },
          { label: "Kategori aktif", value: categories.filter((category) => category.status === "published").length, icon: FolderKanban },
          { label: "Klik Shopee · 30 hari", value: clicks.total, icon: BarChart3 },
        ].map(({ label, value, icon: Icon }) => <div key={label} className="surface-card p-5"><Icon aria-hidden="true" size={19} className="text-lilac-500" /><p className="mt-5 text-3xl font-black tracking-tight text-ink">{formatCount(value)}</p><p className="mt-1 text-xs font-semibold text-muted">{label}</p></div>)}
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        <div className="surface-card p-6"><div className="flex items-center justify-between gap-3"><div><p className="eyebrow">Top products</p><h2 className="mt-1 text-xl font-black text-ink">Klik terbanyak</h2></div><Link href="/admin/analytics" className="focus-ring inline-flex min-h-10 items-center gap-1 rounded-full bg-lilac-50 px-3 text-xs font-black text-lilac-700">Lihat semua <ArrowUpRight aria-hidden="true" size={14} /></Link></div><div className="mt-5 space-y-3">{clicks.byProduct.slice(0, 5).map((item, index) => <div key={item.label} className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-lilac-50 text-xs font-black text-lilac-600">{index + 1}</span><span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">{item.label}</span><span className="text-xs font-black text-lilac-600">{item.count}</span></div>)}{clicks.byProduct.length === 0 ? <p className="text-sm text-muted">Belum ada data klik. Data akan muncul setelah redirect tracking aktif.</p> : null}</div></div>
        <div className="surface-card p-6"><p className="eyebrow">Content health</p><h2 className="mt-1 text-xl font-black text-ink">Kondisi katalog</h2><div className="mt-5 space-y-4"><div><div className="flex justify-between text-xs font-bold"><span className="text-muted">Published</span><span className="text-ink">{published}/{products.length}</span></div><div className="mt-2 h-2 rounded-full bg-lilac-100"><div className="h-2 rounded-full bg-lilac-500" style={{ width: `${products.length ? (published / products.length) * 100 : 0}%` }} /></div></div><div><div className="flex justify-between text-xs font-bold"><span className="text-muted">Draft</span><span className="text-ink">{drafts}</span></div><div className="mt-2 h-2 rounded-full bg-lilac-100"><div className="h-2 rounded-full bg-blush" style={{ width: `${products.length ? (drafts / products.length) * 100 : 0}%` }} /></div></div></div><Link href="/admin/produk" className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-lilac-100 px-4 text-xs font-black text-lilac-700 hover:bg-lilac-50">Kelola katalog <ArrowUpRight aria-hidden="true" size={14} /></Link></div>
      </section>
    </div>
  );
}
