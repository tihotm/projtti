# PropertyWebBuilder Gate 2 Harness

## Purpose

`scripts/pwb_gate2.sh` reproduces the already-audited setup/test sequence for the PropertyWebBuilder candidate without changing upstream code or bypassing required dependencies.

It supports Issue #14 and does **not** replace the runtime/smoke acceptance in Issues #2 and #3.

## Frozen candidate

The harness accepts only:

```text
d3b4c2786f6f967ca3cf8a63f95ba38fa6ea4e79
```

Any other checkout SHA fails closed.

## Preflight only

Use this first after installing the missing WSL prerequisite:

```bash
bash scripts/pwb_gate2.sh ~/Projetos/plataforma-imobiliaria/property_web_builder_gate2_clean --preflight
```

The preflight checks:

- exact Git SHA;
- tracked worktree clean;
- Ruby 3.4.7;
- Bundler 2.6.9;
- Node.js `>=22.18.0 <23`;
- npm available;
- PostgreSQL available and accepting connections;
- `unzip` available.

Missing environmental prerequisites return:

```text
GATE2_CLASSIFICATION=BLOCKED_ENVIRONMENT
```

Candidate mismatch or a dirty tracked worktree returns `FAIL` rather than being treated as an environment block.

## Setup/test phase

After preflight passes:

```bash
bash scripts/pwb_gate2.sh ~/Projetos/plataforma-imobiliaria/property_web_builder_gate2_clean
```

The harness executes the sequence already recorded in `audits/PROPERTYWEBBUILDER_GATE_2_WSL_LINUX.md`:

```text
bundle install
npm install
bin/rails db:prepare
bundle exec rspec
```

Seed remains opt-in because the prior audit says to run it when required:

```bash
PWB_RUN_SEED=1 bash scripts/pwb_gate2.sh ~/Projetos/plataforma-imobiliaria/property_web_builder_gate2_clean
```

After every mutating/setup step, the harness checks that no tracked upstream file changed.

## Explicitly forbidden shortcuts

The harness does not:

- install packages with `sudo`;
- use `PUPPETEER_SKIP_DOWNLOAD`;
- edit `Gemfile`, lockfiles, initializers, migrations, models, controllers or views;
- promote PropertyWebBuilder to official base;
- claim the complete Gate 2 passed after RSpec alone.

## Final acceptance remains manual/runtime-aware

A successful harness run ends with:

```text
GATE2_HARNESS_PHASE=SETUP_AND_TEST_PASS
GATE2_FINAL=NOT_EVALUATED
```

The complete #2 decision still requires `bin/dev` plus the public/admin smoke suite defined in #3. Only after those executable checks may #2 be classified as final `PASS`, `FAIL` or `BLOCKED` and #5 proceed.
