import ProfileCard from "@/components/ProfileCard";
import type { PortfolioSection } from "@/lib/portfolio-content";
import {
  Braces,
  Code2,
  Gamepad2,
  Layers3,
  Sparkles,
  UserRound,
  Zap,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

type AboutArcadeProfileProps = {
  section: PortfolioSection;
};

type PlayerStat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

type SkillBar = {
  icon: LucideIcon;
  level: string;
  name: string;
  progress: string;
};

const playerStats = [
  { icon: UserRound, label: "Age", value: "24" },
  { icon: Code2, label: "Specialty", value: "Frontend" },
  { icon: Sparkles, label: "Focus", value: "Motion UI" },
  { icon: Layers3, label: "Full Stack", value: "Next + TS" },
] as const satisfies readonly PlayerStat[];

const skillBars = [
  { icon: Braces, name: "TypeScript", level: "LV 88", progress: "88%" },
  { icon: Zap, name: "JavaScript", level: "LV 84", progress: "84%" },
  { icon: Code2, name: "React", level: "LV 86", progress: "86%" },
  { icon: Layers3, name: "Next.js", level: "LV 82", progress: "82%" },
  { icon: Sparkles, name: "Tailwind CSS", level: "LV 78", progress: "78%" },
] as const satisfies readonly SkillBar[];

const profileImageUrl = "/images/me.png";

export function AboutArcadeProfile({ section }: AboutArcadeProfileProps) {
  return (
    <div className="about-sketch-layout about-profile-grid grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.68fr)]">
      <section className="about-quest-card relative min-w-0 overflow-hidden border border-white/12 bg-black/42 p-3 shadow-2xl backdrop-blur-md">
        <div className="relative z-10 flex h-full min-h-0 flex-col">
          <header className="about-id-header">
            <div className="about-id-icon" aria-hidden="true">
              <Gamepad2 size={18} strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.52rem] font-black uppercase leading-none tracking-0 text-white/48">
                Player Profile
              </p>
              <h1 className="mt-1.5 text-[clamp(1.35rem,3vw,2.1rem)] font-black uppercase leading-none tracking-0 text-white [font-family:var(--font-display),Georgia,serif] [text-shadow:0_0_18px_color-mix(in_srgb,var(--mode-accent),transparent_56%),0_3px_18px_rgba(0,0,0,0.62)]">
                {section.kicker}
              </h1>
            </div>
            <span className="about-id-badge">Online</span>
          </header>

          <div className="mt-2.5 grid gap-2 sm:grid-cols-4">
            {playerStats.map(({ icon: Icon, label, value }) => (
              <div className="about-stat-tile" key={label}>
                <span className="about-stat-icon" aria-hidden="true">
                  <Icon size={15} strokeWidth={2.5} />
                </span>
                <span className="mt-2 block font-mono text-[0.52rem] font-black uppercase leading-none tracking-0 text-white/44">
                  {label}
                </span>
                <span className="mt-1.5 block truncate text-[0.8rem] font-black uppercase text-white/88">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="about-skill-panel mt-2.5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="about-loadout-title">
                <Code2 size={14} strokeWidth={2.5} aria-hidden="true" />
                Language Loadout
              </span>
              <span className="about-xp-level">5 Skills</span>
            </div>

            <div className="grid gap-1.5 md:grid-cols-2">
              {skillBars.map(({ icon: Icon, level, name, progress }) => (
                <article className="about-skill-row" key={name}>
                  <div className="about-skill-row-head">
                    <span>
                      <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
                      {name}
                    </span>
                    <span>{level}</span>
                    <span>{progress}</span>
                  </div>
                  <div
                    aria-label={`${name} level ${progress}`}
                    aria-valuemax={100}
                    aria-valuemin={0}
                    aria-valuenow={Number.parseInt(progress, 10)}
                    className="about-xp-meter"
                    role="progressbar"
                    style={{ "--xp-progress": progress } as CSSProperties}
                  >
                    <span />
                    <i aria-hidden="true" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="about-profile-card-wrap">
        <ProfileCard
          className="about-profile-card"
          name=""
          title=""
          handle="Hamza"
          status="Online"
          contactText="Contact Me"
          avatarUrl={profileImageUrl}
          miniAvatarUrl={profileImageUrl}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={true}
          onContactClick={() => console.log("Contact clicked")}
          behindGlowColor="rgba(31, 118, 206, 0.95)"
          behindGlowSize="100%"
          behindGlowEnabled={true}
          innerGradient="linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08))"
        />
      </div>
    </div>
  );
}
