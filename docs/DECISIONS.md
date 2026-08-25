# DECISIONS

- ADR-001: Não desenvolver a plataforma do zero.
- ADR-002: PropertyWebBuilder é atualmente o candidato principal de base.
- ADR-003: Liberu Real Estate é o principal plano alternativo.
- ADR-004: Outros projetos são referências funcionais e arquiteturais.
- ADR-005: Não misturar código de diferentes projetos sem análise técnica e de licença.
- ADR-006: Property e Listing são entidades diferentes.
- ADR-007: Prospecção é funcionalidade administrativa.
- ADR-008: IA será adicionada depois do núcleo operacional.
- ADR-009: O sistema deverá permanecer funcional durante sua evolução.
- ADR-010: A promoção de uma base para `OFFICIAL_BASE` exige evidência executável do gate runtime e do baseline mínimo; auditoria estática isolada não autoriza a decisão.
- ADR-011: O candidato PropertyWebBuilder permanece congelado para validação em `etewiah/property_web_builder`, branch `master`, SHA `d3b4c2786f6f967ca3cf8a63f95ba38fa6ea4e79`, licença MIT. Esse registro de proveniência não equivale à promoção para base oficial.
- ADR-012: Se o Gate #2 do PropertyWebBuilder resultar em falha funcional/arquitetural, o Liberu Real Estate só poderá ser promovido após gate equivalente contra o mesmo baseline definido em #3. Bloqueio puramente ambiental não ativa automaticamente o fallback.

## Decisão oficial pendente

```text
OFFICIAL_BASE = NOT_DECIDED
DECISION_GATE = ISSUE_#2
PRIMARY_CANDIDATE = PropertyWebBuilder
FALLBACK = Liberu Real Estate
```

Quando #2 produzir evidência final, este arquivo deve receber um novo ADR explícito registrando a base escolhida, o SHA de origem validado e a estratégia de fork/upstream. Até lá, nenhuma base é considerada oficial.
