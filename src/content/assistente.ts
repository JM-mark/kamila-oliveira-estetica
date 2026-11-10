// Base de respostas do assistente do site. REGRAS: só fatos já confirmados no site ou no Perfil do Google; nada de preço, resultado, indicação clínica
// ou promessa (publicidade de saúde e estética). Para o que não souber, o assistente passa para o WhatsApp da Kamila. Nada é enviado a servidor:
// roda no navegador, não guarda o que a pessoa digita.
import { ENDERECO, HORARIO, SITE } from "@/content/site";

export type Link = { label: string; href: string; externo?: boolean };
export type Resposta = { id: string; texto: string; links?: Link[] };
type Intent = { id: string; chaves: string[]; chip?: string; resposta: Resposta };

const WHATS = { label: "Falar com a Kamila no WhatsApp", href: "WHATSAPP", externo: true } as const;

export const INTENTS: Intent[] = [
  {
    id: "servicos",
    chip: "Quais serviços?",
    chaves: ["servico", "servicos", "tratamento", "oferece", "faz", "fazem", "trabalha", "o que tem", "cardapio"],
    resposta: {
      id: "servicos",
      texto: "Hoje a Kamila atende depilação a laser, limpeza de pele (níveis Bronze, Prata e Ouro), revitalização labial, drenagem facial e corporal, Lipo com as mãos, esfoliação corporal e massagem relaxante.",
      links: [{ label: "Ver os serviços", href: "/#servicos" }],
    },
  },
  {
    id: "laser",
    chaves: ["laser", "depilacao", "depilar", "pelo", "pelos", "buco", "axila", "virilha", "perna"],
    resposta: {
      id: "laser",
      texto: "Na depilação a laser você escolhe a área: buço, queixo e aréola; axila, rosto e linha alba; virilha completa; meia perna; perna completa; costas, abdômen e tórax. Também há kits e pacotes de 10 sessões. A Kamila explica como funciona cada área pelo WhatsApp.",
      links: [{ label: "Depilação a laser", href: "/depilacao-a-laser/" }],
    },
  },
  {
    id: "pele",
    chaves: ["limpeza", "pele", "rosto", "bronze", "prata", "ouro", "labial", "labio", "facial", "drenagem facial"],
    resposta: {
      id: "pele",
      texto: "Para o rosto há limpeza de pele em três níveis (Bronze, Prata e Ouro), revitalização labial e drenagem facial. O que cada nível inclui a Kamila explica pelo WhatsApp antes de você escolher.",
      links: [{ label: "Limpeza de pele", href: "/limpeza-de-pele/" }],
    },
  },
  {
    id: "corpo",
    chaves: ["lipo", "maos", "medidas", "drenagem", "linfatica", "esfoliacao", "massagem", "relaxante", "corpo", "corporal"],
    resposta: {
      id: "corpo",
      texto: "No corpo há a Lipo com as mãos (protocolo manual criado pela própria Kamila, voltado à redução de medidas), drenagem linfática corporal, esfoliação corporal e massagem relaxante.",
      links: [{ label: "Estética corporal", href: "/estetica-corporal/" }],
    },
  },
  {
    id: "horario",
    chip: "Horário",
    chaves: ["horario", "hora", "abre", "fecha", "funciona", "aberto", "fechado", "domingo", "sabado", "segunda"],
    resposta: { id: "horario", texto: `${HORARIO} Esse é o horário do Perfil da Kamila no Google; para um dia específico, confirme pelo WhatsApp.` },
  },
  {
    id: "endereco",
    chip: "Endereço",
    chaves: ["endereco", "onde", "fica", "local", "localizacao", "chegar", "mapa", "rua", "bairro", "pampulha"],
    resposta: {
      id: "endereco",
      texto: `${ENDERECO}, em ${SITE.neighborhood}, ${SITE.city}-${SITE.region}.`,
      links: [{ label: "Como chegar", href: SITE.mapsLink, externo: true }],
    },
  },
  {
    id: "agendar",
    chip: "Como agendar",
    chaves: ["agendar", "agenda", "marcar", "marcacao", "reservar", "horario marcado", "vaga", "quero"],
    resposta: {
      id: "agendar",
      texto: "É rápido: você escolhe o serviço, o dia e o período, e o pedido segue para o WhatsApp da Kamila, que confirma o horário com você. O horário só vale depois da confirmação.",
      links: [{ label: "Agendar agora", href: "/agendar/" }],
    },
  },
  {
    id: "pagamento",
    chip: "Parcelamento",
    chaves: ["parcel", "pagamento", "pagar", "cartao", "pix", "dividir", "4x", "forma de pagamento"],
    resposta: {
      id: "pagamento",
      texto: "A Kamila informa que os serviços podem ser parcelados em até 4x. As formas de pagamento aceitas ela confirma pelo WhatsApp.",
      links: [WHATS],
    },
  },
  {
    id: "preco",
    chaves: ["preco", "precos", "valor", "valores", "quanto", "custa", "custo", "orcamento", "tabela", "promocao", "desconto"],
    resposta: {
      id: "preco",
      texto: "Os valores não ficam no site. A Kamila passa os valores e as condições direto pelo WhatsApp.",
      links: [WHATS],
    },
  },
  {
    id: "saude",
    chaves: ["doi", "dor", "resultado", "resultados", "funciona mesmo", "garante", "garantia", "gravida", "gravidez", "gestante", "amamentando", "amamenta", "contraindicacao", "alergia", "pode fazer", "seguro", "efeito", "cicatriz", "mancha", "emagrece", "emagrecer"],
    resposta: {
      id: "saude",
      texto: "Isso depende de cada pessoa, então não dá para responder por aqui. A Kamila avalia o seu caso e explica tudo com calma pelo WhatsApp, antes de qualquer procedimento.",
      links: [WHATS],
    },
  },
  {
    id: "instagram",
    chaves: ["instagram", "insta", "fotos", "redes", "perfil", "avaliacao", "avaliacoes", "google"],
    resposta: {
      id: "instagram",
      texto: `Você acompanha o dia a dia no Instagram ${SITE.instagramHandle} e vê o Perfil da Kamila no Google Maps.`,
      links: [
        { label: "Instagram", href: SITE.instagram, externo: true },
        { label: "Perfil no Google", href: SITE.googlePerfil, externo: true },
      ],
    },
  },
  {
    id: "oi",
    chaves: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "tudo bem", "e ai"],
    resposta: { id: "oi", texto: "Olá! Posso ajudar com serviços, horário, endereço, como agendar e parcelamento. É só escolher uma opção ou escrever sua pergunta." },
  },
];

export const CHIPS = INTENTS.filter((i) => i.chip).map((i) => ({ id: i.id, label: i.chip as string }));

export const BOAS_VINDAS: Resposta = {
  id: "boas-vindas",
  texto: "Olá! Sou o assistente automático do site da Kamila Oliveira. Respondo com as informações que já estão aqui. Para o resto, passo você para o WhatsApp dela.",
};

export const SEM_RESPOSTA: Resposta = {
  id: "sem-resposta",
  texto: "Não tenho essa informação por aqui. A Kamila responde direto pelo WhatsApp; eu já deixo sua pergunta pronta na mensagem.",
};

const sem = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Procura a resposta pelo número de palavras-chave encontradas. Sem acerto, devolve null. */
export function responder(pergunta: string): Resposta | null {
  const t = ` ${sem(pergunta).replace(/[^a-z0-9 ]/g, " ")} `;
  let melhor: { r: Resposta; n: number } | null = null;
  for (const it of INTENTS) {
    const n = it.chaves.reduce((acc, k) => acc + (t.includes(` ${sem(k)} `) || (sem(k).length > 3 && t.includes(sem(k))) ? 1 : 0), 0);
    const pontos = n + (n > 0 && (it.id === "saude" || it.id === "preco") ? 1.5 : 0); // pergunta de saúde ou preço pesa mais que o nome do serviço
    if (n > 0 && (!melhor || pontos > melhor.n)) melhor = { r: it.resposta, n: pontos };
  }
  return melhor ? melhor.r : null;
}

export const porId = (id: string): Resposta | undefined => INTENTS.find((i) => i.id === id)?.resposta;
