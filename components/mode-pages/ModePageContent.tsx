"use client";

import { AboutModePage } from "@/components/mode-pages/AboutModePage";
import { CertificatesModePage } from "@/components/mode-pages/CertificatesModePage";
import { ContactModePage } from "@/components/mode-pages/ContactModePage";
import { ProjectsModePage } from "@/components/mode-pages/ProjectsModePage";
import { SkillsModePage } from "@/components/mode-pages/SkillsModePage";
import type { PortfolioSection } from "@/lib/portfolio-content";

type ModePageContentProps = {
  activePanelIndex?: number;
  panelDirection?: 1 | -1;
  onBack: () => boolean;
  section: PortfolioSection;
};

export function ModePageContent({
  activePanelIndex = 0,
  panelDirection = 1,
  onBack,
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
          panelDirection={panelDirection}
          section={section}
        />
      );
    case "certificates":
      return <CertificatesModePage section={section} />;
    case "contact":
      return (
        <ContactModePage
          activePanelIndex={activePanelIndex}
          panelDirection={panelDirection}
          section={section}
        />
      );
    default:
      return null;
  }
}
