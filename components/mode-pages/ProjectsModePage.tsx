"use client";

import ProjectInventory from "@/components/project-inventory/ProjectInventory";

type ProjectsModePageProps = {
  onBack: () => boolean;
  onMusicToggle?: () => boolean;
};

export function ProjectsModePage({ onBack, onMusicToggle }: ProjectsModePageProps) {
  return <ProjectInventory onBack={onBack} onMusicToggle={onMusicToggle} />;
}