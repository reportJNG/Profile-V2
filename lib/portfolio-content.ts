export type PortfolioSectionId =
  | "about"
  | "projects"
  | "skills"
  | "certificates"
  | "contact";

export type PortfolioSceneTheme =
  | "story"
  | "adventure"
  | "collection"
  | "online"
  | "free";

export type PortfolioSectionData = {
  id: PortfolioSectionId;
  title: string;
  kicker: string;
  accent: string;
  secondaryAccent: string;
  scene: PortfolioSceneTheme;
  titleSize: string;
  background: {
    image: string;
    objectPosition: string;
    filter: string;
    imageOpacity: number;
  };
};

export const portfolioSections = [
  {
    id: "about",
    title: "About Me",
    kicker: "Who I Am",
    accent: "#74380f",
    secondaryAccent: "#746321",
    scene: "story",
    titleSize: "9.2rem",
    background: {
      image: "/images/mode-story.png",
      objectPosition: "50% 50%",
      filter: "saturate(0.6) contrast(0.8) brightness(1.2)",
      imageOpacity: 1,
    },
  },
  {
    id: "projects",
    title: "Projects",
    kicker: "Selected Work",
    accent: "#1d5f2c",
    secondaryAccent: "#5b6d25",
    scene: "adventure",
    titleSize: "8.5rem",
    background: {
      image: "/images/mode-adventure.png",
      objectPosition: "50% 50%",
      filter: "saturate(0.6) contrast(0.8) brightness(1.2)",
      imageOpacity: 1,
    },
  },
  {
    id: "skills",
    title: "Skills",
    kicker: "Tech Stack",
    accent: "#1d4c68",
    secondaryAccent: "#376b66",
    scene: "collection",
    titleSize: "8rem",
    background: {
      image: "/images/mode-collection.png",
      objectPosition: "50% 50%",
      filter: "saturate(0.6) contrast(0.8) brightness(1.2)",
      imageOpacity: 1,
    },
  },
  {
    id: "certificates",
    title: "Certificates",
    kicker: "Proof Of Growth",
    accent: "#49306f",
    secondaryAccent: "#6c3b65",
    scene: "online",
    titleSize: "7.7rem",
    background: {
      image: "/images/mode-online.png",
      objectPosition: "50% 50%",
      filter: "saturate(0.6) contrast(0.8) brightness(1.2)",
      imageOpacity: 1,
    },
  },
  {
    id: "contact",
    title: "Contact",
    kicker: "Settings & Reach Out",
    accent: "#711c34",
    secondaryAccent: "#715921",
    scene: "free",
    titleSize: "7.9rem",
    background: {
      image: "/images/mode-free.png",
      objectPosition: "50% 50%",
      filter: "saturate(0.6) contrast(0.8) brightness(1.2)",
      imageOpacity: 1,
    },
  },
] as const satisfies readonly PortfolioSectionData[];

export type PortfolioSection = PortfolioSectionData;
