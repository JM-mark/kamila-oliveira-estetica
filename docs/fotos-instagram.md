# Fotos reais: o que há no Instagram da Kamila (para o Jeff aprovar)

Estado (09/11/2026): **nada foi baixado nem publicado.** Abri o perfil e os 9 posts da lista no Chrome já logado, só para olhar. Nenhum quadro foi extraído como arquivo. Para a seção "Por dentro do espaço" (`src/content/espaco.ts`, hoje vazia, e por isso a seção não aparece) precisamos de **4 a 6 fotos reais**, e o feed **não tem fotos do espaço**: é feito quase todo de artes promocionais com preço, vídeos de pele de clientes e antes e depois. O caminho é pedir os originais (rascunho em `docs/pedido-arquivos-kamila.md`).

## O que o perfil mostra
- Nome: "Kamila Oliveira - Laser e Estética". Bio: "Especialista em depilação a laser. Resultados reais em pele e corpo. Pampulha | Santa Amélia. Luxo é se sentir bem…".
- O **avatar é um retrato da Kamila de uniforme preto**, não o logo. O **logo dela aparece nas artes**: uma borboleta dourada, "KAMILA OLIVEIRA / ESTÉTICA" e a linha "Cuidado · Beleza · Autoestima", sobre preto e dourado. Os destaques usam um selo redondo dourado com K e borboleta. Isso é diferente do monograma KO do site; o arquivo original do logo ainda é necessário (decisão do Jeff: logo provisório).
- Destaque chamado "Antes e Depois": **não usar** no site.

## Os 9 posts da lista
| # | Post | O que vi | Serve? | Onde entraria |
|---|---|---|---|---|
| 1 | /p/DfQMoPsp-0y | Reel de close de pele com cravos (milium). Legenda promete resultado ("RESOLVE vários dos seus problemas") | Não: pele de cliente e promessa | nenhum |
| 2 | /p/DfPRk6hhjqa | Reel de uma mulher falando, com texto na tela ("Ah, mas fulana não gosta de você…"). Não confirmei se é a Kamila | Não sem confirmar | nenhum |
| 3 | /p/DfOASylpFy5 | Reel (quadro preto ao abrir). Legenda sobre limpeza de pele Ouro, Prata e Bronze | Indefinido | a definir |
| 4 | /p/De2D2_8pfWl | Reel "4 coisas que quem faz depilação a laser nunca vai dizer" (quadro preto ao abrir) | Indefinido | a definir |
| 5 | /p/DexZUvbhBaE | Reel com **ilustração** de folículos de pelo ("pelos em fases diferentes") | Não: é animação e não foto dela | nenhum |
| 6 | /p/Dez_PehBLC5 | **Retrato da Kamila** de blazer preto, braços cruzados, com a borboleta dourada na lapela. Texto sobreposto "Luxo acessível" | **Sim, é o melhor candidato** (o texto sairia no recorte) | Seção Sobre e /sobre/ (`SITE.kamilaPhoto`) |
| 7 | /p/DeuNSMfRRWq | Arte "Combos especiais" com preços (R$) e a Kamila de perfil | Não: tem preço | nenhum |
| 8 | /p/DeuJtvQxQ10 | Antes e depois de extração de cravos | Não | nenhum |
| 9 | /p/DeuzZ-0kexy | Antes e depois de limpeza de pele | Não | nenhum |

## Outros quadros vistos na grade do perfil (não estavam na lista)
- Reel da Kamila de óculos de proteção operando o aparelho de laser em uma axila ("Sinto muita dor na depilação a cera"): mostra a profissional e o aparelho, mas pode ter pele de cliente. **Candidato a confirmar com a Kamila.**
- Artes com retrato dela (modelos, kit axila + virilha + buço, redução de medidas, depilação a laser em outubro): têm **preços e promessas** na arte. Só serviriam recortando apenas a foto dela, e só com aval.

## Regras
- Só com aval escrito da Kamila; rosto ou pele de cliente só com autorização escrita da cliente.
- Nada de antes e depois, nada com preço, nada apresentado como resultado, e nada de texto das legendas (algumas prometem resultado).
- Quadros de vídeo não foram extraídos: as fotos originais da Kamila têm qualidade melhor.

## Como ligar a seção
Colocar 4 a 6 arquivos em `public/espaco/` e listar em `src/content/espaco.ts` com `src`, `alt` e `caption` curta e verdadeira (ex.: "Sala de atendimento"). Com menos de 4 fotos, a seção continua oculta. O botão "Ver mais no Instagram" já está pronto.
