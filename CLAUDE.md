# Kamila Oliveira Estética: site e identidade

Prévia: https://jm-mark.github.io/kamila-oliveira-estetica/ (GitHub Pages, noindex) · repo público `JM-mark/kamila-oliveira-estetica`, só deste cliente. Deploy automático a cada push na `main` (workflow `.github/workflows/pages.yml`, basePath `/kamila-oliveira-estetica`). O briefing interno (`docs/briefings-v1.md`) fica fora do repo.
Stack do site: Next.js 16 (App Router) + TypeScript + Tailwind v4, export estático. Comandos: `npm run dev`, `npm run lint`, `npm run build`, `npm run build:cloudflare` (gera `kamila-oliveira-estetica-cloudflare.zip` na raiz, sem basePath, noindex). Conteúdo e flags em `src/content/` (`site.ts` concentra WhatsApp, agenda online, indexação, GA4). Design system em `DESIGN.md`; decisão de estilo em `docs/design-direction.md`.

Pacote: identidade + site (/brand + /site). Idioma: PT. Briefing completo: `docs/briefings-v1.md` (v1, 09/11/2026).

## Status
- 09/11/2026: pasta criada em E:, briefing salvo.
- 09/11/2026: /brand v1 feito: prancha com 2 rotas em `identidade/prancha-rotas.html` (A grafite/pérola/ouro champagne, Bodoni Moda + Hanken Grotesk; B creme/malva/ameixa, Newsreader itálico + Albert Sans). Aguardando escolha do Jeff/Kamila. Logos são estudos com fonte web, ainda sem SVG final em curvas. Nenhuma checagem de concorrentes (Mari de Águia, Accanto) feita. Site não começou.
- 09/11/2026: Rota B desenvolvida: 8 SVGs com texto em curvas em `identidade/logos/` e manual em `identidade/manual-de-marca.html`. Fontes OFL em `identidade/fontes-origem/`. Sem PNG/PDF ainda. Ícones dos destaques do Instagram ainda não feitos.
- 09/11/2026: /site v1 feito (prévia, noindex): Home, Depilação a laser, Limpeza de pele, Estética corporal e relaxamento, Agendar (stepper de 4 etapas que abre o WhatsApp), Sobre, Contato, Privacidade, 404. Estilo S01 com paleta da Rota B. Lint, tsc e build passam; ZIP Cloudflare gerado. QA Playwright em 360/390/768/1440 px no Chrome e no WebKit: sem rolagem horizontal, 1 H1 por página, fluxo do agendamento e menu móvel OK. Sem fotos (arco mostra o monograma), sem preços, sem avaliações, sem botox/preenchimento.
- 09/11/2026: owasp-security e varredura vbs: sem vulnerabilidade explorável (notas: validar formato do ID do GA4; CSP opcional). Reality Checker: NEEDS WORK (bloqueio: WhatsApp provisório). Corrigidos P2: data passada no stepper, CTAs sumindo sem JS, foco em seção escura, alvos de toque 44 px, faixa "noite" removida (horário não confirmado), contraste malva/creme corrigido para 6,0:1; também Esc fecha o menu e a barra do stepper tem 4 segmentos. Retestado em Chrome e WebKit (360/390/768/1440).
- Não feito: teste RTL (não se aplica, só PT), animação do Jeff, GA4 e banner de consentimento, JSON-LD completo (falta telefone, endereço, horário), mapa.
- Testado: sem rolagem horizontal em 375 e 1440 px (Chromium); WebKit/iPhone ainda não testado.

## Decisões que não mudam sem pedir
- Identidade do zero (pedido do Jeff); manter o nome e o @kamilaoliveiraestetica.
- SUBSTITUÍDA em 09/11/2026 pela revisão 1 (decisão do Jeff no chat): paleta preto quente #0F0D0B, off-white #F7F3EC, areia #E9E1D4, ouro #B8955A (só detalhe), ouro claro #D9C08C (só sobre preto), cinza #5E5850; sem roxo nem lilás; tipografia nova, inédita nos outros clientes. O logo vem de uma das 2 rotas novas em `identidade/v2/prancha-rotas-v2.html` (escolha pendente). Antes valia: Rota B (obsoleta): creme #FAF5EF, malva #6A5580, ameixa #2B2030, névoa #C9BBD6, cinza ameixa #5F5563; Newsreader itálico + Albert Sans; monograma "ko" em arco. Rota A descartada. Aguarda aprovação da Kamila.
- Não repetir tipografia/paleta de OS Clínica, Thaís Andrade, NS Concept, Juliana Rosa (ver lista no briefing).
- Duas rotas de identidade antes de fechar.
- Sem promessa de resultado, sem "garantido", sem "definitiva"; sem preços no site (a confirmar com a cliente).
- Prévia com noindex/nofollow e robots Disallow: /. Nada em produção sem aval do Jeff.
- Agendamento guiado em etapas que abre o WhatsApp; link da agenda online por flag, só após a Kamila reativá-la.

## Revisão 1 (09/11/2026): estado por item
Fontes: revisao-1-e-site-v2.md e animacoes-v2.md (Downloads do Jeff). Decisões do Jeff no chat: paleta preto/off-white/dourado; logo Rota 2 Assinatura (Gilda Display + Schibsted Grotesk). Direção: S08 Editorial Luxo Monocromático.
- P1.1 paleta: FEITO. Tokens novos no CSS e no DESIGN.md; sem roxo/lilás no código. Ouro profundo #7D5F27 (texto pequeno dourado sobre claro) proposto, aguarda aprovação.
- P1.2 fotos: PENDENTE. O site não tem foto. Falta a lista de até 8 fotos do Instagram para o Jeff aprovar antes de baixar e a atmosfera Pexels/Pixabay. Os espaços de foto mostram luz e o monograma. Para ligar: `SITE.heroVideo`/`heroPoster` em `src/content/site.ts` e `src` do `PhotoSlot`.
- P1.3 processo/referências: PARCIAL. `docs/design-direction.md` refeito (S08, pontuação, uso de cada referência). Os links da pesquisa NÃO foram lidos (Firecrawl sem créditos em 09/11).
- P2.1 hero: FEITO sem vídeo (intro KO + hero que expande ao rolar no desktop; no celular tela cheia com CTA sem rolar).
- P2.2 motion: PARCIAL. Feitos: intro, hero expansivo, text rotate, acordeão, cards empilhados, moldura de ouro, botão com onda, sublinhado dourado. NÃO feitos: Zoom Parallax e Polaroid (precisam de fotos reais), shader Moldura WebGL (usei CSS), Lenis, cursor "Ver".
- P2.3 cards de serviço: PARCIAL. Acordeão com áreas, CTA `?servico=` e laser aberto; sem imagens ainda.
- P2.4 mapa: FEITO por flag (`SITE.mapEmbed` vazio).
- P2.5 logo: FEITO (Rota 2 escolhida).
- P3.1 canonical: PENDENTE (ZIP aponta para pages.dev; trocar no build do domínio oficial com `NEXT_PUBLIC_SITE_URL`).
- P3.2 botão flutuante: FEITO (preto e ouro; rodapé com folga no celular).
- Não mexer: agendamento em 4 etapas, sem preços, sem promessa de resultado, títulos/descrições locais, noindex.
- QA 09/11/2026 (Chrome e WebKit; 360/390/768/1440): sem rolagem horizontal, 1 H1 por página, CTA do hero visível sem rolar no celular, intro 1x por sessão e pulável, movimento reduzido e sem JS OK, alvos de toque >= 44 px, agendamento OK. LCP local do Chromium sem throttling 104 ms e CLS 0 (não é medida em 4G). Vídeo da Home não gerado (sem ffmpeg compatível): prints e sequência WebKit em `entrega/v2/`.
- Bug achado no teste e corrigido: a animação da moldura se chamava `spin` e colidia com a do Tailwind (girava a caixa); renomeada para `frame-spin`.

## Pendências (A CONFIRMAR com a cliente)
Meta de faturamento e linha de base; nome oficial; endereço (Mansueto Filizzola 16 x Guarapari 1456); WhatsApp (5531999274642 x 31 99475-0351); horário; logo atual; fotos do espaço e dela; formação/certificados; registro do responsável técnico; quem aplica botox/preenchimento; autorizações de antes e depois; domínio; quem aprova; prazo; reativar agenda online e corrigir preços de R$ 1,50; criar Perfil da Empresa no Google.

## Decisões de implementação (site)
- WhatsApp provisório 5531999274642 (botão da agenda); confirmar com a Kamila. Trocar em `src/content/site.ts`.
- Agenda online: `SITE.agendaEnabled=false`; ligar só depois que a Kamila reativá-la e corrigir os preços de R$ 1,50.
- Antes de ativar GA4 (`NEXT_PUBLIC_GA_ID`), decidir aviso de cookies/consentimento e atualizar a Privacidade.

## Pendências técnicas (Reality Checker)
- Privacidade: identificar a responsável (razão social/CPF-CNPJ e contato) e citar Google (GA4) e hospedagem antes de ligar o GA4 e de ir ao domínio oficial.
- Confirmar horário de funcionamento; só então voltar a oferecer período "noite".
- Conferir no Cloudflare Pages o prefetch (404 em `__next.*.txt` apareceu no servidor estático de teste).
- Open Graph sem imagem; canonical depende de `NEXT_PUBLIC_SITE_URL` no build do domínio oficial.

## Histórico de revisões
- v1 (09/11/2026): briefings /brand e /site recebidos; 2 rotas de identidade apresentadas (pendente aprovação).
- v1.1 (09/11/2026): Jeff escolheu a Rota B; logos finais em SVG e manual de marca criados (pendente aprovação da Kamila).
- v2 (09/11/2026): primeira versão do site (prévia noindex) e ZIP Cloudflare; aguarda revisão do Jeff e dados da Kamila.
- v2.1 (09/11/2026): prévia publicada no GitHub Pages (noindex); 11 URLs conferidas com status 200.
- v2.2 (09/11/2026): correções P2 do Reality Checker (local, ainda não enviadas ao GitHub).

| Data | Pedido | Feito | Pendente |
|---|---|---|---|
| 09/11/2026 | Revisão 1 + /site v2 + pacote de animações | Decisões do Jeff registradas; 2 rotas de logo na paleta nova com SVGs em curvas e prancha (`identidade/v2/`) | Escolha da rota; paleta, fotos, motion e páginas do site v2; pesquisa das referências; docs/design-direction.md novo; canonical e botão flutuante |
| 09/11/2026 | Escolha do logo + site v2 | Rota 2 escolhida; site v2 construído (paleta, tipografia, intro, hero, acordeão, cards, moldura, flags de mapa e vídeo); docs de design; QA em Chrome e WebKit; ZIP regerado; prints em `entrega/v2/` | Fotos e vídeo reais, Zoom Parallax, Polaroid, Lenis, pesquisa dos links, aprovação do ouro profundo, canonical de produção; commit e push (não feitos) |
