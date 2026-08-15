import { ShieldCheck } from "lucide-react";

export function AffiliateDisclosure({ text }: { text: string }) {
  // Memecah teks menjadi 2 baris jika ada tanda titik
  const [firstSentence, ...rest] = text.split('. ');
  const secondSentence = rest.join('. ');

  return (
    <aside className="flex items-start gap-3 rounded-2xl border border-lilac-100 bg-white/80 px-4 py-3 text-xs leading-5 text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <ShieldCheck aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-lilac-500" />
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
