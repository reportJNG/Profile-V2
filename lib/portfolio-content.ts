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
    accent: "#ff8a1f",
    secondaryAccent: "#ffe95f",
    scene: "story",
    titleSize: "9.2rem",
    background: {
      image: "/images/mode-story.png",
      objectPosition: "50% 50%",
      filter: "saturate(1.02) contrast(1.04) brightness(0.82)",
      imageOpacity: 0.72,
    },
  },
  {
    id: "projects",
    title: "Projects",
    kicker: "Selected Work",
    accent: "#44ff66",
    secondaryAccent: "#d6ff4f",
    scene: "adventure",
    titleSize: "8.5rem",
    background: {
      image: "/images/mode-adventure.png",
      objectPosition: "50% 50%",
      filter: "saturate(1.04) contrast(1.04) brightness(0.78)",
      imageOpacity: 0.7,
    },
  },
  {
    id: "skills",
    title: "Skills",
    kicker: "Tech Stack",
    accent: "#3fb7ff",
    secondaryAccent: "#87fff4",
    scene: "collection",
    titleSize: "8rem",
    background: {
      image: "/images/mode-collection.png",
      objectPosition: "50% 50%",
      filter: "saturate(0.96) contrast(1.06) brightness(0.75)",
      imageOpacity: 0.72,
    },
  },
  {
    id: "certificates",
    title: "Certificates",
    kicker: "Proof Of Growth",
    accent: "#a972ff",
    secondaryAccent: "#ff8df0",
    scene: "online",
    titleSize: "7.7rem",
    background: {
      image: "/images/mode-online.png",
      objectPosition: "50% 50%",
      filter: "saturate(1.04) contrast(1.05) brightness(0.74)",
      imageOpacity: 0.7,
    },
  },
  {
    id: "contact",
    title: "Contact",
    kicker: "Settings & Reach Out",
    accent: "#ff3f78",
    secondaryAccent: "#ffcf4f",
    scene: "free",
    titleSize: "7.9rem",
    background: {
      image: "/images/mode-free.png",
      objectPosition: "50% 50%",
      filter: "saturate(1.03) contrast(1.05) brightness(0.76)",
      imageOpacity: 0.72,
    },
  },
] as const satisfies readonly PortfolioSectionData[];

export type PortfolioSection = PortfolioSectionData;
