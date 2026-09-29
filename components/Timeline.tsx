"use client";

import { motion } from "framer-motion";
import { weddingTimeline, TOTAL_STAGES } from "@/data/weddingTimeline";
import { useActiveStage } from "@/lib/hooks";
import { TimelineItem } from "./TimelineItem";
import { EASE, Reveal } from "./Reveal";

export default function Timeline() {
  const active = useActiveStage();
  const progress = active < 0 ? 0 : active / (TOTAL_STAGES - 1);

  return (
    <section
      id="cronograma"
      data-header-theme="light"
      aria-labelledby="timeline-title"
      className="bg-cream py-24 md:py-32 lg:py-40"
    >
      <div className="grid-editorial">
        <Reveal className="col-span-full lg:col-span-5 lg:col-start-2">
          <p className="label mb-6 text-gold">O cronograma</p>
          <h2 id="timeline-title" className="display text-[46px] text-green sm:text-[60px] lg:text-[76px]">
            Do primeiro passo
            <br />
            ao <em>grande dia</em>
          </h2>
        </Reveal>

        {/* Desktop — horizontal */}
        <div className="relative col-span-full mt-24 hidden lg:block">
          <div aria-hidden="true" className="absolute left-[calc(100%/18)] right-[calc(100%/18)] top-[58px] h-px">
            <motion.div
              className="absolute inset-0 origin-left bg-green/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: EASE }}
            />
            <motion.div
              className="absolute inset-0 origin-left bg-gold"
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ duration: 1, ease: EASE }}
            />
          </div>
          <ol className="relative grid grid-cols-9">
            {weddingTimeline.map((stage, i) => (
              <TimelineItem key={stage.id} stage={stage} index={i} active={active} orientation="horizontal" />
            ))}
          </ol>
        </div>

        {/* Mobile / tablet — vertical */}
        <div className="relative col-span-full mt-16 md:col-span-4 md:col-start-2 lg:hidden">
          <div aria-hidden="true" className="absolute bottom-6 left-[5px] top-6 w-px">
            <div className="absolute inset-0 bg-green/15" />
            <motion.div
              className="absolute inset-0 origin-top bg-gold"
              initial={false}
              animate={{ scaleY: progress }}
              transition={{ duration: 1, ease: EASE }}
            />
          </div>
          <ol className="relative">
            {weddingTimeline.map((stage, i) => (
              <TimelineItem key={stage.id} stage={stage} index={i} active={active} orientation="vertical" />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
