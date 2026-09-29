import { BRAND, CONTACT, FINAL_CTA } from "@/lib/constants";
import { ImageReveal } from "./ImageReveal";
import { Reveal } from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";

export default function FinalCTA() {
  return (
    <section
      id="contato"
      data-header-theme="light"
      aria-labelledby="cta-title"
      className="relative bg-cream lg:grid lg:min-h-[100svh] lg:grid-cols-2"
    >
      <div className="relative h-[72svh] min-h-[440px] lg:h-auto">
        <div className="absolute inset-0">
          <ImageReveal
            {...FINAL_CTA.image}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full"
            position="50% 25%"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-20 md:px-16 md:py-28 lg:px-[8vw] lg:py-32">
        <Reveal>
          <p className="display text-[34px] italic leading-none text-green">{BRAND.name}</p>
          <p className="label-sm mt-3 text-muted">{BRAND.role}</p>
          <span aria-hidden="true" className="mt-10 block h-px w-12 bg-gold" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 id="cta-title" className="display mt-12 text-[50px] text-green sm:text-[64px] lg:text-[clamp(56px,4.8vw,84px)]">
            <span className="lg:whitespace-nowrap">{FINAL_CTA.headline}</span>
            <br />
            <em className="text-gold">{FINAL_CTA.headlineEmphasis}</em>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="body-copy mt-10 max-w-[26rem] text-[15px] text-ink/75">{FINAL_CTA.text}</p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <WhatsAppButton label={FINAL_CTA.cta} className="w-full sm:w-auto sm:min-w-[22rem]" />
          <dl className="mt-10 grid gap-6 border-t border-green/15 pt-8 sm:grid-cols-2">
            <div>
              <dt className="label-sm text-muted">Instagram</dt>
              <dd className="mt-2">
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="display text-[22px] text-green underline-offset-4 hover:text-gold hover:underline"
                >
                  {CONTACT.instagramHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label-sm text-muted">Contato</dt>
              <dd className="mt-2">
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="display text-[22px] text-green underline-offset-4 hover:text-gold hover:underline"
                >
                  {CONTACT.whatsappLabel}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
