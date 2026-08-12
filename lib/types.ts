export type ContentStatus = "draft" | "published" | "archived";

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconKey: string;
  accentColor: string;
  sortOrder: number;
  status: ContentStatus;
  productCount?: number;
};

export type ProductImage = {
  id: string;
  productId: string;
  storagePath: string;
  variant: "thumbnail" | "card" | "detail" | "original";
  altText: string;
  sortOrder: number;
  url: string;
};

export type Product = {
  id: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  badge?: string;
  isFeatured: boolean;
  status: ContentStatus;
  affiliateUrl: string;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "tiktok" | "facebook" | "threads" | "link";
};

export type SiteSettings = {
  brandName: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  disclosure: string;
  socialLinks: SocialLink[];
};

export type ClickEvent = {
  productId: string;
  categoryId: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerHost?: string;
  createdAt?: string;
};

export type ClickSummary = {
  total: number;
  byProduct: Array<{ label: string; count: number }>;
  byCategory: Array<{ label: string; count: number }>;
  bySource: Array<{ label: string; count: number }>;
};
