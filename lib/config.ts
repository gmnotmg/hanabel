const splitHosts = (value: string | undefined) =>
  (value ?? "shopee.co.id,shopee.com,s.shopee.co.id,shope.ee")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "",
  affiliateAllowedHosts: splitHosts(process.env.AFFILIATE_ALLOWED_HOSTS),
};

export const isSupabaseConfigured = Boolean(
  config.supabaseUrl && config.supabaseAnonKey,
);

export const isServiceRoleConfigured = Boolean(
  config.supabaseUrl && config.supabaseServiceRoleKey,
);
