import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hanabel Official — Pilihan yang Layak Kamu Coba",
    template: "%s | Hanabel Official",
  },
  description:
    "Katalog rekomendasi pilihan Hanabel untuk fashion, beauty, rumah, elektronik, dan wellness.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Hanabel Official",
    description: "Koleksi pilihan yang bikin rutinitas terasa lebih cantik dan praktis.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
