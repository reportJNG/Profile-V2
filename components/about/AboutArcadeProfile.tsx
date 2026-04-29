import { AboutCharacterStage } from "@/components/about/AboutCharacterStage";
import type { PortfolioSection } from "@/lib/portfolio-content";

type AboutArcadeProfileProps = {
  section: PortfolioSection;
};

const profileStats = [
  ["Class", "Frontend Engineer"],
  ["Style", "Interactive UI"],
  ["Focus", "Next.js + TypeScript"],
] as const;

const signalItems = [
  "Builds polished, responsive interfaces with a game-like sense of feedback.",
  "Turns product ideas into usable flows, motion systems, and sturdy components.",
  "Keeps implementation practical: clear state, accessible controls, and clean handoff.",
] as const;

export function AboutArcadeProfile({ section }: AboutArcadeProfileProps) {
  return (
    <div className="about-profile-shell relative isolate mx-auto w-full max-w-6xl">
      <span
        aria-hidden="true"
        className="absolute -inset-x-8 -inset-y-6 -z-10 opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 28% 32%, color-mix(in srgb, var(--mode-accent), transparent 72%), transparent 58%)",
        }}
      />

      <div className="about-sketch-layout grid gap-4 lg:grid-cols-[minmax(18rem,0.92fr)_minmax(0,1.08fr)]">
        <section className="about-sketch-main relative overflow-hidden border border-white/12 bg-black/36 p-3 shadow-2xl backdrop-blur-md sm:p-4">
          <div className="about-photo-slot about-profile-fire relative h-[18rem] overflow-hidden border border-orange-200/16 bg-black/36 sm:h-[22rem] lg:h-full">
            <AboutCharacterStage />
          </div>
        </section>

        <section className="about-side-card relative grid min-w-0 content-center overflow-hidden border border-white/12 bg-black/34 p-4 shadow-2xl backdrop-blur-md sm:p-6">
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 border border-white/10 bg-black/28 px-3 py-2 backdrop-blur-md">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background:
                    "color-mix(in srgb, var(--mode-secondary), white 14%)",
                  boxShadow:
                    "0 0 10px color-mix(in srgb, var(--mode-secondary), transparent 34%)",
                }}
              />
              <span className="font-mono text-[0.58rem] font-black uppercase leading-none tracking-0 text-white/66 sm:text-[0.66rem]">
                {section.kicker}
              </span>
            </div>

            <h1 className="max-w-[8.5ch] text-[clamp(3.1rem,10vw,6.8rem)] font-extrabold uppercase leading-[0.88] tracking-0 text-white [font-family:var(--font-display),Georgia,serif] [text-shadow:0_0_20px_color-mix(in_srgb,var(--mode-accent),transparent_58%),0_4px_24px_rgba(0,0,0,0.62)]">
              {section.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
              I build expressive web experiences that still behave like serious
              software: fast to scan, smooth to control, and calm when the
              details matter.
            </p>

            <div className="about-info-console relative mt-6 overflow-hidden border border-white/10 bg-black/24 p-3 sm:p-4">
              <div className="about-info-strip">
                <div>
                  <p className="font-mono text-[0.58rem] font-black uppercase leading-none tracking-0 text-white/44 sm:text-[0.62rem]">
                    Player Data
                  </p>
                  <div className="mt-3 grid gap-2">
                    {profileStats.map(([label, value]) => (
                      <div className="about-info-partition" key={label}>
                        <span className="block font-mono text-[0.55rem] font-black uppercase leading-none tracking-0 text-white/42">
                          {label}
                        </span>
                        <span className="mt-1 block truncate text-sm font-bold text-white/82">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  {signalItems.map((item) => (
                    <div className="about-arcade-panel relative overflow-hidden bg-black/24 p-3" key={item}>
                      <p className="relative z-10 text-sm leading-6 text-white/72">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-3 border border-white/10 bg-black/24 px-3 py-2 backdrop-blur-md">
              <span className="font-mono text-[0.56rem] font-black uppercase leading-none tracking-0 text-white/52 sm:text-[0.62rem]">
                Status
              </span>
              <span aria-hidden="true" className="h-4 w-px bg-white/12" />
              <span
                className="font-mono text-[0.56rem] font-black uppercase leading-none tracking-0 sm:text-[0.62rem]"
                style={{
                  color:
                    "color-mix(in srgb, var(--mode-secondary), white 16%)",
                  textShadow:
                    "0 0 10px color-mix(in srgb, var(--mode-secondary), transparent 48%)",
                }}
              >
                Character profile ready
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
