import { createBrowserClient } from "@supabase/ssr";
import { config, isSupabaseConfigured } from "@/lib/config";

export function createBrowserSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(config.supabaseUrl, config.supabaseAnonKey);
}
