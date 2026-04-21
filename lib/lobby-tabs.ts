export const lobbyTabs = [
  {
    id: "story",
    title: "Story Mode",
    label: "Final war chronicle",
    accent: "#f6b326",
    mood: "embers",
    background: "/images/lobby-backdrop.png",
  },
  {
    id: "adventure",
    title: "Adventure Mode",
    label: "Open field journey",
    accent: "#5ee0ff",
    mood: "wind",
    background: "/images/lobby-backdrop.png",
  },
  {
    id: "free-battle",
    title: "Free Battle",
    label: "Instant local clash",
    accent: "#ff4d4d",
    mood: "impact",
    background: "/images/lobby-backdrop.png",
  },
  {
    id: "online-battle",
    title: "Online Battle",
    label: "Network rivalry",
    accent: "#8b7cff",
    mood: "storm",
    background: "/images/lobby-backdrop.png",
  },
  {
    id: "collection",
    title: "Collection",
    label: "Archive gallery",
    accent: "#64f0a4",
    mood: "relic",
    background: "/images/lobby-backdrop.png",
  },
] as const;

export type LobbyTab = (typeof lobbyTabs)[number];
export type LobbyTabId = LobbyTab["id"];
