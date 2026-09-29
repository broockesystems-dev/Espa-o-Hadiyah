"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  duration?: number;
};

/** Text reveal: opacity 0 → 1, y 30 → 0, once, when entering the viewport. */
export function Reveal({ delay = 0, y = 30, duration = 1.1, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Large stage numeral: slow fade with a slight rise. */
export function NumberReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.6, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

/** List item variant of the text reveal (keeps <ul> → <li> semantics). */
export function RevealItem({ delay = 0, children, className }: { delay?: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.li
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.li>
  );
}
