import Image from "next/image";
import { SiteSettings } from "@/lib/types";
import { SocialIcon } from "./social-icon";

const socialOrder = ["facebook", "instagram", "threads", "tiktok"];

const socialBrandStyles: Record<string, { wrapperRing: string; bgHover: string; iconDefault: string }> = {
  facebook: { 
    wrapperRing: "hover:ring-[#1877F2]/50 hover:shadow-[#1877F2]/30", 
    bgHover: "bg-[#1877F2]",
    iconDefault: "text-[#1877F2]",
  },
  instagram: { 
    wrapperRing: "hover:ring-[#d62976]/50 hover:shadow-[#d62976]/30", 
    bgHover: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    iconDefault: "text-[#d62976]",
  },
  tiktok: { 
    wrapperRing: "hover:ring-slate-900/50 hover:shadow-slate-900/30", 
    bgHover: "bg-black",
    iconDefault: "text-slate-900",
  },
  threads: { 
    wrapperRing: "hover:ring-slate-900/50 hover:shadow-slate-900/30", 
    bgHover: "bg-black",
    iconDefault: "text-slate-900",
  },
};
const defaultSocialStyle = { 
  wrapperRing: "hover:ring-slate-400/50 hover:shadow-slate-400/30",
  bgHover: "bg-slate-800",
  iconDefault: "text-slate-600"
};

export function BrandHeader({ settings }: { settings: SiteSettings }) {
  const orderedSocialLinks = [...settings.socialLinks].sort((a, b) => {
    const aIndex = socialOrder.indexOf(a.icon);
    const bIndex = socialOrder.indexOf(b.icon);
    return (aIndex === -1 ? socialOrder.length : aIndex) - (bIndex === -1 ? socialOrder.length : bIndex);
  });

  return (
    <section className="bg-white rounded-[32px] w-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] ring-1 ring-black/[0.04]">
      {/* ── Cover Image Container ── */}
      <div className="p-3 pb-0">
        <div className="relative w-full">
          {/* Banner */}
          <div className="relative h-44 w-full bg-purple-50 rounded-[20px] overflow-hidden">
            {settings.coverUrl && (
              <Image
                src={settings.coverUrl}
                alt=""
                fill
                priority
                sizes="(max-width: 680px) 100vw, 680px"
                className="object-cover object-[center_calc(50%-10px)]"
              />
            )}
          </div>
          
          {/* Avatar (Absolute, precisely 50% overlapping the banner's bottom edge) */}
          <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-1/2 justify-center">
            <div className="group relative h-[8.5rem] w-[8.5rem] cursor-pointer rounded-full p-[3px] shadow-lg active-jelly">
              
              {/* Solid purple gradient ring that scales up on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8c56d4] via-purple-400 to-pink-400 transition-transform duration-300 ease-out group-hover:scale-105" />
              
              {/* Inner avatar with thick white border */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-[4px] border-white bg-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.08)]">
                <Image
                  src={settings.avatarUrl}
                  alt={settings.brandName}
                  fill
                  sizes="256px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Profile Content ── */}
      {/* pt-[4.25rem] (68px) exactly matches the 68px protruding avatar */}
      <div className="relative z-10 px-5 pb-8 pt-[4.25rem] sm:px-8">
        
        {/* Title & Badge */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <h1 className="font-script text-[3rem] bg-gradient-to-r from-[#8c56d4] to-[#c13584] bg-clip-text text-transparent drop-shadow-sm tracking-tight pb-1">
              {settings.brandName}
            </h1>
          </div>

          <p className="-mt-2 inline-flex items-center rounded-full bg-purple-50 px-3.5 py-1 text-[0.75rem] font-medium text-[#8c56d4] ring-1 ring-purple-100">
            by Hana Nabila
          </p>

          <p className="mt-1 mx-auto max-w-[20rem] text-[0.85rem] leading-relaxed text-slate-600 sm:max-w-md text-center">
            {settings.bio}
          </p>
        </div>

        {/* Social Icons */}
        <div className="mx-auto mt-5 flex justify-center gap-4 sm:gap-5">
          {orderedSocialLinks.map((social) => {
            const style = socialBrandStyles[social.icon] || defaultSocialStyle;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka ${social.label}`}
                className="group flex flex-col items-center gap-2 transition-all duration-300"
              >
                <span className={`relative flex h-[3rem] w-[3rem] items-center justify-center rounded-[18px] bg-white ring-1 ring-black/5 shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-xl active-jelly ${style.wrapperRing}`}>
                  
                  {/* Background Fill (starts at opacity 0, fades in) */}
                  <span className={`absolute inset-0 z-0 rounded-[18px] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 ${style.bgHover}`} />
                  
                  {/* Icon */}
                  <span className={`relative z-10 transition-colors duration-500 ease-out ${style.iconDefault} group-hover:text-white`}>
                    <SocialIcon icon={social.icon} size={24} strokeWidth={2.5} />
                  </span>
                </span>
                <span className="text-[0.65rem] font-semibold text-slate-400 transition-colors group-hover:text-slate-600">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
