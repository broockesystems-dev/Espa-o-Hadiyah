"use client";

import { motion } from "framer-motion";
import type { ProductionTrack } from "@/data/weddingTimeline";
import { EASE } from "./Reveal";

const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

function formatHours(hours: number) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

/**
 * Production on the day, drawn to scale: the bride's six hours and
 * the companion's two and a half share the same hour ruler.
 */
export default function ProductionTimeline({ tracks }: { tracks: ProductionTrack[] }) {
  const scale = Math.max(...tracks.map((t) => t.hours));
  const ticks = Array.from({ length: Math.floor(scale) + 1 }, (_, i) => i);

  return (
    <div>
      {/* Hour ruler */}
      <div aria-hidden="true" className="relative ml-[28%] hidden h-6 lg:block">
        {ticks.map((t) => (
          <span
            key={t}
            className="label-sm absolute top-0 normal-case tracking-[0.12em] -translate-x-1/2 text-cream/40 tabular-nums first:translate-x-0 last:-translate-x-full"
            style={{ left: `${(t / scale) * 100}%` }}
          >
            {t}h
          </span>
        ))}
      </div>

      <ol className="border-t border-cream/15">
        {tracks.map((track, ti) => {
          const width = (track.hours / scale) * 100;
          const base = ti * 0.5;
          return (
            <li key={track.role} className="grid gap-6 border-b border-cream/15 py-10 lg:grid-cols-[28%_1fr] lg:gap-0 lg:py-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 1, delay: base, ease: EASE }}
                className="lg:pr-10"
              >
                <p className="label text-gold">{track.role}</p>
                <p className="display mt-3 text-[30px] leading-tight lg:text-[36px]">{track.durationLabel}</p>
                {track.note && <p className="display mt-1 text-[20px] italic text-blush/80">{track.note}</p>}
              </motion.div>

              <div className="relative self-center">
                {/* empty track */}
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-cream/15" />
                <div style={{ width: `${width}%` }} className="relative">
                  {/* the bar grows */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gold"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.8, delay: base + 0.2, ease: EASE }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-[2px] h-20 origin-left bg-cream/[0.06] lg:h-24"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.8, delay: base + 0.3, ease: EASE }}
                  />

                  {track.blocks ? (
                    <ol className="relative flex h-20 lg:h-24" aria-label={`Etapas da produção: ${track.role}`}>
                      {track.blocks.map((block, bi) => (
                        <motion.li
                          key={block.label}
                          style={{ width: `${(block.hours / track.hours) * 100}%` }}
                          className="flex flex-col justify-between border-l border-cream/25 px-3 py-3 first:border-l-0 md:px-5 md:py-4"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={VIEWPORT}
                          transition={{ duration: 0.9, delay: base + 0.9 + bi * 0.25, ease: EASE }}
                        >
                          <span className="label-sm text-cream/60">{block.label}</span>
                          <span className="display text-[26px] leading-none text-cream lg:text-[32px]">
                            {formatHours(block.hours)}
                          </span>
                        </motion.li>
                      ))}
                    </ol>
                  ) : (
                    <motion.div
                      className="relative flex h-20 items-end px-3 py-3 md:px-5 md:py-4 lg:h-24"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.9, delay: base + 1, ease: EASE }}
                    >
                      <span className="display text-[26px] leading-none text-cream lg:text-[32px]">
                        {formatHours(track.hours)}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
