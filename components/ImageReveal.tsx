"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "./Reveal";

interface ImageRevealProps {
  src: string;
  alt: string;
  /** Shape + aspect ratio + size of the frame (e.g. "mask-arch aspect-[3/4]") */
  className?: string;
  sizes: string;
  priority?: boolean;
  delay?: number;
  /** object-position of the photograph inside the mask */
  position?: string;
}

/** Image reveal: opacity 0 → 1, scale 1.04 → 1, inside an editorial mask. */
export function ImageReveal({ src, alt, className = "", sizes, priority, delay = 0, position = "center" }: ImageRevealProps) {
  return (
    <motion.div
      className={`relative overflow-hidden bg-blush ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 2.2, delay, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={80}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </motion.div>
    </motion.div>
  );
}
