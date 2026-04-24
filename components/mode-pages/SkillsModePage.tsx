import type { PortfolioSection } from "@/lib/portfolio-content";
import { ModePageIntro } from "@/components/mode-pages/ModePageIntro";

type SkillsModePageProps = {
  section: PortfolioSection;
};

export function SkillsModePage({ section }: SkillsModePageProps) {
  return (
    <ModePageIntro
      section={section}
      body="A clear readout of the stack, strengths, and tools that shape the work behind each mode."
      detail="Use this route for grouped technologies, confidence levels, and practical habits."
      status="Stack scan ready"
    />
  );
}
