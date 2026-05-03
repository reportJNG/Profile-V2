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
  "grid w-full max-w-none content-start gap-4 p-4 opacity-0 transition-opacity duration-150 lg:h-full lg:p-2";
const iconWrapClass =
  "inline-flex size-[5rem] items-center justify-center border border-[color-mix(in_srgb,var(--mode-secondary),transparent_48%)] bg-[radial-gradient(circle_at_50%_26%,color-mix(in_srgb,var(--mode-secondary),transparent_58%),transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.018)),rgba(0,0,0,0.3)] text-[color-mix(in_srgb,var(--mode-secondary),white_18%)] shadow-[0_0_26px_color-mix(in_srgb,var(--mode-secondary),transparent_70%),inset_0_0_18px_color-mix(in_srgb,var(--mode-accent),transparent_78%)] lg:size-[5.6rem]";

export function ProjectDetail({ isVisible, project }: ProjectDetailProps) {
  const Icon = project ? projectIconMap[project.icon] : projectIconMap.Globe;

  return (
    <div className={`${detailClass} ${isVisible ? "opacity-100" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={iconWrapClass} aria-hidden="true">
          <Icon className="size-10 lg:size-12" strokeWidth={1.55} />
        </div>
        <span className="shrink-0 border border-white/10 bg-black/24 px-2 py-1.5 text-[0.58rem] font-black uppercase leading-none text-white/46">
          {project ? "Usable" : "Locked"}
        </span>
      </div>
      <div>
        <p className="mb-2 font-mono text-[0.68rem] font-black uppercase leading-none text-white/46">
          Selected Item
        </p>
        <h2 className="[font-family:var(--font-heading),var(--font-geist-sans),sans-serif] text-[clamp(1.6rem,2.5vw,2.25rem)] font-black uppercase leading-[0.96] tracking-0 text-[#f7ffe8] [text-shadow:0_2px_16px_rgba(0,0,0,0.58)]">
          {project?.title ?? "Locked Slot"}
        </h2>
      </div>
      <p className="max-w-[34rem] font-mono text-sm leading-[1.65] text-white/62 lg:text-[0.88rem]">
        {project?.description ??
          "This inventory slot is locked. Add another project entry to reveal it here."}
      </p>
      {project ? (
        <span className="mt-auto inline-flex justify-self-start border border-[color-mix(in_srgb,var(--mode-secondary),transparent_52%)] bg-[color-mix(in_srgb,var(--mode-accent),transparent_88%)] px-3 py-2.5 font-mono text-[0.72rem] font-black uppercase leading-none text-[color-mix(in_srgb,var(--mode-secondary),white_20%)] shadow-[0_0_18px_color-mix(in_srgb,var(--mode-secondary),transparent_76%)] animate-[inventory-pulse_2s_ease-in-out_infinite]">
          [ Enter ] Open Project
        </span>
      ) : (
        <span className="mt-auto inline-flex justify-self-start border border-white/10 bg-black/18 px-3 py-2.5 font-mono text-[0.72rem] font-black uppercase leading-none text-white/34">
          Slot unavailable
        </span>
      )}
    </div>
  );
}
