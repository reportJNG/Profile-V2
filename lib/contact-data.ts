import {
  Code2,
  Globe2,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContactGroup = "Location" | "Direct" | "Code" | "Social" | "Archive";

export type ContactTile = {
  id: string;
  label: string;
  value: string;
  group: ContactGroup;
  href?: string;
  icon: LucideIcon;
  tone: string;
  glow: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const contactTiles = [
  // ── Location ────────────────────────────────────────────────────────────────
  {
    id: "country",
    label: "Country",
    value: "Algeria",
    group: "Location" as ContactGroup,
    href: "https://maps.google.com/?q=Algeria",
    icon: MapPin,
    tone: "#ffcf4f",
    glow: "rgba(255, 207, 79, 0.34)",
  },

  // ── Direct ──────────────────────────────────────────────────────────────────
  {
    id: "phone",
    label: "Phone",
    value: "+213 774 273 861",
    group: "Direct" as ContactGroup,
    // Opens WhatsApp directly — more useful than a bare tel: link
    href: "https://wa.me/213774273861",
    icon: Phone,
    tone: "#b4ff8e",
    glow: "rgba(180, 255, 142, 0.3)",
  },
  {
    id: "email",
    label: "Email",
    value: "hamzaremali10@gmail.com",
    group: "Direct" as ContactGroup,
    // Fixed: href must match the actual email value
    href: "mailto:hamzaremali10@gmail.com",
    icon: Mail,
    tone: "#ff4f86",
    glow: "rgba(255, 79, 134, 0.38)",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "wa.me/213774273861",
    group: "Direct" as ContactGroup,
    href: "https://wa.me/213774273861",
    icon: MessageCircle,
    tone: "#4fffa0",
    glow: "rgba(79, 255, 160, 0.32)",
  },

  // ── Code ────────────────────────────────────────────────────────────────────
  {
    id: "github",
    label: "GitHub",
    // Fixed: real handle from the href
    value: "github.com/reportJNG",
    group: "Code" as ContactGroup,
    href: "https://github.com/reportJNG",
    icon: Code2,
    tone: "#7ee4ff",
    glow: "rgba(126, 228, 255, 0.32)",
  },

  // ── Social ──────────────────────────────────────────────────────────────────
  {
    id: "linkedin",
    label: "LinkedIn",
    // Fixed: real handle from the href + moved to Social (professional network)
    value: "linkedin.com/in/hamza-remali",
    group: "Social" as ContactGroup,
    href: "https://www.linkedin.com/in/hamza-remali-6b3782375/",
    icon: Link2,
    tone: "#8cc7ff",
    glow: "rgba(140, 199, 255, 0.34)",
  },
  {
    id: "instagram",
    label: "Instagram",
    // Fixed: real handle from the href
    value: "instagram.com/re_hamza_0",
    group: "Social" as ContactGroup,
    href: "https://www.instagram.com/re_hamza_0/",
    icon: Share2,
    tone: "#ff9a6a",
    glow: "rgba(255, 154, 106, 0.36)",
  },

  // ── Archive ─────────────────────────────────────────────────────────────────
  {
    id: "old-portfolio",
    label: "Old Portfolio",
    value: "remalihamza.vercel.app",
    group: "Archive" as ContactGroup,
    href: "https://remalihamza.vercel.app/",
    icon: Globe2,
    tone: "#ffd36f",
    glow: "rgba(255, 211, 111, 0.34)",
  },
] as const satisfies readonly ContactTile[];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export const CONTACT_GROUPS: ContactGroup[] = [
  "Location",
  "Direct",
  "Code",
  "Social",
  "Archive",
];

/** All tiles belonging to a specific group */
export const tilesByGroup = CONTACT_GROUPS.reduce(
  (acc, group) => {
    acc[group] = contactTiles.filter((t) => t.group === group);
    return acc;
  },
  {} as Record<ContactGroup, readonly ContactTile[]>
);

/** Safe href lookup by index — wraps around if index overflows */
export function getContactTileHref(index: number): string | undefined {
  const wrappedIndex =
    ((index % contactTiles.length) + contactTiles.length) % contactTiles.length;
  return contactTiles[wrappedIndex]?.href;
}

/** Find a single tile by id — returns undefined if not found */
export function getContactTileById(id: string): ContactTile | undefined {
  return contactTiles.find((t) => t.id === id);
}

/** All tiles that have a clickable href */
export const linkableTiles = contactTiles.filter((t) => !!t.href);