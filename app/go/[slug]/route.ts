import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/catalog-repository";
import { isAllowedAffiliateUrl } from "@/lib/affiliate";
import { recordClick } from "@/lib/tracking";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !isAllowedAffiliateUrl(product.affiliateUrl)) {
    return NextResponse.json({ error: "Produk atau link affiliate tidak tersedia." }, { status: 404 });
  }

  const requestHeaders = await headers();
  const destination = new URL(product.affiliateUrl);
  const source = request.nextUrl.searchParams.get("source") ?? request.nextUrl.searchParams.get("utm_source") ?? "direct";

  await recordClick({
    productId: product.id,
    categoryId: product.categoryId,
    source,
    utmSource: request.nextUrl.searchParams.get("utm_source") ?? undefined,
    utmMedium: request.nextUrl.searchParams.get("utm_medium") ?? undefined,
    utmCampaign: request.nextUrl.searchParams.get("utm_campaign") ?? undefined,
    referrerHost: requestHeaders.get("referer") ? new URL(requestHeaders.get("referer") as string).hostname : undefined,
  });

  return NextResponse.redirect(destination, 302);
}
