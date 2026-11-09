# Fotos reais da Kamila: o que foi extraído do Instagram (para o Jeff aprovar)

Estado (09/11/2026): extraí quadros **só para olhar e escolher**, com o Chrome já logado no Instagram. Os arquivos ficam em `_originais/instagram/` (pasta fora do git, só nesta máquina). **Na prévia pública está UMA foto dela** (marcada abaixo). Por decisão do Jeff, as fotos dela não devem tomar o site: nenhuma grade, nenhum retrato no hero.

Regras: só com aval escrito da Kamila; rosto ou pele de cliente só com autorização escrita da cliente; nada de antes e depois, preço ou resultado; nada de texto das legendas (algumas prometem resultado). O melhor caminho continua sendo pedir os originais (rascunho em `docs/pedido-arquivos-kamila.md`).

## Quadros extraídos
| Post | O que é | Arquivo local | Uso hoje | Observação |
|---|---|---|---|---|
| https://instagram.com/p/DeuO01HRLIg (arte "Segundo dia de depilação a laser") | Retrato da Kamila de jaleco claro, recortado da arte (o texto e o preço ficam fora do recorte) | `ig-DeuO01HRLIg-arte.jpg` (1440x1920) | **Em uso: seção Sobre e /sobre/** (`public/espaco/jaleco-*`) | É um recorte de uma arte promocional; precisa do aval dela |
| https://instagram.com/p/Dez_PehBLC5 (reel "Luxo acessível") | Retrato de blazer preto, com a borboleta na lapela | `ig-kamila-retrato-*.jpg` | Não publicado | Tem um véu branco do vídeo; recorte sem o texto sobreposto |
| https://instagram.com/p/De2D2_8pfWl (reel "4 coisas que quem faz depilação a laser...") | Kamila com os óculos de proteção do laser | `ig-De2D2_8pfWl-a.jpg` (1076x1915) | Não publicado | É o único quadro com o tema do laser. O outro quadro desse reel mostra a perna de uma cliente: não usar |
| https://instagram.com/p/Dfh3HJxJwZi (reel "Vagas para modelos") | Retrato sorrindo, com o cabelo preso, recortado da arte | `ig-Dfh3HJxJwZi-a.jpg` | Não publicado | A arte tem preços; só o recorte do rosto serviria |
| https://instagram.com/p/DfH1JMgxp9O (arte "O kit de axila + virilha + buço") | Kamila ao ar livre, de blusa preta | `ig-DfH1JMgxp9O-arte.jpg` | Não publicado | A arte tem preço; só o recorte da foto serviria |
| https://instagram.com/p/DeuMdb0xdmz (arte "Redução de medidas") | Retrato de Kamila, recortado da arte | `ig-DeuMdb0xdmz-arte.jpg` | Não publicado | A arte tem preço e fala de "eliminação de toxinas": nunca usar o texto |

## Posts da lista que NÃO servem
| Post | Motivo |
|---|---|
| /p/DfQMoPsp-0y | Close de pele com cravos (cliente) e legenda que promete resultado |
| /p/DfPRk6hhjqa | Reel de uma mulher falando; não confirmei que é a Kamila |
| /p/DfOASylpFy5 | Procedimento com o rosto de uma cliente (tatuagem visível) |
| /p/DexZUvbhBaE | Ilustração animada de folículos; não é foto dela |
| /p/DeuNSMfRRWq | Arte com preços |
| /p/DeuJtvQxQ10 e /p/DeuzZ-0kexy | Antes e depois de pele de clientes |
| Destaque "Antes e Depois" do perfil | Não usar |

## O que o feed NÃO tem
Fotos do espaço (sala, maca, recepção, fachada) e do aparelho de laser em uso. Para a seção "Quem cuida de você" voltar (4 ou mais fotos), precisamos dos originais.

## Como ligar ou trocar
- Foto do Sobre: `FOTO_SOBRE` em `src/content/espaco.ts`, ou `SITE.kamilaPhoto` em `src/content/site.ts` para um arquivo novo. Reprocessar com `node scripts/process-espaco.mjs`.
- Grade "Quem cuida de você": listar 4 ou mais fotos aprovadas em `ESPACO` (hoje vazia, e por isso desligada).
