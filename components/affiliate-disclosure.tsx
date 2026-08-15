import { Info } from "lucide-react";

export function AffiliateDisclosure({ text }: { text: string }) {
  return (
    <aside className="group flex items-start sm:items-center gap-4 rounded-[24px] bg-[#f8f5fd] px-5 py-4 transition-colors hover:bg-[#f3edfc]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/[0.04]">
        <Info aria-hidden="true" size={18} className="text-[#8c56d4]" />
      </div>
      <p className="text-[0.8rem] font-medium leading-relaxed text-slate-600">
        {text}
      </p>
    </aside>
  );
}
