"use client";

import { useEffect, useState } from "react";
import { weddingTimeline } from "@/data/weddingTimeline";

/** Subscribes to scroll/resize with a single rAF-throttled callback. */
function useScrollFrame(callback: () => void) {
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        callback();
      });
    };
    callback();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [callback]);
}

const stageIds = weddingTimeline.map((s) => s.id);

/**
 * Index of the stage crossing the reading line (45% of the viewport),
 * or -1 while the reader is still before stage 01.
 */
export function useActiveStage() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const elements = stageIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    // A stage's edge crossing the thin reading band is the only moment the
    // active stage can change, so the observer is the trigger and the
    // bounding boxes settle which stage is current.
    const pick = () => {
      const line = window.innerHeight * 0.45;
      let next = -1;
      elements.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };
    const io = new IntersectionObserver(pick, { rootMargin: "-45% 0px -54% 0px" });
    elements.forEach((el) => io.observe(el));
    // Large jumps (End key, anchor links) can skip the band entirely.
    window.addEventListener("scrollend", pick);
    pick();
    return () => {
      io.disconnect();
      window.removeEventListener("scrollend", pick);
    };
  }, []);

  return active;
}

export type HeaderTheme = "light" | "dark";

/** Header state: whether the page has scrolled and the tone under the header. */
export function useHeaderState() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<HeaderTheme>("dark");

  useScrollFrame(
    useStableCallback(() => {
      setScrolled(window.scrollY > 24);
      const probe = 36;
      const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
      for (const section of sections) {
        const r = section.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          setTheme(section.dataset.headerTheme === "light" ? "light" : "dark");
          break;
        }
      }
    }),
  );

  return { scrolled, theme };
}

// Stable identity for callbacks that only read the DOM.
function useStableCallback<T extends () => void>(fn: T) {
  const [stable] = useState(() => fn);
  return stable;
}
