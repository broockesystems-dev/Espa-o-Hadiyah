"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { WeddingStage } from "@/data/weddingTimeline";
import { ImageReveal } from "./ImageReveal";
import ProductionTimeline from "./ProductionTimeline";
import { EditorialTitle } from "./EditorialTitle";
import { NumberReveal, Reveal, RevealItem } from "./Reveal";

/** Etapa 09 — o clímax: blush dissolve em verde profundo. */
export default function GrandDay({ stage }: { stage: WeddingStage }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const background = useTransform(scrollYProgress, [0, 1], ["#F3E1DF", "#104840"]);

  return (
    <motion.section
      ref={ref}
      id={stage.id}
      tabIndex={-1}
      aria-labelledby={`${stage.id}-title`}
      data-header-theme="dark"
      style={{ backgroundColor: reduce ? "#104840" : background }}
      className="relative overflow-x-clip pb-28 pt-28 text-cream outline-none md:pb-36 lg:pb-48 lg:pt-44"
    >
      <div className="grid-editorial">
        {/* Opening — number, moment, title */}
        <div className="col-span-full flex items-end justify-between gap-6 border-b border-cream/15 pb-10 lg:col-span-12">
          <Reveal className="flex items-center gap-4">
            <span className="label text-gold tabular-nums">Etapa {stage.number}</span>
            <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
            <span className="label text-cream/70">{stage.period}</span>
          </Reveal>
          <NumberReveal className="display -mb-4 text-[96px] leading-[0.8] text-gold lg:-mb-6 lg:text-[180px]">
            {stage.number}
          </NumberReveal>
        </div>

        <Reveal className="col-span-full mt-16 lg:col-span-10 lg:col-start-2 lg:mt-24">
          <h2
            id={`${stage.id}-title`}
            className="display text-[64px] leading-[0.88] sm:text-[88px] lg:text-[clamp(110px,11vw,190px)]"
          >
            {stage.title && <EditorialTitle text={stage.title} emphasis={stage.emphasis} />}
          </h2>
        </Reveal>
        {stage.subtitle && (
          <Reveal delay={0.15} className="col-span-full mt-8 lg:col-span-6 lg:col-start-5 lg:mt-10">
            <p className="display text-[26px] italic leading-snug text-blush lg:text-[34px]">{stage.subtitle}</p>
          </Reveal>
        )}

        {/* Photograph + voice of Malu */}
        {stage.image && (
          <div className="relative col-span-full mt-20 md:col-span-4 md:col-start-2 lg:col-span-4 lg:col-start-2 lg:mt-32">
            <ImageReveal
              {...stage.image}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 60vw, 100vw"
              className="mask-arch aspect-[3/4.2] w-full"
            />
            <span
              aria-hidden="true"
              className="mask-arch pointer-events-none absolute -bottom-5 -right-5 h-full w-full border border-gold/60"
            />
          </div>
        )}

        <ul className="col-span-full mt-16 lg:col-span-5 lg:col-start-7 lg:mt-48">
          {stage.items.map((item, i) => (
            <RevealItem
              key={item}
              delay={0.1 + i * 0.08}
              className="border-t border-cream/15 py-7 first:border-t-0 first:pt-0"
            >
              <p
                className={
                  i === 0
                    ? "display text-[26px] leading-snug text-cream lg:text-[32px]"
                    : "text-[14.5px] leading-[1.85] text-cream/75"
                }
              >
                {item}
              </p>
            </RevealItem>
          ))}
        </ul>

        {stage.production && (
          <div className="col-span-full mt-28 lg:col-span-10 lg:col-start-2 lg:mt-40">
            <ProductionTimeline tracks={stage.production} />
          </div>
        )}
      </div>
    </motion.section>
  );
}
