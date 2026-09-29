"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { weddingTimeline } from "@/data/weddingTimeline";
import { BRAND, CONTACT } from "@/lib/constants";
import { useActiveStage, useHeaderState } from "@/lib/hooks";
import { StageNavigation, StageProgressMobile, scrollToStage } from "./StageNavigation";
import { EASE } from "./Reveal";

export default function Header() {
  const active = useActiveStage();
  const { scrolled, theme } = useHeaderState();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  const tone = open ? "dark" : theme;
  const surface = open
    ? "bg-transparent"
    : scrolled
      ? theme === "dark"
        ? "bg-green-dark/80 backdrop-blur-md"
        : "bg-cream/80 backdrop-blur-md"
      : "bg-transparent";
  const ink = tone === "dark" ? "text-cream" : "text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,backdrop-filter] duration-700 ${surface} ${ink}`}
      >
        <div className="relative mx-auto flex h-[var(--header-h)] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10 lg:px-16 xl:px-[88px]">
          <a
            href="#inicio"
            className="flex items-baseline gap-4"
            aria-label={`${BRAND.name} — Guia da Noiva, voltar ao início`}
            onClick={() => setOpen(false)}
          >
            <span className="label whitespace-nowrap">{BRAND.name}</span>
            <span aria-hidden="true" className="hidden h-3 w-px translate-y-0.5 bg-current opacity-30 md:block" />
            <span className="label hidden opacity-60 md:inline">Guia da Noiva</span>
          </a>

          <div className="flex items-center gap-5 sm:gap-8 xl:gap-12">
            <StageNavigation active={active} tone={tone} />
            {!open && <StageProgressMobile active={active} tone={tone} />}
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-overlay"
              className="label group flex shrink-0 items-center gap-3 py-2"
            >
              <span>{open ? "Fechar" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-2 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ${open ? "translate-y-1 rotate-[20deg]" : ""}`}
                />
                <span
                  className={`absolute bottom-0 right-0 h-px bg-current transition-all duration-500 ${open ? "w-full -translate-y-[3px] -rotate-[20deg]" : "w-2/3 group-hover:w-full"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <MenuOverlay
            active={active}
            onClose={() => {
              setOpen(false);
              menuButton.current?.focus();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MenuOverlay({ active, onClose }: { active: number; onClose: () => void }) {
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    first.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      id="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-40 overflow-y-auto bg-green-dark text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="grid-editorial min-h-full pb-16 pt-[calc(var(--header-h)+40px)] lg:pt-[calc(var(--header-h)+72px)]">
        <nav aria-label="Cronograma completo" className="col-span-full lg:col-span-7">
          <p className="label mb-8 text-gold">O cronograma</p>
          <ol className="border-t border-cream/15">
            {weddingTimeline.map((stage, i) => (
              <motion.li
                key={stage.id}
                className="border-b border-cream/15"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.04, ease: EASE }}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={`#${stage.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    // wait for the overlay to release the scroll lock
                    requestAnimationFrame(() => scrollToStage(stage.id));
                  }}
                  className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-4 md:grid-cols-[4rem_1fr_auto] md:py-4"
                >
                  <span className={`label-sm tabular-nums ${i === active ? "text-gold" : "text-cream/50"}`}>
                    {stage.number}
                  </span>
                  <span className="display text-[26px] transition-colors duration-500 group-hover:text-gold md:text-[34px]">
                    {stage.title ?? stage.period}
                  </span>
                  {stage.title && (
                    <span className="label-sm col-start-2 text-cream/50 md:col-start-3">{stage.period}</span>
                  )}
                </a>
              </motion.li>
            ))}
          </ol>
        </nav>

        <div className="col-span-full mt-14 flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:mt-[76px]">
          <p className="display text-[34px] italic leading-tight text-blush">
            {BRAND.name}
          </p>
          <p className="label-sm text-cream/60">{BRAND.role}</p>
          <div className="hairline mt-2 w-12 text-gold opacity-100" />
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="label hover:text-gold">
            {CONTACT.whatsappLabel}
          </a>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="label hover:text-gold">
            {CONTACT.instagramHandle}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
