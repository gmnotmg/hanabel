import { config } from "./config";

export function isAllowedAffiliateUrl(value: string) {
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) return false;

    return config.affiliateAllowedHosts.some(
      (allowedHost) =>
        url.hostname === allowedHost || url.hostname.endsWith(`.${allowedHost}`),
    );
  } catch {
    return false;
  }
}

export function normalizeAffiliateUrl(value: string) {
  const trimmed = value.trim();
  if (!isAllowedAffiliateUrl(trimmed)) {
    throw new Error("URL affiliate harus berasal dari domain Shopee yang diizinkan.");
  }

  return new URL(trimmed).toString();
}
