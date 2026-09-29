"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND, HERO } from "@/lib/constants";
import { EASE } from "./Reveal";

const fade = (delay: number, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.4, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section
      id="inicio"
      data-header-theme="dark"
      aria-labelledby="hero-title"
      className="relative flex flex-col bg-green lg:grid lg:min-h-[100svh] lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]"
    >
      {/* 1 — background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-green-dark"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      {/* 2 — photograph (first on mobile, right on desktop) */}
      <div className="relative h-[68svh] min-h-[440px] overflow-hidden lg:order-2 lg:h-auto lg:min-h-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ opacity: { duration: 1.6, delay: 0.3, ease: EASE }, scale: { duration: 3.2, delay: 0.3, ease: EASE } }}
        >
          <Image
            src={HERO.image.src}
            alt={HERO.image.alt}
            fill
            priority
            quality={80}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </motion.div>
        {/* soft scrim so the header reads over the photograph */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-green-dark/45 to-transparent"
        />
        {/* mobile: a delicate gold seam where photo meets the green block */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold lg:hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 1, ease: EASE }}
        />
      </div>

      {/* desktop: vertical gold separation */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-[45%] z-10 hidden w-px origin-top bg-gold/80 lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.8, ease: EASE }}
      />

      {/* 3 — text panel */}
      <div className="relative flex flex-col justify-between gap-16 px-6 pb-14 pt-12 text-cream md:px-10 lg:order-1 lg:px-16 lg:pb-16 lg:pt-[calc(var(--header-h)+8vh)] xl:pl-[88px]">
        <motion.p className="label text-gold" {...fade(1.9, 10)}>
          {HERO.kicker}
        </motion.p>

        <div>
          <motion.h1
            id="hero-title"
            className="display text-[64px] leading-[0.9] sm:text-[84px] lg:text-[clamp(84px,7.6vw,136px)]"
            {...fade(1.0, 36)}
          >
            {HERO.titleLines[0]}
            <br />
            <em className="text-blush">{HERO.titleLines[1]}</em>
          </motion.h1>

          <motion.div className="mt-8 flex items-center gap-5 lg:mt-12" {...fade(1.4)}>
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p className="display text-[22px] italic leading-snug text-cream/85 lg:text-[28px]">
              {HERO.subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div className="flex items-end justify-between gap-6" {...fade(1.9, 10)}>
          <div>
            <p className="label">{BRAND.name}</p>
            <p className="label-sm mt-2 text-cream/55">{BRAND.role}</p>
          </div>
          <span aria-hidden="true" className="relative hidden h-14 w-px overflow-hidden bg-cream/15 lg:block">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-gold"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
