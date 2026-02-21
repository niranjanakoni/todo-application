# Agentic workflow (Developer + DevOps)

This repo is a full-stack Todo app:

- Backend: Spring Boot (Java 17) in `todo-backend/`
- Frontend: React (Create React App) + Tailwind in `todo-frontend/`

The goal of this workflow is to make work items easy to hand off to an AI coding agent (or a teammate) while keeping quality gates and releases deterministic.

## Developer flow (Issue → PR)

1. **Create an issue using the Agent task template**
   - Use `.github/ISSUE_TEMPLATE/agent-task.yml`.
   - Write *testable* acceptance criteria (bullets).
   - Specify affected area (backend/frontend/CI/docs).

2. **Scope the change for agent execution**
   - Keep the task small enough to complete in one PR.
   - If the task touches API shapes, include: “Update `todo-frontend/src/services/taskService.js` and any impacted components in the same PR.”

3. **Implementation rules (matches repo conventions)**
   - Backend: keep controllers thin; put logic in `TaskService`.
   - Frontend: keep API calls in `src/services/taskService.js`.
   - Don’t add new pages/modals/UX beyond what the issue asks.

4. **Validate locally (same as CI)**

   Backend:
   - `cd todo-backend && mvn -B -ntp clean verify`

   Frontend:
   - `cd todo-frontend && npm ci --legacy-peer-deps`
   - `cd todo-frontend && CI=true npm test -- --watchAll=false --passWithNoTests`
   - `cd todo-frontend && npm run build`

5. **Open a PR using the PR template**
   - Fill in `.github/pull_request_template.md`.
   - Link the issue and copy the acceptance criteria.

## DevOps flow (CI → Release)

### Continuous integration

- Workflow: `.github/workflows/ci.yml`
- Triggers: pushes, pull requests, manual dispatch
- Jobs:
  - Backend: Maven `clean verify`
  - Frontend: `npm ci --legacy-peer-deps`, tests, build

**Quality gate:** PRs should be merged only when CI is green.

### Release (artifact publication)

- Workflow: `.github/workflows/release.yml`
- Triggers:
  - Tag push: `v*` (e.g., `v1.0.0`)
  - Manual dispatch

**What it produces:**
- Backend JAR from `todo-backend/target/*.jar`
- Frontend production build from `todo-frontend/build/`

On tag pushes, the workflow also creates a GitHub Release and attaches the JAR.

## Operating model (recommended)

- **Branching:** short-lived feature branches.
- **PR size:** small enough to review quickly.
- **Definition of Done:** acceptance criteria met + CI green + verification steps recorded in PR.

## Notes / known constraints

- Frontend uses `npm ci --legacy-peer-deps` in CI because the lockfile currently fails strict `npm ci` peer resolution. If you later normalize the lockfile, you can switch CI back to plain `npm ci`.

## GitHub Agentic Workflows (gh-aw)

This repository includes agentic workflow source files in `.github/workflows/*.md`.

To enable them:

1. Install the GitHub CLI extension: `gh extension install github/gh-aw`
2. Configure an engine secret (e.g. `COPILOT_GITHUB_TOKEN`) as described in the gh-aw docs.
3. Compile markdown → lock files: `gh aw compile`

This generates `.github/workflows/<name>.lock.yml` files which are what GitHub Actions actually runs. Commit both the `.md` and `.lock.yml` files.
