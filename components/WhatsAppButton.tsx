import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";

interface WhatsAppButtonProps {
  label: string;
  className?: string;
}

/** Quiet, typographic call to action — a line that fills on hover, not a big pill. */
export default function WhatsAppButton({ label, className = "" }: WhatsAppButtonProps) {
  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (abre em nova aba)`}
      className={`group relative inline-flex items-center justify-between gap-6 overflow-hidden border border-green px-7 py-5 text-green transition-colors duration-700 hover:text-cream ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-green transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
      <span className="label relative">{label}</span>
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.25}
        className="relative size-5 transition-transform duration-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}
