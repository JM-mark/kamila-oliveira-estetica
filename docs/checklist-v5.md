# Checklist final do v5 (09/11/2026) e provas

Legenda: [x] feito e verificado; [~] feito com ressalva; [ ] não feito.

- [x] `docs/design-direction.md` com as referências pesquisadas e o que foi usado de cada uma (e o que não consegui ler: Awwwards e recent.design).
- [x] `DESIGN.md` com os tokens (cores, Gilda Display, Marcellus e Schibsted).
- [x] Nenhum Scroll Expansion Hero nem efeito que cresce com o scroll. Prova: o teste confere que não há nenhum elemento `position: sticky` fora do cabeçalho, nem `<video>`, nos 6 tamanhos e nos 2 motores.
- [~] Moldura, Aurora e acordeão funcionando, com fallback no celular e em reduced motion. **Ressalva:** os dois shaders foram escritos por mim a partir da descrição pública, porque os prompts do Profitize pedem login. Prova: shader Aurora ligado nos 2 motores; Moldura ligada só no desktop e com 0 canvases ativos no celular; reduced motion sem shader; sem WebGL o fundo CSS aparece e não há erro.
- [~] Toda seção com imagem; `docs/creditos-imagens.md` e `docs/fotos-instagram.md` prontos para o Jeff. **Ressalva:** "Como agendar" usa uma foto de atmosfera; o card do CTA final e o preloader não têm foto (CTA final tem mármore ao fundo). A grade de fotos reais está desligada por decisão do Jeff.
- [x] Nenhum roxo ou lilás; nenhum texto inventado (diferenciais só com fatos do briefing e da agenda); `// TODO` e `docs/pendencias-cliente.md` onde falta dado.
- [x] `noindex, nofollow` em todas as páginas e `Disallow: /` no robots (prévia). Canonical só na produção.
- [x] Testado em WebKit (iPhone) e Chromium nos 6 tamanhos (360, 390, 768, 1024, 1280, 1440): sem rolagem horizontal, 1 H1 por página, alvos de toque ≥ 48 px, menu e Esc, agendamento, preloader, reduced motion, sem JS, navegação sem recarga. Prints em `entrega/v5/`.
- [~] Vídeo de tela da Home no iPhone e no desktop: `entrega/v5/home-iphone-webkit.webm` e `home-desktop-chromium.webm`. **Ressalva:** são sequências de capturas costuradas (~7 quadros por segundo), porque o gravador de vídeo do Playwright precisa de um `ffmpeg` incompatível com o instalado aqui; mostram o fluxo, mas não a fluidez real a 60 fps.
- [x] Relatório do Lighthouse no celular: `entrega/v5/lighthouse-celular.html` (melhor de 3 execuções).
  - Performance **91**, Acessibilidade **100**, Boas práticas **100**, SEO **66**.
  - SEO 66 é só a prévia bloqueada de propósito (`is-crawlable`: "Page is blocked from indexing"); o `robots.txt` está válido. No domínio oficial, sem `noindex`, esse item some.
  - Condições do laboratório: celular, 4G lento simulado, CPU 4× mais lenta e WebGL em software. TBT 50 a 70 ms, CLS 0. LCP de laboratório 3,4 a 3,6 s, **acima** da meta de 2,5 s.
  - Medição mais realista (Chromium, 4G de 1,6 Mbps e 150 ms): **LCP 2,0 s na 1ª visita (com preloader) e 0,9 a 1,0 s nas seguintes, CLS 0**, abaixo da meta.
- [x] Lista do que ficou A CONFIRMAR: `docs/pendencias-cliente.md`.

## Não consegui / ficou de fora (dito com franqueza)
- Os prompts originais do Profitize (login).
- Leitura dos exemplos do Awwwards e do recent.design (anúncios e cadastro).
- Vídeo de tela em 60 fps e teste em iPhone físico (usei o WebKit do Playwright).
- Foto real do espaço, do aparelho de laser e logo original: dependem da Kamila.
- "Como é a sessão" e perguntas frequentes nas páginas de serviço: só com texto confirmado por ela.
