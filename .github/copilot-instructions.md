# Copilot instructions

This repo is a full-stack Todo app:

- Backend: Spring Boot 3 (Java 17) in `todo-backend/`
- Frontend: React (Create React App) + Tailwind in `todo-frontend/`

## What to optimize for

- Keep changes minimal and aligned with existing architecture.
- Do not add extra pages, modals, filters, or UI redesigns unless explicitly requested.
- Prefer fixing root causes over band-aids.

## Project structure

- Backend code: `todo-backend/src/main/java/com/example/todobackend/`
  - Controllers: `controller/` (HTTP only; keep thin)
  - Services: `service/` (business logic)
  - Repos: `repository/` (JPA access)
  - Entities: `entity/`
  - Cross-cutting: `config/`, `exception/`

- Frontend code: `todo-frontend/src/`
  - UI: `components/`
  - API access: `services/taskService.js`

## Backend guidelines (Spring Boot)

- Keep controllers focused on request/response mapping; put logic in `TaskService`.
- Preserve REST conventions and existing endpoint paths under `/api/tasks`.
- Use Bean Validation annotations for input validation when appropriate.
- Keep security/CORS behavior consistent with existing config in `config/`.
- Prefer constructor injection; keep code style consistent with existing files.

### Backend commands

- Build/test: `cd todo-backend && mvn -B -ntp clean verify`
- Run: `cd todo-backend && mvn spring-boot:run`

## Frontend guidelines (React + Tailwind)

- Use existing components and state patterns in `src/App.js`.
- Keep API calls in `src/services/taskService.js` (do not scatter fetch logic across components).
- Keep Tailwind usage consistent; do not introduce new hard-coded design tokens or custom themes.
- Avoid adding new dependencies unless necessary; prefer built-in browser/React utilities.

### Frontend commands

- Install: `cd todo-frontend && npm ci --legacy-peer-deps`
- Test (CI-friendly): `cd todo-frontend && CI=true npm test -- --watchAll=false --passWithNoTests`
- Build: `cd todo-frontend && npm run build`

## Cross-cutting changes

- If you change backend request/response shapes, update the frontend service + affected components in the same PR.
- Add/adjust error handling consistently (backend: `GlobalExceptionHandler`, frontend: `ErrorMessage`).

## CI expectations

- GitHub Actions should pass:
  - Backend: Maven `clean verify`
  - Frontend: `npm ci`, `npm test` (non-interactive), `npm run build`
