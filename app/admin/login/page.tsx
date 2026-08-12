import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { signIn } from "@/app/admin/actions";
import { isSupabaseConfigured } from "@/lib/config";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const message = error === "setup" ? "Supabase belum dikonfigurasi. Isi .env.local terlebih dahulu." : error === "unauthorized" ? "Akun ini belum memiliki akses admin." : error;
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbf9ff] px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="focus-ring mb-7 inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-lilac-700 hover:text-lilac-600"><ArrowLeft aria-hidden="true" size={17} /> Kembali ke public catalog</Link>
        <section className="surface-card p-7 sm:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac-100 text-lilac-600"><LockKeyhole aria-hidden="true" size={21} /></div>
          <p className="eyebrow mt-5">Hanabel admin</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">Masuk ke studio</h1>
          <p className="mt-3 text-sm leading-6 text-muted">Kelola produk, kategori, dan link affiliate dari satu tempat.</p>
          {message ? <p className="mt-5 rounded-2xl bg-rose-50 px-4 py-3 text-xs font-bold leading-5 text-rose-700">{message}</p> : null}
          {isSupabaseConfigured ? (
            <form action={signIn} className="mt-6 space-y-4">
              <div><label htmlFor="admin-email" className="mb-1.5 block text-xs font-black text-ink">Email</label><input id="admin-email" name="email" type="email" required autoComplete="email" className="focus-ring min-h-12 w-full rounded-2xl border border-lilac-100 bg-white px-4 text-sm outline-none" /></div>
              <div><label htmlFor="admin-password" className="mb-1.5 block text-xs font-black text-ink">Password</label><input id="admin-password" name="password" type="password" required autoComplete="current-password" className="focus-ring min-h-12 w-full rounded-2xl border border-lilac-100 bg-white px-4 text-sm outline-none" /></div>
              <button type="submit" className="focus-ring min-h-12 w-full rounded-2xl bg-ink text-sm font-black text-white transition hover:bg-lilac-600">Masuk</button>
            </form>
          ) : (
            <div className="mt-6 rounded-2xl bg-lilac-50 p-4 text-sm leading-6 text-muted">Public catalog tetap dapat dilihat menggunakan data demo. Admin akan aktif setelah Supabase terhubung.</div>
          )}
        </section>
      </div>
    </main>
  );
}
