// Fotos REAIS da Kamila: quadros do Instagram dela, para o Jeff aprovar ANTES de publicar (docs/fotos-instagram.md).
// Troque pelos originais quando ela enviar. Cada legenda é curta e verdadeira. Nada de antes e depois, preço ou resultado.
// Arquivos em /public/espaco, gerados por scripts/process-espaco.mjs.
export type FotoReal = { name: string; alt: string; caption: string };

export const FOTO_HERO: FotoReal = { name: "retrato", alt: "Kamila Oliveira de blazer preto, sorrindo, com uma borboleta dourada na lapela", caption: "Kamila Oliveira" };
export const FOTO_SOBRE: FotoReal = { name: "jaleco", alt: "Kamila Oliveira de jaleco claro, olhando para a câmera", caption: "Kamila Oliveira" };

/** Seção "Quem cuida de você" (grade de fotos reais). DESLIGADA por decisão do Jeff: as fotos dela não podem tomar o site todo.
 *  Com menos de 4 itens a seção não aparece. Para ligar, listar 4 ou mais fotos aprovadas aqui. */
export const ESPACO: FotoReal[] = [];
