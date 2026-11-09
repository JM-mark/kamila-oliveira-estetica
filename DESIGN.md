---
name: Kamila Oliveira Estética
family: S08 Editorial Luxo Monocromático (preto e off-white, um único acento dourado), direção da revisão 1; logo Rota 2 Assinatura
colors:
  preto: "#0F0D0B"
  off-white: "#F7F3EC"
  areia: "#E9E1D4"
  ouro: "#B8955A"
  ouro-claro: "#D9C08C"
  ouro-profundo: "#7D5F27"
  cinza: "#5E5850"
  suave: "#CFC7B8"
typography:
  display: { family: "Gilda Display", weight: 400, uso: "títulos, numerais, citações", var: "--font-display" }
  label: { family: "Marcellus", weight: 400, uso: "menu, nomes de serviço, rótulos e botões; sempre em caixa-alta", var: "--font-label", tracking: "0.12em a 0.16em" }
  body: { family: "Schibsted Grotesk", weights: [400, 600], uso: "parágrafos, listas, formulários, legendas", var: "--font-body" }
shapes: { card: "0 (cantos retos)", button: "retângulo com preenchimento dourado em onda no hover", frame: "borda de ouro de 2 px com luz que corre" }
motion: { intro: "KO se desenha em ouro e a cortina sobe, 1,2 s, 1x por sessão", hero: "fundo aurora dourado em CSS, lento, reage ao cursor só no desktop (shader WebGL pendente do prompt)", servicos: "acordeão com foto", moldura: "borda dourada de 1 px; luz que corre e aponta para o cursor só no desktop (máx. 3 usos)", reducedMotion: "tudo parado, estado final", proibido: "qualquer efeito preso à rolagem na Home" }
---

# Kamila Oliveira Estética: design system (v2)

## Overview
Editorial luxo monocromático: preto quente e off-white, com o ouro só como acento. A tipografia é Gilda Display nos títulos e Schibsted Grotesk no texto. Cantos retos e o octógono do monograma como forma-assinatura. Sem roxo, lilás, gradiente colorido ou sombra pesada.

## Colors
Preto é fundo e texto; off-white é base; areia alterna seções. Ouro #B8955A só em filete, numeral, ícone e hover, e em texto grande sobre preto. Ouro claro #D9C08C só sobre preto. Ouro profundo #7D5F27 (proposto, aguarda aprovação) para texto pequeno dourado sobre claro.
Contrastes medidos: off-white/preto 17,5:1; ouro claro/preto 11,0:1; ouro/preto 6,9:1; cinza/off-white 6,4:1; cinza/areia 5,4:1; ouro profundo/off-white 5,4:1. Ouro/off-white 2,5:1 (nunca texto).

## Typography
Três papéis, três famílias, todas Google Fonts (OFL), carregadas com `next/font` e `display: swap`, só nos pesos usados (Gilda 400, Marcellus 400, Schibsted 400 e 600):
- **Gilda Display** (primária): títulos, numerais, citações.
- **Marcellus** (secundária, v4): menu, nomes de serviço, rótulos (eyebrows) e botões. Sempre em caixa-alta com `letter-spacing` de 0,12em a 0,16em. **Nunca em texto longo.**
- **Schibsted Grotesk** (texto): parágrafos, listas, opções de formulário, legendas, rodapé corrido. É a fonte de leitura no celular.
Sem itálico (`font-synthesis: none`).

| Papel | Família | Tamanho | Entrelinha | Tracking |
|---|---|---|---|---|
| Hero (h1 da Home) | Gilda | 44 a 92 px | 1,02 | -0,015em |
| h1 | Gilda | 40 a 76 px | 1,04 | -0,012em |
| h2 | Gilda | 32 a 56 px | 1,08 | -0,008em |
| h3 | Gilda | 22 a 30 px | 1,18 | 0 |
| Citação | Gilda | 32 a 56 px | 1,08 | -0,008em |
| Lead | Schibsted 400 | 18 a 21 px | 1,55 | 0 |
| Corpo | Schibsted 400 | 17 px | 1,65 | 0 |
| Lista, opção de formulário | Schibsted 400 | 16 a 17 px | 1,4 a 1,5 | +0,005em |
| Texto secundário | Schibsted 400 | 15 px | 1,6 | +0,01em |
| Legenda, dica, direitos | Schibsted 400 | 13 px | 1,5 | +0,01 a 0,02em |
| Menu (caixa-alta) | Marcellus 400 | 14 px (mínimo) | n/a | +0,12em |
| Menu móvel | Marcellus 400 | 16 px | n/a | +0,14em |
| Nome de serviço (acordeão, caixa-alta) | Marcellus 400 | 16 a 20 px | 1,25 | +0,12em |
| Rótulo / eyebrow (caixa-alta) | Marcellus 400 | 14 px | 1,4 | +0,16em |
| Botão (caixa-alta) | Marcellus 400 | 15 px (mínimo) | 1,2 | +0,14em |

Regras: área de toque de 48 px em menu e botões; `text-wrap: balance` nos títulos e rótulos e `pretty` nos parágrafos; medida de 60 caracteres (62 na política); numerais alinhados; campos de formulário em 16 px (evita zoom no iPhone). O menu completo só aparece a partir de 1100 px de largura (em caixa-alta espaçada ele ocupa mais espaço); abaixo disso, o botão "Menu".

## Layout
Contêiner de 1160 px, gutter de 20 px, seções de 64 a 128 px de respiro. Hero em tela cheia; serviços em acordeão horizontal no desktop e lista empilhada no celular.

## Components
Botão retangular de 52 px (preto; ouro claro sobe no hover; área de toque acima de 48 px); links com sublinhado dourado que cresce da esquerda; moldura de ouro; cards de passos empilháveis; botão flutuante de WhatsApp só no celular.

## Motion
No máximo 1 efeito grande por tela. Tudo respeita `prefers-reduced-motion`. Sem scroll-jacking: o hero usa `position: sticky`. A intro é pulada com clique ou tecla, e some sozinha mesmo sem JavaScript.

## Do's and Don'ts
- Fotos reais e aprovadas dentro da moldura; sem foto, luz e monograma. Banco de imagem só como atmosfera, nunca como resultado, cliente, Kamila ou espaço dela.
- Sem preço, sem promessa de resultado, sem "garantido" ou "definitiva".
- Nada de roxo, lilás, azul ou neon.
