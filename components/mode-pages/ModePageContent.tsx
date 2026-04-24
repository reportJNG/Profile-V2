import { AboutModePage } from "@/components/mode-pages/AboutModePage";
import { CertificatesModePage } from "@/components/mode-pages/CertificatesModePage";
import { ContactModePage } from "@/components/mode-pages/ContactModePage";
import { ProjectsModePage } from "@/components/mode-pages/ProjectsModePage";
import { SkillsModePage } from "@/components/mode-pages/SkillsModePage";
import type { PortfolioSection } from "@/lib/portfolio-content";

type ModePageContentProps = {
  section: PortfolioSection;
};

export function ModePageContent({ section }: ModePageContentProps) {
  switch (section.id) {
    case "about":
      return <AboutModePage section={section} />;
    case "projects":
      return <ProjectsModePage section={section} />;
    case "skills":
      return <SkillsModePage section={section} />;
    case "certificates":
      return <CertificatesModePage section={section} />;
    case "contact":
      return <ContactModePage section={section} />;
    default:
      return null;
  }
}
