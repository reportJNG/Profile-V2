import type { PortfolioSection } from "@/lib/portfolio-content";

type ModePageIntroProps = {
  body: string;
  detail: string;
  section: PortfolioSection;
  status: string;
};

export function ModePageIntro({
  body,
  detail,
  section,
  status,
}: ModePageIntroProps) {
  return (
    <div className="relative isolate max-w-[min(46rem,100%)]">
      <span
        aria-hidden="true"
        className="absolute -inset-x-8 -inset-y-6 -z-10 opacity-46 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 22% 34%, color-mix(in srgb, var(--mode-accent), transparent 76%), transparent 58%)",
        }}
      />

      <div className="mb-5 inline-flex items-center gap-2 border border-white/10 bg-black/28 px-3 py-2 backdrop-blur-md">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: "color-mix(in srgb, var(--mode-secondary), white 14%)",
            boxShadow:
              "0 0 10px color-mix(in srgb, var(--mode-secondary), transparent 34%)",
          }}
        />
        <span className="font-mono text-[0.58rem] font-black uppercase leading-none tracking-0 text-white/66 sm:text-[0.66rem]">
          {section.kicker}
        </span>
      </div>

      <h1 className="max-w-[8.5ch] text-[clamp(3.35rem,12vw,7.5rem)] font-extrabold uppercase leading-[0.88] tracking-0 text-white [font-family:var(--font-display),Georgia,serif] [text-shadow:0_0_20px_color-mix(in_srgb,var(--mode-accent),transparent_58%),0_4px_24px_rgba(0,0,0,0.62)]">
        {section.title}
      </h1>

      <div className="mt-7 grid max-w-2xl gap-4 border-l border-white/14 pl-5">
        <p className="text-base leading-7 text-white/78 sm:text-lg">{body}</p>
        <p className="max-w-xl font-mono text-[0.66rem] font-bold uppercase leading-5 tracking-0 text-white/46 sm:text-xs">
          {detail}
        </p>
      </div>

      <div className="mt-7 inline-flex items-center gap-3 border border-white/10 bg-black/24 px-3 py-2 backdrop-blur-md">
        <span className="font-mono text-[0.56rem] font-black uppercase leading-none tracking-0 text-white/52 sm:text-[0.62rem]">
          Status
        </span>
        <span
          aria-hidden="true"
          className="h-4 w-px bg-white/12"
        />
        <span
          className="font-mono text-[0.56rem] font-black uppercase leading-none tracking-0 sm:text-[0.62rem]"
          style={{
            color: "color-mix(in srgb, var(--mode-secondary), white 16%)",
            textShadow:
              "0 0 10px color-mix(in srgb, var(--mode-secondary), transparent 48%)",
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
