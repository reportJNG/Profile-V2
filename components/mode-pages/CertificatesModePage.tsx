import type { PortfolioSection } from "@/lib/portfolio-content";
import { ModePageIntro } from "@/components/mode-pages/ModePageIntro";

type CertificatesModePageProps = {
  section: PortfolioSection;
};

export function CertificatesModePage({ section }: CertificatesModePageProps) {
  return (
    <ModePageIntro
      section={section}
      body="A verified milestones screen for training, credentials, and proof of steady growth."
      detail="Use this route for issuer names, dates, evidence links, and short context for each credential."
      status="Credential log ready"
    />
  );
}
