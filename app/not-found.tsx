import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-[70vh] items-center justify-center py-16">
      <section className="surface-card max-w-md p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lilac-100 text-lilac-600">
          <SearchX aria-hidden="true" size={25} />
        </div>
        <p className="eyebrow mt-5">404</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight">Halaman belum ditemukan</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Coba kembali ke katalog Hanabel dan temukan rekomendasi lainnya.
        </p>
        <Link
          href="/"
          className="focus-ring mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:bg-lilac-600"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Kembali ke home
        </Link>
      </section>
    </main>
  );
}
