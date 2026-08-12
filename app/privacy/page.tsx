import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Privasi" };

export default function PrivacyPage() {
  return (
    <main className="page-shell py-5 sm:py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <Link href="/" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-lilac-700 hover:text-lilac-600">
          <ArrowLeft aria-hidden="true" size={17} />
          Kembali ke Hanabel
        </Link>
        <article className="surface-card p-6 sm:p-9">
          <p className="eyebrow">Privacy & disclosure</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-ink">Privasi Hanabel</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted">
            <p>Hanabel adalah katalog rekomendasi produk. Kami tidak memproses pembayaran, menyimpan alamat pengiriman, atau mengelola pesanan.</p>
            <p>Untuk mengukur performa katalog, Hanabel dapat mencatat klik menuju Shopee, kategori, sumber kampanye, dan waktu klik. Kami tidak menyimpan alamat IP mentah.</p>
            <p>Beberapa tautan dapat berupa tautan affiliate. Jika kamu membeli melalui tautan tersebut, Hanabel dapat menerima komisi tanpa mengubah harga di halaman Shopee.</p>
          </div>
        </article>
      </div>
    </main>
  );
}
