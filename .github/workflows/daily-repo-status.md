---
on:
  schedule:
    - cron: "0 9 * * *" # 09:00 UTC daily
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read

safe-outputs:
  create-issue:
    title-prefix: "[daily-status] "
    labels: [report, daily-status]
    close-older-issues: true
---

## Daily Repo Status Report

Create a daily status report for maintainers as a GitHub issue.

## What to include

- Repository activity in the last 24 hours (merged PRs, new issues, comments)
- Open PRs that look blocked (no reviews, failing checks, merge conflicts)
- CI health summary (failed runs for workflow named "CI" and likely reasons)
- Release readiness (recent tags, pending release work, anything risky)
- Actionable next steps (3-7 items), with links

## Style

- Be concise and operational.
- Prefer bullets.
- Call out anything that is likely to break the build or release.
