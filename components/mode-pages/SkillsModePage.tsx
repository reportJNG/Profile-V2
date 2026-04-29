"use client";

import type { PortfolioSection } from "@/lib/portfolio-content";
import { skillModePanels } from "@/lib/mode-page-panels";
import { ModePageIntro } from "@/components/mode-pages/ModePageIntro";

type SkillsModePageProps = {
  activePanelIndex: number;
  onSelectPanel?: (index: number) => boolean;
  section: PortfolioSection;
};

export function SkillsModePage({
  activePanelIndex,
  onSelectPanel,
  section,
}: SkillsModePageProps) {
  return (
    <ModePageIntro
      section={section}
      activePanelIndex={activePanelIndex}
      body="A clear readout of the stack, strengths, and tools that shape the work behind each mode."
      detail="Use this route for grouped technologies, confidence levels, and practical habits."
      onSelectPanel={onSelectPanel}
      panels={skillModePanels}
      status="Stack scan ready"
    />
  );
}
