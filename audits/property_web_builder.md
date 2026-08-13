# PropertyWebBuilder Audit

## Status
- Partial audit completed.
- Installation and test execution were not run in this environment because Ruby/Bundler are not installed here (`where.exe ruby` and `where.exe bundle` returned not found).

## Repository Metadata
- URL: https://github.com/etewiah/property_web_builder
- Branch: `master`
- Commit: `d3b4c2786f6f967ca3cf8a63f95ba38fa6ea4e79`
- License: MIT, declared in `README.md`.
- License file: no top-level `LICENSE*` file detected in this checkout.

## Language and Framework
- Language: Ruby
- Framework: Ruby on Rails 8.1
- Ruby version: 3.4.7+
- Frontend stack: Tailwind CSS, JavaScript asset tooling, Playwright support.

## Database
- PostgreSQL.
- `config/database.yml` defines primary, tenant shard, and demo shard databases.
- Multi-database / multi-shard setup is explicit in the config.

## Architecture
- Standalone Rails application, not a gem-style engine in the current form.
- Multi-tenant design with website-level isolation.
- Dual admin panels: `site_admin` and `tenant_admin`.
- `RealtyAsset` model is distinct from `SaleListing` / `RentalListing` according to the README.
- ActiveStorage is used for file storage and is S3/R2 compatible.

## Auth
- Optional Firebase authentication with Devise fallback.
- Audit logging for authentication events is documented in the README.

## Features Confirmed in Code or README
- Multi-tenancy.
- Multilingual support.
- Multi-currency support.
- Faceted search.
- Embeddable widgets for listings.
- Google Maps integration with location picker.
- SEO implementation.
- Responsive design.
- Seed packs.
- Dual admin panels.
- REST API documentation under `docs/api`.
- Multi-tenant documentation present in `MULTI_TENANCY_*.md` files.

## Files and Signals Observed
- `app/`, `config/`, `db/`, `spec/`, `test/`, `tests/`, `swagger/`, `docs/`, `remotion/`.
- `Gemfile`, `Gemfile.lock`, `Dockerfile`, `MIT-LICENSE`.
- `playwright.config.js` and `playwright.production.config.js`.
- `config/database.yml` with PostgreSQL and shard migration paths.

## Installation
- Not executed.
- Blocked by missing local Ruby/Bundler tooling in this environment.

## Tests
- Not executed.
- Test surfaces present: `spec/`, `test/`, `tests/`, Playwright config.

## Migrations
- Present in `db/` and shard migration paths referenced by `config/database.yml`.
- Not executed.

## API
- API documentation folder present in `docs/api`.
- Swagger folder present.

## Storage
- ActiveStorage documented.
- S3/R2 compatible.

## Administration
- Site admin and tenant admin are explicit concepts in the README and docs.

## Multi-tenant
- Yes.
- Current website context and shard separation are documented in the repository.

## Strengths
- Strong multi-tenant story.
- Clear separation between listing and physical property concepts.
- Mature documentation footprint.
- SEO, maps, widgets, admin, and storage already present.

## Limitations
- Ruby environment not available here, so runtime validation is pending.
- No direct evidence yet of a clean install or passing test suite from this environment.
- Multi-shard configuration increases operational complexity.

## Risks
- Multi-tenant data leakage if scoping rules are violated.
- Dependency on external auth and mapping services.
- Sharded setup may complicate local development and CI.

## Functionalities to Absorb Conceptually
- Multi-tenant website model.
- Embeddable property widgets.
- Dual admin separation.
- Search and SEO foundation.
- Seed-pack onboarding.
- Property/listing split.
