"use client";

import type { PortfolioSection } from "@/lib/portfolio-content";
import { SkillCarousel } from "@/components/mode-pages/SkillCarousel";

type SkillsModePageProps = {
  activePanelIndex: number;
  panelDirection: 1 | -1;
  section: PortfolioSection;
};

export function SkillsModePage({
  activePanelIndex,
  panelDirection,
  section,
}: SkillsModePageProps) {
  return (
    <div className="skills-mode-page" style={{ color: section.secondaryAccent }}>
      <SkillCarousel
        activeSkillIndex={activePanelIndex}
        direction={panelDirection}
      />
    </div>
  );
}
