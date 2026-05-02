import ProfileCard from "@/components/ProfileCard";
import {
  PlayerProfileCard,
  type PlayerStat,
  type SkillBar,
} from "@/components/about/PlayerProfileCard";
import type { PortfolioSection } from "@/lib/portfolio-content";
import {
  Braces,
  Code2,
  Cpu,
  Database,
  Gauge,
  Globe2,
  Layers3,
  Network,
  Palette,
  Server,
  Settings2,
  Terminal,
  UserRound,
} from "lucide-react";
import type { SkillGroup } from "@/components/about/PlayerProfileCard";

type AboutArcadeProfileProps = {
  section: PortfolioSection;
};

const playerStats = [
  { icon: UserRound, label: "Role", value: "Full Stack" },
  { icon: Globe2, label: "Web", value: "Next/React" },
  { icon: Terminal, label: "Systems", value: "Linux Ops" },
  { icon: Server, label: "Backend", value: "APIs/DB" },
] as const satisfies readonly PlayerStat[];

const skillBars = [
  { icon: Layers3, name: "Next.js", level: "LV 90", progress: "90%" },
  { icon: Code2, name: "React", level: "LV 88", progress: "88%" },
  { icon: Palette, name: "Tailwind", level: "LV 86", progress: "86%" },
  { icon: Braces, name: "TypeScript", level: "LV 86", progress: "86%" },
  { icon: Server, name: "API Logic", level: "LV 80", progress: "80%" },
  { icon: Database, name: "Data Models", level: "LV 76", progress: "76%" },
] as const satisfies readonly SkillBar[];

const skillGroups = [
  {
    icon: Globe2,
    title: "Modern Web",
    items: ["JavaScript", "PHP", "HTML/CSS", "Dashboards"],
  },
  {
    icon: Cpu,
    title: "Code Range",
    items: ["Python", "C++", "Lua", "Pascal", "TypeScript"],
  },
  {
    icon: Database,
    title: "Data Work",
    items: ["MongoDB", "PostgreSQL", "SQL", "Prisma"],
  },
  {
    icon: Settings2,
    title: "Dev Workflow",
    items: ["Git", "Linux", "Config", "NPM/CLI"],
  },
  {
    icon: Network,
    title: "Systems",
    items: ["Networking", "CLI Tools", "Server Setup", "Shell"],
  },
  {
    icon: Gauge,
    title: "Delivery",
    items: ["Performance", "Debugging", "Clean Logic", "Polish"],
  },
] as const satisfies readonly SkillGroup[];

const profileImageUrl = "/images/me.png";

export function AboutArcadeProfile({ section }: AboutArcadeProfileProps) {
  return (
    <div className="about-sketch-layout about-profile-grid grid gap-4 lg:grid-cols-[minmax(0,1.62fr)_minmax(0,0.34fr)] lg:pt-10 xl:pt-16">
      <div className="min-w-0">
        <PlayerProfileCard
          playerStats={playerStats}
          section={section}
          skillGroups={skillGroups}
          skillBars={skillBars}
        />
      </div>

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
          showUserInfo={false}
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
