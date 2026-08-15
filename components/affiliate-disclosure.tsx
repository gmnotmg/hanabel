import { Info } from "lucide-react";

export function AffiliateDisclosure({ text }: { text: string }) {
  // Memecah teks menjadi 2 baris jika ada tanda titik
  const [firstSentence, ...rest] = text.split('. ');
  const secondSentence = rest.join('. ');

  return (
    <aside className="group relative overflow-hidden rounded-[28px] bg-white/40 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.03] backdrop-blur-2xl transition-all hover:bg-white/60">
      {/* Efek cahaya berpendar (Glow blobs) */}
      <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-fuchsia-400/10 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />
      
      <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-b from-white to-slate-50 shadow-sm ring-1 ring-black/[0.04]">
          <Info aria-hidden="true" size={24} className="text-[#8c56d4]" />
        </div>
        <div className="flex flex-col gap-0.5">
          {secondSentence ? (
            <>
              <span className="text-[0.85rem] font-bold text-slate-800 tracking-tight">{firstSentence}.</span>
              <span className="text-[0.75rem] font-medium text-slate-500">{secondSentence}</span>
            </>
          ) : (
            <span className="text-[0.85rem] font-medium leading-snug text-slate-600 line-clamp-2">
              {text}
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
