"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) {
    return <div className="flex aspect-square items-center justify-center rounded-[28px] bg-lilac-100 text-6xl font-black text-lilac-300">H</div>;
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-[28px] border border-white bg-lilac-50 shadow-card">
        <Image src={current.url} alt={current.altText || productName} fill priority sizes="(max-width: 1023px) 100vw, 560px" className="object-cover" />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Tampilkan foto ${index + 1}`}
              aria-pressed={active === index}
              className={`focus-ring relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 ${active === index ? "border-lilac-500" : "border-white"}`}
            >
              <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
