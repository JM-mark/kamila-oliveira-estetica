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
- Rota B escolhida em 09/11/2026 (Jeff): creme #FAF5EF, malva #6A5580, ameixa #2B2030, névoa #C9BBD6, cinza ameixa #5F5563; Newsreader itálico + Albert Sans; monograma "ko" em arco. Rota A descartada. Aguarda aprovação da Kamila.
- Não repetir tipografia/paleta de OS Clínica, Thaís Andrade, NS Concept, Juliana Rosa (ver lista no briefing).
- Duas rotas de identidade antes de fechar.
- Sem promessa de resultado, sem "garantido", sem "definitiva"; sem preços no site (a confirmar com a cliente).
- Prévia com noindex/nofollow e robots Disallow: /. Nada em produção sem aval do Jeff.
- Agendamento guiado em etapas que abre o WhatsApp; link da agenda online por flag, só após a Kamila reativá-la.

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
