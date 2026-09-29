"use client";

import { MotionConfig } from "framer-motion";

/** Honours prefers-reduced-motion for every Framer Motion animation. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
