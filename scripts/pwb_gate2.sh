#!/usr/bin/env bash
set -u

EXPECTED_SHA="d3b4c2786f6f967ca3cf8a63f95ba38fa6ea4e79"
EXPECTED_RUBY="3.4.7"
EXPECTED_BUNDLER="2.6.9"
MODE="run"

usage() {
  cat <<'EOF'
Usage:
  bash scripts/pwb_gate2.sh <property_web_builder_dir> [--preflight]

Modes:
  default       Validate preconditions, then run the audited setup/test sequence.
  --preflight   Validate only; make no setup/test changes.

Optional environment:
  PWB_RUN_SEED=1  Run `bin/rails pwb:db:seed` after db:prepare.
EOF
}

say() {
  printf '%s\n' "$*"
}

blocked() {
  say "GATE2_CLASSIFICATION=BLOCKED_ENVIRONMENT"
  say "GATE2_REASON=$*"
  exit 2
}

invariant_failed() {
  say "GATE2_CLASSIFICATION=FAIL_INVARIANT"
  say "GATE2_REASON=$*"
  exit 1
}

execution_failed() {
  say "GATE2_CLASSIFICATION=EXECUTION_FAILED_UNCLASSIFIED"
  say "GATE2_REASON=$*"
  say "GATE2_FINAL=NOT_EVALUATED"
  exit 1
}

require_command() {
  local command_name="$1"
  command -v "$command_name" >/dev/null 2>&1 || blocked "missing command: ${command_name}"
}

assert_tracked_clean() {
  local tracked_status
  tracked_status="$(git status --porcelain --untracked-files=no)" || invariant_failed "unable to read git status"
  if [[ -n "$tracked_status" ]]; then
    say "$tracked_status"
    invariant_failed "tracked upstream worktree is not clean"
  fi
}

run_step() {
  local name="$1"
  shift
  say "STEP=${name} STATUS=RUNNING"
  "$@"
  local rc=$?
  if [[ $rc -ne 0 ]]; then
    say "STEP=${name} STATUS=FAILED_UNCLASSIFIED EXIT_CODE=${rc}"
    execution_failed "step ${name} failed with exit code ${rc}; inspect evidence before classifying environment vs functional failure"
  fi
  assert_tracked_clean
  say "STEP=${name} STATUS=PASS"
}

if [[ $# -lt 1 || $# -gt 2 ]]; then
  usage
  exit 64
fi

PWB_DIR="$1"
if [[ $# -eq 2 ]]; then
  if [[ "$2" != "--preflight" ]]; then
    usage
    exit 64
  fi
  MODE="preflight"
fi

[[ -d "$PWB_DIR" ]] || invariant_failed "checkout directory does not exist: ${PWB_DIR}"
cd "$PWB_DIR" || invariant_failed "cannot enter checkout directory: ${PWB_DIR}"

require_command git

ACTUAL_SHA="$(git rev-parse HEAD 2>/dev/null)" || invariant_failed "not a readable git checkout"
if [[ "$ACTUAL_SHA" != "$EXPECTED_SHA" ]]; then
  invariant_failed "unexpected candidate SHA: expected ${EXPECTED_SHA}, got ${ACTUAL_SHA}"
fi
say "CANDIDATE_SHA=${ACTUAL_SHA} STATUS=PASS"

assert_tracked_clean
say "TRACKED_WORKTREE=CLEAN"

require_command ruby
ACTUAL_RUBY="$(ruby -e 'print RUBY_VERSION')" || blocked "unable to read Ruby version"
[[ "$ACTUAL_RUBY" == "$EXPECTED_RUBY" ]] || blocked "Ruby ${EXPECTED_RUBY} required; found ${ACTUAL_RUBY}"
say "RUBY_VERSION=${ACTUAL_RUBY} STATUS=PASS"

require_command bundle
ACTUAL_BUNDLER="$(bundle --version | awk '{print $3}')" || blocked "unable to read Bundler version"
[[ "$ACTUAL_BUNDLER" == "$EXPECTED_BUNDLER" ]] || blocked "Bundler ${EXPECTED_BUNDLER} required; found ${ACTUAL_BUNDLER}"
say "BUNDLER_VERSION=${ACTUAL_BUNDLER} STATUS=PASS"

require_command node
ACTUAL_NODE="$(node -p 'process.versions.node')" || blocked "unable to read Node.js version"
# ⚡ Bolt optimization: Avoid second Node.js spawn by doing the version check in pure Bash
IFS='.' read -r -a node_v <<< "$ACTUAL_NODE"
if [[ ${node_v[0]} -ne 22 || ${node_v[1]} -lt 18 ]]; then
  blocked "Node.js must satisfy >=22.18.0 <23; found ${ACTUAL_NODE}"
fi
say "NODE_VERSION=${ACTUAL_NODE} STATUS=PASS"

require_command npm
ACTUAL_NPM="$(npm --version)" || blocked "unable to read npm version"
say "NPM_VERSION=${ACTUAL_NPM} STATUS=PASS"

require_command psql
require_command pg_isready
pg_isready >/dev/null 2>&1 || blocked "PostgreSQL is not accepting connections via pg_isready"
say "POSTGRESQL_READY=YES STATUS=PASS"

require_command unzip
say "UNZIP_AVAILABLE=YES STATUS=PASS"

say "PRECONDITIONS=PASS"

if [[ "$MODE" == "preflight" ]]; then
  say "GATE2_HARNESS_PHASE=PREFLIGHT_PASS"
  say "GATE2_FINAL=NOT_EVALUATED"
  exit 0
fi

run_step "bundle_install" bundle install
run_step "npm_install" npm install
run_step "db_prepare" bin/rails db:prepare

if [[ "${PWB_RUN_SEED:-0}" == "1" ]]; then
  run_step "db_seed" bin/rails pwb:db:seed
else
  say "STEP=db_seed STATUS=SKIPPED REASON=PWB_RUN_SEED_not_1"
fi

run_step "rspec" bundle exec rspec

say "GATE2_HARNESS_PHASE=SETUP_AND_TEST_PASS"
say "GATE2_FINAL=NOT_EVALUATED"
say "NEXT_REQUIRED=bin/dev and public/admin smoke suite from issue #3"
