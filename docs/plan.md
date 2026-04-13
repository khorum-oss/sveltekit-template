# SvelteKit Template - Implementation Plan

## Context

Setting up a reusable SvelteKit template for the Khorum org with: Storybook, Tailwind CSS v4, TypeScript, SCSS, a pluggable data layer (mocked/local-storage/api/local-db), optional auth, Playwright + Vitest testing, Docker deployment, tree-based navigation, and GitHub Actions CI/CD following existing `violabs/public-cicd` patterns.

---

## Project Structure

```
sveltekit-template/
├── .github/workflows/
│   ├── pr-main.yml              # PR checks (build, lint, test, coverage)
│   ├── merge-main.yml           # Bump version, publish, release
│   └── code-ql.yml              # CodeQL security analysis
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── e2e/
│   ├── auth.test.ts
│   ├── navigation.test.ts
│   └── data-source.test.ts
├── src/
│   ├── app.d.ts
│   ├── app.html
│   ├── app.scss                 # Global SCSS (custom vars/mixins)
│   ├── hooks.server.ts          # API proxy, CORS, auth session
│   ├── lib/
│   │   ├── api/
│   │   │   ├── http.ts          # HTTP client wrapper
│   │   │   ├── auth.ts          # Auth API calls
│   │   │   └── example.ts       # Example domain API
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppShell.svelte
│   │   │   │   ├── TopNav.svelte
│   │   │   │   ├── LeftNav.svelte
│   │   │   │   ├── NavTree.svelte       # Recursive, depth-limited
│   │   │   │   ├── NavTreeItem.svelte
│   │   │   │   └── UserMenu.svelte      # Avatar dropdown
│   │   │   ├── auth/
│   │   │   │   └── AuthGuard.svelte
│   │   │   ├── dev/
│   │   │   │   └── DevModeToggle.svelte # Data source selector (non-prod)
│   │   │   └── ui/
│   │   │       ├── Button.svelte
│   │   │       ├── Modal.svelte
│   │   │       ├── Input.svelte
│   │   │       └── Spinner.svelte
│   │   ├── config/
│   │   │   ├── app.config.ts         # Auth enabled, default source, etc.
│   │   │   ├── data-source.config.ts # Source definitions & env filtering
│   │   │   └── nav.config.ts         # Nav tree structure definition
│   │   ├── data/
│   │   │   ├── types.ts              # DataSource enum, Repository<T>
│   │   │   ├── registry.ts           # Source -> repository factory map
│   │   │   ├── repositories/
│   │   │   │   └── example.repository.ts
│   │   │   └── sources/
│   │   │       ├── mocked/
│   │   │       ├── local-storage/
│   │   │       ├── api/
│   │   │       └── local-db/
│   │   │           ├── client.ts
│   │   │           └── migrations/
│   │   ├── guards/
│   │   │   └── auth.ts
│   │   ├── server/
│   │   │   ├── db/
│   │   │   │   ├── sqlite.ts         # better-sqlite3 singleton
│   │   │   │   └── migrations.ts
│   │   │   └── cors.ts
│   │   ├── stores/
│   │   │   ├── auth.ts
│   │   │   ├── data-source.ts
│   │   │   └── example.ts
│   │   ├── types/
│   │   │   ├── auth.ts
│   │   │   ├── nav.ts
│   │   │   └── example.ts
│   │   └── utils/
│   │       ├── env.ts               # isProd, isDev helpers
│   │       └── logger.ts
│   ├── routes/
│   │   ├── +layout.svelte           # AppShell wrapper
│   │   ├── +layout.server.ts        # Pass env config to client
│   │   ├── +page.svelte             # Home/dashboard
│   │   ├── layout.css               # @import 'tailwindcss'
│   │   ├── login/+page.svelte
│   │   ├── register/+page.svelte
│   │   ├── settings/+page.svelte
│   │   ├── api/db/[entity]/+server.ts  # SQLite CRUD endpoints
│   │   └── __health/+server.ts
│   └── stories/                     # Storybook stories
├── static/
│   └── favicon.png
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── eslint.config.js
├── package.json
├── playwright.config.ts
├── svelte.config.js
├── tsconfig.json
├── vite.config.ts
├── VERSION
└── LICENSE
```

---

## Architecture Decisions

### Data Layer: Strategy + Registry Pattern

```
Component -> Store -> Registry -> Repository<T> impl
                        ^
                  DataSource store (mocked | local-storage | api | local-db)
```

- `Repository<T>` interface: `getAll`, `getById`, `create`, `update`, `delete`
- Registry maps `(entityName, DataSource)` -> factory function
- Stores subscribe to `data-source` store and auto-switch repository
- Components never know which source is active

**Environment filtering:**
- Dev/staging: all 4 sources available, `DevModeToggle` visible
- Production: `local-storage`, `api`, `local-db` only — no mocked data

### SQLite via Server Routes

`better-sqlite3` runs only server-side. The `local-db` repository calls `/api/db/[entity]` server routes which use SQLite directly. Same fetch pattern as the `api` source, different URL prefix.

### Auth: Optional via Config

- `PUBLIC_AUTH_ENABLED=true|false` controls whether auth is enforced
- When disabled: `AuthGuard` is a no-op, `UserMenu` shows simplified view
- When enabled: `hooks.server.ts` checks sessions, guards redirect to `/login`

### CORS: BFF Proxy Pattern

SvelteKit `hooks.server.ts` proxies `/api/*` to `BACKEND_URL`. Browser only talks to SvelteKit origin — no CORS needed for `api` source. For direct backend access scenarios, `cors.ts` helper adds proper headers.

### Stores vs Runes

Module-level shared state (auth, data-source) uses `writable`/`derived` stores (importable from any module). Component-local state uses Svelte 5 runes.

---

## GitHub Actions CI/CD

Following the standard Khorum 3-workflow pattern using `violabs/public-cicd` reusable workflows.

### `.github/workflows/pr-main.yml` — PR Checks

```yaml
name: PR Tests
on:
  pull_request:
    branches: [main]
concurrency:
  group: pr-${{ github.event.pull_request.number }}
  cancel-in-progress: true

jobs:
  build-check:
    uses: violabs/public-cicd/.github/workflows/node-build.yml  # or custom
    # npm ci && npm run build

  lint-check:
    uses: violabs/public-cicd/.github/workflows/node-lint.yml
    # npm run lint && npm run check (svelte-check)

  unit-tests:
    uses: violabs/public-cicd/.github/workflows/node-unit-tests.yml
    # npm run test:unit -- --coverage
    # min coverage threshold (e.g., 80%)

  e2e-tests:
    needs: [build-check]
    # npm run test:e2e (Playwright)
    # Upload test artifacts on failure

  storybook-build:
    # npm run build-storybook (ensure stories compile)

  docker-build:
    # docker build . --target production (verify Dockerfile works)

  notify-discord:
    needs: [build-check, lint-check, unit-tests, e2e-tests]
    if: always()
    uses: violabs/public-cicd/.github/workflows/notify-discord.yml
```

### `.github/workflows/merge-main.yml` — Bump & Publish

```yaml
name: Merge Main
on:
  push:
    branches: [main]
  workflow_dispatch:
concurrency:
  group: merge-main
  cancel-in-progress: false

jobs:
  version:
    uses: violabs/public-cicd/.github/workflows/version-bump.yml
    # Bumps VERSION file

  docker-publish:
    needs: [version]
    # docker build + push to registry (GHCR or DO)
    uses: violabs/public-cicd/.github/workflows/docker-build-push.yml

  release:
    needs: [version, docker-publish]
    # gh release create "v${VERSION}" --generate-notes

  notify-discord:
    needs: [version, docker-publish, release]
    if: always()
    uses: violabs/public-cicd/.github/workflows/notify-discord.yml
```

### `.github/workflows/code-ql.yml` — Security

```yaml
name: CodeQL
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 0 * * 1'  # Weekly Monday

jobs:
  analyze:
    uses: github/codeql-action/analyze
    with:
      languages: javascript-typescript
```

### Notes on Reusable Workflows

Some of these (node-build, node-lint, node-unit-tests) may need to be created in `public-cicd` if they don't exist yet (the existing ones are Gradle-focused). Alternatively, we can inline the steps directly. We'll check `public-cicd` during implementation and either reuse existing workflows or create Node.js equivalents.

---

## Implementation Phases

### Phase 1: Project Scaffold
1. `npx sv create` with TypeScript, Tailwind v4, Playwright
2. Install deps: `sass`, `better-sqlite3`, `@storybook/sveltekit`, vitest, eslint, prettier
3. Configure: `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`
4. Set up Storybook: `.storybook/main.ts`, `.storybook/preview.ts`
5. Create `layout.css` with Tailwind imports, `app.scss` for custom SCSS
6. Create `.env.example`, `VERSION`
7. Verify: `dev`, `storybook`, `test:unit`, `test:e2e` all run

### Phase 2: Core Infrastructure
1. `src/lib/config/app.config.ts` — typed config from env vars
2. `src/lib/utils/env.ts` — environment helpers
3. `src/lib/types/` — auth, nav, example entity types
4. `src/lib/utils/logger.ts`

### Phase 3: Data Layer
1. `DataSource` enum + `Repository<T>` interface
2. Registry (strategy pattern)
3. `data-source` store
4. Mocked source implementation
5. Local-storage source implementation
6. `src/lib/api/http.ts` — HTTP client
7. API source implementation
8. `src/lib/server/db/sqlite.ts` — SQLite singleton + migrations
9. `/api/db/[entity]/+server.ts` — server CRUD routes
10. Local-db source implementation
11. `example.repository.ts` — registers all 4 sources
12. Unit tests for registry + each source

### Phase 4: Auth System
1. Auth store + API module
2. Auth guards
3. `hooks.server.ts` — API proxy + CORS
4. Login/register pages
5. Wire auth into HTTP client (Authorization header, 401 handling)
6. Unit tests

### Phase 5: UI Layout
1. Base UI components (Button, Modal, Input, Spinner)
2. `nav.config.ts` — nav structure types + defaults
3. `NavTreeItem` -> `NavTree` -> `LeftNav` (bottom-up)
4. `UserMenu` with auth integration
5. `TopNav` with sections + UserMenu
6. `AppShell` composing everything
7. `DevModeToggle` in UserMenu (non-prod only)
8. `AuthGuard` wrapper
9. Wire into `+layout.svelte`
10. Storybook stories for all components
11. Responsive breakpoints (mobile drawer nav)

### Phase 6: Integration
1. `+layout.server.ts` — pass env config
2. Example domain store demonstrating full data flow
3. Home page using example store
4. `__health` route
5. Settings page

### Phase 7: Deployment
1. Multi-stage `Dockerfile` (node adapter, SQLite data volume)
2. `docker-compose.yml`
3. GitHub Actions workflows (pr-main, merge-main, code-ql)

### Phase 8: Testing
1. Complete unit test coverage for data layer, auth, stores
2. E2E tests: auth flow, navigation, data source switching
3. Storybook visual verification
4. Docker build smoke test

---

## Verification

1. **Dev server**: `npm run dev` — app loads, nav works, data displays
2. **Storybook**: `npm run storybook` — all stories render
3. **Unit tests**: `npm run test:unit` — all pass with coverage threshold
4. **E2E tests**: `npm run test:e2e` — auth, nav, data source flows pass
5. **Docker**: `docker build . && docker run -p 3000:3000` — app serves, health check passes
6. **Data sources**: Toggle through all 4 in dev mode, verify CRUD works for each
7. **Auth toggle**: Set `PUBLIC_AUTH_ENABLED=false`, verify no login required
8. **CI**: Push a branch, verify PR workflow runs all checks
