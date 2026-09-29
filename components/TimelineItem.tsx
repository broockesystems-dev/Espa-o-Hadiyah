"use client";

import { motion } from "framer-motion";
import type { WeddingStage } from "@/data/weddingTimeline";
import { scrollToStage } from "./StageNavigation";
import { EASE } from "./Reveal";

interface TimelineItemProps {
  stage: WeddingStage;
  index: number;
  active: number;
  orientation: "horizontal" | "vertical";
}

export function TimelineItem({ stage, index, active, orientation }: TimelineItemProps) {
  const isActive = index === active;
  const isPast = active >= 0 && index < active;
  const isFinal = index === 8;
  const reached = isActive || isPast;

  const dot = (
    <span
      aria-hidden="true"
      className={`block rounded-full transition-all duration-700 ${
        isActive
          ? "size-[11px] bg-gold ring-[5px] ring-gold/15"
          : reached
            ? "size-[7px] bg-gold"
            : isFinal
              ? "size-[9px] border border-gold bg-cream"
              : "size-[7px] bg-green/35 group-hover:bg-green"
      }`}
    />
  );

  const label = `Ir para a etapa ${stage.number}: ${stage.period}`;
  const go = () => scrollToStage(stage.id);

  if (orientation === "horizontal") {
    return (
      <motion.li
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 + index * 0.08, ease: EASE }}
      >
        <button
          type="button"
          onClick={go}
          aria-label={label}
          aria-current={isActive ? "step" : undefined}
          className="group flex w-full flex-col items-center text-center"
        >
          <span
            className={`label-sm flex h-[44px] items-start tabular-nums transition-colors duration-500 ${
              reached ? "text-gold" : "text-muted group-hover:text-green"
            }`}
          >
            {stage.number}
          </span>
          <span className="flex h-[28px] items-center">{dot}</span>
          <span
            className={`display mt-5 max-w-[9ch] text-[21px] leading-tight transition-colors duration-500 xl:text-[23px] ${
              isFinal ? "italic text-gold" : reached ? "text-green" : "text-ink/70 group-hover:text-green"
            }`}
          >
            {stage.shortPeriod}
          </span>
        </button>
      </motion.li>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <button
        type="button"
        onClick={go}
        aria-label={label}
        aria-current={isActive ? "step" : undefined}
        className="group relative grid w-full grid-cols-[12px_1fr] gap-x-6 py-5 text-left"
      >
        <span className="flex h-[26px] items-center justify-center">{dot}</span>
        <span>
          <span className={`label-sm block tabular-nums ${reached ? "text-gold" : "text-muted"}`}>{stage.number}</span>
          <span className={`display mt-1 block text-[26px] leading-tight ${isFinal ? "italic text-gold" : "text-green"}`}>
            {stage.period}
          </span>
          {stage.title && <span className="body-copy mt-1 block text-[13px]">{stage.title}</span>}
        </span>
      </button>
    </motion.li>
  );
}
