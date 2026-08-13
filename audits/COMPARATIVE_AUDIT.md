# COMPARATIVE AUDIT

Escopo:
- Comparativo dos repositórios clonados em `references/`.
- `Frappe CRM` foi excluído do ranking principal porque está em `REFERENCE_ONLY.md` e não faz parte da base operacional desta etapa.
- A leitura foi conservadora: `CONFIRMADO` só foi usado quando a funcionalidade apareceu no código.

## Scorecard

| Projeto | Maturidade | Completude funcional | Dominio imobiliario | Site publico | CRM | Leads | Facilidade de customizacao | Qualidade arquitetural | Testes | Documentacao | Facilidade de instalacao | Adequacao como base principal | Adequacao como referencia |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| PropertyWebBuilder | 8 | 7 | 8 | 10 | 3 | 4 | 7 | 8 | 6 | 8 | 5 | 8 | 9 |
| Liberu Real Estate | 8 | 9 | 10 | 8 | 6 | 7 | 7 | 7 | 6 | 7 | 5 | 9 | 10 |
| Liberu CRM | 8 | 8 | 4 | 1 | 10 | 9 | 8 | 8 | 7 | 7 | 6 | 6 | 9 |
| InsulaCRM | 7 | 8 | 9 | 1 | 10 | 10 | 7 | 7 | 6 | 6 | 5 | 7 | 9 |
| PropKub | 6 | 6 | 7 | 9 | 4 | 4 | 6 | 7 | 6 | 6 | 6 | 6 | 7 |
| Really CRM | 6 | 6 | 5 | 1 | 8 | 7 | 6 | 7 | 5 | 6 | 7 | 5 | 7 |
| Property Pulse | 6 | 6 | 6 | 9 | 3 | 4 | 6 | 6 | 5 | 5 | 6 | 5 | 6 |
| RealEstateCRM | 5 | 7 | 7 | 1 | 8 | 8 | 5 | 5 | 4 | 4 | 5 | 4 | 6 |
| NextCRM | 7 | 7 | 4 | 1 | 9 | 9 | 8 | 8 | 7 | 7 | 6 | 6 | 8 |
| MicroRealEstate | 6 | 6 | 8 | 1 | 2 | 2 | 5 | 6 | 5 | 6 | 4 | 5 | 6 |

## Ranking A - melhor base operacional pronta

1. PropertyWebBuilder
2. Liberu Real Estate
3. InsulaCRM
4. Liberu CRM
5. NextCRM
6. PropKub
7. Property Pulse
8. Really CRM
9. MicroRealEstate
10. RealEstateCRM

Motivo:
- `PropertyWebBuilder` ja entrega o canal publico, multi-tenancy, SEO, widgets, saved searches e alertas, que sao pilares da plataforma alvo.
- `Liberu Real Estate` e mais largo funcionalmente, mas mistura mais subsistemas e exige mais trabalho de harmonizacao.
- `InsulaCRM` é forte, mas já nasce como CRM imobiliário e não como base pública principal.

## Ranking B - melhor dominio imobiliario

1. Liberu Real Estate
2. PropertyWebBuilder
3. InsulaCRM
4. MicroRealEstate
5. PropKub
6. Property Pulse
7. RealEstateCRM
8. Liberu CRM
9. Really CRM
10. NextCRM

Motivo:
- `Liberu Real Estate` é o repositório com maior amplitude de fluxo imobiliário operacional: listagem, busca, mapa, alertas, reservas, propostas, documentos, compradores, proprietários e locação.
- `PropertyWebBuilder` é o melhor fundamento de mercado e canal público.

## Ranking C - melhor CRM/leads

1. Liberu CRM
2. InsulaCRM
3. NextCRM
4. RealEstateCRM
5. Really CRM
6. Liberu Real Estate
7. PropertyWebBuilder
8. Property Pulse
9. PropKub
10. MicroRealEstate

Motivo:
- `Liberu CRM` tem a maior cobertura de CRM generalista, integrações, automações e admin.
- `InsulaCRM` é o melhor CRM imobiliário puro, com funil, score, campanhas e comissões.

## Ranking D - melhor arquitetura para evolucao

1. NextCRM
2. PropertyWebBuilder
3. Liberu CRM
4. Liberu Real Estate
5. Property Pulse
6. InsulaCRM
7. Really CRM
8. PropKub
9. MicroRealEstate
10. RealEstateCRM

Motivo:
- `NextCRM` tem a arquitetura mais moderna e modular entre os repositrios analisados.
- `PropertyWebBuilder` vem logo depois por ser um monolito Rails consistente, com fronteiras funcionais claras e boa base para extensao.

## Ranking E - menor quantidade estimada de funcionalidades faltantes para o nosso PRODUCT_SCOPE

1. Liberu Real Estate
2. PropertyWebBuilder
3. InsulaCRM
4. Liberu CRM
5. NextCRM
6. PropKub
7. Property Pulse
8. RealEstateCRM
9. Really CRM
10. MicroRealEstate

Motivo:
- `Liberu Real Estate` cobre mais dimensoes do scope: public site, imoveis, busca, mapa, leads, documentos, locacao, propostas, reservas e integracoes.
- `PropertyWebBuilder` ainda é o mais equilibrado para canal público, mas faltam vários blocos de CRM e operação comercial.

## Ranking F - risco tecnico

Leitura: `1` = menor risco tecnico, `10` = maior risco tecnico.

1. PropertyWebBuilder
2. NextCRM
3. Liberu CRM
4. Liberu Real Estate
5. Property Pulse
6. InsulaCRM
7. Really CRM
8. PropKub
9. MicroRealEstate
10. RealEstateCRM

Motivo:
- `PropertyWebBuilder` é o mais previsível para operar como base monolítica com fronteiras claras.
- `RealEstateCRM` tem o maior risco relativo por parecer mais fragmentado e menos consistente do ponto de vista arquitetural.

## Respostas objetivas

### 1. PropertyWebBuilder continua sendo a melhor base?

Sim, como melhor base unica para o produto-alvo, por combinar canal publico, multi-tenant, SEO, widgets, busca salva, alertas e uma estrutura Rails consistente.

### 2. Liberu Real Estate + CRM juntos superam PropertyWebBuilder?

Como combinacao funcional, sim: juntos cobrem mais do escopo. Como base unica, nao: sao dois produtos distintos e a integracao deles custa mais do que evoluir `PropertyWebBuilder` como tronco principal.

### 3. Existe algum projeto que, depois da inspeção real do codigo, mereça substituir PropertyWebBuilder como candidato principal?

Não como substituto único. `Liberu Real Estate` é o candidato que mais se aproxima, mas ainda prefiro `PropertyWebBuilder` como base principal pelo equilíbrio entre canal público, multi-tenant e evolução incremental.

### 4. Quais funcionalidades importantes ja existem em outros projetos e faltam no PropertyWebBuilder?

- Pipeline, kanban, tarefas, agenda e follow-up: `Liberu CRM`, `InsulaCRM`, `NextCRM`, `RealEstateCRM`.
- WhatsApp, SMS e historico de comunicacao: `Liberu CRM`, `InsulaCRM`, `RealEstateCRM`.
- Propostas, deals, reservas e visitas: `Liberu Real Estate`, `InsulaCRM`.
- Comissoes, campanhas e score de lead: `InsulaCRM`, `Liberu CRM`, `NextCRM`.
- Matching e IA aplicada ao lead/imovel: `InsulaCRM`, `Really CRM`, `NextCRM`.
- Checklists documentais e gestao de locacao mais profunda: `Liberu Real Estate`, `InsulaCRM`, `MicroRealEstate`.

### 5. Quais dessas funcionalidades podem ser implementadas naturalmente no PropertyWebBuilder sem criar arquitetura paralela?

- Leads de captacao, origem do lead e timeline de contato.
- Tarefas, follow-up, agenda e visitas.
- Propostas e deals com estados simples.
- Documentos e checklist documental.
- Comissoes e indicadores comerciais.
- Matching e recomendacoes.
- WhatsApp/e-mail/SMS como adaptadores de evento, sem separar uma camada de CRM fora do monolito.

### 6. Qual seria a sequencia ideal de evolucao?

1. Consolidar o modelo de domínio do PropertyWebBuilder como tronco principal.
2. Fechar captação de leads, timeline de contato e alertas.
3. Introduzir tarefas, follow-up, agenda e visitas.
4. Adicionar propostas, deals, comissões e motivo de perda.
5. Evoluir para documentos, checklist e gestão de locação.
6. Integrar analytics, campanhas e automações.
7. Fechar matching e IA como camada final.
8. Só depois considerar desdobramentos em serviços separados, se a escala exigir.

## Observações finais

- `Liberu Real Estate` é o melhor repositório para inspirar o domínio imobiliário amplo.
- `Liberu CRM` é o melhor repositório para inspirar o motor de relacionamento e pipeline.
- `NextCRM` é o melhor repositório para inspirar a evolução da arquitetura e das automações.
- `PropertyWebBuilder` continua sendo o melhor ponto de partida para uma plataforma imobiliária única, desde que o CRM seja acoplado de forma modular e incremental.
