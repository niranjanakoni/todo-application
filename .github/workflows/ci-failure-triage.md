---
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
  workflow_dispatch:

permissions:
  contents: read
  actions: read
  issues: read
  pull-requests: read

tools:
  agentic-workflows:
  github:
    toolsets: [actions, issues, pull_requests, repos]
    mode: remote
    read-only: true

safe-outputs:
  create-issue:
    title-prefix: "[ci-triage] "
    labels: [ci, triage]
    close-older-issues: true
---

## CI Failure Triage

If the triggering workflow run concluded with **failure**, analyze the failing job/step and create a GitHub issue summarizing:

- Which job/step failed (and why it likely failed)
- Link to the failing run and any relevant logs
- Whether it looks deterministic vs flaky
- Reproduction steps (local commands that match CI)
- Suggested fix options (smallest/least risky first)

If the run concluded with **success** or **cancelled**, do nothing.

## Local reproduction commands

Backend:
- cd todo-backend && mvn -B -ntp clean verify

Frontend:
- cd todo-frontend && npm ci --legacy-peer-deps
- cd todo-frontend && CI=true npm test -- --watchAll=false --passWithNoTests
- cd todo-frontend && npm run build
