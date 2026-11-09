# Direção de design (v5, 09/11/2026)

Prompt de referência: `site-v5` do Jeff (substitui v2, v3 e v4). Família escolhida pela skill `website-style-catalog`: **S08 Editorial Luxo Monocromático** (preto e off-white, um acento dourado), com fotos reais da Kamila só onde ajudam a confiança (S03, em dose mínima por decisão do Jeff: "não encher o site com as fotos dela").

## Pesquisa das referências (feita em 09/11/2026, abrindo cada página)
| Referência | O que vi | O que foi aproveitado | O que foi descartado |
|---|---|---|---|
| Odyssée Clinic (odysseeclinic.com.au) | Fundo off-white quente (rgb 255,252,248), serifa de alto contraste com grotesca (psTimes e baselGrotesk), título "Medical aesthetics for timeless results.", 9 seções com rótulos em caixa-alta ("WHY ODYSSÉE?", "OUR APPROACH") e blocos curtos de diferenciais | Ritmo editorial de clínica premium: muito respiro, rótulo pequeno em caixa-alta acima de título grande, 3 diferenciais em colunas, texto curto | A paleta clara (aqui o tema é preto e dourado) |
| Solenne (21st.dev, template pago, só olhar) | Fotografia como protagonista, vídeo em tela cheia atrás do nome, seção fixa que muda com o scroll, cards empilhados | Só a sensação de "marca independente", guiada pela imagem | Tudo que prende ao scroll (seção fixa, cards empilhados, vídeo que acompanha): o Jeff proibiu. Fonte e paleta dele não usadas. Nenhum código, texto ou imagem copiado |
| Swishy (swishy.ai) | Catálogo de animações (Logo Reveal, Website reveal, Sentence reveal) | A lógica do preloader (logo que se desenha e cortina que sobe) e do título que sobe por máscara, recriados em SVG e CSS | Qualquer vídeo exportado |
| Siteinspire, Cosméticos e skincare | Lista: SIHA, IWONDERU Studios, Odyssée, Susanne Kaufmann, Abel, Funner; marcadores "Minimal", "Unusual Layout", "E-Commerce" | Confirmou a linha minimalista com tipografia protagonista e poucos elementos | Layouts incomuns demais para um site de serviço local |
| 21st.dev, templates | 302 templates, entre eles Aurea (estúdio odontológico), Forma (pilates), ZEN (agência com shader WebGL, pago) | A ideia de shader WebGL como fundo de hero | Código dos templates |
| Profitize Build | Biblioteca de prompts por componente e por landing page; Moldura é "grátis", Aurora é item premium; o "Copiar prompt" exige login | O comportamento descrito de cada shader | Os prompts (não consegui copiar sem login; ver abaixo) |
| Awwwards (diretório) e recent.design | O diretório do Awwwards abriu só com anúncios; recent.design é curadoria diária (web, motion, branding), exige cadastro para o conteúdo completo | Apenas confirmação de categoria e de padrão de qualidade | Não consegui extrair exemplos específicos |
| Sitereel | Coleção de prompts por categoria (Luxury, Portfolio, Landing Page...) | Nenhum item específico usado | |

## Animações (estado real)
| Item | Estado |
|---|---|
| Shader **Moldura** (WebGL) | FEITO, escrito para este projeto a partir da descrição pública (luz com grão dourada #D9C08C correndo pela borda e esticando para o cursor). 3 usos: logo no hero, foto do "Sobre" e card do CTA final. Celular e reduced motion: borda dourada de 1 px, sem WebGL |
| Shader **Aurora** (WebGL) | FEITO, também escrito para este projeto: fundo do hero em dourado, champanhe e preto, lento, com leve reação ao cursor só no desktop. Fallback em CSS sem WebGL; quadro parado com reduced motion; desiste sozinho se o aparelho não aguentar (< 30 fps) |
| Acordeão de imagens (4 painéis) | FEITO do zero; laser aberto; celular vira lista com abre e fecha |
| Preloader (≤ 1 s, 1ª visita) | FEITO: a borboleta com K da Kamila (vetorizada do arquivo dela) se desenha em traço dourado e a cortina sobe |
| Títulos com split-text | FEITO: as linhas sobem por máscara uma vez ao entrar na tela (não acompanham o scroll) |
| Botões magnéticos com preenchimento dourado, sublinhado dourado nos links | FEITO |
| Cursor customizado (ponto dourado, vira "VER" sobre imagens) | FEITO, só com mouse |
| Marquee lento em Marcellus | FEITO |
| Transição entre páginas (fade com cortina preta) | FEITO (depois de corrigir o pré-carregamento do Next, que dava 404 em cada link) |
| Scroll Expansion Hero e qualquer efeito preso ao scroll | REMOVIDOS |

Os dois shaders do Profitize **não** foram copiados: o botão "Copiar prompt" abre uma tela de assinatura. Se o Jeff quiser o look exato deles, ele cola os prompts e eu troco só `AuroraCanvas.tsx` e `MolduraCanvas.tsx`.

## Logo
Decisão do Jeff: usar o logo atual da Kamila. O arquivo veio da página de agendamento dela (borboleta dourada com K e "Kamila Oliveira" em cursiva, 512x512 sobre preto). Foi apenas limpo o fundo (alfa por luminância), recortado e criada uma versão para fundo claro com a mesma forma (ouro mais escuro). Nada foi redesenhado. O cabeçalho e o rodapé usam as peças originais lado a lado (borboleta e assinatura). Tudo passa pelo componente `<Logo />`; para trocar pelo original, substituir `_originais/logo/` e rodar `scripts/logo-proc.cjs`. A identidade do zero (/brand) vem depois.

## Fotos
- Atmosfera do Pexels com tratamento único de cor (`scripts/process-photos.mjs`), AVIF e WebP com `srcset` (ver `docs/creditos-imagens.md`).
- Fotos reais da Kamila: **uma só no site** (seção "Sobre" e página /sobre), por decisão do Jeff. A seção "Quem cuida de você" (grade) existe no código, mas está desligada (`src/content/espaco.ts` vazio).
- Quadros extraídos do Instagram dela estão só localmente (`_originais/`, fora do git), para aprovação (ver `docs/fotos-instagram.md`).

## Tipografia
Gilda Display (primária), Marcellus (secundária, em caixa-alta) e Schibsted Grotesk (texto). Detalhes no `DESIGN.md`.
