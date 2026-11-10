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
- LOGO PROVISÓRIO (decisão do Jeff, 09/11/2026): o logo da Kamila é o da página de agendamento dela (borboleta dourada com K e "Kamila Oliveira" em cursiva, 512 px), limpo e recortado, sem redesenhar. Trocar pelo original quando chegar (`_originais/logo/` + `scripts/logo-proc.cjs`). Tudo passa pelo componente `<Logo />`.
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

## v7 (10/11/2026): site refeito com a estrutura e as animações do OS Clínica
Pedido do Jeff: manter a identidade da Kamila (cores e fontes) e copiar a animação do OS Clínica (`E:\OS Clinica - Site\os-clinica`). Isso SUBSTITUI a regra da v4 "nada preso à rolagem": agora Lenis, vitrine fixa e frase por palavra são desejados.
- Novo: `framer-motion`, `lenis`, `lucide-react` (gsap foi removido; o Lenis carrega 1,2 s depois do load). Primitivas em `src/components/motion/primitives.tsx` (Reveal, MaskLines, SectionHead, HairLine, Roll, hooks `useRichMotion`/`useReduce`). CSS novo com prefixo `x-` no fim de `globals.css`.
- Header: pílulas de vidro sobre o hero, barra clara depois, menu em tela cheia que desce em cortina (clip-path). Hero: vídeo + Aurora ao fundo, título por palavra em máscara (em CSS, sem esperar JS), arco claro com a logo e anel de texto que cresce e gira ao rolar (desktop).
- Home: Hero, Diferenciais, frase que acende palavra por palavra, cartões de serviço com lista fixa, vitrine fixa "Em destaque" com contador, Quem atende (arco com foto e pilares), Instagram, jornada fixa em 3 passos, avaliação do Google, Onde estamos, fechamento. Páginas de serviço e Sobre no mesmo idioma (arco, máscara, linhas que se desenham). Barra fixa no celular e botão redondo do WhatsApp no desktop.
- Efeitos presos à rolagem só em telas >= 1024 px e sem "reduzir movimento"; no celular entram listas simples com Reveal.
- Lighthouse celular 88-89 / 100 / 100 / 66. QA Chrome e WebKit (360 a 1440): sem rolagem horizontal, 1 H1, menu, vitrine fixa, agendamento, reduced motion e sem JS OK. Prints em `entrega/v7/`.
- Não copiado: agendamento embutido na Home (o OS tem; aqui continua em `/agendar/` por decisão anterior), FAQ e prova social com nota (sem dado real).

## v6.3 (10/11/2026): celular, SEO e copy
- Animações no celular: o shader Moldura agora roda também sem mouse (a luz percorre a borda sozinha) e só carrega quando a moldura chega perto da tela; Aurora e vídeo do hero também rodam no celular (início em 4,2 s e 3,2 s). Movimento reduzido continua parado.
- SEO e copy: ver `docs/auditoria-seo-copy.md` (títulos, descrições, schema com telefone/geo/Perfil do Google, textos revisados).
- Lighthouse celular 89 / 100 / 100 / 66 (3 rodadas iguais; LCP de laboratório 3,7 s). Para 90+, tirar o vídeo no celular.

## v6.2 (10/11/2026): hero com vídeo, Google Maps
- Hero: vídeo de tratamento (Pexels 3998272, cottonbro studio; óleo sobre a pele, sem rosto) no FUNDO, sob a Aurora (mix-blend screen), com título à esquerda e SEM moldura/card (pedido do Jeff). 243 KB; só começa após o load (2,2 s desktop, 4,2 s celular), pausa fora da tela, parado com movimento reduzido. A foto da Kamila saiu do hero (arquivos removidos).
- Google Maps (Chrome do Jeff): o Perfil existe, 5,0 com 2 avaliações. Dados confirmados lá: endereço, telefone igual ao do site, horário terça a sábado 8h às 18h. Entraram: horário no site (`HORARIO`, JSON-LD `openingHours`), dias fechados no calendário do agendamento (domingo e segunda), "Como chegar" pelo Perfil, e 1 trecho de avaliação em "No Google" na Home (sem nota nem contagem; TODO aval da Kamila). A avaliação que fala em "resultado" ficou de fora.
- Lighthouse celular com vídeo: 89 / 100 / 100 / 66 (era 90); o LCP simulado é o quadro de capa do vídeo.

## v6.1 (09/11/2026): pedidos do Jeff após a v6
- Hero: foto da Kamila (reel do Instagram, ao ar livre) no lugar do card do logo (`FOTO_HERO`, `public/espaco/hero-*`); aval escrito dela pendente. Textos: "Luxo é se sentir bem todos os dias" só no hero (Sobre agora "Conheça quem cuida de você"); diferencial 03 e CTA final reescritos para não repetir.
- Pampulha: foto de lugar (Pexels 32163514, Jerson Martins, igreja ao pôr do sol, "imagem ilustrativa") em "Onde estamos".
- Endereço: o Jeff pediu mostrar em vez de "pedir pelo WhatsApp". Entrou "Rua Monsueto Filizzola, 16, esquina com a Avenida Guarapari" (arte da própria Kamila); TODO confirmar grafia e "Guarapari 1456". Mapa Google Maps embed em /contato (privacidade atualizada) e botão "Como chegar".
- Agendamento refeito no modelo do NS Concept: etapas numeradas, serviços agrupados com várias escolhas, calendário mensal, período (e horários quando `AGENDA_HORARIOS` for preenchido; dias fechados em `AGENDA_DIAS_FECHADOS`), nome e observação, resumo, painel "Seu pedido" ao lado, etapa na URL e mensagem completa no WhatsApp. Sem horário confirmado, não inventa horários.

## Revisão 3 + v6 (09/11/2026): estado
Fonte: revisao-3-e-prompt-v6.md (Downloads do Jeff). Estado: prévia local; NÃO commitado nem enviado ao GitHub até o aval do Jeff.
- FEITO: todo "Agendar" leva a `/agendar/` (`AgendarButton`; botão flutuante também); botões de WhatsApp dizem "Falar no WhatsApp"; `?servico=relaxamento` pré-seleciona Massagem relaxante (`AGENDA_SERVICES`); diferenciais reescritos só com fato confirmado ("Parcelamento em até 4x" é TODO a confirmar); endereço e horário por flag (`ENDERECO_CONFIRMADO`, `HORARIO_CONFIRMADO` em `site.ts`), JSON-LD só com o que existe; `/contato` com cards e mapa por flag; cursor "Ver" nunca vai ao HTML estático (`useSyncExternalStore`); alt descritivo em todas as fotos de conteúdo (atmosfera marcada "imagem ilustrativa"); `StaggerGrid`.
- Seção "No Instagram" (`src/components/InstagramSection.tsx`, dados em `src/data/instagram.ts`, imagens por `scripts/process-instagram.mjs`): grade estática, sem embed, entre Sobre e Como agendar. Só 3 posts (De2D2_8pfWl, DfPRk6hhjqa, Dez_PehBLC5): os outros 6 da lista têm cliente, antes e depois, preço ou conteúdo de outra conta. Os 3 dependem de aval escrito da Kamila. `EspacoSection` removida.
- Não reproduzido da revisão: sobra de texto no hero, imagens de um só tamanho, falta de eyebrow em /sobre. `<meta name="next-size-adjust">` é do Next e fica.
- Performance: no celular o shader Aurora inicia 4,2 s após o load (antes 1,2 s) para baixar o TBT. Lighthouse celular: 90 / 100 / 100 / 66 (SEO 66 só pelo noindex). Relatório e 27 prints em `entrega/v6/`, vídeos iPhone (WebKit) e desktop (Chromium) em `.webm` (~7 quadros/s, não é 60 fps).
- QA: Chrome e WebKit, 360/390/768/1024/1280/1440, sem rolagem horizontal, 1 H1 por página, sem 404 (a única é a página /nao-existe/ de teste), noindex mantido.
- Docs: `docs/pendencias-cliente.md` (substitui a-confirmar), `docs/creditos-imagens.md` e `docs/fotos-instagram.md` atualizados.
- Pendências: aval do Jeff para commit e push; autorização escrita da Kamila (Instagram e foto do Sobre); mais 3 posts para completar 6; logo original; endereço, WhatsApp e horário; teste em iPhone físico.

## v5 (09/11/2026): prompt completo e definitivo do Jeff (substitui v2, v3 e v4)
Estado: prévia local atualizada; NÃO commitado nem enviado ao GitHub (a prévia no ar é a v4).
- Logo da Kamila (arquivo da agenda) no cabeçalho, rodapé, hero, preloader, ícones e og:image. Versões escura e clara; borboleta vetorizada (potrace) para o preloader.
- Shaders WebGL próprios: Aurora (hero) e Moldura (3 usos: logo no hero, foto do Sobre, card do CTA final). Escritos por mim a partir da descrição pública; os prompts do Profitize exigem login (se o Jeff colar, troco `AuroraCanvas.tsx` e `MolduraCanvas.tsx`). Fallbacks: CSS sem WebGL, borda de 1 px no celular e com reduced motion.
- Detalhes de agência: preloader (≤ 1 s), split-text por máscara, botões magnéticos, cursor "Ver", marquee em Marcellus, cortina entre páginas, acordeão de serviços, diferenciais em 3 colunas com fatos confirmados.
- Fotos da Kamila: só UMA no site (Sobre), por decisão do Jeff ("não enche o site com as fotos dela"). A grade "Quem cuida de você" está pronta e desligada (`src/content/espaco.ts` vazio). Quadros extraídos do Instagram ficam só em `_originais/` (fora do git). Ver `docs/fotos-instagram.md`.
- Correção importante: o export estático gerava 404 em todos os links (arquivos de pré-carregamento do Next em pasta aninhada). `scripts/fix-rsc.mjs` roda no `postbuild`; agora a navegação é sem recarga e sem 404.
- Imagens: atmosfera em AVIF/WebP; logo em WebP nos tamanhos usados; ZIP Cloudflare de 3,6 MB.
- Lighthouse celular: Performance 91, Acessibilidade 100, Boas práticas 100, SEO 66 (só pelo noindex da prévia). LCP de laboratório 3,4 a 3,6 s; medição em 4G realista: 2,0 s (1ª visita com preloader) e 0,9 a 1,0 s depois. Relatório em `entrega/v5/`.
- QA: Chrome e WebKit, 360/390/768/1024/1280/1440, tudo passou (ver `docs/checklist-v5.md`).
- Entrega: prints e vídeos de tela (sequências costuradas, ~7 quadros/s) em `entrega/v5/`.
- Pendências: aprovação do Jeff e da Kamila; fotos/originais e logo original; dados A CONFIRMAR em `docs/pendencias-cliente.md`; prompts do Profitize (opcional); vídeo de tela a 60 fps; commit e push.

## v4 (09/11/2026): animações e fonte escolhidas pelo Jeff
Fonte: site-v4-animacoes-fonte.md. Estado: ainda NÃO commitado nem enviado ao GitHub; a prévia no ar é a v3.
- REMOVIDO: Scroll Expansion Hero, vídeo do hero (hero.mp4 apagado), Zoom Parallax, Lenis e cards empilhados (sticky). Nada preso à rolagem na Home.
- BLOQUEADO (precisa do Jeff): shader Moldura e shader Aurora do Profitize. O "Copiar prompt" abre assinatura/login (a Moldura é "grátis" mas exige conta; a Aurora aparece como item premium). Não contornei o login. Provisório: fundo aurora dourado em CSS no hero (`Hero.tsx`, `.aurora-wrap`) e moldura em CSS (borda de 1 px; no desktop a luz corre e aponta para o cursor em 3 usos: Sobre na Home, CTA final e /sobre). Quando o Jeff colar os prompts: trocar o fundo do hero e o miolo do `GoldFrame`, com WebGL carregado só quando a seção aparece.
- ACORDEÃO: mantido (feito do zero; sem o prompt do 21st.dev).
- TIPOGRAFIA: Marcellus (Google Fonts, OFL, peso 400, `next/font` com swap) como secundária em menu, nomes de serviço, rótulos e botões, em caixa-alta com 0,12em a 0,16em. Menu 14 px, botões 15 px, toque de 48 px. Schibsted Grotesk (400 e 600) segue nos parágrafos e listas; Gilda Display nos títulos. O menu completo só aparece a partir de 1100 px. DESIGN.md atualizado.
- FOTOS DO INSTAGRAM: perfil e 9 posts vistos no Chrome logado (nada baixado). O feed não tem fotos do espaço; só um retrato bom da Kamila (post Dez_PehBLC5) e um reel dela operando o laser a confirmar. Seção "Por dentro do espaço" pronta e OCULTA até haver 4 a 6 fotos reais aprovadas (`src/content/espaco.ts`, botão "Ver mais no Instagram" incluso). Detalhes em `docs/fotos-instagram.md`.
- ACHADO: o avatar do Instagram é um retrato da Kamila, não o logo. O logo dela nas artes é uma borboleta dourada com "KAMILA OLIVEIRA / ESTÉTICA". Continua faltando o arquivo original.
- QA (Chrome e WebKit; 360/390/768/1024/1280/1440): sem rolagem horizontal, 1 H1 por página, CTA do hero visível sem rolar no celular, sem elemento sticky fora do cabeçalho, Marcellus carregada, botões 15 px, alvos de toque >= 48 px, menu e Esc, moldura estática no celular e parada com movimento reduzido, acordeão, agendamento, sem JS. Prints e sequência WebKit em `entrega/v4/` (sem vídeo de tela: falta ffmpeg compatível). Peso do ZIP: 2,55 MB.
- PENDENTE: prompts do Jeff (Aurora e Moldura), fotos reais e logo da Kamila, vídeo de tela, Lighthouse em 4G.

## Revisão 2 (09/11/2026): estado por item
Fonte: revisao-2-e-site-v3.md (Downloads do Jeff). Estado: ainda NÃO commitado nem enviado ao GitHub.
- P1.1 imagens: PARCIAL. Feitas: vídeo de atmosfera no hero (Pexels 3998272, 3,89 MB, com poster), foto tratada em cada serviço (acordeão e páginas), mármore em "Onde estamos", "Sobre" e páginas de serviço; créditos em `docs/creditos-imagens.md`. Sem imagem: cards de "Como agendar" e o card do CTA final (de propósito, tipográficos). A foto real da Kamila no "Sobre" está PENDENTE (hoje atmosfera na moldura, sem legenda).
- P1.2 efeitos: 4 de 5 no ar (intro de marca, hero com expansão e vídeo, acordeão com foto, moldura de ouro em CSS com luz que segue o cursor) + Zoom Parallax e Lenis prontos, com a seção "O espaço" DESLIGADA (`SITE.spacePhoto` vazio; exige foto real do espaço). O shader WebGL da Moldura (Profitize) não foi usado. Text Rotate removido, como pedido. Vídeo de tela: não gerado (sem ffmpeg compatível); entregues prints e sequência WebKit em `entrega/v3/`.
- P1.3 logo: FEITO conforme decisão do Jeff (provisório, `<Logo />`, `// TODO logo-original`). O arquivo da Kamila não foi obtido (Instagram exige login); pedido pronto em `docs/pedido-arquivos-kamila.md`.
- P2.1 acordeão com foto por serviço e laser aberto: FEITO.
- P2.2 foto real da Kamila no "Sobre": PENDENTE (depende do arquivo e do aval). `SITE.kamilaPhoto`.
- P2.3 "Onde estamos": FEITO (mármore; mapa por flag `SITE.mapEmbed`).
- P3.1 canonical só na produção: FEITO (nenhum canonical na prévia). Favicon e ícone Apple: FEITOS. og:image 1200x630 com a marca: FEITA.
- Pedido extra do Jeff: tipografia refinada em toda a escala, incluindo os textos secundários (escala e papéis em `DESIGN.md`).
- Correções de teste: a moldura vazava e o rodapé estourava a 768 px (botão em caixa-alta); o mármore era sobrescrito por `.section.dark`; botão invisível em seção escura; legenda "Período" e marcadores da política. Todos corrigidos.
- Instagram: `docs/fotos-instagram.md` com os 9 posts e os 2 a evitar. Nada baixado (exige login). A legenda de um post promete resultado ("RESOLVE vários dos seus problemas"): não pode ir ao site.
- QA 09/11/2026 (Chrome e WebKit; 360/390/768/1440): sem rolagem horizontal, 1 H1 por página, CTA do hero visível sem rolar no celular, intro 1x e pulável, movimento reduzido, sem JS, alvos de toque >= 44 px, agendamento, menu, hero expansivo e acordeão OK. LCP local do Chromium 150 a 230 ms sem throttling e CLS 0 (não é medida em 4G; falta rodar Lighthouse).
- Peso: ZIP de 6,55 MB (vídeo 3,89 MB; fotos em AVIF e WebP com srcset).
- Pendências desta revisão: foto real da Kamila e do espaço; arquivo do logo dela; vídeo de tela; Lighthouse em 4G; pesquisa dos links (Firecrawl sem créditos); shader Moldura WebGL; aprovação do ouro profundo #7D5F27.

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
| 09/11/2026 | Escolha do logo + site v2 | Rota 2 escolhida; site v2 construído (paleta, tipografia, intro, hero, acordeão, cards, moldura, flags de mapa e vídeo); docs de design; QA em Chrome e WebKit; ZIP regerado; prints em `entrega/v2/` | Fotos e vídeo reais, Zoom Parallax, Polaroid, Lenis, pesquisa dos links, aprovação do ouro profundo, canonical de produção; (commit e push feitos em 09/11/2026, prévia atualizada) |
| 09/11/2026 | Revisão 2 + /site v3 + refinar tipografia | Imagens e vídeo de atmosfera tratados; 4 efeitos premium no ar e o 5º pronto (desligado); logo provisório com `<Logo />`; tipografia refinada; og:image, ícone Apple, 404, canonical só em produção; docs de créditos e pedido de arquivos; QA em Chrome e WebKit; prints em `entrega/v3/` | Foto real da Kamila e do espaço; arquivo do logo; vídeo de tela; Lighthouse 4G; shader Moldura; commit e push (não feitos) |
| 09/11/2026 | /site v4 (trocar animações e fonte secundária; fotos do Instagram) | Hero expansivo, vídeo, Zoom Parallax, Lenis e cards sticky removidos; hero aurora e moldura em CSS (provisórios); Marcellus como secundária; seção "Por dentro do espaço" pronta e oculta; Instagram revisado; docs e prints em `entrega/v4/` | Prompts do Jeff para Aurora e Moldura (WebGL); fotos reais e logo da Kamila; commit e push (não feitos) |
| 09/11/2026 | /site v5 (prompt completo) + logo da agenda + "não encher o site com fotos dela" | Logo real, shaders Aurora e Moldura, preloader, split-text, cursor, marquee, cortina, acordeão, diferenciais; correção do 404 do pré-carregamento; Lighthouse 91/100/100/66; QA em Chrome e WebKit; docs e checklist | Aprovação; logo original e fotos reais; dados A CONFIRMAR; commit e push (não feitos) |
| 09/11/2026 | Revisão 3 + prompt v6 | Agendar unificado, seção No Instagram (3 posts), flags de endereço e horário, alts, cursor, contato, docs, QA, Lighthouse 90/100/100/66, prints e vídeos em `entrega/v6/` | Aval para commit e push; autorização da Kamila; mais 3 posts; logo original; endereço, WhatsApp, horário |
