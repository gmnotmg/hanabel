import type { Metadata } from "next";
import { Dancing_Script, Plus_Jakarta_Sans, Nunito } from "next/font/google";
import { SplashWrapper } from "@/components/splash-wrapper";
import "./globals.css";

/* ── Fonts ─────────────────────────────────────────────────────────── */
const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hanabel Picks",
    template: "%s | Hanabel Picks",
  },
  description:
    "Katalog rekomendasi pilihan Hanabel untuk fashion, beauty, rumah, elektronik, dan wellness.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Hanabel Picks",
    description: "Koleksi pilihan yang bikin rutinitas terasa lebih cantik dan praktis.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakartaSans.variable} ${nunito.variable} ${dancing.variable}`}>
      <body className="font-sans text-slate-900 bg-purple-50 sm:bg-purple-100/60 antialiased selection:bg-[#8c56d4]/20">
        <SplashWrapper>{children}</SplashWrapper>
      </body>
    </html>
  );
}
