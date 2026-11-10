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
  mapEmbed: "https://www.google.com/maps?q=Rua%20Monsueto%20Filizzola%2C%2016%2C%20Santa%20Am%C3%A9lia%2C%20Belo%20Horizonte%2C%20MG&output=embed",
  googlePerfil: "https://www.google.com/maps/place/Kamila+Oliveira+Est%C3%A9tica/@-19.8443881,-43.9768662,17z/data=!3m1!4b1!4m6!3m5!1s0xa691a9639dca3d:0xc29dbdad7971c00!8m2!3d-19.8443881!4d-43.9768662!16s%2Fg%2F11rxwvgs8f",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Rua%20Monsueto%20Filizzola%2C%2016%2C%20Santa%20Am%C3%A9lia%2C%20Belo%20Horizonte%2C%20MG",
  // Retrato real da Kamila (só com aval): troca a foto de atmosfera na seção Sobre.
  kamilaPhoto: "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
} as const;

// Flags do /contato e do JSON-LD. Ligar só quando a Kamila confirmar (docs/pendencias-cliente.md).
export const HORARIO_CONFIRMADO = true;
// Fonte: Perfil da Empresa da Kamila no Google Maps (consultado em 10/11/2026). TODO a Kamila confirmar; se mudar, ajustar aqui e em AGENDA_DIAS_FECHADOS.
export const HORARIO = "Terça a sábado, das 8h às 18h. Domingo e segunda: fechado.";
export const HORARIO_SCHEMA = ["Tu-Sa 08:00-18:00"];
export const ENDERECO_CONFIRMADO = true;
// Fonte: arte do Instagram da própria Kamila ("Rua Monsueto Filizzola, 16, Santa Amélia, esquina com Avenida Guarapari").
// TODO a Kamila confirmar a grafia (o briefing diz "Mansueto") e se "Guarapari 1456", citado em reels, é outro ponto.
export const ENDERECO = "Rua Monsueto Filizzola, 16, esquina com a Avenida Guarapari";

export const NAV = [
  { href: "/depilacao-a-laser/", label: "Depilação a laser" },
  { href: "/limpeza-de-pele/", label: "Limpeza de pele" },
  { href: "/estetica-corporal/", label: "Corporal" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/contato/", label: "Contato" },
] as const;

// Agendamento: quando a Kamila confirmar o expediente, preencha aqui e o calendário passa a bloquear os dias fechados e a mostrar horários.
// TODO dias fechados (0 = domingo ... 6 = sábado) e horários de início, ex.: ["09:00", "10:00", "14:00"]. Vazio = só dia e período.
export const AGENDA_DIAS_FECHADOS: number[] = [0, 1]; // domingo e segunda (Perfil no Google)
export const AGENDA_HORARIOS: string[] = [];
