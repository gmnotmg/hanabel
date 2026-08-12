import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import { SocialIcon } from "@/components/social-icon";

export function BrandHeader({ settings }: { settings: SiteSettings }) {
  return (
    <section className="surface-card overflow-hidden">
      <div className="relative h-40 overflow-hidden sm:h-48">
        <Image
          src={settings.coverUrl}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#6f4290]/10 via-[#a869c9]/15 to-[#4d315f]/45" />
        <div className="absolute left-5 top-5 rounded-full border border-white/40 bg-white/25 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          ✦ Curated with love
        </div>
        <div className="absolute bottom-5 right-5 rounded-full border border-white/40 bg-white/25 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          Hanabel picks
        </div>
      </div>

      <div className="relative px-5 pb-5 pt-14 sm:px-8 sm:pb-7 sm:pt-16">
        <div className="absolute left-5 top-0 -translate-y-1/2 sm:left-8">
          <div className="rounded-full bg-gradient-to-br from-[#f6a7d7] via-[#b96ced] to-[#7350e8] p-1.5 shadow-soft">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-lilac-200 sm:h-24 sm:w-24">
              <Image
                src={settings.avatarUrl}
                alt={`${settings.brandName} avatar`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">{settings.brandName}</h1>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-lilac-500 text-white" title="Brand terverifikasi">
                <Check aria-hidden="true" size={13} strokeWidth={3} />
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold text-lilac-600">{settings.handle}</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{settings.bio}</p>
          </div>

          <Link
            href="#rekomendasi"
            className="focus-ring inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white shadow-lg shadow-ink/10 transition hover:-translate-y-0.5 hover:bg-lilac-600"
          >
            Jelajahi rekomendasi
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-4">
          {settings.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Buka ${social.label}`}
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-lilac-100 bg-lilac-50 px-4 text-xs font-bold text-lilac-700 transition hover:border-lilac-300 hover:bg-lilac-100"
            >
              <SocialIcon icon={social.icon} size={16} />
              {social.label}
              <ExternalLink aria-hidden="true" size={12} className="opacity-50" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
