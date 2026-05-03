"use client";

import ProjectInventory from "@/components/project-inventory/ProjectInventory";

type ProjectsModePageProps = {
  onBack: () => boolean;
};

export function ProjectsModePage({ onBack }: ProjectsModePageProps) {
  return <ProjectInventory onBack={onBack} />;
}
