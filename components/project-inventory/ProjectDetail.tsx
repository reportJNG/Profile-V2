"use client";

import {
  projectIconMap,
  type ProjectItem,
} from "@/components/project-inventory/projectsData";

type ProjectDetailProps = {
  isVisible: boolean;
  project?: ProjectItem;
};

const detailClass =
  "grid w-full max-w-none content-start gap-[0.72rem] p-4 opacity-0 transition-opacity duration-150 lg:max-w-[13.5rem] lg:p-1";
const iconWrapClass =
  "inline-flex size-[4.2rem] items-center justify-center border border-[color:color-mix(in_srgb,#d6a94b,transparent_42%)] bg-[linear-gradient(180deg,rgba(214,169,75,0.22),rgba(214,169,75,0.07)),rgba(0,0,0,0.24)] text-[color:color-mix(in_srgb,#d6a94b,white_14%)] shadow-[inset_0_0_18px_rgba(214,169,75,0.12)] lg:size-[2.55rem]";

export function ProjectDetail({ isVisible, project }: ProjectDetailProps) {
  const Icon = project ? projectIconMap[project.icon] : projectIconMap.Globe;

  return (
    <div className={`${detailClass} ${isVisible ? "opacity-100" : ""}`}>
      <div className={iconWrapClass} aria-hidden="true">
        <Icon className="size-10 lg:size-[1.42rem]" strokeWidth={1.55} />
      </div>
      <div>
        <p className="mb-2 font-mono text-[0.68rem] font-bold uppercase leading-none text-[rgba(220,210,184,0.58)]">
          Selected Relic
        </p>
        <h2 className="[font-family:var(--font-inventory-cinzel),serif] text-xl font-bold leading-[1.18] tracking-0 text-[rgba(255,248,228,0.94)] lg:text-[clamp(0.82rem,0.9vw,0.96rem)]">
          {project?.title ?? "Locked Slot"}
        </h2>
      </div>
      <p className="font-mono text-xs leading-[1.65] text-[rgba(220,210,184,0.58)] lg:text-[0.62rem] lg:leading-[1.5]">
        {project?.description ??
          "This inventory slot is locked. Add another project entry to projectsData.ts to reveal it here."}
      </p>
      {project ? (
        <span className="inline-flex justify-self-start border border-[color:color-mix(in_srgb,#d6a94b,transparent_46%)] px-2.5 py-2 font-mono text-[0.72rem] font-bold uppercase leading-none text-[color:color-mix(in_srgb,#d6a94b,white_18%)] animate-[inventory-pulse_2s_ease-in-out_infinite] lg:px-[0.42rem] lg:py-[0.35rem] lg:text-[0.56rem]">
          [ ENTER ] Open Project -&gt;
        </span>
      ) : null}
    </div>
  );
}
