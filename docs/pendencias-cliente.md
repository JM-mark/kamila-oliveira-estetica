# Pendências com a cliente (lista para o Jeff pedir à Kamila)

(Substitui `a-confirmar.md`, v6.) Resumo do que mais pesa: endereço, WhatsApp, horário, autorização das fotos do Instagram, logo original e texto dos diferenciais ("Parcelamento em até 4x" precisa de confirmação).

Nada abaixo foi inventado: o site mostra só o que veio do briefing ou da agenda dela. Onde falta dado, o site pede pelo WhatsApp ou deixa a flag desligada.

## Dados do negócio
- [ ] **Nome oficial** da marca ("Kamila Oliveira Estética", "Kamila Oliveira - Laser e Estética" ou "Estética Avançada").
- [ ] **Endereço**: a agenda dela diz "Rua Monsueto Filizzola 16" (o briefing indica "Mansueto"), e reels recentes citam "Guarapari 1456". Confirmar o correto e a grafia. Quando vier, preencher o mapa (`SITE.mapEmbed`), o JSON-LD e o rodapé.
- [ ] **WhatsApp** que recebe os pedidos (hoje `5531999274642`, o do botão da agenda; o anúncio de 2022 tinha outro).
- [ ] **Horário de atendimento** (só então voltar a oferecer o período "noite").
- [ ] **Domínio** (sugestão: kamilaoliveiraestetica.com.br), quem aprova e prazo.
- [ ] **Meta de faturamento** e **linha de base** (atendimentos por mês hoje).
- [ ] **Perfil da Empresa no Google** (não existe; é o que mais pesa no SEO local).

## Material
- [ ] **Logo original** (PNG grande com fundo transparente ou vetor). O site usa o logo da agenda dela (512 px), limpo e recortado, como provisório.
- [ ] **Autorização por escrito** para usar as fotos do Instagram dela, em especial o recorte da foto de jaleco que está no "Sobre" (`docs/fotos-instagram.md`).
- [ ] **Originais**: 1 retrato dela, 3 a 5 fotos do espaço (sala, maca, recepção, fachada), foto do aparelho de laser e mãos dela em atendimento (sem rosto de clientes).
- [ ] Autorização escrita de qualquer cliente que apareça.

## Conteúdo
- [ ] Formação e certificados, e **registro do responsável técnico** (para citar na página).
- [ ] Quem aplica **botox e preenchimento** e o registro no conselho (por enquanto estão fora do site).
- [ ] Textos de **"como é a sessão"** e **perguntas frequentes** de cada serviço (só entram com resposta confirmada por ela).
- [ ] Avaliações reais com link do Google (sem nota média nem contagem).
- [ ] O que cada nível de limpeza de pele (Bronze, Prata, Ouro) inclui.
- [ ] Reativar a **agenda online** (agendeagora) e corrigir os preços de R$ 1,50 de botox e preenchimento; depois ligar `SITE.agendaEnabled`.
- [ ] Se aceita **preços no site** (hoje não há, padrão do setor).
- [ ] Confirmar o uso da frase "Luxo é se sentir bem todos os dias" (é dela, vem do Instagram).

## Antes de publicar no domínio oficial (aval do Jeff)
- [ ] Ativar GA4 (`NEXT_PUBLIC_GA_ID`) e, antes, decidir o aviso de cookies e completar a política de privacidade com a identificação da responsável (razão social, CPF/CNPJ e contato).
- [ ] Rodar o build com `NEXT_PUBLIC_INDEXABLE=true` e `NEXT_PUBLIC_SITE_URL` do domínio (canonical, sitemap e remoção do `noindex`).
- [ ] Aprovação do tom extra de ouro profundo (#7D5F27) usado em texto pequeno dourado sobre fundo claro.


## Instagram (v6)
- [ ] Autorização escrita da Kamila para os 3 quadros da seção "No Instagram" (`De2D2_8pfWl`, `DfPRk6hhjqa`, `Dez_PehBLC5`) e para o recorte do "Sobre".
- [ ] Confirmar que a pessoa do reel `DfPRk6hhjqa` é a Kamila.
- [ ] Escolher mais 3 posts sem rosto/pele de cliente, sem antes e depois e sem preço, para completar a grade de 6 (editar `src/data/instagram.ts` e rodar `node scripts/process-instagram.mjs`).

## Google (v6.2)
- Perfil da Empresa EXISTE (ao contrário do que o briefing dizia): nota 5,0 com 2 avaliações, endereço Rua Monsueto Filizzola, 16, telefone (31) 99927-4642 (igual ao WhatsApp do site), horário terça a sábado 8h às 18h (domingo e segunda fechado). Consultado em 10/11/2026.
- [ ] Kamila confirmar esses dados e autorizar o trecho da avaliação na Home. O site não mostra nota média nem contagem (só 2 avaliações; as 2 são do mesmo nome, publicadas no mesmo dia). A segunda diz "tive muito resultado", que não pode ir ao site (promessa de resultado).
- [ ] Pedir mais avaliações reais aos clientes (link de avaliação do Perfil) antes de mostrar nota ou contagem.
