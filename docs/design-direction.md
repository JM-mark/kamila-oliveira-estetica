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
