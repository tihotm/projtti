# PROPERTYWEBBUILDER GATE 2 - WSL / LINUX

Data: 2026-08-12

Resultado final: BLOCKED

## Objetivo

Validar o `PropertyWebBuilder` em ambiente Linux/WSL antes de registrar a base oficial em `DECISIONS.md`.

O Gate 1 mostrou que o bloqueio anterior estava concentrado na combinacao `PropertyWebBuilder + Windows nativo`, nao necessariamente no `PropertyWebBuilder` como base do produto.

## Regra de execucao

Nao modificar codigo do `PropertyWebBuilder` para faze-lo passar no gate.

Durante este gate, era permitido:
- instalar runtime e dependencias do ambiente;
- configurar banco local;
- criar arquivos locais nao versionados exigidos pelo setup;
- definir variaveis de ambiente;
- rodar comandos documentados pelo projeto.

Durante este gate, nao era permitido:
- alterar `Gemfile`, initializers, environments, migrations, models, controllers ou views do clone;
- comentar gems para contornar erro;
- editar codigo para pular credentials, Lookbook, Zeus ou qualquer inicializador;
- registrar escolha oficial em `DECISIONS.md` antes do resultado final.

## Ambiente

| Item | Resultado |
| --- | --- |
| WSL default | Ubuntu |
| WSL version | 2 |
| Distribuicao | Ubuntu 26.04 LTS |
| Kernel | `6.18.33.1-microsoft-standard-WSL2` |
| Arquitetura | `amd64` / `x86_64` |
| Usuario WSL | `igor_b` |
| PostgreSQL | PASS: `psql (PostgreSQL) 18.4`, `/var/run/postgresql:5432 - accepting connections` |
| Build tools | PASS: `gcc 15.2.0`, `GNU Make 4.4.1` |
| Git | PASS: `git version 2.53.0` |
| curl | PASS: `curl 8.18.0` |
| `sudo -n` | BLOCKED: `sudo: interactive authentication is required` |

Evidencia WSL:

```text
wsl.exe --status
Distribuicao Padrao: Ubuntu
Versao Padrao: 2

wsl.exe -l -v
* Ubuntu            Running    2
  docker-desktop    Stopped    2

wsl.exe bash -lc "whoami; uname -a; cat /etc/os-release; dpkg --print-architecture"
igor_b
Linux DESKTOP-VEHOMO7 6.18.33.1-microsoft-standard-WSL2 #1 SMP PREEMPT_DYNAMIC Fri Jun  5 01:12:21 UTC 2026 x86_64 GNU/Linux
PRETTY_NAME="Ubuntu 26.04 LTS"
VERSION_ID="26.04"
VERSION="26.04 (Resolute Raccoon)"
amd64
```

## Copias de teste Linux

Primeira copia criada:

```text
~/Projetos/plataforma-imobiliaria/property_web_builder_gate2
```

Commit:

```text
d3b4c2786f6f967ca3cf8a63f95ba38fa6ea4e79
```

Durante o primeiro `npm install`, o filesystem WSL entrou em modo `emergency_ro`:

```text
touch: cannot touch '.gate2_write_test': Read-only file system
/dev/sdd on / type ext4 (rw,relatime,discard,errors=remount-ro,data=ordered,emergency_ro)
df: Input/output error
```

O WSL foi reiniciado com:

```text
wsl.exe --shutdown
```

Apos reiniciar, o filesystem voltou a aceitar escrita:

```text
/dev/sdd on / type ext4 (rw,relatime,discard,errors=remount-ro,data=ordered)
write-ok
```

Para evitar limpar artefatos parciais, foi criada uma segunda copia limpa:

```text
~/Projetos/plataforma-imobiliaria/property_web_builder_gate2_clean
```

Commit testado:

```text
d3b4c2786f6f967ca3cf8a63f95ba38fa6ea4e79
```

O `git status --short --untracked-files=no` nao retornou saida na copia limpa apos `bundle install` e apos a falha de `npm install`, indicando ausencia de alteracoes rastreadas em codigo upstream.

Observacao: artefatos de runtime como `node_modules/` foram gerados parcialmente pela tentativa de `npm install`; eles permanecem nao rastreados e nao representam alteracao upstream.

## Requisitos do projeto

Confirmado no proprio repositorio:

```text
docs/DEVELOPMENT.md
- Ruby: 3.4.7 (see `.tool-versions`)
- Rails: 8.1
- PostgreSQL
- Node.js & npm

Gemfile
16:ruby "~> 3.4.0"

Gemfile.lock
RUBY VERSION
   ruby 3.4.7p58

BUNDLED WITH
   2.6.9

package.json
"node": ">=22.18.0 <23"
"packageManager": "pnpm@10.28.0+sha512..."
```

O guia oficial `docs/DEVELOPMENT.md` manda executar:

```text
bundle install
npm install
bin/rails db:prepare
bin/rails pwb:db:seed
bin/dev
bundle exec rspec
```

## Ruby

Ruby foi instalado no WSL via `rbenv`/`ruby-build`, no diretorio do usuario:

```text
rbenv 1.3.2-25-g07e9b1e
ruby-build 20260716-2-g13b73fe9
ruby 3.4.7 (2025-10-08 revision 7a5688e2a2) +PRISM [x86_64-linux]
gem 3.6.9
Bundler version 2.6.9
```

Comando relevante:

```text
rbenv install -s 3.4.7
gem install bundler -v 2.6.9
```

## Node.js

Node Linux foi instalado em userland:

```text
~/.local/node/node-v22.18.0-linux-x64
```

Versoes:

```text
node v22.18.0
npm 10.9.3
corepack 0.33.0
```

## Instalacao Ruby

`bundle install` foi executado na copia limpa com grupos completos, sem exclusoes artificiais:

```text
ruby 3.4.7 (2025-10-08 revision 7a5688e2a2) +PRISM [x86_64-linux]
Bundler version 2.6.9
Bundle complete! 96 Gemfile dependencies, 269 gems now installed.
```

Resultado: PASS.

Observacoes relevantes:
- `graphiql-rails` instalou corretamente em Linux.
- `zeus` instalou corretamente em Linux.
- `get_process_mem` instalou corretamente em Linux.
- O bloqueio observado no Windows nativo nao se reproduziu no `bundle install` Linux.

## Instalacao JavaScript

`npm install` foi executado conforme `docs/DEVELOPMENT.md`.

Resultado: BLOCKED.

Erro principal:

```text
npm error code 1
npm error path /home/igor_b/Projetos/plataforma-imobiliaria/property_web_builder_gate2_clean/node_modules/puppeteer
npm error command failed
npm error command sh -c node install.mjs
npm error Error: ERROR: Failed to set up chrome v151.0.7922.47! Set "PUPPETEER_SKIP_DOWNLOAD" env variable to skip download.
npm error   [cause]: Error: All providers failed for chrome 151.0.7922.47:
npm error     - DefaultProvider: Extraction failed: no zip archiver is available. Install `unzip` (or `tar.exe`/Powershell on Windows), or add the optional `yauzl` dependency.
```

Tambem ocorreu warning de cache npm corrompido, mas o erro final bloqueante foi ausencia de `unzip`:

```text
npm warn tar TAR_BAD_ARCHIVE: Unrecognized archive format
npm warn tarball cached data ... seems to be corrupted. Refreshing cache.
```

Validacao da dependencia:

```text
command -v unzip
# sem saida

sudo -n apt install -y unzip
sudo: interactive authentication is required
```

Nao foi usado `PUPPETEER_SKIP_DOWNLOAD`, pois isso pularia parte do setup oficial do projeto.

## Banco e migrations

Nao executado.

Motivo: o gate bloqueou em `npm install`, antes da etapa documentada `bin/rails db:prepare`.

Observacao: PostgreSQL esta ativo e aceitando conexoes no socket local, mas roles/databases ainda nao foram avaliados.

## Testes

Nao executados.

Motivo: dependencias JavaScript oficiais nao foram instaladas completamente.

## Runtime

Servidor development nao executado.

Motivo: `npm install` nao concluiu, entao `bin/dev` nao poderia validar assets/frontend conforme o setup oficial.

## Smoke Tests

| Teste | Resultado | Observacao |
| --- | --- | --- |
| Boot | BLOCKED | `npm install` bloqueado antes de `bin/dev`. |
| Admin | BLOCKED | Aplicacao nao iniciou. |
| Cadastro imovel | BLOCKED | Aplicacao nao iniciou. |
| Upload | BLOCKED | Aplicacao nao iniciou. |
| Catalogo | BLOCKED | Aplicacao nao iniciou. |
| Busca | BLOCKED | Aplicacao nao iniciou. |
| Pagina imovel | BLOCKED | Aplicacao nao iniciou. |
| Mapas | BLOCKED | Aplicacao nao iniciou; credenciais externas nao avaliadas. |
| Multi-tenant | BLOCKED | Aplicacao nao iniciou; fluxo nao avaliado. |

## Alteracoes upstream

Nenhuma alteracao upstream foi realizada.

Nao foram alterados:
- `Gemfile`;
- `Gemfile.lock`;
- `package.json`;
- `package-lock.json`;
- initializers;
- environments;
- migrations;
- models;
- controllers;
- views;
- `DECISIONS.md`.

Alteracoes/artefatos fora do upstream original:
- instalacao de `rbenv` em `~/.rbenv`;
- instalacao de Ruby `3.4.7` em `~/.rbenv/versions/3.4.7`;
- instalacao de Node `22.18.0` em `~/.local/node/node-v22.18.0-linux-x64`;
- criacao de copias de teste em `~/Projetos/plataforma-imobiliaria/property_web_builder_gate2` e `~/Projetos/plataforma-imobiliaria/property_web_builder_gate2_clean`;
- artefatos nao rastreados parciais de `npm install` na copia de teste.

## Resultado

GATE 2: BLOCKED

PropertyWebBuilder recomendado como base principal: PENDENTE

Motivos:
1. O ambiente Linux agora valida o ponto mais importante do Gate 2 ate aqui: Ruby `3.4.7`, Bundler `2.6.9`, PostgreSQL e build tools funcionam.
2. `bundle install` passou limpo em Linux, sem exclusoes de grupos, sem editar gems e sem patches upstream.
3. O bloqueio atual e ambiental: `npm install` falha no postinstall do Puppeteer porque `unzip` nao esta instalado, e o Codex nao consegue instalar via `sudo` sem autenticacao interativa.

Bloqueios restantes:
- Instalar `unzip` no Ubuntu WSL:

```bash
sudo apt install -y unzip
```

- Reexecutar `npm install` na copia limpa.
- Executar `bin/rails db:prepare`.
- Executar seed opcional `bin/rails pwb:db:seed`, se o setup exigir.
- Executar `bundle exec rspec`.
- Executar `bin/dev`.
- Validar smoke tests publicos/admin.

Codigo upstream alterado: NAO
