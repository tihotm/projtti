# EXECUTIVE DECISION SUMMARY

Status: resumo executivo pré-decisão.

Este documento consolida a leitura da auditoria comparativa. Ele não substitui `DECISIONS.md` e não registra ainda uma escolha oficial. A decisão formal depende do próximo gate runtime: instalar, migrar, testar e rodar o PropertyWebBuilder localmente.

## Conclusão executiva

O `PropertyWebBuilder` permanece como candidato principal para tronco do produto porque venceu a comparação funcional real, não apenas a avaliação superficial de README.

A principal conclusão técnica é que ele já entrega os fundamentos que seriam mais caros de reconstruir:
- site público imobiliário;
- home, catálogo e página individual de imóvel;
- busca, filtros, mapa e SEO;
- favoritos, buscas salvas e alertas;
- administração;
- multi-tenancy;
- API, storage, importação/exportação e widgets.

As lacunas relevantes ficam concentradas em operação comercial e CRM. Isso é favorável, porque essas capacidades podem nascer dentro do próprio monólito Rails, aproveitando o domínio existente de imóveis, listagens, usuários, contatos, administração e notificações.

## Decisão recomendada

Usar `PropertyWebBuilder` como tronco principal, condicionado ao gate runtime.

Condição de aprovação:
- instalar dependências Ruby/Bundler;
- configurar banco local;
- executar migrations;
- executar testes disponíveis;
- subir a aplicação localmente;
- registrar bloqueios reais, se existirem.

Se esse gate passar, a fase de escolha de tecnologia pode ser encerrada e o projeto pode avançar para fork, personalização inicial e evolução incremental.

## Regra arquitetural

Nenhuma funcionalidade encontrada em projetos de referência vira dependência direta daquele outro projeto.

Regra:
- estudar a solução de referência;
- extrair o conceito de domínio e UX;
- implementar a capacidade dentro do tronco `PropertyWebBuilder`;
- abrir exceção apenas para integrações externas claramente superiores e justificadas por contrato, custo operacional ou maturidade técnica.

Implicação direta: não integrar um CRM externo agora. O CRM deve nascer dentro do `PropertyWebBuilder`, de forma modular, sem criar uma arquitetura paralela.

## Mapa de referências

| Área | Referência principal | Uso esperado |
|---|---|---|
| Tronco principal | PropertyWebBuilder | Base operacional, site público, catálogo, busca, SEO, multi-tenancy e alertas |
| Operação imobiliária completa | Liberu Real Estate | Reservas, propostas, documentos, agentes, compradores, proprietários, locação e fluxos imobiliários amplos |
| Pipeline, leads e deals | InsulaCRM | Funil comercial, kanban, score, deals, comissões e operação de vendas |
| CRM maduro e UX operacional | Frappe CRM, NextCRM, RealEstateCRM | Conceitos de CRM, telas, histórico, automações, tarefas, campanhas e administração |
| Catálogo e experiência do usuário | PropKub, Property Pulse | Pesquisa, cards, filtros, página de imóvel, usuário final e fluxo de contato |
| Matching | Really CRM | Inteligência comprador-imóvel e recomendações |
| Locação profunda | MicroRealEstate | Locador, locatário, contrato, aluguel, unidade e gestão de locação |

## Lacunas do PropertyWebBuilder

Lacunas que devem virar evolução do tronco:
- leads mais ricos, origem do lead e score;
- CRM interno;
- pipeline, kanban e deals;
- tarefas, follow-up, agenda e visitas;
- feedback de visita;
- propostas;
- motivo de perda;
- WhatsApp, SMS e histórico de comunicação;
- comissões;
- documentos e checklist documental;
- prospecção;
- analytics comercial;
- matching comprador-imóvel;
- IA aplicada ao CRM e recomendações.

## Desenho de evolução

```text
PROPERTY WEB BUILDER
        |
        +-- site público        [já existe]
        +-- catálogo            [já existe]
        +-- imóveis             [já existe]
        +-- busca / SEO         [já existe]
        +-- alertas             [já existe]
        |
        +-- leads               [evoluir]
        +-- CRM                 [adicionar]
        +-- agenda / visitas    [adicionar]
        +-- propostas / deals   [adicionar]
        +-- WhatsApp            [adicionar]
        +-- comissões           [adicionar]
        +-- documentos          [adicionar]
        +-- prospecção          [adicionar]
        +-- analytics           [evoluir]
        +-- matching            [adicionar]
        +-- IA                  [última camada]
```

## Sequência recomendada

1. Validar runtime real do `PropertyWebBuilder`.
2. Registrar a decisão formal em `DECISIONS.md` apenas se o gate passar.
3. Criar fork/base oficial do produto.
4. Personalizar identidade, idioma, dados iniciais e configurações.
5. Consolidar captação de leads e timeline de contato.
6. Adicionar CRM interno: tarefas, follow-up, agenda e visitas.
7. Adicionar propostas, deals, comissões e motivo de perda.
8. Evoluir documentos, checklist e locação.
9. Integrar WhatsApp, campanhas e analytics.
10. Adicionar matching e IA como camadas finais.

## Riscos mantidos

- O runtime do `PropertyWebBuilder` ainda não foi validado nesta máquina.
- Ruby/Bundler não estavam disponíveis na auditoria anterior.
- A arquitetura multi-tenant e multi-banco precisa ser testada com migrations reais.
- A decisão ainda não deve ser registrada como final antes do gate runtime.

## Próximo gate

Pergunta objetiva:

> PropertyWebBuilder instala, migra, testa e roda localmente?

Resultado esperado:
- `SIM`: encerrar escolha de tecnologia e iniciar fork/personalização.
- `NÃO`: registrar bloqueio técnico, classificar severidade e comparar custo de correção contra `Liberu Real Estate`.
