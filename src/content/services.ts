// Serviços listados na agenda online da cliente. Sem preços (padrão dos sites de estética; a cliente confirma).
// Botox e preenchimento labial ficam de fora até a Kamila informar quem aplica e o registro no conselho.

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  items: string[];
  seoTitle: string;
  seoDescription: string;
  note?: string;
  photo: string;
  photoAlt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "depilacao-a-laser",
    photo: "laser",
    photoAlt: "Aparelho de depilação a laser sobre a pele, imagem ilustrativa",
    title: "Depilação a laser",
    short: "Áreas do rosto e do corpo, em sessões avulsas ou em pacotes de 10 sessões.",
    intro:
      "Depilação a laser para áreas do rosto e do corpo, feita em sessões individuais ou em pacotes de 10 sessões. Escolha a área, diga o dia que prefere e a gente confirma o horário pelo WhatsApp.",
    items: [
      "Buço, queixo e aréola",
      "Axila, rosto e linha alba",
      "Virilha completa",
      "Meia perna",
      "Perna completa",
      "Costas, abdômen e tórax",
      "Kits e pacotes de 10 sessões",
    ],
    seoTitle: "Depilação a laser na Pampulha, BH | Kamila Oliveira Estética",
    seoDescription:
      "Depilação a laser em Santa Amélia, região da Pampulha, em Belo Horizonte. Áreas do rosto e do corpo, sessões avulsas e pacotes. Agende pelo WhatsApp.",
  },
  {
    slug: "limpeza-de-pele",
    photo: "pele",
    photoAlt: "Mãos com algodão e produto de limpeza de pele, imagem ilustrativa",
    title: "Limpeza de pele",
    short: "Limpeza de pele em três níveis, revitalização labial e drenagem facial.",
    intro:
      "Cuidados para o rosto: limpeza de pele em três níveis (Bronze, Prata e Ouro), revitalização labial e drenagem facial. Pelo WhatsApp você tira as dúvidas sobre cada nível antes de escolher.",
    items: [
      "Limpeza de pele Bronze",
      "Limpeza de pele Prata",
      "Limpeza de pele Ouro",
      "Revitalização labial",
      "Drenagem facial",
    ],
    seoTitle: "Limpeza de pele em BH, Pampulha | Kamila Oliveira Estética",
    seoDescription:
      "Limpeza de pele, revitalização labial e drenagem facial em Santa Amélia, Belo Horizonte. Atendimento por agendamento pelo WhatsApp.",
  },
  {
    slug: "estetica-corporal",
    photo: "corpo",
    photoAlt: "Detalhe do colo com creme aplicado, imagem ilustrativa",
    title: "Estética corporal e relaxamento",
    short: "Lipo com as mãos, drenagem linfática, esfoliação corporal e massagem relaxante.",
    intro:
      "Protocolos corporais e momentos de relaxamento. A Lipo com as mãos é o protocolo manual autoral da Kamila, voltado à redução de medidas. Os demais serviços completam o cuidado com o corpo.",
    items: [
      "Lipo com as mãos",
      "Drenagem linfática corporal",
      "Esfoliação corporal",
      "Massagem relaxante",
    ],
    seoTitle: "Estética corporal e drenagem em BH | Kamila Oliveira Estética",
    seoDescription:
      "Lipo com as mãos, drenagem linfática, esfoliação corporal e massagem relaxante em Santa Amélia, Pampulha, Belo Horizonte. Agende pelo WhatsApp.",  },
];

export const bySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)!;

/** Opções do agendamento guiado (4 etapas). Relaxamento é uma opção própria; a página dele é a de estética corporal. */
export const AGENDA_SERVICES = [
  { slug: "depilacao-a-laser", title: "Depilação a laser", items: SERVICES[0].items },
  { slug: "limpeza-de-pele", title: "Limpeza de pele", items: SERVICES[1].items },
  { slug: "estetica-corporal", title: "Estética corporal", items: ["Lipo com as mãos", "Drenagem linfática corporal", "Esfoliação corporal"] },
  { slug: "relaxamento", title: "Relaxamento", items: ["Massagem relaxante"] },
];
