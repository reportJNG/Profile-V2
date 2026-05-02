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
  { icon: UserRound, label: "Role", value: "Full Stack Dev" },
  { icon: Globe2, label: "Web", value: "Modern Pages" },
  { icon: Terminal, label: "Systems", value: "Linux + Tools" },
  { icon: Server, label: "Backend", value: "APIs + DB" },
] as const satisfies readonly PlayerStat[];

const skillBars = [
  { icon: Layers3, name: "Next.js", level: "LV 90", progress: "90%" },
  { icon: Code2, name: "React", level: "LV 88", progress: "88%" },
  { icon: Palette, name: "Tailwind", level: "LV 86", progress: "86%" },
  { icon: Braces, name: "TypeScript", level: "LV 86", progress: "86%" },
  { icon: Server, name: "Node APIs", level: "LV 78", progress: "78%" },
  { icon: Database, name: "PostgreSQL", level: "LV 74", progress: "74%" },
] as const satisfies readonly SkillBar[];

const skillGroups = [
  {
    icon: Globe2,
    title: "Web Stack",
    items: ["JavaScript", "PHP", "Responsive UI", "Dashboards"],
  },
  {
    icon: Cpu,
    title: "Programming",
    items: ["Python", "C++", "Lua", "Pascal"],
  },
  {
    icon: Database,
    title: "Data Layer",
    items: ["MongoDB", "PostgreSQL", "Prisma", "Schema Design"],
  },
  {
    icon: Settings2,
    title: "Developer Ops",
    items: ["Git", "Linux", "Tool Config", "Deploy Flow"],
  },
  {
    icon: Network,
    title: "Systems",
    items: ["Networking", "CLI Tools", "Server Setup", "Debugging"],
  },
  {
    icon: Gauge,
    title: "Quality",
    items: ["Performance", "Clean Logic", "App Flow", "Polish"],
  },
] as const satisfies readonly SkillGroup[];

const profileImageUrl = "/images/me.png";

export function AboutArcadeProfile({ section }: AboutArcadeProfileProps) {
  return (
    <div className="about-sketch-layout about-profile-grid grid gap-4 lg:grid-cols-[minmax(0,1.62fr)_minmax(0rem,0.34fr)]">
      <div className="lg:mt-[calc(3rem)] xl:mt-[calc (4.5rem)]">
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
