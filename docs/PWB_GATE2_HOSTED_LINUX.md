# PropertyWebBuilder Gate 2 — hosted Linux evidence

## Purpose

This is an executable Linux supplement for Issue #2. It does not silently redefine the prior WSL audit and does not promote PropertyWebBuilder by itself.

The workflow `.github/workflows/pwb-gate2-linux.yml` checks out the same frozen upstream candidate:

```text
UPSTREAM = etewiah/property_web_builder
SHA = d3b4c2786f6f967ca3cf8a63f95ba38fa6ea4e79
```

It runs on GitHub-hosted Ubuntu and uses the exact `projtti` fail-closed harness before any browser smoke.

## Why hosted Linux is valid evidence

The frozen PropertyWebBuilder candidate itself defines an Ubuntu GitHub Actions CI with PostgreSQL, Redis, Ruby, Node 22.18.0, RSpec and Playwright. The hosted gate therefore exercises a runtime shape already supported by the candidate rather than inventing a second platform.

This evidence answers: **does the exact frozen candidate install, prepare its database, run its test suite, boot and satisfy the canonical baseline on Linux?**

It does not answer the separate environment question: **is Igor's current WSL installation locally ready?** That remains an environment confirmation while `unzip` is absent there.

## Fail-closed classification

The existing `scripts/pwb_gate2.sh` remains authoritative for setup/test classification:

```text
BLOCKED_ENVIRONMENT
FAIL_INVARIANT
EXECUTION_FAILED_UNCLASSIFIED
```

A non-zero install/test/browser command is not automatically called a functional failure. Its logs must be inspected before Issue #2 is classified as environmental `BLOCKED` or functional/architectural `FAIL`.

## Baseline mapping

The canonical Issue #3 baseline is mapped as follows:

| Gate | Executable evidence |
|---|---|
| `BOOT` | e2e health endpoint on a real Rails server |
| `PUBLIC_HOME` | targeted Playwright navigation |
| `CATALOG` | upstream `property-search.spec.js` |
| `SEARCH_FILTER` | upstream `property-search.spec.js` |
| `PROPERTY_PAGE` | upstream `property-details.spec.js` |
| `ADMIN_AUTH` | dedicated server without `BYPASS_ADMIN_AUTH`; anonymous access denied and seeded admin login accepted |
| `PROPERTY_CRUD` | targeted browser create + edit through `site_admin/props` |
| `LISTING_CRUD` | targeted browser create + edit of a SaleListing separate from the physical Property |
| `MEDIA_UPLOAD` | targeted browser upload to the Property photos surface |
| `TENANT_ISOLATION` | upstream `tenant-isolation.spec.js` |
| `ROLE_BOUNDARY` | dedicated non-bypass server; seeded regular member denied admin surface |
| `LEAD_INTAKE` | public contact form submission plus database verification of persisted `Pwb::Message` |

The admin functional smoke uses `BYPASS_ADMIN_AUTH=true` only to isolate business/UI functionality. Authorization is not credited from that server; `ADMIN_AUTH` and `ROLE_BOUNDARY` are proved separately with the bypass environment variable absent.

## Candidate code integrity

No PropertyWebBuilder tracked source is patched to make the gate pass. The candidate checkout is pinned and must be clean before the harness starts. The extra smoke lives in `projtti`, not in the upstream checkout.

## Final output

Only after all setup, RSpec, selected upstream E2E tests, targeted functional smoke, persistence check and real-auth smoke succeed does the workflow emit:

```text
SMOKE3_REQUIRED=12
SMOKE3_RESULT=PASS
BASE_OPERACIONAL_MINIMA=PASS
GATE2_HOSTED_LINUX=PASS
GATE2_FINAL=HOSTED_LINUX_PASS_LOCAL_WSL_CONFIRMATION_SEPARATE
```

This hosted result can establish candidate runtime viability on Linux. The WSL-specific blocker must still be recorded accurately rather than rewritten as if the local command had run.
