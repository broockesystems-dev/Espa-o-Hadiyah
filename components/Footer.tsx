import { BRAND, CONTACT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer data-header-theme="dark" className="bg-green-dark py-12 text-cream/70">
      <div className="grid-editorial items-baseline gap-y-6">
        <p className="col-span-full lg:col-span-4">
          <span className="display text-[24px] italic text-cream">{BRAND.name}</span>
          <span className="label-sm ml-4 text-cream/50">{BRAND.role}</span>
        </p>
        <p className="label-sm col-span-full text-cream/50 lg:col-span-3 lg:col-start-6">Guia da Noiva</p>
        <ul className="col-span-full flex flex-wrap gap-x-8 gap-y-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
          <li>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="label-sm hover:text-gold">
              {CONTACT.instagramHandle}
            </a>
          </li>
          <li>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="label-sm hover:text-gold">
              {CONTACT.whatsappLabel}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
