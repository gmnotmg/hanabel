"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [shared, setShared] = useState(false);

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      // User cancelled the native share sheet.
    }
  }

  return (
    <button type="button" onClick={share} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-lilac-100 bg-white px-4 text-xs font-black text-lilac-700 transition hover:bg-lilac-50">
      {shared ? <Check aria-hidden="true" size={15} /> : <Share2 aria-hidden="true" size={15} />}
      {shared ? "Tersalin" : "Bagikan"}
    </button>
  );
}
