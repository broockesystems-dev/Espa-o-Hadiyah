export const SITE = {
  name: "Guia da Noiva",
  title: "Guia da Noiva | Malu Siqueira",
  description:
    "Um cronograma completo para acompanhar cada etapa da preparação da noiva até o grande dia.",
  // Defina NEXT_PUBLIC_SITE_URL no deploy para canonical e Open Graph corretos.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "pt_BR",
} as const;

export const BRAND = {
  name: "Malu Siqueira",
  role: "Maquiadora e penteadista",
} as const;

export const CONTACT = {
  whatsappUrl: "https://wa.me/5541997471911",
  whatsappLabel: "WhatsApp (41) 99747-1911",
  instagramHandle: "@malusiqueirabeauty",
  instagramUrl: "https://www.instagram.com/malusiqueirabeauty/",
} as const;

export const HERO = {
  kicker: "Guia da Noiva",
  titleLines: ["Cronograma", "da Noiva"],
  subtitle: "Do primeiro passo ao grande dia",
  image: {
    src: "/images/hero/noiva.jpg",
    alt: "Retrato vertical de uma noiva",
  },
} as const;

export const INTRO = {
  label: "Cronograma da Noiva",
  // "etapas." é renderizado em itálico
  title: ["Um casamento", "se constrói em"],
  titleEmphasis: "etapas.",
  // Texto introdutório: preencher com o conteúdo exato da referência.
  // Mantido vazio para não inventar conteúdo.
  paragraphs: [] as string[],
  image: {
    src: "/images/stages/intro.jpg",
    alt: "Fotografia de casamento",
  },
} as const;

export const FINAL_CTA = {
  headline: "Cada noiva tem o seu",
  headlineEmphasis: "cronograma.",
  text: "Este é um cronograma de referência. O seu, a gente ajusta junto, na sua data, do primeiro passo até a hora de sair para o sim.",
  cta: "Falar com a Malu no WhatsApp",
  image: {
    src: "/images/malu/malu-siqueira.jpg",
    alt: "Retrato profissional de Malu Siqueira, maquiadora e penteadista",
  },
} as const;
