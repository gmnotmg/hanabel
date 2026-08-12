import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdmin();
    const body = await request.formData();
    const file = body.get("file");
    const variant = String(body.get("variant") ?? "card");
    if (!(file instanceof File)) return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    if (!file.type.startsWith("image/")) return NextResponse.json({ error: "File harus berupa gambar." }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Ukuran gambar maksimal 5 MB." }, { status: 400 });

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `products/${crypto.randomUUID()}-${variant}.${extension}`;
    const { error } = await supabase.storage.from("product-media").upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    const { data: publicUrl } = supabase.storage.from("product-media").getPublicUrl(path);
    return NextResponse.json({ path, url: publicUrl.publicUrl });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload gagal." }, { status: 500 });
  }
}
