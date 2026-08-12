"use client";

import { ImagePlus, Loader2, UploadCloud } from "lucide-react";
import { useState } from "react";

export function ImageUploadField({ defaultValue = "", name = "coverPath", valueMode = "path" }: { defaultValue?: string; name?: string; valueMode?: "path" | "url" }) {
  const [path, setPath] = useState(defaultValue);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    setStatus("Mengunggah...");
    const body = new FormData();
    body.append("file", file);
    body.append("variant", "card");
    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Upload gagal.");
      setPath(valueMode === "url" ? result.url : result.path);
      setStatus("Gambar siap disimpan.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload gagal.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-dashed border-lilac-200 bg-lilac-50/60 p-4">
      <input type="hidden" name={name} value={path} />
      <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-black text-lilac-700 shadow-sm transition hover:bg-lilac-100">
        {uploading ? <Loader2 aria-hidden="true" size={16} className="animate-spin" /> : <UploadCloud aria-hidden="true" size={16} />}
        {uploading ? "Mengunggah" : "Pilih gambar cover"}
        <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); }} />
      </label>
      <p className="mt-2 flex items-center gap-2 text-[0.68rem] leading-5 text-muted"><ImagePlus aria-hidden="true" size={13} /> Maksimal 5 MB · JPG, PNG, atau WebP</p>
      {path ? <p className="mt-2 truncate text-[0.68rem] font-bold text-lilac-600">{path}</p> : null}
      {status ? <p className="mt-1 text-[0.68rem] text-muted">{status}</p> : null}
    </div>
  );
}
