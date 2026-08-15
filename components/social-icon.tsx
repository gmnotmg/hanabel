import { IconBrandFacebook, IconBrandInstagram, IconBrandThreads, IconBrandTiktok, IconLink, IconExternalLink } from "@tabler/icons-react";
import type { SocialLink } from "@/lib/types";

export function SocialIcon({ icon, size = 18, strokeWidth = 2 }: { icon: SocialLink["icon"]; size?: number, strokeWidth?: number }) {
  if (icon === "instagram") return <IconBrandInstagram aria-hidden="true" size={size} stroke={strokeWidth} />;
  if (icon === "tiktok") return <IconBrandTiktok aria-hidden="true" size={size} stroke={strokeWidth} />;
  if (icon === "facebook") return <IconBrandFacebook aria-hidden="true" size={size} stroke={strokeWidth} />;
  if (icon === "threads") return <IconBrandThreads aria-hidden="true" size={size} stroke={strokeWidth} />;
  if (icon === "link") return <IconLink aria-hidden="true" size={size} stroke={strokeWidth} />;
  return <IconExternalLink aria-hidden="true" size={size} stroke={strokeWidth} />;
}
