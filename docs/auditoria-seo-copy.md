# Auditoria de SEO e copy (10/11/2026)

Prévia com noindex por decisão (não indexa até o aval do Jeff). Abaixo, o que foi achado e feito, e o que fica para a produção.

## SEO técnico e on-page
| Item | Achado | Ação |
|---|---|---|
| Indexação | noindex, nofollow e robots Disallow na prévia (correto); canonical só em produção | Na produção: `NEXT_PUBLIC_INDEXABLE=true` e `NEXT_PUBLIC_SITE_URL` do domínio; conferir canonical, sitemap e robots |
| Títulos | Home com 67 caracteres (corta no Google); demais entre 42 e 61 | Home encurtada para 56. Todos únicos |
| Descrições | Home 135 e outras entre 78 e 115 | Home, Sobre, Contato e Agendar reescritas (130 a 160), com endereço e CTA |
| H1 | Um por página. O H1 da Home é o slogan, sem palavra-chave | Mantido por decisão de marca; a palavra-chave está no eyebrow ("Estética facial e corporal · Santa Amélia, Pampulha"), no title e na description |
| Schema | BeautySalon sem telefone, geo, imagem e sem Perfil do Google | Incluídos telefone (do Perfil), coordenadas, imagem, hasMap, sameAs com Instagram e Google, e horário. Sem aggregateRating (só 2 avaliações) |
| Páginas de serviço | 177 a 193 palavras: conteúdo fino | Só crescem com dado confirmado pela Kamila (como é a sessão, perguntas frequentes, o que inclui cada nível). Não inventei texto |
| Imagens | alt em todas; AVIF/WebP com srcset | OK |
| Links internos | Menu, rodapé e CTAs levam a todas as páginas; sem órfãs | OK |
| Local | Perfil do Google existe (5,0, 2 avaliações) | Reivindicar/verificar o Perfil, completar serviços, fotos e horário, pedir avaliações reais; manter nome, endereço e telefone iguais ao site |
| Velocidade | Lighthouse celular 89 / 100 / 100 / 66 (SEO 66 só pelo noindex); LCP de laboratório 3,7 s, CLS 0, TBT 40 ms | Ver CLAUDE.md |

## Copy (antislop-copywriting)
- Removidos: "Passe o mouse" (não vale no celular), título genérico "O cuidado que você encontra aqui" (virou "Bom saber antes de agendar"), "Conheça" repetido três vezes no Sobre, "Parcelamento em até 4x / Os serviços podem ser parcelados em até 4x" (circular), CTAs finais idênticos nas três páginas de serviço (agora "Marque [serviço]"), mistura de "a gente" e "a Kamila" (agora "a Kamila confirma"), travessões de espaço reservado no resumo do agendamento.
- Mantido: "Luxo é se sentir bem todos os dias." só no hero (é frase dela).
- Nada de promessa de resultado, preço ou número sem fonte.
