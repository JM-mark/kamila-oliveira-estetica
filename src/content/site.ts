// Configuração central do site. Tudo que depende de confirmação da cliente fica aqui, num lugar só.
// Pendências da Kamila (ver CLAUDE.md): nome oficial, WhatsApp, endereço, horário, domínio, GA4.

export const SITE = {
  name: "Kamila Oliveira Estética",
  short: "Kamila Oliveira",
  city: "Belo Horizonte",
  region: "MG",
  neighborhood: "Santa Amélia",
  area: "Pampulha",
  instagram: "https://www.instagram.com/kamilaoliveiraestetica/",
  instagramHandle: "@kamilaoliveiraestetica",
  // WhatsApp do botão da agenda online da cliente. O anúncio de 2022 traz outro número; confirmar com a Kamila.
  whatsapp: "5531999274642",
  // Link da agenda online: só liga depois que a Kamila reativar a agenda no app.
  agendaUrl: "https://agendeagora.web.app/kamila-oliveira-estetica",
  agendaEnabled: false,
  // Endereço confirmado: colar aqui o embed do mapa para ligar o bloco "Onde estamos". Vazio = só pede o endereço pelo WhatsApp.
  mapEmbed: "",
  // Retrato real da Kamila (só com aval): troca a foto de atmosfera na seção Sobre.
  kamilaPhoto: "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
} as const;

// Flags do /contato e do JSON-LD. Ligar só quando a Kamila confirmar (docs/pendencias-cliente.md).
export const HORARIO_CONFIRMADO = false;
export const HORARIO = ""; // TODO horário de atendimento (texto livre, ex.: "Segunda a sexta, 9h às 18h")
export const ENDERECO_CONFIRMADO = false;
export const ENDERECO = ""; // TODO endereço completo confirmado (a agenda diz "Rua Monsueto Filizzola 16"; reels citam "Guarapari 1456")

export const NAV = [
  { href: "/depilacao-a-laser/", label: "Depilação a laser" },
  { href: "/limpeza-de-pele/", label: "Limpeza de pele" },
  { href: "/estetica-corporal/", label: "Corporal" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/contato/", label: "Contato" },
] as const;
