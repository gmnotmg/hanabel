import { AtSign, ExternalLink, Facebook, Instagram, Link2, Music2 } from "lucide-react";
import type { SocialLink } from "@/lib/types";

export function SocialIcon({ icon, size = 18 }: { icon: SocialLink["icon"]; size?: number }) {
  if (icon === "instagram") return <Instagram aria-hidden="true" size={size} />;
  if (icon === "tiktok") return <Music2 aria-hidden="true" size={size} />;
  if (icon === "facebook") return <Facebook aria-hidden="true" size={size} />;
  if (icon === "threads") return <AtSign aria-hidden="true" size={size} />;
  if (icon === "link") return <Link2 aria-hidden="true" size={size} />;
  return <ExternalLink aria-hidden="true" size={size} />;
}
