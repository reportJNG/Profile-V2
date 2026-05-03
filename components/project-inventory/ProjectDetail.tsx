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
  "grid w-full max-w-none content-center gap-5 p-4 opacity-0 transition-opacity duration-150 lg:h-full lg:p-2";
const iconWrapClass =
  "inline-flex size-[5.4rem] items-center justify-center border border-[color-mix(in_srgb,var(--mode-secondary),transparent_48%)] bg-[radial-gradient(circle_at_50%_26%,color-mix(in_srgb,var(--mode-secondary),transparent_58%),transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.018)),rgba(0,0,0,0.3)] text-[color-mix(in_srgb,var(--mode-secondary),white_18%)] shadow-[0_0_26px_color-mix(in_srgb,var(--mode-secondary),transparent_70%),inset_0_0_18px_color-mix(in_srgb,var(--mode-accent),transparent_78%)] lg:size-[6.2rem]";
const statBoxClass =
  "border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.052),rgba(255,255,255,0.016)),rgba(0,0,0,0.24)] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]";
const actionClass =
  "group relative mt-auto inline-flex min-h-11 items-center gap-2 overflow-hidden border border-[color-mix(in_srgb,var(--mode-secondary),transparent_42%)] bg-[linear-gradient(90deg,color-mix(in_srgb,var(--mode-accent),transparent_74%),color-mix(in_srgb,var(--mode-secondary),transparent_86%),rgba(0,0,0,0.28))] px-3.5 py-3 font-mono text-[0.72rem] font-black uppercase leading-none text-[color-mix(in_srgb,var(--mode-secondary),white_30%)] shadow-[0_0_20px_color-mix(in_srgb,var(--mode-secondary),transparent_70%),inset_0_1px_0_rgba(255,255,255,0.08)]";

export function ProjectDetail({ isVisible, project }: ProjectDetailProps) {
  const Icon = project ? projectIconMap[project.icon] : projectIconMap.Globe;
  const exp = project ? Math.min(48 + project.id * 7, 95) : 0;
  const expProgress = `${exp}%`;

  return (
    <div className={`${detailClass} ${isVisible ? "opacity-100" : ""}`}>
      <div>
        <div className={iconWrapClass} aria-hidden="true">
          <Icon className="size-11 lg:size-14" strokeWidth={1.55} />
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[0.68rem] font-black uppercase leading-none text-white/46">
          Selected Item
        </p>
        <h2 className="[font-family:var(--font-heading),var(--font-geist-sans),sans-serif] text-[clamp(1.75rem,2.7vw,2.55rem)] font-black uppercase leading-[0.96] tracking-0 text-[#f7ffe8] [text-shadow:0_2px_16px_rgba(0,0,0,0.58)]">
          {project?.title ?? "Locked Slot"}
        </h2>
      </div>

      <p className="max-w-[36rem] font-mono text-[0.95rem] leading-[1.72] text-white/66 lg:text-[0.95rem]">
        {project?.description ??
          "This slot is waiting for the next project entry. Once added, its description and stats will appear here."}
      </p>

      <div className={statBoxClass}>
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="font-mono text-[0.58rem] font-black uppercase leading-none text-white/42">
            EXP
          </p>
          <span className="font-mono text-[0.58rem] font-black uppercase leading-none text-white/34">
            1-100
          </span>
        </div>
        <div className="mb-2 flex items-end gap-1.5">
          <span className="font-mono text-2xl font-black leading-none text-[color-mix(in_srgb,var(--mode-secondary),white_24%)]">
            {project ? exp : "--"}
          </span>
          <span className="pb-0.5 font-mono text-[0.6rem] font-black uppercase leading-none text-white/38">
            exp
          </span>
        </div>
        <div className="h-3 border border-white/10 bg-black/40 p-[2px] shadow-[inset_0_1px_6px_rgba(0,0,0,0.55)]">
          <span
            aria-hidden="true"
            className="block h-full bg-[linear-gradient(90deg,color-mix(in_srgb,var(--mode-accent),white_6%),color-mix(in_srgb,var(--mode-secondary),white_26%)),repeating-linear-gradient(90deg,rgba(255,255,255,0.22)_0_4px,transparent_4px_9px)] shadow-[0_0_14px_color-mix(in_srgb,var(--mode-secondary),transparent_58%)]"
            style={{ width: expProgress }}
          />
        </div>
      </div>

      {project ? (
        <span className={actionClass}>
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-[-35%] w-1/3 skew-x-[-18deg] bg-[color-mix(in_srgb,var(--mode-secondary),white_32%)] opacity-0 blur-[2px] animate-[inventory-action-sheen_3.2s_ease-in-out_infinite]"
          />
          <span
            aria-hidden="true"
            className="relative grid min-w-10 place-items-center border border-[color-mix(in_srgb,var(--mode-secondary),transparent_48%)] bg-[color-mix(in_srgb,var(--mode-accent),transparent_72%)] px-1.5 py-1 text-[0.56rem] text-[color-mix(in_srgb,var(--mode-secondary),white_28%)] shadow-[0_0_12px_color-mix(in_srgb,var(--mode-secondary),transparent_58%)]"
          >
            ENTER
          </span>
          <span className="relative">Press Enter To Open</span>
          <span
            aria-hidden="true"
            className="relative h-px w-8 bg-[color-mix(in_srgb,var(--mode-secondary),transparent_30%)] animate-[inventory-action-line_2.4s_ease-in-out_infinite]"
          />
        </span>
      ) : (
        <div className={statBoxClass}>
          <span className="font-mono text-[0.72rem] font-black uppercase leading-none text-white/34">
            Slot unavailable
          </span>
        </div>
      )}
    </div>
  );
}
