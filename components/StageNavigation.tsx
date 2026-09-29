"use client";

import { motion } from "framer-motion";
import { weddingTimeline, TOTAL_STAGES } from "@/data/weddingTimeline";

export function scrollToStage(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Move focus for keyboard and screen-reader users without a second jump.
  el.focus({ preventScroll: true });
}

interface StageNavigationProps {
  active: number;
  tone: "light" | "dark";
}

/** Desktop: 01 ─ 02 ─ … ─ 09, each number jumps to its stage. */
export function StageNavigation({ active, tone }: StageNavigationProps) {
  const base = tone === "dark" ? "text-cream/55 hover:text-cream" : "text-ink/45 hover:text-ink";
  const rule = tone === "dark" ? "bg-cream/25" : "bg-ink/20";

  return (
    <nav aria-label="Etapas do cronograma" className="hidden lg:block">
      <ol className="flex items-center">
        {weddingTimeline.map((stage, i) => {
          const isActive = i === active;
          return (
            <li key={stage.id} className="flex items-center">
              {i > 0 && <span aria-hidden="true" className={`mx-1.5 h-px w-3 xl:w-4 ${rule}`} />}
              <a
                href={`#${stage.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToStage(stage.id);
                }}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Etapa ${stage.number} — ${stage.period}`}
                className={`label-sm relative px-0.5 py-2 tabular-nums transition-colors duration-500 ${
                  isActive ? "text-gold" : base
                }`}
              >
                {stage.number}
                {isActive && (
                  <motion.span
                    layoutId="stage-nav-dot"
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-1/2 size-[3px] -translate-x-1/2 rounded-full bg-gold"
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Mobile: “Etapa 03 / 09” plus a hairline progress bar. */
export function StageProgressMobile({ active, tone }: StageNavigationProps) {
  const current = active < 0 ? 0 : active + 1;
  const track = tone === "dark" ? "bg-cream/15" : "bg-ink/10";
  return (
    <>
      <p
        className={`label-sm whitespace-nowrap tabular-nums lg:hidden ${tone === "dark" ? "text-cream/80" : "text-ink/70"}`}
        aria-live="polite"
      >
        {active < 0 ? (
          "Guia da Noiva"
        ) : (
          <>
            Etapa <span className="text-gold">{weddingTimeline[active].number}</span> / {String(TOTAL_STAGES).padStart(2, "0")}
          </>
        )}
      </p>
      <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-px lg:hidden ${track}`}>
        <motion.div
          className="h-full origin-left bg-gold"
          initial={false}
          animate={{ scaleX: current / TOTAL_STAGES }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </>
  );
}
