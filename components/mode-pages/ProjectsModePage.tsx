import type { PortfolioSection } from "@/lib/portfolio-content";
import { ModePageIntro } from "@/components/mode-pages/ModePageIntro";

type ProjectsModePageProps = {
  section: PortfolioSection;
};

export function ProjectsModePage({ section }: ProjectsModePageProps) {
  return (
    <ModePageIntro
      section={section}
      body="A curated run of selected work, tuned for fast scanning first and deeper project detail second."
      detail="Use this route for featured builds, decision notes, live links, and proof that the work holds up."
      status="Project bay ready"
    />
  );
}
