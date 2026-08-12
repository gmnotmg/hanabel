import Link from "next/link";
import { Database, ExternalLink } from "lucide-react";

export function AdminSetupNotice() {
  return (
    <section className="surface-card max-w-2xl p-7 sm:p-9">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac-100 text-lilac-600"><Database aria-hidden="true" size={22} /></div>
      <p className="eyebrow mt-5">Setup diperlukan</p>
      <h1 className="mt-2 text-2xl font-black tracking-tight text-ink">Hubungkan Supabase untuk mengaktifkan admin</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Public catalog sedang menggunakan data demo lokal. Salin <code className="rounded bg-lilac-50 px-1.5 py-0.5 text-lilac-700">.env.example</code> ke <code className="rounded bg-lilac-50 px-1.5 py-0.5 text-lilac-700">.env.local</code>, isi kredensial Supabase, jalankan migration, lalu buat user admin.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white hover:bg-lilac-600">Buka Supabase <ExternalLink aria-hidden="true" size={15} /></Link>
        <Link href="/" className="focus-ring inline-flex min-h-11 items-center rounded-full border border-lilac-100 bg-white px-5 text-sm font-bold text-lilac-700 hover:bg-lilac-50">Lihat katalog demo</Link>
      </div>
    </section>
  );
}
