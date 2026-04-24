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
  loadingMessages: readonly string[];
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
    loadingMessages: [
      "Opening a fresh note about the person behind the code",
      "Sketching the intro in careful human words",
      "Turning experience into a clean first impression",
      "Refining the story until it feels true",
      "About page ready",
    ],
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
    loadingMessages: [
      "Checking out the project branch",
      "Mapping features to real user problems",
      "Wiring demos, details, and decisions together",
      "Testing the work paths for a clean handoff",
      "Projects page ready",
    ],
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
    loadingMessages: [
      "Scanning the toolbelt",
      "Sorting languages, frameworks, and habits",
      "Compiling practical strengths into readable groups",
      "Polishing the stack so it is easy to scan",
      "Skills page ready",
    ],
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
    loadingMessages: [
      "Gathering verified milestones",
      "Reading the certificate metadata",
      "Linking proof, progress, and context",
      "Reviewing the credentials for a confident finish",
      "Certificates page ready",
    ],
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
    loadingMessages: [
      "Opening the contact channel",
      "Writing a clear path to start the conversation",
      "Checking links, signals, and next steps",
      "Preparing the final handshake",
      "Contact page ready",
    ],
    background: {
      image: "/images/mode-free.png",
      objectPosition: "50% 50%",
      filter: "saturate(0.6) contrast(0.8) brightness(1.2)",
      imageOpacity: 1,
    },
  },
] as const satisfies readonly PortfolioSectionData[];

export type PortfolioSection = PortfolioSectionData;
