import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function requireAdmin() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase belum dikonfigurasi. Salin .env.example ke .env.local terlebih dahulu.");
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase client tidak tersedia.");
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  const isAdmin = Boolean(profile);

  if (!isAdmin) redirect("/admin/login?error=unauthorized");
  return { supabase, user };
}
