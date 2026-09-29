import type { StageCallout, StageTone, WeddingStage } from "@/data/weddingTimeline";
import { EditorialTitle } from "./EditorialTitle";
import { ImageReveal } from "./ImageReveal";
import { NumberReveal, Reveal, RevealItem } from "./Reveal";

const toneClass: Record<StageTone, string> = {
  cream: "bg-cream",
  blush: "bg-blush",
  green: "bg-green text-cream",
};

/* ─────────────────────────────────────────────
   Shared pieces
   Hierarchy: número → período → título → conteúdo → imagem
   ───────────────────────────────────────────── */

function StageHeading({ stage, size = "lg" }: { stage: WeddingStage; size?: "lg" | "md" }) {
  const headingId = `${stage.id}-title`;
  const titleSize =
    size === "lg"
      ? "text-[44px] sm:text-[56px] lg:text-[clamp(56px,5vw,80px)]"
      : "text-[40px] sm:text-[50px] lg:text-[clamp(50px,4.2vw,68px)]";

  return (
    <header>
      <Reveal className="flex items-center gap-4">
        <span className="label text-gold tabular-nums">Etapa {stage.number}</span>
        <span aria-hidden="true" className="h-px w-10 bg-gold/60" />
        {stage.title && <span className="label text-muted">{stage.period}</span>}
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={headingId} className={`display mt-6 text-green ${titleSize}`}>
          {stage.title ? <EditorialTitle text={stage.title} emphasis={stage.emphasis} /> : <em>{stage.period}</em>}
        </h2>
      </Reveal>
    </header>
  );
}


function StageItems({ items, className = "", large = false }: { items: string[]; className?: string; large?: boolean }) {
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <RevealItem
          key={item}
          delay={0.12 + i * 0.06}
          className={`grid grid-cols-[1.75rem_1fr] border-t border-green/15 py-5 first:border-t-0 first:pt-0 ${
            large ? "lg:py-7" : ""
          }`}
        >
          <span aria-hidden="true" className="label-sm pt-[0.5em] text-gold/80 tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className={large ? "display text-[22px] leading-snug text-ink lg:text-[27px]" : "body-copy text-ink/80"}>
            {item}
          </p>
        </RevealItem>
      ))}
    </ul>
  );
}

function BigNumber({ value, className = "" }: { value: string; className?: string }) {
  return (
    <NumberReveal
      className={`display pointer-events-none block select-none leading-[0.8] text-gold/25 ${className}`}
    >
      {value}
    </NumberReveal>
  );
}

export function Callout({ callout }: { callout: StageCallout }) {
  return (
    <Reveal delay={0.2}>
      <aside aria-label={callout.title} className="relative bg-green px-8 py-10 text-cream md:px-10 md:py-12">
        <span aria-hidden="true" className="absolute left-8 top-0 h-10 w-px bg-gold md:left-10" />
        <h3 className="display text-[30px] leading-[1.05] lg:text-[34px]">
          <em>{callout.title}</em>
        </h3>
        <p className="mt-5 text-[14px] leading-[1.85] text-cream/80">{callout.text}</p>
      </aside>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   Layout variants — no two consecutive stages share a composition
   ───────────────────────────────────────────── */

function TextLeft({ stage }: { stage: WeddingStage }) {
  return (
    <div className="grid-editorial items-start">
      <BigNumber value={stage.number} className="col-span-full mb-8 text-[120px] lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:mb-0 lg:text-[200px]" />
      <div className="col-span-full lg:col-span-5 lg:col-start-2 lg:row-start-1 lg:pt-40">
        <StageHeading stage={stage} />
        <StageItems items={stage.items} className="mt-12 lg:mt-16 lg:max-w-[30rem]" />
      </div>
      {stage.image && (
        <div className="col-span-full mt-16 md:col-span-4 md:col-start-2 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0">
          <ImageReveal
            {...stage.image}
            sizes="(min-width: 1024px) 32vw, (min-width: 768px) 60vw, 100vw"
            className="mask-arch-soft aspect-[3/4.4] w-full"
          />
          <p className="label-sm mt-5 text-muted">{stage.period}</p>
        </div>
      )}
    </div>
  );
}

function ImageLeftCallout({ stage }: { stage: WeddingStage }) {
  return (
    <div className="grid-editorial items-start">
      <div className="col-span-full lg:col-span-5 lg:col-start-7 lg:pt-10">
        <StageHeading stage={stage} />
        <StageItems items={stage.items} className="mt-12 lg:mt-14" />
      </div>
      <div className="relative col-span-full mt-16 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mt-0">
        {stage.image && (
          <ImageReveal
            {...stage.image}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="mask-leaf aspect-[4/5] w-full md:w-4/5 lg:w-full"
          />
        )}
        {stage.callout && (
          <div className="relative -mt-20 ml-6 md:-mt-32 md:ml-[30%] lg:-mr-[22%] lg:ml-[18%]">
            <Callout callout={stage.callout} />
          </div>
        )}
      </div>
    </div>
  );
}

function Overlap({ stage }: { stage: WeddingStage }) {
  return (
    <div className="grid-editorial items-center">
      <div className="col-span-full lg:col-span-5 lg:col-start-1">
        <StageHeading stage={stage} />
        <StageItems items={stage.items} className="mt-12 lg:mt-14 lg:max-w-[29rem]" />
      </div>
      <div className="relative col-span-full mt-20 md:col-span-5 md:col-start-2 lg:col-span-5 lg:col-start-8 lg:mt-0">
        <BigNumber value={stage.number} className="absolute -top-16 right-0 text-[140px] lg:-top-28 lg:text-[220px]" />
        {stage.image && (
          <ImageReveal
            {...stage.image}
            sizes="(min-width: 1024px) 34vw, 90vw"
            className="mask-arch ml-auto aspect-[3/4.3] w-[82%]"
          />
        )}
        {stage.secondaryImage && (
          <div className="absolute -bottom-10 left-0 w-[44%] lg:-bottom-16 lg:-left-[14%]">
            <ImageReveal
              {...stage.secondaryImage}
              delay={0.35}
              sizes="(min-width: 1024px) 16vw, 45vw"
              className="mask-oval aspect-[4/5] w-full ring-[10px] ring-blush"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ImageLeft({ stage }: { stage: WeddingStage }) {
  return (
    <div className="grid-editorial items-end">
      <div className="col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-1">
        <BigNumber value={stage.number} className="mb-10 text-[120px] lg:text-[170px]" />
        <StageHeading stage={stage} size="md" />
        <StageItems items={stage.items} className="mt-12" />
      </div>
      {stage.image && (
        <div className="relative col-span-full mt-16 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-0">
          <span aria-hidden="true" className="mask-corner absolute -right-4 -top-4 h-full w-full border border-gold/50" />
          <ImageReveal
            {...stage.image}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="mask-corner aspect-[4/5] w-full lg:aspect-[5/6]"
          />
        </div>
      )}
    </div>
  );
}

function ArchLeft({ stage }: { stage: WeddingStage }) {
  return (
    <div className="grid-editorial items-start">
      <div className="col-span-full lg:col-span-5 lg:col-start-7">
        <StageHeading stage={stage} />
        <StageItems items={stage.items} className="mt-12 lg:mt-16 lg:max-w-[28rem]" />
      </div>
      {stage.image && (
        <div className="col-span-3 col-start-2 mt-16 md:col-span-3 md:col-start-3 lg:col-span-3 lg:col-start-2 lg:row-start-1 lg:mt-28">
          <ImageReveal
            {...stage.image}
            sizes="(min-width: 1024px) 22vw, 70vw"
            className="mask-pill aspect-[1/1.9] w-full"
          />
          <p className="display mt-6 text-center text-[20px] italic text-muted">{stage.number}</p>
        </div>
      )}
    </div>
  );
}

function Minimal({ stage }: { stage: WeddingStage }) {
  return (
    <div className="grid-editorial items-end">
      <div className="col-span-full lg:col-span-7 lg:col-start-3">
        <StageHeading stage={stage} size="md" />
        <StageItems items={stage.items} large className="mt-12 lg:mt-16" />
      </div>
      {stage.image && (
        <div className="col-span-2 col-start-3 mt-14 md:col-span-2 md:col-start-5 lg:col-span-2 lg:col-start-11 lg:mt-0">
          <ImageReveal
            {...stage.image}
            sizes="(min-width: 1024px) 14vw, 45vw"
            className="mask-oval aspect-[3/4] w-full"
          />
        </div>
      )}
    </div>
  );
}

function Quiet({ stage }: { stage: WeddingStage }) {
  return (
    <div className="grid-editorial items-start">
      {stage.image && (
        <div className="order-2 col-span-2 mt-16 md:col-span-2 lg:order-none lg:col-span-2 lg:col-start-2 lg:mt-48">
          <ImageReveal
            {...stage.image}
            sizes="(min-width: 1024px) 14vw, 45vw"
            className="mask-arch aspect-[3/4.4] w-full"
          />
        </div>
      )}
      <div className="col-span-full lg:col-span-5 lg:col-start-7">
        <BigNumber value={stage.number} className="mb-12 text-[120px] lg:text-[160px]" />
        <StageHeading stage={stage} size="md" />
        <StageItems items={stage.items} large className="mt-12 lg:mt-16" />
      </div>
    </div>
  );
}

function Dominant({ stage }: { stage: WeddingStage }) {
  return (
    <div className="relative lg:grid lg:min-h-[110svh] lg:grid-cols-12">
      {stage.image && (
        <div className="relative h-[78svh] min-h-[480px] lg:col-span-7 lg:h-auto">
          <div className="absolute inset-0">
            <ImageReveal {...stage.image} sizes="(min-width: 1024px) 60vw, 100vw" className="h-full w-full" />
          </div>
        </div>
      )}
      <div className="relative px-5 md:px-10 lg:col-span-5 lg:flex lg:items-center lg:px-0">
        <div className="relative -mt-24 bg-blush px-6 pb-4 pt-12 md:mx-[12%] md:px-12 lg:-ml-[22%] lg:mr-16 lg:mt-0 lg:px-14 lg:py-20 xl:mr-[88px]">
          <BigNumber value={stage.number} className="absolute -top-14 right-6 text-[110px] text-gold/35 lg:-top-20 lg:text-[150px]" />
          <StageHeading stage={stage} size="md" />
          <StageItems items={stage.items} className="mt-12" />
        </div>
      </div>
    </div>
  );
}

const layouts = {
  "text-left": TextLeft,
  "image-left-callout": ImageLeftCallout,
  overlap: Overlap,
  "image-left": ImageLeft,
  "arch-left": ArchLeft,
  minimal: Minimal,
  quiet: Quiet,
  dominant: Dominant,
} as const;

export default function Stage({ stage }: { stage: WeddingStage }) {
  if (stage.variant === "grand-day") return null; // rendered by <GrandDay />
  const Layout = layouts[stage.variant];
  const flush = stage.variant === "dominant";

  return (
    <section
      id={stage.id}
      tabIndex={-1}
      aria-labelledby={`${stage.id}-title`}
      data-header-theme={stage.tone === "green" ? "dark" : "light"}
      className={`relative overflow-x-clip outline-none ${toneClass[stage.tone]} ${
        flush ? "pb-24 lg:py-0" : "py-24 md:py-32 lg:py-44"
      }`}
    >
      <Layout stage={stage} />
    </section>
  );
}
