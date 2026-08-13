# FEATURE MATRIX

Escala usada na matriz:
- `C` = CONFIRMADO
- `P` = PARCIAL
- `PL` = PLANEJADO
- `NE` = NÃO ENCONTRADO
- `NA` = NÃO APLICÁVEL

Nota:
- Esta matriz cobre apenas os repositórios clonados em `references/`.
- `Frappe CRM` ficou fora da matriz porque está em `REFERENCE_ONLY.md` e não entrou na comparação operacional deste ciclo.

## 1. Site público e descoberta

| Funcionalidade | PropertyWebBuilder | Liberu RE | Liberu CRM | InsulaCRM | PropKub | Really CRM | Property Pulse | RealEstateCRM | NextCRM | MicroRealEstate |
|---|---|---|---|---|---|---|---|---|---|---|
| Site público | C | C | NA | NA | C | NA | C | NA | NA | NA |
| Home | C | C | NA | NA | C | NA | C | NA | NA | NA |
| Catálogo | C | C | NA | NA | C | NA | C | NA | NA | NA |
| Página individual de imóvel | C | C | NA | NA | C | NA | C | NA | NA | NA |
| Busca | C | C | NA | NA | C | NA | C | NA | NA | NA |
| Filtros | C | C | NA | NA | C | NA | C | NA | NA | NA |
| Mapa/geolocalização | C | C | NA | NA | C | NA | C | NA | NA | NA |
| SEO | C | C | NA | NA | C | NA | P | NA | NA | NA |
| CMS | P | P | NA | NA | P | NA | NE | NA | NA | NA |
| Blog/conteúdo | P | P | NA | NA | C | NA | NE | NA | NA | NA |
| Favoritos | C | C | NA | NA | NE | NA | C | NA | NA | NA |
| Busca salva | C | C | NA | NA | NE | NA | NE | NA | NA | NA |
| Alertas | C | C | NA | NA | NE | NA | NE | NA | NA | NA |

## 2. Administração, identidade e atores

| Funcionalidade | PropertyWebBuilder | Liberu RE | Liberu CRM | InsulaCRM | PropKub | Really CRM | Property Pulse | RealEstateCRM | NextCRM | MicroRealEstate |
|---|---|---|---|---|---|---|---|---|---|---|
| Administração | C | C | C | C | C | C | P | C | C | C |
| Multi-tenant | C | C | C | C | NA | NA | NA | NA | NA | P |
| Usuários | C | C | C | C | C | C | C | C | C | C |
| Papéis/permissões | C | C | C | C | C | C | P | C | C | C |
| Corretores/agentes | P | C | P | C | P | P | P | P | P | NA |
| Proprietários | P | C | NA | C | NE | P | P | P | P | C |
| Compradores | P | C | NA | C | NE | P | P | P | P | C |
| Locatários | P | C | NA | C | NA | NA | NA | P | NA | C |

## 3. CRM, funil e relacionamento

| Funcionalidade | PropertyWebBuilder | Liberu RE | Liberu CRM | InsulaCRM | PropKub | Really CRM | Property Pulse | RealEstateCRM | NextCRM | MicroRealEstate |
|---|---|---|---|---|---|---|---|---|---|---|
| Leads | P | C | C | C | P | C | P | C | C | P |
| CRM | NA | P | C | C | NA | C | NA | C | C | NA |
| Pipeline | NA | P | C | C | NA | C | NA | C | C | NA |
| Kanban | NA | P | C | C | NA | C | NA | P | C | NA |
| Follow-up | NA | P | C | C | NA | C | P | C | C | NA |
| Agenda | NA | C | C | C | NA | P | NA | C | C | P |
| Tarefas | NA | P | C | C | NA | P | NA | C | C | P |
| Visitas | NA | C | P | C | NA | NA | NA | C | P | P |
| Feedback de visita | NA | P | NE | P | NA | NA | NA | NE | NE | NA |
| Propostas | NA | C | C | C | NA | P | NA | C | P | NA |
| Deals/negócios | NA | C | C | C | NA | C | NA | C | C | NA |
| Motivo de perda | NA | P | P | C | NA | NE | NA | P | P | NA |
| Origem do lead | P | C | C | C | P | P | P | C | C | NA |
| Histórico de comunicação | P | C | C | C | NE | C | P | C | C | NA |

## 4. Comunicação, inteligência e crescimento

| Funcionalidade | PropertyWebBuilder | Liberu RE | Liberu CRM | InsulaCRM | PropKub | Really CRM | Property Pulse | RealEstateCRM | NextCRM | MicroRealEstate |
|---|---|---|---|---|---|---|---|---|---|---|
| WhatsApp | NE | NE | C | C | NE | NE | NE | C | NE | NE |
| E-mail | C | C | C | C | C | C | C | C | C | C |
| SMS | NE | NE | C | C | NE | NE | NE | C | NE | NE |
| Matching | P | C | P | C | NE | C | NE | P | P | NA |
| Score de lead | NE | P | P | C | NE | P | NE | P | C | NA |
| Score de imóvel | NE | C | NE | C | NE | C | NE | P | P | NA |
| Prospecção | P | C | C | C | P | C | P | C | C | NA |
| Automação | P | C | C | C | P | C | P | P | C | P |
| Analytics | C | C | C | C | P | P | P | P | C | P |
| Campanhas | NE | P | C | C | NE | NE | NE | NE | C | NA |
| Comissões | NE | C | P | C | NE | NE | NE | C | P | P |
| Parceiros | NE | P | C | C | NE | NE | NE | NE | NE | NA |
| Indicações | NE | P | P | C | NE | NE | NE | NE | NE | NA |

## 5. Documentos, integração e plataforma

| Funcionalidade | PropertyWebBuilder | Liberu RE | Liberu CRM | InsulaCRM | PropKub | Really CRM | Property Pulse | RealEstateCRM | NextCRM | MicroRealEstate |
|---|---|---|---|---|---|---|---|---|---|---|
| Documentos | P | C | C | C | P | C | P | C | C | P |
| Checklist documental | NE | C | P | C | NE | NE | NE | P | P | NA |
| Gestão de locação | C | C | NA | P | NA | NA | NA | P | NA | C |
| Imóvel rural | P | P | NA | NA | C | NA | NA | P | NA | NA |
| API | C | C | C | C | C | C | C | C | C | C |
| Webhooks | P | C | C | C | P | P | NE | P | C | P |
| Importação/exportação | C | C | C | C | C | P | P | P | C | C |
| Integrações externas | C | C | C | C | C | P | C | C | C | P |
| Storage | C | C | C | C | C | C | C | C | C | C |
| Auditoria/logs | C | P | C | C | NE | NE | NE | P | C | P |
| Soft delete | NE | P | P | P | NE | NE | NE | P | P | P |
| Testes automatizados | C | C | C | C | C | C | C | C | C | C |
| Docker | C | C | C | C | C | C | NE | NE | C | C |
| Backup/restauração | P | P | P | P | P | P | NE | P | P | C |
| Feature flags | NE | NE | NE | NE | NE | NE | NE | NE | NE | NE |
| PWA/mobile | P | P | P | C | P | P | P | P | P | P |
| IA | NE | P | P | C | NE | C | NE | NE | C | NE |

## 6. Evidências-chave por repositório

### PropertyWebBuilder
- `config/routes.rb`
- `app/models/pwb/saved_search.rb`
- `app/models/pwb/search_alert.rb`
- `app/controllers/pwb/pages_controller.rb`
- `app/themes/barcelona/views/pwb/_header.html.erb`
- `app/themes/barcelona/views/pwb/props/show.html.erb`
- `app/themes/barcelona/views/pwb/search/_search_results.html.erb`
- `app/views/layouts/site_admin.html.erb`
- `db/schema.rb`
- `lib/tasks/saved_searches.rake`

### Liberu Real Estate
- `app/Filament/Resources/*`
- `app/Http/Controllers/FavoriteController.php`
- `app/Http/Controllers/PriceAlertController.php`
- `app/Jobs/CheckPropertyAlerts.php`
- `app/Services/PropertyRecommendationService.php`
- `app/Services/PriceAlertService.php`
- `app/View/Components/PropertyMap.php`
- `resources/views/livewire/property-list.blade.php`
- `resources/views/livewire/property-detail.blade.php`
- `resources/views/livewire/advanced-property-search.blade.php`
- `database/migrations/*`

### Liberu CRM
- `app/Filament/App/Resources/*`
- `app/Livewire/TaskList.php`
- `app/Livewire/DealCard.php`
- `app/Livewire/ContactCollaboration.php`
- `app/Listeners/*`
- `config/permissions.php`
- `config/fortify.php`
- `config/socialstream.php`
- `tests/Unit/WhatsAppBusinessServiceTest.php`
- `tests/Unit/TwilioServiceTest.php`

### InsulaCRM
- `resources/views/leads/kanban.blade.php`
- `resources/views/deals/pipeline.blade.php`
- `resources/views/deals/_transaction_checklist.blade.php`
- `resources/views/deals/_commission_calculator.blade.php`
- `resources/views/buyers/index.blade.php`
- `resources/views/buyer-portal/show.blade.php`
- `resources/views/forms/lead-capture.blade.php`
- `resources/views/components/dashboard/*`
- `database/migrations/2026_03_10_500000_add_ai_motivation_score_to_leads.php`
- `database/migrations/2026_03_15_030000_create_campaigns_table.php`

### PropKub
- `apps/web/pages/index.tsx`
- `apps/web/pages/property/[slug].tsx`
- `apps/web/pages/blog.tsx`
- `apps/web/pages/sitemap.xml.js`
- `apps/web/components/Posts/PostFilter.tsx`
- `apps/web/components/Posts/PostMap.tsx`
- `apps/web/components/UI/GoogleMap.tsx`
- `apps/web/components/Auth/*`
- `apps/api/src/posts/posts.controller.ts`
- `apps/api/src/auth/strategies/google.strategy.ts`

### Really CRM
- `app/(app)/dashboard/page.tsx`
- `app/(app)/clients/page.tsx`
- `app/(app)/pipeline/page.tsx`
- `app/(app)/property-match/page.tsx`
- `app/api/send-followup-email/route.ts`
- `app/api/cron/send-daily-followups/route.ts`
- `components/pipeline/PipelineBoard.tsx`
- `components/follow-ups/FollowUpForm.tsx`
- `lib/claude/propertyMatch.ts`
- `supabase/migrations/0001_pipeline_and_templates.sql`

### Property Pulse
- `app/page.jsx`
- `app/properties/page.jsx`
- `app/properties/[id]/page.jsx`
- `app/properties/saved/page.jsx`
- `app/properties/search-results/page.jsx`
- `app/messages/page.jsx`
- `components/Hero.jsx`
- `components/PropertySearchForm.jsx`
- `components/PropertyMap.jsx`
- `app/actions/bookmarkProperty.js`

### RealEstateCRM
- `server/model/schema/lead.js`
- `server/model/schema/opprtunity.js`
- `server/model/schema/property.js`
- `server/model/schema/task.js`
- `server/model/schema/meeting.js`
- `server/model/schema/phoneCall.js`
- `server/model/schema/textMsg.js`
- `server/controllers/*`
- `client/src/redux/slices/*`

### NextCRM
- `app/[locale]/(routes)/admin/*`
- `app/[locale]/(routes)/campaigns/*`
- `actions/crm/*`
- `actions/projects/*`
- `actions/invoices/*`
- `app/api/*`
- `inngest/functions/*`
- `lib/openai.ts`
- `lib/spreadsheet/export-targets.ts`
- `prisma/*`

### MicroRealEstate
- `services/tenantapi/src/controllers/*`
- `services/tenantapi/src/routes.ts`
- `webapps/landlord/*`
- `webapps/tenant/*`
- `webapps/commonui/*`
- `docker-compose*.yml`
- `backup/demodb.dump`
- `e2e/cypress/e2e/*`

## 7. Leitura rápida

- `PropertyWebBuilder` é o melhor candidato para base pública e multi-tenant.
- `Liberu Real Estate` é o mais forte em domínio imobiliário operacional.
- `Liberu CRM` é o mais forte em CRM generalista.
- `InsulaCRM` é o mais forte em CRM imobiliário com funil e comissão.
- `NextCRM` é o melhor em arquitetura SaaS moderna para evolução.
- `Property Pulse` e `PropKub` são os mais úteis para front público enxuto.
- `RealEstateCRM` e `Really CRM` cobrem CRM e relacionamento, mas com arquitetura menos convincente para ser base principal.
- `MicroRealEstate` é mais gestão de locação/tenant-landlord do que plataforma de captação e venda.
