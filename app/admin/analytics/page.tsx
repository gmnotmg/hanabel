import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { AdminSetupNotice } from "@/components/admin-setup-notice";
import { getClickSummary } from "@/lib/admin-repository";
import { requireAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/config";

function Ranking({ title, items }: { title: string; items: Array<{ label: string; count: number }> }) {
  return <section className="surface-card p-6"><p className="eyebrow">Last 30 days</p><h2 className="mt-1 text-xl font-black text-ink">{title}</h2><div className="mt-5 space-y-3">{items.map((item, index) => <div key={item.label} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-lilac-50 text-xs font-black text-lilac-600">{index + 1}</span><span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">{item.label}</span><span className="text-xs font-black text-lilac-600">{item.count} klik</span></div>)}{items.length === 0 ? <p className="text-sm text-muted">Belum ada data.</p> : null}</div></section>;
}

export default async function AdminAnalyticsPage() {
  if (!isSupabaseConfigured) return <AdminSetupNotice />;
  await requireAdmin();
  const summary = await getClickSummary();
  return <div className="mx-auto max-w-6xl space-y-7"><Link href="/admin" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-lilac-700"><ArrowLeft aria-hidden="true" size={17} /> Kembali ke overview</Link><header><p className="eyebrow">Performance</p><h1 className="mt-2 text-3xl font-black tracking-tight text-ink">Analytics klik</h1><p className="mt-2 text-sm text-muted">Ringkasan redirect menuju Shopee dalam 30 hari terakhir.</p></header><div className="surface-card flex items-center gap-4 p-6"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac-100 text-lilac-600"><BarChart3 aria-hidden="true" size={22} /></span><div><p className="text-3xl font-black text-ink">{summary.total}</p><p className="text-xs font-semibold text-muted">Total klik tercatat</p></div></div><div className="grid gap-5 lg:grid-cols-3"><Ranking title="Produk" items={summary.byProduct} /><Ranking title="Kategori" items={summary.byCategory} /><Ranking title="Sumber traffic" items={summary.bySource} /></div></div>;
}
