"use client";

import type { PortfolioSection } from "@/lib/portfolio-content";
import { projectModePanels } from "@/lib/mode-page-panels";
import { ModePageIntro } from "@/components/mode-pages/ModePageIntro";

type ProjectsModePageProps = {
  activePanelIndex: number;
  onSelectPanel?: (index: number) => boolean;
  section: PortfolioSection;
};

export function ProjectsModePage({
  activePanelIndex,
  onSelectPanel,
  section,
}: ProjectsModePageProps) {
  return (
    <ModePageIntro
      section={section}
      activePanelIndex={activePanelIndex}
      body="A curated run of selected work, tuned for fast scanning first and deeper project detail second."
      detail="Use this route for featured builds, decision notes, live links, and proof that the work holds up."
      onSelectPanel={onSelectPanel}
      panels={projectModePanels}
      status="Project bay ready"
    />
  );
}
