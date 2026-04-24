import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { OverlayLayer } from "@/components/OverlayLayer";
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

  return (
    <main
      className={`mode-scene--${section.scene} relative min-h-dvh w-full overflow-hidden bg-[#071018] text-white`}
      style={{
        "--mode-accent": section.accent,
        "--mode-secondary": section.secondaryAccent,
      } as CSSProperties}
    >
      <BackgroundLayer direction={1} mode={section} />
      <OverlayLayer direction={1} mode={section} />

      <section className="relative z-10 flex min-h-dvh items-center px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/16 bg-black/24 px-4 py-2 font-mono text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/78 backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xs"
          >
            Back to modes
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="font-mono text-[0.68rem] font-black uppercase tracking-[0.28em] text-white/68 sm:text-xs">
              {section.kicker}
            </p>
            <h1 className="mt-4 text-[clamp(3.2rem,13vw,8rem)] font-extrabold uppercase leading-[0.86] tracking-0 text-white [font-family:var(--font-display),Georgia,serif] [text-shadow:0_0_28px_color-mix(in_srgb,var(--mode-accent),transparent_46%),0_5px_26px_rgba(0,0,0,0.68)]">
              {section.title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
              This mode is ready. Replace this screen with the finished{" "}
              {section.title.toLowerCase()} content whenever you want the route
              to become a full portfolio section.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
