import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Gamepad2,
  Gauge,
  Globe,
  Terminal,
  UserRound,
} from "lucide-react";

export const projectIconMap = {
  BadgeCheck,
  Gamepad2,
  Gauge,
  Globe,
  Terminal,
  UserRound,
} satisfies Record<string, LucideIcon>;

export type ProjectIconName = keyof typeof projectIconMap;

export type ProjectItem = {
  id: number;
  icon: ProjectIconName;
  title: string;
  description: string;
  link: string;
};

export const projectsData = [
  {
    id: 1,
    icon: "Globe",
    title: "Portfolio Site",
    description:
      "Main portfolio hub with responsive pages, animated mode routing, and a polished dark interface built to present work clearly.",
    link: "#",
  },
  {
    id: 2,
    icon: "UserRound",
    title: "Arcade Profile",
    description:
      "Profile card system that turns personal info, skills, and status into a game-style character panel with clean visual hierarchy.",
    link: "#",
  },
  {
    id: 3,
    icon: "Gamepad2",
    title: "Mode Select Lobby",
    description:
      "Interactive lobby screen with keyboard movement, scene transitions, audio controls, and route handoff for each portfolio mode.",
    link: "#",
  },
  {
    id: 4,
    icon: "Gauge",
    title: "Skills Console",
    description:
      "Skill overview console for frontend, backend, data, workflow, and system strengths, organized for quick scanning.",
    link: "#",
  },
  {
    id: 5,
    icon: "BadgeCheck",
    title: "Certificate Vault",
    description:
      "Credential archive for certificates and learning milestones, designed like a compact vault for proof of progress.",
    link: "#",
  },
  {
    id: 6,
    icon: "Terminal",
    title: "Contact Terminal",
    description:
      "Contact screen with direct collaboration signals, simple next steps, and a terminal-style handoff for reaching out.",
    link: "#",
  },
] as const satisfies readonly ProjectItem[];
