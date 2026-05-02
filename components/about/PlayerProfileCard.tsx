import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Gamepad2,
  Globe2,
  Layers3,
  Terminal,
} from "lucide-react";
import type { PortfolioSection } from "@/lib/portfolio-content";

export type PlayerStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export type SkillBar = {
  icon: LucideIcon;
  level: string;
  name: string;
  progress: string;
};

export type SkillGroup = {
  icon: LucideIcon;
  items: readonly string[];
  title: string;
};

type PlayerProfileCardProps = {
  playerStats: readonly PlayerStat[];
  section: PortfolioSection;
  skillBars: readonly SkillBar[];
  skillGroups: readonly SkillGroup[];
};

const buildNotes = [
  { icon: Globe2, label: "Modern Web" },
  { icon: Code2, label: "APIs" },
  { icon: Database, label: "Databases" },
  { icon: Terminal, label: "Linux Tools" },
] as const;

export function PlayerProfileCard({
  playerStats,
  section,
  skillBars,
  skillGroups,
}: PlayerProfileCardProps) {
  const toolkitCount = skillGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <section className="relative min-w-0 overflow-hidden rounded-2xl p-px font-mono shadow-2xl shadow-black/35">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(135deg,color-mix(in_srgb,var(--mode-secondary),transparent_58%),transparent_34%,color-mix(in_srgb,var(--mode-accent),transparent_68%))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px rounded-[15px] bg-[radial-gradient(circle_at_14%_12%,color-mix(in_srgb,var(--mode-secondary),transparent_72%),transparent_34%),radial-gradient(circle_at_88%_90%,color-mix(in_srgb,var(--mode-accent),transparent_82%),transparent_30%)]"
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden rounded-[15px] border border-white/[0.1] bg-black/50 p-3.5 backdrop-blur-md sm:p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[15px] bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.026)_3px,rgba(255,255,255,0.026)_4px)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full bg-[color:color-mix(in_srgb,var(--mode-secondary),transparent_91%)]"
        />

        <header className="relative mb-2.5 flex items-center gap-2.5 border-b border-white/[0.09] pb-3">
          <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[9px] border border-[color:color-mix(in_srgb,var(--mode-secondary),transparent_54%)] bg-[color:color-mix(in_srgb,var(--mode-secondary),transparent_86%)] shadow-[0_0_18px_color-mix(in_srgb,var(--mode-secondary),transparent_68%)]">
            <div className="absolute inset-[-2px] rounded-[10px] border border-[color:color-mix(in_srgb,var(--mode-secondary),transparent_76%)] animate-[about-profile-pulse-border_2.4s_ease-in-out_infinite]" />
            <Gamepad2
              aria-hidden="true"
              className="text-[color:color-mix(in_srgb,var(--mode-secondary),white_20%)]"
              size={17}
              strokeWidth={2.35}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[8px] font-black uppercase leading-none tracking-widest text-white/62">
              Player Profile
            </p>
            <h1 className="text-[clamp(1.22rem,2.35vw,1.72rem)] font-black uppercase leading-none tracking-widest text-white [text-shadow:0_0_18px_color-mix(in_srgb,var(--mode-accent),transparent_48%),0_3px_18px_rgba(0,0,0,0.62)]">
              {section.kicker}
            </h1>
          </div>

          <span className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-[color:color-mix(in_srgb,var(--mode-secondary),transparent_60%)] bg-[color:color-mix(in_srgb,var(--mode-secondary),transparent_88%)] px-2.5 py-1.5 text-[8px] font-black uppercase leading-none tracking-widest text-[color:color-mix(in_srgb,var(--mode-secondary),white_28%)]">
            <span className="h-[5px] w-[5px] rounded-full bg-[color:color-mix(in_srgb,var(--mode-secondary),white_18%)] shadow-[0_0_10px_color-mix(in_srgb,var(--mode-secondary),transparent_24%)] animate-[about-profile-blink_1.6s_ease-in-out_infinite]" />
            Online
          </span>
        </header>

        <div className="relative grid gap-2.5 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-1.5 sm:grid-cols-4">
            {playerStats.map(({ icon: Icon, label, value }) => (
              <div
                className="group relative min-w-0 overflow-hidden rounded-[10px] border border-white/[0.1] bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.025))] p-2.5 shadow-[inset_0_-2px_0_rgba(0,0,0,0.22)] transition-colors hover:border-[color:color-mix(in_srgb,var(--mode-secondary),transparent_52%)] hover:bg-[color:color-mix(in_srgb,var(--mode-accent),transparent_91%)]"
                key={label}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,color-mix(in_srgb,var(--mode-secondary),white_10%),transparent)] opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[7px] border border-white/16 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--mode-secondary),transparent_56%),color-mix(in_srgb,var(--mode-accent),transparent_68%))] text-white/95 shadow-[0_0_14px_color-mix(in_srgb,var(--mode-secondary),transparent_70%)]">
                    <Icon
                      aria-hidden="true"
                      size={14}
                      strokeWidth={2.45}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[8px] font-black uppercase leading-none tracking-widest text-white/62">
                      {label}
                    </span>
                    <span className="mt-1 block text-[8px] font-black uppercase leading-tight tracking-widest text-white/86">
                      {value}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-1.5 sm:grid-cols-4">
            {buildNotes.map(({ icon: Icon, label }) => {
              return (
                <span
                  className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-[8px] border border-white/[0.09] bg-white/[0.045] px-2.5 py-2.5 text-[8px] font-black uppercase leading-none tracking-widest text-white/72"
                  key={label}
                >
                  <Icon
                    aria-hidden="true"
                    className="flex-shrink-0 text-[color:color-mix(in_srgb,var(--mode-secondary),white_16%)]"
                    size={12}
                    strokeWidth={2.45}
                  />
                  <span>{label}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 rounded-xl border border-white/[0.1] bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(0,0,0,0.16)),repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0_1px,transparent_1px_9px)] p-4 shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)] xl:grid-cols-[minmax(18rem,0.66fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[8px] font-black uppercase leading-none tracking-widest text-white/72">
                <Code2
                  aria-hidden="true"
                  className="text-[color:color-mix(in_srgb,var(--mode-secondary),white_18%)]"
                  size={14}
                  strokeWidth={2.5}
                />
                Core Stack
              </span>
              <span className="rounded-full border border-white/16 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--mode-secondary),transparent_56%),color-mix(in_srgb,var(--mode-accent),transparent_74%))] px-2.5 py-1.5 text-[8px] font-black uppercase leading-none tracking-widest text-white/86 shadow-[0_0_14px_color-mix(in_srgb,var(--mode-secondary),transparent_72%)]">
                {skillBars.length} Main
              </span>
            </div>

            <div className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-2">
              {skillBars.map(({ icon: Icon, level, name, progress }) => (
                <article
                  className="min-w-0 rounded-lg border border-white/[0.1] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--mode-accent),transparent_84%),rgba(255,255,255,0.035))] p-1.5 shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)] transition-colors hover:border-[color:color-mix(in_srgb,var(--mode-secondary),transparent_64%)]"
                  key={name}
                >
                  <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-1.5 text-[8px] font-black uppercase leading-none tracking-widest text-white/86">
                    <span className="inline-flex min-w-0 items-center gap-1.5 truncate">
                      <Icon
                        aria-hidden="true"
                        size={13}
                        strokeWidth={2.45}
                      />
                      {name}
                    </span>
                    <span className="rounded bg-[color:color-mix(in_srgb,var(--mode-secondary),transparent_86%)] px-1.5 py-1 text-[8px] text-[color:color-mix(in_srgb,var(--mode-secondary),white_24%)]">
                      {level}
                    </span>
                  </div>

                  <div
                    aria-label={`${name} level ${progress}`}
                    aria-valuemax={100}
                    aria-valuemin={0}
                    aria-valuenow={Number.parseInt(progress, 10)}
                    className="relative h-[0.42rem] overflow-hidden rounded-full border border-white/16 bg-black/55 p-[1px] shadow-[inset_0_1px_5px_rgba(0,0,0,0.58)]"
                    role="progressbar"
                    style={{ "--xp-progress": progress } as CSSProperties}
                  >
                    <span className="block h-full rounded-full bg-[linear-gradient(90deg,color-mix(in_srgb,var(--mode-accent),white_8%),color-mix(in_srgb,var(--mode-secondary),white_26%)),repeating-linear-gradient(90deg,rgba(255,255,255,0.32)_0_4px,transparent_4px_9px)] shadow-[0_0_14px_color-mix(in_srgb,var(--mode-secondary),transparent_52%)] animate-[about-profile-meter-in_1.1s_cubic-bezier(0.22,1,0.36,1)_both]" />
                    <i
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[1px] bg-[repeating-linear-gradient(90deg,transparent_0_calc(10%_-_1px),rgba(0,0,0,0.44)_calc(10%_-_1px)_10%)]"
                    />
                  </div>
                  <span className="mt-1 block text-right text-[8px] font-black uppercase leading-none tracking-widest text-white/62">
                    {progress}
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="min-w-0 border-t border-white/[0.08] pt-1.5 xl:border-l xl:border-t-0 xl:pl-2 xl:pt-0">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-[8px] font-black uppercase leading-none tracking-widest text-white/72">
                <Layers3
                  aria-hidden="true"
                  className="text-[color:color-mix(in_srgb,var(--mode-secondary),white_18%)]"
                  size={14}
                  strokeWidth={2.5}
                />
                Developer Toolkit
              </span>
              <span className="text-[8px] font-black uppercase leading-none tracking-widest text-white/62">
                {toolkitCount} Tools
              </span>
            </div>

            <div className="grid gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map(({ icon: Icon, items, title }) => (
                <article
                  className="min-w-0 rounded-lg border border-white/[0.09] bg-black/22 p-1.5"
                  key={title}
                >
                  <div className="mb-1.5 flex min-w-0 items-center gap-1.5 text-[8px] font-black uppercase leading-none tracking-widest text-white/72">
                    <Icon
                      aria-hidden="true"
                      className="flex-shrink-0 text-[color:color-mix(in_srgb,var(--mode-secondary),white_16%)]"
                      size={13}
                      strokeWidth={2.45}
                    />
                    <span className="truncate">{title}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {items.map((item) => (
                      <span
                        className="rounded-[6px] border border-white/[0.1] bg-white/[0.05] px-1.5 py-1 text-[8px] font-black uppercase leading-none tracking-wide text-white/72"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
