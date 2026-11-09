// Posts do Instagram da Kamila (@kamilaoliveiraestetica) para a seção "No Instagram". Grade ESTÁTICA, sem embed e sem widget de terceiros
// (pesados e com cookies: LGPD). Para trocar os posts, mexer só aqui e rodar `node scripts/process-instagram.mjs` com o quadro em _originais/instagram.
//
// REGRAS (prompt v6): só post com o aval da Kamila; nada com rosto ou pele de cliente sem autorização escrita; nada de antes e depois;
// nada com preço; nada de conteúdo de outra conta. Entra na grade só o que está com `aprovado: true`. Registro em docs/fotos-instagram.md.
export type InstaPost = {
  id: string;
  url: string;
  /** nome base em /public/instagram (vazio = sem imagem, não entra) */
  image: string;
  alt: string;
  /** legenda curta e real do post, até 60 caracteres */
  caption: string;
  tipo: "reel" | "post";
  aprovado: boolean;
  /** por que entrou ou ficou de fora */
  nota: string;
};

export const POSTS: InstaPost[] = [
  { id: "De2D2_8pfWl", url: "https://instagram.com/p/De2D2_8pfWl", image: "oculos", alt: "Quadro do reel: Kamila com os óculos de proteção do laser", caption: "4 coisas que quem faz depilação a laser nunca vai dizer", tipo: "reel", aprovado: true, nota: "Kamila no quadro, sem cliente. TODO aval escrito da Kamila." },
  { id: "DfPRk6hhjqa", url: "https://instagram.com/p/DfPRk6hhjqa", image: "fala", alt: "Quadro do reel de Kamila Oliveira, com texto sobre empreender", caption: "Não.. Tenho muitas clientes fiéis e muitas que ainda virão", tipo: "reel", aprovado: true, nota: "Parece a Kamila (mesmo cabelo e brinco); confirmar com ela. TODO aval escrito." },
  { id: "Dez_PehBLC5", url: "https://instagram.com/p/Dez_PehBLC5", image: "retrato", alt: "Quadro do reel: retrato de Kamila Oliveira de blazer preto", caption: "O luxo acessível que você merece!", tipo: "reel", aprovado: true, nota: "Reserva da lista do Jeff. Retrato dela, sem cliente. TODO aval escrito." },

  // Fora da grade (regras do v6 e do v5):
  { id: "DfQMoPsp-0y", url: "https://instagram.com/p/DfQMoPsp-0y", image: "", alt: "", caption: "", tipo: "reel", aprovado: false, nota: "Close de pele de cliente e marca d'água de outra conta; a legenda promete resultado." },
  { id: "DfOASylpFy5", url: "https://instagram.com/p/DfOASylpFy5", image: "", alt: "", caption: "", tipo: "reel", aprovado: false, nota: "Mostra o rosto de uma cliente em procedimento (sem autorização escrita)." },
  { id: "DexZUvbhBaE", url: "https://instagram.com/p/DexZUvbhBaE", image: "", alt: "", caption: "", tipo: "reel", aprovado: false, nota: "Conteúdo de outra conta (marca d'água renatafelix.estetica): direitos de uso." },
  { id: "DeuzZ-0kexy", url: "https://instagram.com/p/DeuzZ-0kexy", image: "", alt: "", caption: "", tipo: "post", aprovado: false, nota: "Antes e depois de pele de cliente." },
  { id: "DeuNSMfRRWq", url: "https://instagram.com/p/DeuNSMfRRWq", image: "", alt: "", caption: "", tipo: "post", aprovado: false, nota: "Arte com preços (R$)." },
  { id: "DeuJtvQxQ10", url: "https://instagram.com/p/DeuJtvQxQ10", image: "", alt: "", caption: "", tipo: "post", aprovado: false, nota: "Antes e depois de extração de cravos (cliente)." },
];

export const POSTS_APROVADOS = POSTS.filter((p) => p.aprovado && p.image).slice(0, 6);
