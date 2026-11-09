// "Por dentro do espaço": fotos REAIS da Kamila, só com o aval escrito dela (e autorização escrita de quem aparecer).
// Enquanto estiver vazio, a seção não aparece no site. Legenda curta e verdadeira (ex.: "Sala de atendimento").
// Candidatas e aprovações: docs/fotos-instagram.md. Arquivos em /public/espaco, tratados por scripts/process-photos.mjs.
export type EspacoFoto = { src: string; alt: string; caption: string };

export const ESPACO: EspacoFoto[] = [];
