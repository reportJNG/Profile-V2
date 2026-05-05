// components/mode-pages/CertificatesDisplay.tsx

import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  category: string;
  type: string;
  icon: LucideIcon;
  skills: string[];
  level: string;
  link: string;
};

type CertificatesDisplayProps = {
  certificates: Certificate[];
};

export function CertificatesDisplay({ certificates }: CertificatesDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!certificates || certificates.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-16">
        No certificates to display yet.
      </div>
    );
  }

  const current = certificates[currentIndex];
  const total = certificates.length;

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const IconComponent = current.icon;

  return (
    <div className="w-full max-w-[320px] mx-auto px-4">
      {/* Title bar with navigation and page counter */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPrev}
          aria-label="Previous certificate"
          className="p-2 rounded-full hover:bg-muted/50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground/70" />
        </button>

        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Certificates</h2>
          <span className="text-sm tabular-nums text-muted-foreground">
            {currentIndex + 1} / {total}
          </span>
        </div>

        <button
          onClick={goToNext}
          aria-label="Next certificate"
          className="p-2 rounded-full hover:bg-muted/50 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-foreground/70" />
        </button>
      </div>

      {/* Square certificate card */}
      <div
        className="aspect-square w-full rounded-[2rem] relative overflow-hidden
                   border border-white/10 bg-gradient-to-br from-primary/10 to-primary/5
                   dark:from-white/5 dark:to-white/[0.02] shadow-2xl shadow-primary/5
                   group/card transition-all duration-500 hover:shadow-primary/10 hover:scale-[1.02]"
      >
        {/* Decorative radial glow behind icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-70" />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
          {/* Certificate icon in a styled circle */}
          <div className="w-24 h-24 rounded-full bg-white/10 dark:bg-black/20 flex items-center justify-center
                          shadow-lg shadow-primary/10 ring-1 ring-white/20 mb-6
                          transition-transform duration-300 group-hover/card:scale-105">
            <IconComponent className="w-12 h-12 text-primary animate-pulse-slow" />
          </div>

          {/* Certificate title */}
          <h3 className="text-lg font-bold leading-tight tracking-tight line-clamp-2">
            {current.title}
          </h3>

          {/* Description (using issuer + category as description) */}
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {current.issuer} • {current.category} • {current.level}
          </p>

          {/* Download button */}
          <a
            href={current.link}
            download
            className="mt-5 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full
                       bg-primary text-primary-foreground text-sm font-semibold
                       shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40
                       active:scale-95 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {Array.from({ length: Math.min(total, 5) }).map((_, index) => {
            const isCurrent = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to certificate ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? "bg-primary w-4 ring-2 ring-primary/20"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}