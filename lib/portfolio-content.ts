export type GameMenuSection = {
  id:
    | "story"
    | "adventure"
    | "collection"
    | "online-battle"
    | "free-battle";
  title: string;
  kicker: string;
  accent: string;
  secondaryAccent: string;
  shadowColor: string;
  scene: "story" | "adventure" | "collection" | "online" | "free";
  titleSize: string;
  background: {
    image: string;
    objectPosition: string;
    filter: string;
  };
};

export const portfolioSections = [
  {
    id: "story",
    title: "Story",
    kicker: "Story Mode",
    accent: "#f59b2d",
    secondaryAccent: "#ffe55a",
    shadowColor: "#6b2f0f",
    scene: "story",
    titleSize: "9.2rem",
    background: {
      image: "/images/lobby-backdrop.png",
      objectPosition: "54% 44%",
      filter: "saturate(1.02) contrast(1.08) brightness(0.78) sepia(0.14)",
    },
  },
  {
    id: "adventure",
    title: "Adventure",
    kicker: "Adventure Mode",
    accent: "#57c230",
    secondaryAccent: "#cbff62",
    shadowColor: "#214d16",
    scene: "adventure",
    titleSize: "8.5rem",
    background: {
      image: "/images/lobby-backdrop.png",
      objectPosition: "47% 45%",
      filter: "saturate(1.06) contrast(1.05) brightness(0.84) hue-rotate(34deg)",
    },
  },
  {
    id: "collection",
    title: "Collection",
    kicker: "Collection Mode",
    accent: "#4fa8ff",
    secondaryAccent: "#b4f5ff",
    shadowColor: "#173f72",
    scene: "collection",
    titleSize: "8rem",
    background: {
      image: "/images/lobby-backdrop.png",
      objectPosition: "50% 50%",
      filter: "saturate(0.94) contrast(1.08) brightness(0.78) hue-rotate(160deg)",
    },
  },
  {
    id: "online-battle",
    title: "Online Battle",
    kicker: "Online Battle",
    accent: "#a16eff",
    secondaryAccent: "#f1c2ff",
    shadowColor: "#42206f",
    scene: "online",
    titleSize: "7.7rem",
    background: {
      image: "/images/lobby-backdrop.png",
      objectPosition: "60% 48%",
      filter: "saturate(1.04) contrast(1.06) brightness(0.76) hue-rotate(226deg)",
    },
  },
  {
    id: "free-battle",
    title: "Free Battle",
    kicker: "Free Battle",
    accent: "#ff719b",
    secondaryAccent: "#ffd36b",
    shadowColor: "#6a2135",
    scene: "free",
    titleSize: "7.9rem",
    background: {
      image: "/images/lobby-backdrop.png",
      objectPosition: "57% 50%",
      filter: "saturate(1.05) contrast(1.05) brightness(0.8) hue-rotate(-10deg)",
    },
  },
] as const satisfies readonly GameMenuSection[];

export type PortfolioSection = GameMenuSection;
export type PortfolioSectionId = PortfolioSection["id"];
