# PROPERTYWEBBUILDER RUNTIME GATE

Data: 2026-08-12

Status: BLOQUEADO NO WINDOWS

## Objetivo

Validar se o `PropertyWebBuilder` instala, migra, testa e roda localmente antes de registrar a escolha definitiva em `DECISIONS.md`.

## Resultado executivo

O gate não passou ainda.

O bloqueio atual nao invalida a escolha funcional do `PropertyWebBuilder`, mas impede encerrar a decisao tecnica. A aplicacao exige validacao em ambiente Linux/WSL preparado ou ajustes explicitos de compatibilidade Windows.

## Ambiente testado

- Checkout: `C:\Projetos\plataforma-imobiliaria\references\property_web_builder`
- Ruby declarado: `3.4.7`
- Ruby instalado: `3.4.10` via RubyInstaller + DevKit
- Bundler: `2.6.9`
- Node instalado: `24.18.0`
- Node requerido no `package.json`: `>=22.18.0 <23`
- PostgreSQL: instalado, servico global `postgresql-x64-18` detectado
- PostgreSQL temporario: cluster local criado em `work\pwb-pgdata`, porta `55432`
- Docker: CLI instalado, daemon Docker Desktop nao estava rodando
- WSL: Ubuntu disponivel, mas sem Ruby/Node/PostgreSQL e sem `sudo` nao interativo

## Passes confirmados

- Ruby 3.4 instalado e executando.
- Bundler executando.
- PostgreSQL temporario inicializado com `initdb`.
- PostgreSQL temporario respondeu em `localhost:55432`.
- `npm install` executou com sucesso.
- Bundle Ruby runtime sem `development:test` instalou com sucesso.
- Bundle Ruby temporario para Windows instalou com `sys-proctable` e `tzinfo-data`.

## Bloqueios encontrados

### 1. Docker indisponivel

`docker version` encontrou o CLI, mas não conseguiu conectar ao daemon:

```text
failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine
```

Impacto:
- nao foi possivel usar container Linux como alternativa imediata.

### 2. RubyGems SSL no Windows

`bundle install` falhou inicialmente contra `https://rubygems.org` por CA ausente no trust store do Ruby:

```text
Could not verify the SSL certificate for https://rubygems.org/
```

Mitigação aplicada:
- gerado CA bundle local a partir do Windows Certificate Store;
- `SSL_CERT_FILE` e `BUNDLE_SSL_CA_CERT` apontados para esse bundle.

Resultado:
- Ruby passou a acessar `https://rubygems.org`.

### 3. `graphiql-rails` não instala no Windows sem symlink

O bundle completo falhou ao instalar `graphiql-rails`.

Diagnóstico:
- `gem unpack graphiql-rails-1.10.5.gem` falhou com:

```text
Permission denied @ rb_file_s_symlink
```

Impacto:
- bundle completo com grupo `development` nao fecha nesta sessao Windows;
- isso tambem bloqueia ambiente `development` puro.

Mitigacao aplicada:
- instalado bundle sem grupo `development`;
- isso permite avancar para teste runtime parcial, mas nao equivale a setup completo do README.

### 4. `zeus` depende de `pty`, ausente no Ruby Windows

Ao tentar `RAILS_ENV=test` com bundle sem `development`, o boot falhou em:

```text
cannot load such file -- pty
```

Origem:
- gem `zeus`, incluída no grupo `development, test`.

Impacto:
- testes RSpec nao puderam rodar no Ruby Windows sem ajuste no Gemfile ou ambiente Linux.

### 5. `get_process_mem` exige `sys-proctable` no Windows

Ao tentar boot runtime sem `development:test`, Rails falhou em:

```text
Please add `sys-proctable` to your Gemfile for windows machines
cannot load such file -- sys/proctable
```

Mitigacao aplicada:
- criado Gemfile temporario fora do clone:
  `C:\Projetos\plataforma-imobiliaria\.runtime\Gemfile.windows-runtime`
- adicionadas gems temporarias:
  - `sys-proctable`
  - `tzinfo-data`

Resultado:
- esse bloqueio foi superado no bundle temporario.

### 6. `tzinfo-data` ausente no Windows

Depois de `sys-proctable`, Rails falhou em:

```text
tzinfo-data is not present
```

Mitigação aplicada:
- adicionada `tzinfo-data` no Gemfile temporario Windows.

Resultado:
- esse bloqueio foi superado no bundle temporario.

### 7. Initializer `lookbook` roda mesmo sem a gem

Ao tentar `RAILS_ENV=development` com bundle sem `development`, Rails falhou em:

```text
undefined method 'lookbook' for an instance of Rails::Application::Configuration
```

Origem:
- `config/initializers/lookbook.rb`

Impacto:
- ambiente `development` nao sobe sem instalar grupo `development`;
- grupo `development` esta bloqueado no Windows pela gem `graphiql-rails`.

### 8. Production boot exige credentials/chaves validas

Ao tentar `RAILS_ENV=production` com chaves dummy, Rails falhou em:

```text
ArgumentError: key must be 16 bytes
```

Origem:
- `config/initializers/devise.rb`
- uso de `Rails.application.credentials.devise_secret_key` ou `secret_key_base`

Impacto:
- production boot precisa de credentials locais adequadas, nao apenas variaveis dummy simples.

## Testes não executados

Não foi possível executar:
- `bundle exec rspec`
- `rails db:prepare` com sucesso completo
- `rails server` / `bin/dev`
- Playwright

Motivo:
- boot Rails ainda bloqueado antes das migrations.

## Conclusao do gate

Pergunta:

> PropertyWebBuilder instala, migra, testa e roda localmente?

Resposta atual:

> NÃO AINDA. O gate está bloqueado por ambiente Windows e por dependências de desenvolvimento/teste que assumem Linux/Unix.

## Interpretação técnica

Este resultado não mostra uma falha funcional definitiva do `PropertyWebBuilder`.

Ele mostra que o checkout atual não é um setup Windows plug-and-play. O caminho tecnicamente correto para validar a base é:
- Docker Desktop rodando; ou
- WSL Ubuntu com Ruby 3.4.7, Node 22.x, PostgreSQL e build tools instalados; ou
- patch temporario de compatibilidade Windows para desenvolvimento/teste.

## Recomendação

Não alterar `DECISIONS.md` ainda.

Próximo passo recomendado:
1. Preparar WSL Ubuntu com `sudo` disponivel.
2. Instalar Ruby 3.4.x, Node 22.x, PostgreSQL client/server e build tools no WSL.
3. Rodar o gate dentro do WSL.
4. Se passar, registrar a decisao oficial.
5. Se falhar tambem no Linux, reavaliar severidade contra `Liberu Real Estate`.

Checklist detalhado:
- `audits/PROPERTYWEBBUILDER_GATE_2_WSL_LINUX.md`
