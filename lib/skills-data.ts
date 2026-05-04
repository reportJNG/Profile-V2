import type { IconType } from "react-icons";

// Simple icons (brands / technologies)
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGodotengine,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLinux,
  SiLua,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVercel,
  SiWebgl,
  SiWireshark,
} from "react-icons/si";

// Font Awesome — terminal, server, network, windows, security
import {
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaTerminal,
  FaWindows,
} from "react-icons/fa";

// Tabler — clean modern icons for concepts without brand icons
import {
  TbApi,
  TbBrandBlender,
  TbCloudLock,
  TbColorPicker,
  TbLayout,
  TbPalette,
  TbSeo,
} from "react-icons/tb";

// Material Design — performance, accessibility, animation
import { MdAccessibility, MdAnimation, MdSpeed } from "react-icons/md";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "gamedev"
  | "design"
  | "devops"
  | "systems"
  | "tooling";

export type SkillItem = {
  id: string;
  title: string;
  icon: IconType;
  level: number; // 0–100  mastery level
  exp: number;   // 0–100  XP / experience depth
  color: string;
  glowColor: string;
  category: SkillCategory;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const skillsData = [

  // ══════════════════════════════════════════════════════════════════════
  // FRONTEND
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "javascript",
    title: "JavaScript",
    icon: SiJavascript,
    level: 92,
    exp: 88,
    color: "#f7df1e",
    glowColor: "rgba(247, 223, 30, 0.58)",
    category: "frontend",
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: SiTypescript,
    level: 90,
    exp: 86,
    color: "#3178c6",
    glowColor: "rgba(49, 120, 198, 0.62)",
    category: "frontend",
  },
  {
    id: "react",
    title: "React",
    icon: SiReact,
    level: 91,
    exp: 89,
    color: "#61dafb",
    glowColor: "rgba(97, 218, 251, 0.62)",
    category: "frontend",
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: SiNextdotjs,
    level: 88,
    exp: 84,
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.5)",
    category: "frontend",
  },
  {
    id: "html5",
    title: "HTML5",
    icon: SiHtml5,
    level: 96,
    exp: 94,
    color: "#e34f26",
    glowColor: "rgba(227, 79, 38, 0.62)",
    category: "frontend",
  },
  {
    id: "css3",
    title: "CSS3",
    icon: SiCss,
    level: 94,
    exp: 91,
    color: "#1572b6",
    glowColor: "rgba(21, 114, 182, 0.62)",
    category: "frontend",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    icon: SiTailwindcss,
    level: 90,
    exp: 87,
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.62)",
    category: "frontend",
  },
  {
    id: "ui-motion",
    title: "UI Motion",
    icon: SiFramer,
    level: 82,
    exp: 75,
    color: "#ff4f9a",
    glowColor: "rgba(255, 79, 154, 0.6)",
    category: "frontend",
  },
  {
    id: "webgl",
    title: "WebGL",
    icon: SiWebgl,
    level: 70,
    exp: 60,
    color: "#990000",
    glowColor: "rgba(153, 0, 0, 0.55)",
    category: "frontend",
  },
  {
    id: "responsive",
    title: "Responsive Design",
    icon: TbLayout,
    level: 95,
    exp: 92,
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.58)",
    category: "frontend",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    icon: MdAccessibility,
    level: 80,
    exp: 73,
    color: "#0ea5e9",
    glowColor: "rgba(14, 165, 233, 0.58)",
    category: "frontend",
  },
  {
    id: "web-performance",
    title: "Web Performance",
    icon: MdSpeed,
    level: 85,
    exp: 80,
    color: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.55)",
    category: "frontend",
  },
  {
    id: "animations",
    title: "CSS Animations",
    icon: MdAnimation,
    level: 88,
    exp: 84,
    color: "#c084fc",
    glowColor: "rgba(192, 132, 252, 0.58)",
    category: "frontend",
  },
  {
    id: "seo",
    title: "SEO",
    icon: TbSeo,
    level: 78,
    exp: 71,
    color: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.55)",
    category: "frontend",
  },

  // ══════════════════════════════════════════════════════════════════════
  // BACKEND
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "nodejs",
    title: "Node.js",
    icon: SiNodedotjs,
    level: 84,
    exp: 79,
    color: "#5fa04e",
    glowColor: "rgba(95, 160, 78, 0.58)",
    category: "backend",
  },
  {
    id: "express",
    title: "Express",
    icon: SiExpress,
    level: 83,
    exp: 76,
    color: "#f2f5f7",
    glowColor: "rgba(242, 245, 247, 0.44)",
    category: "backend",
  },
  {
    id: "graphql",
    title: "GraphQL",
    icon: SiGraphql,
    level: 78,
    exp: 70,
    color: "#e10098",
    glowColor: "rgba(225, 0, 152, 0.58)",
    category: "backend",
  },
  {
    id: "rest-apis",
    title: "REST APIs",
    icon: SiOpenapiinitiative,
    level: 87,
    exp: 82,
    color: "#6ba539",
    glowColor: "rgba(107, 165, 57, 0.58)",
    category: "backend",
  },
  {
    id: "websockets",
    title: "WebSockets",
    icon: SiSocketdotio,
    level: 80,
    exp: 73,
    color: "#888888",
    glowColor: "rgba(136, 136, 136, 0.5)",
    category: "backend",
  },
  {
    id: "jwt",
    title: "JWT / Auth",
    icon: SiJsonwebtokens,
    level: 84,
    exp: 78,
    color: "#d63aff",
    glowColor: "rgba(214, 58, 255, 0.55)",
    category: "backend",
  },
  {
    id: "nginx",
    title: "Nginx",
    icon: SiNginx,
    level: 74,
    exp: 65,
    color: "#009639",
    glowColor: "rgba(0, 150, 57, 0.55)",
    category: "backend",
  },
  {
    id: "api-design",
    title: "API Design",
    icon: TbApi,
    level: 86,
    exp: 81,
    color: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.55)",
    category: "backend",
  },
  {
    id: "server-infra",
    title: "Server Infra",
    icon: FaServer,
    level: 76,
    exp: 68,
    color: "#94a3b8",
    glowColor: "rgba(148, 163, 184, 0.5)",
    category: "backend",
  },
  {
    id: "cloud-security",
    title: "Cloud Security",
    icon: TbCloudLock,
    level: 72,
    exp: 63,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.55)",
    category: "backend",
  },

  // ══════════════════════════════════════════════════════════════════════
  // DATABASE
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "postgresql",
    title: "PostgreSQL",
    icon: SiPostgresql,
    level: 80,
    exp: 73,
    color: "#4169e1",
    glowColor: "rgba(65, 105, 225, 0.62)",
    category: "database",
  },
  {
    id: "mongodb",
    title: "MongoDB",
    icon: SiMongodb,
    level: 78,
    exp: 70,
    color: "#47a248",
    glowColor: "rgba(71, 162, 72, 0.58)",
    category: "database",
  },
  {
    id: "prisma",
    title: "Prisma ORM",
    icon: SiPrisma,
    level: 76,
    exp: 67,
    color: "#2d3748",
    glowColor: "rgba(96, 131, 166, 0.5)",
    category: "database",
  },
  {
    id: "redis",
    title: "Redis",
    icon: SiRedis,
    level: 73,
    exp: 64,
    color: "#dc382d",
    glowColor: "rgba(220, 56, 45, 0.58)",
    category: "database",
  },

  // ══════════════════════════════════════════════════════════════════════
  // SYSTEMS  — Linux, Windows, Networking, Terminal, Security
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "linux",
    title: "Linux",
    icon: SiLinux,
    level: 88,
    exp: 84,
    color: "#fcc624",
    glowColor: "rgba(252, 198, 36, 0.58)",
    category: "systems",
  },
  {
    id: "windows",
    title: "Windows",
    icon: FaWindows,
    level: 85,
    exp: 80,
    color: "#00adef",
    glowColor: "rgba(0, 173, 239, 0.58)",
    category: "systems",
  },
  {
    id: "terminal",
    title: "Terminal / CLI",
    icon: FaTerminal,
    level: 90,
    exp: 87,
    color: "#a3e635",
    glowColor: "rgba(163, 230, 53, 0.55)",
    category: "systems",
  },
  {
    id: "networking",
    title: "Networking",
    icon: FaNetworkWired,
    level: 78,
    exp: 71,
    color: "#60a5fa",
    glowColor: "rgba(96, 165, 250, 0.55)",
    category: "systems",
  },
  {
    id: "wireshark",
    title: "Wireshark",
    icon: SiWireshark,
    level: 68,
    exp: 58,
    color: "#1679a7",
    glowColor: "rgba(22, 121, 167, 0.55)",
    category: "systems",
  },
  {
    id: "security",
    title: "Security",
    icon: FaShieldAlt,
    level: 75,
    exp: 67,
    color: "#f43f5e",
    glowColor: "rgba(244, 63, 94, 0.55)",
    category: "systems",
  },

  // ══════════════════════════════════════════════════════════════════════
  // GAME DEV
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "lua",
    title: "Lua",
    icon: SiLua,
    level: 82,
    exp: 76,
    color: "#6e6eb4",
    glowColor: "rgba(110, 110, 180, 0.55)",
    category: "gamedev",
  },
  {
    id: "godot",
    title: "Godot",
    icon: SiGodotengine,
    level: 78,
    exp: 71,
    color: "#478cbf",
    glowColor: "rgba(71, 140, 191, 0.62)",
    category: "gamedev",
  },
  {
    id: "blender",
    title: "Blender",
    icon: TbBrandBlender,
    level: 65,
    exp: 55,
    color: "#ea7600",
    glowColor: "rgba(234, 118, 0, 0.55)",
    category: "gamedev",
  },

  // ══════════════════════════════════════════════════════════════════════
  // DESIGN
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "figma",
    title: "Figma",
    icon: SiFigma,
    level: 83,
    exp: 77,
    color: "#a259ff",
    glowColor: "rgba(162, 89, 255, 0.62)",
    category: "design",
  },
  {
    id: "ui-ux",
    title: "UI / UX",
    icon: TbPalette,
    level: 85,
    exp: 80,
    color: "#f472b6",
    glowColor: "rgba(244, 114, 182, 0.58)",
    category: "design",
  },
  {
    id: "color-theory",
    title: "Color Theory",
    icon: TbColorPicker,
    level: 80,
    exp: 74,
    color: "#fb7185",
    glowColor: "rgba(251, 113, 133, 0.55)",
    category: "design",
  },

  // ══════════════════════════════════════════════════════════════════════
  // DEVOPS
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "docker",
    title: "Docker",
    icon: SiDocker,
    level: 74,
    exp: 65,
    color: "#2496ed",
    glowColor: "rgba(36, 150, 237, 0.62)",
    category: "devops",
  },
  {
    id: "vercel",
    title: "Vercel",
    icon: SiVercel,
    level: 84,
    exp: 78,
    color: "#ffffff",
    glowColor: "rgba(255, 255, 255, 0.48)",
    category: "devops",
  },

  // ══════════════════════════════════════════════════════════════════════
  // TOOLING
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "git",
    title: "Git",
    icon: SiGit,
    level: 88,
    exp: 84,
    color: "#f05032",
    glowColor: "rgba(240, 80, 50, 0.62)",
    category: "tooling",
  },
  {
    id: "github",
    title: "GitHub",
    icon: SiGithub,
    level: 86,
    exp: 80,
    color: "#f5f5f5",
    glowColor: "rgba(245, 245, 245, 0.46)",
    category: "tooling",
  },
  {
    id: "playwright",
    title: "Playwright",
    icon: SiTestinglibrary,
    level: 72,
    exp: 63,
    color: "#2ead33",
    glowColor: "rgba(46, 173, 51, 0.58)",
    category: "tooling",
  },

] as const satisfies readonly SkillItem[];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export const SKILL_CATEGORIES: SkillCategory[] = [
  "frontend",
  "backend",
  "database",
  "gamedev",
  "design",
  "devops",
  "systems",
  "tooling",
];

/** Human-readable labels for each category */
export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend:  "Backend",
  database: "Database",
  gamedev:  "Game Dev",
  design:   "Design",
  devops:   "DevOps",
  systems:  "Systems",
  tooling:  "Tooling",
};

/** Pre-grouped map — ready to power a tabbed/filtered UI */
export const skillsByCategory = SKILL_CATEGORIES.reduce(
  (acc, cat) => {
    acc[cat] = skillsData.filter((s) => s.category === cat);
    return acc;
  },
  {} as Record<SkillCategory, readonly SkillItem[]>
);

/** Top N skills by level across all categories */
export const topSkills = (n = 5): readonly SkillItem[] =>
  [...skillsData].sort((a, b) => b.level - a.level).slice(0, n);

/** All skills for a given category */
export const skillsIn = (cat: SkillCategory): readonly SkillItem[] =>
  skillsData.filter((s) => s.category === cat);