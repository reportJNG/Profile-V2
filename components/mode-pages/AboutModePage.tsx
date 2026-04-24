import type { PortfolioSection } from "@/lib/portfolio-content";
import { ModePageIntro } from "@/components/mode-pages/ModePageIntro";

type AboutModePageProps = {
  section: PortfolioSection;
};

export function AboutModePage({ section }: AboutModePageProps) {
  return (
    <ModePageIntro
      section={section}
      body="A focused profile space for the person behind the work: practical, human, and built to introduce the portfolio without slowing the player down."
      detail="Use this section for the finished bio, working style, and the strongest first impression."
      status="Profile shell ready"
    />
  );
}
