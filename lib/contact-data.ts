import {
  Code2,
  Globe2,
  Link2,
  Mail,
  MapPin,
  Phone,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ContactTile = {
  id: string;
  label: string;
  value: string;
  group: string;
  href?: string;
  icon: LucideIcon;
  tone: string;
  glow: string;
};

export const contactTiles = [
  {
    id: "country",
    label: "Country",
    value: "Algeria",
    group: "Location",
    href: undefined,
    icon: MapPin,
    tone: "#ffcf4f",
    glow: "rgba(255, 207, 79, 0.34)",
  },
  {
    id: "email",
    label: "Email",
    value: "your.email@example.com",
    group: "Direct",
    href: "mailto:your.email@example.com",
    icon: Mail,
    tone: "#ff4f86",
    glow: "rgba(255, 79, 134, 0.38)",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/your-handle",
    group: "Code",
    href: "https://github.com/your-handle",
    icon: Code2,
    tone: "#7ee4ff",
    glow: "rgba(126, 228, 255, 0.32)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/your-handle",
    group: "Code",
    href: "https://linkedin.com/in/your-handle",
    icon: Link2,
    tone: "#8cc7ff",
    glow: "rgba(140, 199, 255, 0.34)",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "instagram.com/your-handle",
    group: "Social",
    href: "https://instagram.com/your-handle",
    icon: Share2,
    tone: "#ff9a6a",
    glow: "rgba(255, 154, 106, 0.36)",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+213 000 000 000",
    group: "Direct",
    href: "tel:+213000000000",
    icon: Phone,
    tone: "#b4ff8e",
    glow: "rgba(180, 255, 142, 0.3)",
  },
  {
    id: "old-portfolio",
    label: "Old portfolio",
    value: "old-portfolio.example.com",
    group: "Archive",
    href: "https://old-portfolio.example.com",
    icon: Globe2,
    tone: "#ffd36f",
    glow: "rgba(255, 211, 111, 0.34)",
  },
] as const satisfies readonly ContactTile[];

export function getContactTileHref(index: number) {
  const wrappedIndex =
    ((index % contactTiles.length) + contactTiles.length) % contactTiles.length;

  return contactTiles[wrappedIndex]?.href;
}
