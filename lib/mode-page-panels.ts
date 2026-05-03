import type { PortfolioSectionId } from "@/lib/portfolio-content";
import { contactTiles } from "@/lib/contact-data";
import { skillsData } from "@/lib/skills-data";

export type ModePagePanel = {
  title: string;
  kicker: string;
  description: string;
};

export const projectModePanels = [
  {
    title: "Featured Builds",
    kicker: "Proof",
    description:
      "Selected interfaces, apps, and experiments that show the work in motion.",
  },
  {
    title: "Decision Notes",
    kicker: "Thinking",
    description:
      "Short context for what each project solves and why the implementation choices fit.",
  },
  {
    title: "Live Handoff",
    kicker: "Links",
    description:
      "A clean place for demos, repositories, and details a reviewer can open fast.",
  },
] as const satisfies readonly ModePagePanel[];

export const skillModePanels = [
  {
    title: "Frontend Core",
    kicker: "Stack",
    description:
      "TypeScript, React, Next.js, responsive layout, and component architecture.",
  },
  {
    title: "Interaction",
    kicker: "Feel",
    description:
      "Motion, keyboard flow, accessible controls, and game-like feedback loops.",
  },
  {
    title: "Delivery",
    kicker: "Ship",
    description:
      "Practical habits around testing, cleanup, handoff, and maintainable UI work.",
  },
] as const satisfies readonly ModePagePanel[];

export function getModePagePanels(sectionId: PortfolioSectionId) {
  if (sectionId === "skills") {
    return skillModePanels;
  }

  return [];
}

export function getModePagePanelCount(sectionId: PortfolioSectionId) {
  if (sectionId === "skills") {
    return skillsData.length;
  }

  if (sectionId === "contact") {
    return contactTiles.length;
  }

  return getModePagePanels(sectionId).length;
}
