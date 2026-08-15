import { ShieldCheck } from "lucide-react";

export function AffiliateDisclosure({ text }: { text: string }) {
  // Memecah teks menjadi 2 baris jika ada tanda titik
  const [firstSentence, ...rest] = text.split('. ');
  const secondSentence = rest.join('. ');

  return (
    <aside className="flex items-center gap-3 rounded-2xl border border-lilac-100 bg-white/80 px-4 py-3 text-xs leading-5 text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#f8f5fd] to-[#ede4fa] text-[#8c56d4] shadow-sm ring-1 ring-[#8c56d4]/10">
        <ShieldCheck aria-hidden="true" size={18} />
      </div>
      <div className="flex flex-col">
        {secondSentence ? (
          <>
            <span className="font-semibold text-slate-700">{firstSentence}.</span>
            <span className="mt-0.5">{secondSentence}</span>
          </>
        ) : (
          <span>{text}</span>
        )}
      </div>
    </aside>
  );
}
