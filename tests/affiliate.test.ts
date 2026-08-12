import { describe, expect, it } from "vitest";
import { isAllowedAffiliateUrl, normalizeAffiliateUrl } from "../lib/affiliate";

describe("affiliate URL allowlist", () => {
  it("accepts Shopee URLs and subdomains", () => {
    expect(isAllowedAffiliateUrl("https://shopee.co.id/product/123")).toBe(true);
    expect(isAllowedAffiliateUrl("https://seller.shopee.co.id/product/123")).toBe(true);
  });

  it("rejects arbitrary redirect destinations", () => {
    expect(isAllowedAffiliateUrl("https://example.com/redirect")).toBe(false);
    expect(isAllowedAffiliateUrl("javascript:alert(1)")).toBe(false);
    expect(() => normalizeAffiliateUrl("https://example.com/redirect")).toThrow();
  });
});
