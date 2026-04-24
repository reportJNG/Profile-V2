import { notFound } from "next/navigation";
import { ModePageShell } from "@/components/ModePageShell";
import {
  getPortfolioSection,
  portfolioSections,
} from "@/lib/portfolio-content";

type ModePageProps = {
  params: Promise<{
    mode: string;
  }>;
};

export function generateStaticParams() {
  return portfolioSections.map((section) => ({
    mode: section.id,
  }));
}

export async function generateMetadata({ params }: ModePageProps) {
  const { mode } = await params;
  const section = getPortfolioSection(mode);

  if (!section) {
    return {};
  }

  return {
    title: `${section.title} | Portfolio Mode`,
    description: section.kicker,
  };
}

export default async function ModePage({ params }: ModePageProps) {
  const { mode } = await params;
  const section = getPortfolioSection(mode);

  if (!section) {
    notFound();
  }

  return <ModePageShell section={section} />;
}
