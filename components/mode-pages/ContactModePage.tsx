import type { PortfolioSection } from "@/lib/portfolio-content";
import { ModePageIntro } from "@/components/mode-pages/ModePageIntro";

type ContactModePageProps = {
  section: PortfolioSection;
};

export function ContactModePage({ section }: ContactModePageProps) {
  return (
    <ModePageIntro
      section={section}
      body="A direct channel for next steps, collaboration, and quick handoff once the portfolio has made its case."
      detail="Use this route for email, social links, availability, and a concise call to action."
      status="Channel ready"
    />
  );
}
