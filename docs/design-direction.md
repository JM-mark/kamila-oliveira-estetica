# Direção de design (v2, revisão 1 de 09/11/2026)

## Família escolhida
**S08 Editorial Luxo Monocromático** (preto e off-white, ouro como único acento), conforme a direção do Jeff na revisão 1. Logo: Rota 2 Assinatura (Gilda Display + Schibsted Grotesk).

## Alternativas e notas (0 a 10; peso: nicho 30, marca 20, valor 20, conversão 15, viabilidade 15)
| Estilo | Nicho | Marca | Valor | Conversão | Viabilidade | Total |
|---|---|---|---|---|---|---|
| S08 Editorial Luxo Monocromático | 8 | 10 | 9 | 7 | 7 | 8,3 |
| S03 hero de foto em tela cheia | 8 | 8 | 9 | 8 | 4 (sem fotos reais aprovadas) | 7,4 |
| S01 Clínica Boutique Clara | 8 | 6 | 7 | 8 | 9 | 7,5 (evitar: era a v1 e já é a OS Clínica) |
Notas atribuídas por mim; o Jeff pode rever.

## Referências do pacote de animações (como foram usadas)
| Referência | Uso na v2 | Estado |
|---|---|---|
| Swishy, Logo Reveal e Website reveal | Intro: o monograma KO se desenha em ouro e a cortina sobe. Recriada em SVG e CSS, sem vídeo | Feito |
| 21st.dev, Scroll Expansion Hero (MIT) | Hero que se expande ao rolar. Implementado do zero com `position: sticky` e `clip-path`, sem a biblioteca e sem framer-motion. Só desktop | Feito (sem vídeo ainda) |
| 21st.dev, Text Rotate | Palavras girando no subtítulo (laser, pele, corpo, bem-estar) | Feito, do zero |
| 21st.dev, Interactive Image Accordion | Acordeão de serviços com 4 painéis; laser aberto; lista empilhada no celular | Feito, do zero, sem fotos |
| 21st.dev, Solenne (pago, só olhar) | Cards de passos que se empilham (`sticky`) | Feito, recriado do zero |
| Profitize, Moldura | Moldura de ouro com luz que corre pela borda. Versão em CSS (`conic-gradient`), sem WebGL | Feito como aproximação; o shader não foi usado |
| 21st.dev, Interactive Hover Button | Botões pretos com preenchimento dourado em onda no hover | Feito, do zero |
| 21st.dev, Zoom Parallax | Seção "O espaço" | NÃO feito: exige fotos reais do espaço |
| Profitize, Polaroid Line Carousel | Bastidores | NÃO feito: só com 6+ fotos reais aprovadas |
| Lenis | Rolagem suave | NÃO feito |
Nenhum componente de terceiros foi copiado nem instalado, então não há licença a registrar além da MIT do Scroll Expansion Hero, usado só como referência de comportamento.

## Pesquisa
Os links da revisão (Profitize, Awwwards, recent.design, Siteinspire, Sitereel, 21st.dev, Swishy) NÃO foram lidos nesta rodada: o Firecrawl estava sem créditos e a leitura pelo navegador não foi feita. As decisões acima vêm das descrições dos próprios briefings. Pendente.

## Pendente
- Fotos reais aprovadas pela Kamila e atmosfera Pexels/Pixabay (registrar em `docs/creditos-imagens.md`).
- Vídeo de atmosfera do hero (`SITE.heroVideo`).


## v3 (revisão 2, 09/11/2026)
- **Logo PROVISÓRIO.** Decisão do Jeff: o logo atual da Kamila (perfil do Instagram) é o logo da prévia. Não consegui o arquivo (o Instagram exige login e o avatar público é pequeno demais), então ficou a composição tipográfica atual com `// TODO logo-original`. Tudo passa pelo componente `<Logo />`; trocar os arquivos de `public/brand/` (mesmos nomes) basta. A identidade do zero (/brand) vem depois e já está vendida.
- **Imagens.** Atmosfera do Pexels com tratamento único de cor (`scripts/process-photos.mjs`), AVIF e WebP com `srcset`; vídeo do hero de 3,89 MB com poster. Créditos em `docs/creditos-imagens.md`. Fotos reais: `docs/fotos-instagram.md` e `docs/pedido-arquivos-kamila.md`.
- **Os 5 efeitos premium:**
  1. Intro de marca: feito (SVG e CSS).
  2. Hero com expansão e vídeo: feito (do zero, sticky e clip-path; no celular, tela cheia).
  3. Acordeão de serviços com foto: feito.
  4. O espaço (Zoom Parallax + Lenis): componente e Lenis prontos; a seção fica DESLIGADA (`SITE.spacePhoto` vazio) porque o centro precisa ser foto real do espaço, aprovada. Testada ligada com uma foto provisória.
  5. Moldura de ouro: feita em CSS (`conic-gradient`) com a luz apontando para o cursor no desktop e borda estática no celular. O shader WebGL do Profitize NÃO foi usado.
- **Apoio:** cards empilhados, botões com onda dourada, sublinhado dourado. Text Rotate e Polaroid ficaram fora, como pedido (o Text Rotate da v2 foi removido do hero).
- **Detalhes:** favicon e ícone Apple, imagem de compartilhamento 1200x630, 404 no estilo, transição suave entre páginas (opacidade), foco visível, canonical só em produção.
- **Tipografia:** refinada em toda a escala (ver DESIGN.md).


## v4 (animações e fonte escolhidas pelo Jeff, 09/11/2026)
- **Removido:** o Scroll Expansion Hero (vídeo que cresce com o scroll), o vídeo do hero, o Zoom Parallax, o Lenis e os cards que se empilham (sticky). Nada fica preso à rolagem na Home. A seção "O espaço" (zoom parallax) saiu.
- **Hero:** fundo aurora (dourado, champanhe e preto) em CSS, lento, que reage ao cursor só no desktop. É **provisório**: o shader Aurora (WebGL, Profitize) exige que o Jeff cole o prompt (a página pede login; a Aurora aparece como item premium). Quando vier, o fundo `.aurora-wrap` em `Hero.tsx` é trocado, com o WebGL carregado só quando a seção aparece.
- **Moldura:** borda dourada estática de 1 px por padrão. No desktop com mouse, 3 usos animados (Sobre na Home, CTA final e página /sobre): luz que corre e aponta para o cursor, em CSS. O shader WebGL da Moldura também depende do prompt do Jeff (a página é "grátis" mas pede login para copiar).
- **Acordeão:** mantido (4 painéis com foto, laser aberto, botão `?servico=`, lista no celular). Foi construído do zero; o "Copiar prompt" do 21st.dev não foi usado.
- **Tipografia:** Gilda Display (primária) e Schibsted Grotesk (texto) mantidas; **Marcellus** entra como secundária em menu, nomes de serviço, rótulos e botões, em caixa-alta com 0,12em a 0,16em (ver DESIGN.md). Não é usada em texto longo.
- **Fotos do Instagram:** ver `docs/fotos-instagram.md`. O feed não tem fotos do espaço; a seção "Por dentro do espaço" fica pronta e oculta até chegarem 4 a 6 fotos reais aprovadas.
- Fotos de Pexels continuam só como atmosfera (serviços e fundos). O vídeo do hero foi retirado do site.
