import { createServiceSupabaseClient } from "@/lib/supabase/server";
import type { ClickEvent } from "@/lib/types";

function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs)),
  ]);
}

export async function recordClick(event: ClickEvent) {
  const supabase = createServiceSupabaseClient();
  if (!supabase) return;

  const operation = supabase.from("click_events").insert({
      product_id: event.productId,
      category_id: event.categoryId,
      source: event.source ?? "direct",
      utm_source: event.utmSource ?? null,
      utm_medium: event.utmMedium ?? null,
      utm_campaign: event.utmCampaign ?? null,
      referrer_host: event.referrerHost ?? null,
    });
  await withTimeout(Promise.resolve(operation), 350);
}
