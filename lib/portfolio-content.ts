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
    accent: "#ff8a1f",
    secondaryAccent: "#ffe95f",
    shadowColor: "#8d2b08",
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
    accent: "#44ff66",
    secondaryAccent: "#d6ff4f",
    shadowColor: "#0b6a25",
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
    accent: "#3fb7ff",
    secondaryAccent: "#87fff4",
    shadowColor: "#083f91",
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
    accent: "#a972ff",
    secondaryAccent: "#ff8df0",
    shadowColor: "#4d1397",
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
    accent: "#ff3f78",
    secondaryAccent: "#ffcf4f",
    shadowColor: "#8e1539",
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
