"use client";

import { AboutModePage } from "@/components/mode-pages/AboutModePage";
import { CertificatesModePage } from "@/components/mode-pages/CertificatesModePage";
import { ContactModePage } from "@/components/mode-pages/ContactModePage";
import { ProjectsModePage } from "@/components/mode-pages/ProjectsModePage";
import { SkillsModePage } from "@/components/mode-pages/SkillsModePage";
import type { PortfolioSection } from "@/lib/portfolio-content";

type ModePageContentProps = {
  activePanelIndex?: number;
  onBack: () => boolean;
  onSelectPanel?: (index: number) => boolean;
  section: PortfolioSection;
};

export function ModePageContent({
  activePanelIndex = 0,
  onBack,
  onSelectPanel,
  section,
}: ModePageContentProps) {
  switch (section.id) {
    case "about":
      return <AboutModePage section={section} />;
    case "projects":
      return <ProjectsModePage onBack={onBack} />;
    case "skills":
      return (
        <SkillsModePage
          activePanelIndex={activePanelIndex}
          onSelectPanel={onSelectPanel}
          section={section}
        />
      );
    case "certificates":
      return <CertificatesModePage section={section} />;
    case "contact":
      return <ContactModePage section={section} />;
    default:
      return null;
  }
}
