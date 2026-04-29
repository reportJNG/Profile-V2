import type { PortfolioSection } from "@/lib/portfolio-content";
import { AboutArcadeProfile } from "@/components/about/AboutArcadeProfile";

type AboutModePageProps = {
  section: PortfolioSection;
};

export function AboutModePage({ section }: AboutModePageProps) {
  return <AboutArcadeProfile section={section} />;
}
