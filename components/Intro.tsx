import { HERO, INTRO } from "@/lib/constants";
import { TOTAL_STAGES } from "@/data/weddingTimeline";
import { ImageReveal } from "./ImageReveal";
import { Reveal } from "./Reveal";

export default function Intro() {
  return (
    <section
      id="introducao"
      data-header-theme="light"
      aria-labelledby="intro-title"
      className="relative overflow-hidden bg-blush py-24 md:py-32 lg:py-44"
    >
      <div className="grid-editorial items-start">
        <Reveal className="col-span-full mb-10 flex items-center gap-4 lg:col-span-3 lg:mb-0 lg:pt-4">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          <p className="label text-green">{INTRO.label}</p>
        </Reveal>

        <div className="col-span-full lg:col-span-6 lg:col-start-3 lg:row-start-2 lg:mt-10">
          <Reveal>
            <h2
              id="intro-title"
              className="display text-[54px] text-green sm:text-[72px] lg:text-[clamp(80px,7.4vw,124px)]"
            >
              {INTRO.title[0]}
              <br />
              {INTRO.title[1]}
              <br />
              <em className="text-gold">{INTRO.titleEmphasis}</em>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 max-w-[26rem] lg:ml-[18%] lg:mt-20">
            {INTRO.paragraphs.map((p) => (
              <p key={p} className="body-copy mb-5">
                {p}
              </p>
            ))}
            <div className="flex items-baseline gap-6 border-t border-green/20 pt-6">
              <span className="display text-[56px] leading-none text-green tabular-nums">
                {String(TOTAL_STAGES).padStart(2, "0")}
              </span>
              <span className="label-sm text-muted">
                Etapas
                <br />
                <span className="display mt-2 block text-[19px] normal-case italic tracking-normal text-ink">
                  {HERO.subtitle}
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        <div className="relative col-span-full mt-16 md:col-span-4 md:col-start-2 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:mt-24">
          <ImageReveal
            src={INTRO.image.src}
            alt={INTRO.image.alt}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 60vw, 100vw"
            className="mask-arch-soft aspect-[4/5.4] w-full"
          />
          <span
            aria-hidden="true"
            className="mask-arch-soft pointer-events-none absolute -left-4 -top-4 hidden h-full w-full border border-gold/60 lg:block"
          />
        </div>
      </div>
    </section>
  );
}
