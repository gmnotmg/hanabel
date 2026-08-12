import { ShieldCheck } from "lucide-react";

export function AffiliateDisclosure({ text }: { text: string }) {
  return (
    <aside className="flex items-start gap-3 rounded-2xl border border-lilac-100 bg-white/60 px-4 py-3 text-xs leading-5 text-muted">
      <ShieldCheck aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-lilac-500" />
      <p>{text}</p>
    </aside>
  );
}
