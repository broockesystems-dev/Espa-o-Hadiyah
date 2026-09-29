export type StageVariant =
  | "text-left" // 01 — texto à esquerda / foto à direita
  | "image-left-callout" // 02 — foto à esquerda / texto à direita + callout
  | "overlap" // 03 — texto + foto principal + foto menor sobreposta
  | "image-left" // 04 — foto à esquerda / texto à direita
  | "arch-left" // 05 — foto vertical arredondada à esquerda / texto à direita
  | "minimal" // 06 — composição minimalista
  | "quiet" // 07 — muito espaço vazio
  | "dominant" // 08 — imagem dominante
  | "grand-day"; // 09 — o grande dia

export type StageTone = "cream" | "blush" | "green";

export interface StageImage {
  src: string;
  alt: string;
}

export interface StageCallout {
  title: string;
  text: string;
}

export interface ProductionBlock {
  label: string;
  hours: number;
}

export interface ProductionTrack {
  role: string;
  durationLabel: string;
  hours: number;
  note?: string;
  blocks?: ProductionBlock[];
}

export interface WeddingStage {
  id: string;
  number: string;
  period: string;
  /** Rótulo curto usado na timeline e na navegação */
  shortPeriod: string;
  title?: string;
  /** Trecho do título composto em itálico */
  emphasis?: string;
  subtitle?: string;
  items: string[];
  image?: StageImage;
  secondaryImage?: StageImage;
  variant: StageVariant;
  tone: StageTone;
  callout?: StageCallout;
  production?: ProductionTrack[];
}

export const weddingTimeline: WeddingStage[] = [
  {
    id: "etapa-01",
    number: "01",
    period: "1 ano antes ou mais",
    shortPeriod: "1 ano",
    title: "Estilo, local, horário e equipe",
    emphasis: "equipe",
    items: [
      "Defina o estilo do casamento: boho, romântico, elegante, clássico ou sensual. Que imagem você, noiva, quer passar no dia?",
      "Defina o local e o horário.",
      "Encontre uma boa cerimonialista, que te acompanhe em todo o processo e tire as demandas das costas dos noivos, ao longo dos meses e no dia.",
      "Com o estilo definido, procure uma fotógrafa alinhada à proposta do casamento.",
      "Reserve também a sua beleza. As agendas de maquiagem e penteado de noiva costumam fechar com mais de um ano de antecedência.",
    ],
    image: { src: "/images/stages/etapa-01.jpg", alt: "Noiva em retrato vertical, representando a definição do estilo do casamento" },
    variant: "text-left",
    tone: "cream",
  },
  {
    id: "etapa-02",
    number: "02",
    period: "De 8 a 6 meses antes",
    shortPeriod: "8–6 meses",
    title: "A sua imagem começa pela sua cor",
    emphasis: "pela sua cor",
    items: [
      "Consulte um dermatologista e, se desejar, inicie procedimentos como botox, peelings e tratamentos corporais.",
      "Escolha a sua designer de sobrancelha e, depois de escolher, mantenha-se fiel a ela, sem grandes alterações.",
      "Se quiser seguir uma dieta, este é o momento ideal de consultar um nutricionista e traçar, com um profissional trainer, um projeto ajustado à sua rotina e às suas metas.",
      "Consulte o seu dentista para limpeza e clareamento.",
    ],
    image: { src: "/images/stages/etapa-02.jpg", alt: "Detalhe de beleza e coloração pessoal da noiva" },
    variant: "image-left-callout",
    tone: "cream",
    callout: {
      title: "Coloração e imagem pessoal",
      text: "É o momento de fazer a sua coloração e definir o estilo do vestido, do sapato e dos acessórios, para que tudo fique em harmonia com a sua beleza e com o que você quer transmitir. Vale fazer também a quem vai se arrumar com você, e mostrar a sua cartela ao fotógrafo: a edição das fotos precisa valorizar o seu tom de pele.",
    },
  },
  {
    id: "etapa-03",
    number: "03",
    period: "De 5 a 4 meses antes",
    shortPeriod: "5–4 meses",
    title: "O vestido, o espaço e o caminho até o sim",
    emphasis: "até o sim",
    items: [
      "Inicie as provas de vestido: o seu, o dos pajens e o das damas.",
      "Defina o local da sua produção: studio, hotel ou pousada. Priorize lugares com bastante espaço, ambiente climatizado e boa iluminação.",
      "Reserve um veículo que vai te levar ao casamento. Pesquise valores e modelos.",
      "Escolha o sapato pela sua coloração pessoal, mas acima de tudo, pelo conforto. Pesquise e prove os modelos de que gosta, para não ter problemas no dia.",
    ],
    image: { src: "/images/stages/etapa-03.jpg", alt: "Noiva durante a prova do vestido" },
    secondaryImage: { src: "/images/stages/etapa-03-detalhe.jpg", alt: "Detalhe do sapato de noiva" },
    variant: "overlap",
    tone: "blush",
  },
  {
    id: "etapa-04",
    number: "04",
    period: "2 meses antes",
    shortPeriod: "2 meses",
    title: "Provar, testar e cuidar todos os dias",
    emphasis: "todos os dias",
    items: [
      "Hora de definir os acessórios e o véu do seu penteado. Ao longo do cronograma isso provavelmente já foi pensado com a sua profissional, agora é o momento de provar e testar. Eles devem seguir o estilo do casamento e as cores que mais te valorizam.",
      "Comece a separar as referências de maquiagem e penteado que você deseja. Crie uma pasta no Pinterest.",
      "Mantenha a sua rotina diária de cuidados com a pele e o cabelo. A produção da noiva é o resultado da entrega da profissional e do seu cuidado diário ao longo dos meses.",
    ],
    image: { src: "/images/stages/etapa-04.jpg", alt: "Acessórios e véu do penteado de noiva" },
    variant: "image-left",
    tone: "cream",
  },
  {
    id: "etapa-05",
    number: "05",
    period: "De 30 a 15 dias antes",
    shortPeriod: "30–15 dias",
    items: [
      "Mantenha os tratamentos relacionados, das sobrancelhas e da limpeza de pele.",
      "Não faça limpeza de pele na semana do casamento, há risco de descamação, principalmente em peles sensíveis.",
      "Já não é hora de procedimentos invasivos ou abrasivos, como tinturas e peelings.",
      "Priorize boas noites de sono.",
    ],
    image: { src: "/images/stages/etapa-05.jpg", alt: "Noiva em momento de cuidado com a pele" },
    variant: "arch-left",
    tone: "cream",
  },
  {
    id: "etapa-06",
    number: "06",
    period: "10 dias antes",
    shortPeriod: "10 dias",
    items: [
      "Chegou a tão esperada prova de noiva: o momento de ver a sua beleza como um todo, fazer os últimos ajustes no vestido e deixar a produção em completa harmonia.",
      "Se puder, agende a prévia de maquiagem e penteado no mesmo dia da prova do vestido.",
    ],
    image: { src: "/images/stages/etapa-06.jpg", alt: "Prova de noiva com maquiagem e penteado" },
    variant: "minimal",
    tone: "blush",
  },
  {
    id: "etapa-07",
    number: "07",
    period: "7 dias antes",
    shortPeriod: "7 dias",
    items: [
      "Hora do design de sobrancelhas e da epilação.",
      "Última hidratação intensa no cabelo, para diminuir o frizz e nutrir os fios.",
    ],
    image: { src: "/images/stages/etapa-07.jpg", alt: "Detalhe de cabelo hidratado da noiva" },
    variant: "quiet",
    tone: "blush",
  },
  {
    id: "etapa-08",
    number: "08",
    period: "1 a 2 dias antes",
    shortPeriod: "1–2 dias",
    items: [
      "Potencialize a hidratação da pele, de acordo com o seu tipo de pele.",
      "Priorize alimentação leve e muita água.",
      "Evite usar maquiagem.",
      "Manicure e pedicure.",
    ],
    image: { src: "/images/stages/etapa-08.jpg", alt: "Noiva em retrato vertical na véspera do casamento" },
    variant: "dominant",
    tone: "blush",
  },
  {
    id: "etapa-09",
    number: "09",
    period: "O grande dia",
    shortPeriod: "Grande dia",
    title: "A sua produção",
    emphasis: "produção",
    subtitle: "Tempo de sobra para você viver cada momento",
    items: [
      "No dia do casamento eu atendo a noiva e mais uma pessoa, normalmente a mãe. É o que garante exclusividade e atenção total a você.",
      "Se a cerimônia for pela manhã, o ideal é produzir só a noiva, para que ninguém precise começar de madrugada.",
      "O horário de início é definido junto, de trás para frente, a partir do horário da cerimônia.",
    ],
    image: { src: "/images/stages/etapa-09.jpg", alt: "Noiva pronta no grande dia" },
    variant: "grand-day",
    tone: "green",
    production: [
      {
        role: "Noiva",
        durationLabel: "6 horas de produção",
        hours: 6,
        blocks: [
          { label: "Cabelo", hours: 2 },
          { label: "Maquiagem", hours: 2 },
          { label: "Final", hours: 2 },
        ],
      },
      {
        role: "Acompanhante",
        durationLabel: "2h30 de produção",
        hours: 2.5,
        note: "normalmente a mãe",
      },
    ],
  },
];

export const TOTAL_STAGES = weddingTimeline.length;
