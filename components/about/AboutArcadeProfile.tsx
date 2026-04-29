import ProfileCard from "@/components/ProfileCard";
import type { PortfolioSection } from "@/lib/portfolio-content";

type AboutArcadeProfileProps = {
  section: PortfolioSection;
};

const playerStats = [
  ["LV", "24"],
  ["CLASS", "Frontend"],
  ["POWER", "Motion UI"],
  ["STACK", "Next + TS"],
] as const;

const profileImageUrl = "/images/me.png";

export function AboutArcadeProfile({ section }: AboutArcadeProfileProps) {
  return (


      <div className="about-sketch-layout about-profile-grid grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.8fr)]">
        <section className="about-quest-card relative min-w-0 overflow-hidden border border-white/12 bg-black/42 p-4 shadow-2xl backdrop-blur-md sm:p-5">
          <div className="relative z-10">
            <div className="about-pixel-label mb-5 inline-grid grid-flow-col items-center gap-2 px-3 py-2">
              <span aria-hidden="true" className="about-pixel-led" />
              <span className="font-mono text-[0.6rem] font-black uppercase leading-none tracking-0 text-white/68 sm:text-[0.68rem]">
                {section.kicker}
              </span>
            </div>

            <h1 className="max-w-[8.5ch] text-[clamp(2.7rem,8vw,5.45rem)] font-extrabold uppercase leading-[0.88] tracking-0 text-white [font-family:var(--font-display),Georgia,serif] [text-shadow:0_0_20px_color-mix(in_srgb,var(--mode-accent),transparent_58%),0_4px_24px_rgba(0,0,0,0.62)]">
              {section.title}
            </h1>

            <div className="about-dialog-box mt-5">
              <p className="text-sm font-semibold leading-6 text-white/82 sm:text-base">
                I build expressive web experiences that still behave like
                serious software: fast to scan, smooth to control, and calm
                when the details matter.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {playerStats.map(([label, value]) => (
                <div className="about-stat-tile" key={label}>
                  <span className="font-mono text-[0.55rem] font-black uppercase leading-none tracking-0 text-white/44">
                    {label}
                  </span>
                  <span className="mt-2 block truncate text-sm font-black uppercase text-white/88">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="about-status-bar mt-5">
              <span>Status</span>
              <span>Profile card loaded</span>
            </div>
          </div>
        </section>

        <section className="about-profile-card-stage relative grid min-w-0 place-items-center overflow-hidden border border-white/12 bg-black/28 p-4 shadow-2xl backdrop-blur-md sm:p-5">
          <ProfileCard
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
            behindGlowColor="rgba(125, 190, 255, 0.18)"
            behindGlowSize="42%"
            innerGradient="linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08))"
          />
        </section>
      </div>
   
  );
}
