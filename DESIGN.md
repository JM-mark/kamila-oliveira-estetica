---
name: Kamila Oliveira Estética
family: S01 Clínica Boutique Clara, com a paleta e as formas da Rota B (manual em identidade/manual-de-marca.html)
colors:
  creme: "#FAF5EF"
  surface: "#FFFFFF"
  ameixa: "#2B2030"
  malva: "#6A5580"
  nevoa: "#C9BBD6"
  cinza: "#5F5563"
typography:
  display: { family: "Newsreader", style: italic, weight: 400, h1: "clamp(40px, 8.2vw, 76px)", h2: "clamp(30px, 5vw, 48px)", h3: "clamp(22px, 3vw, 28px)" }
  body: { family: "Albert Sans", weight: 400, size: "17px", leading: 1.6 }
  eyebrow: { family: "Albert Sans", weight: 600, size: "13px", transform: uppercase, tracking: "0.16em" }
  button: { family: "Albert Sans", weight: 600, size: "16px", height: "52px" }
shapes: { card: "22px", button: "pílula", arch: "arco do logo (topo semicircular, base 24px)" }
motion: { assinatura: "fade + subida curta de 14px ao rolar", duracao: "600ms", reducedMotion: "desligado" }
---

# Kamila Oliveira Estética: design system

## Overview
Clínica boutique clara: fundo creme, texto ameixa, malva como cor de ação. O arco do logo é a forma-assinatura: molduras de foto, monograma e painéis. Nada de gradiente, sombra pesada ou ícone decorativo.

## Colors
Creme domina (fundo), malva é ação (botões, links, números), ameixa é texto e a seção escura, névoa é fundo de apoio. Névoa nunca vira texto sobre creme.
Contrastes medidos: ameixa/creme 14,3:1; creme/malva 6,0:1; cinza/creme 6,5:1; malva/creme 6,0:1; ameixa/névoa 8,6:1.

## Typography
Newsreader itálico nos títulos, Albert Sans no resto. Texto corrido até 62 caracteres por linha.

## Layout
Contêiner de 1120 px, gutter de 20 px no celular, seções com respiro de 56 a 112 px. Hero em 2 colunas a partir de 900 px.

## Components
Botão pílula de 52 px; card branco com borda de 1 px semitransparente; lista de serviços em linhas finas; stepper de 4 etapas em card de 28 px; botão flutuante de WhatsApp só no celular.

## Motion
Revelar ao rolar, só com JavaScript ativo e desligado em `prefers-reduced-motion`. Nunca esconde CTA. Animação autoral do Jeff entra quando o prompt chegar.

## Do's and Don'ts
- Fotos reais e aprovadas dentro do arco; sem foto, mostrar o monograma (nunca foto de banco como resultado, cliente ou espaço).
- Sem preço, sem promessa de resultado, sem "garantido" ou "definitiva".
- Nada de gradiente roxo, sombras pesadas, emoji como ícone.
