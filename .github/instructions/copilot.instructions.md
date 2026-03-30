---
description: "Project-wide coding guidelines for ApcleanCo. Always loaded."
applyTo: "**"
---

## Project
- Next.js 14 static website (App Router, TypeScript)
- Output: static export (`next build` → `out/`)

## Branching Strategy
- `main` → production only, never commit directly
- `dev` → staging, only merges from feature branches
- `feature/<name>` → all development work, branched from `dev`

## Instructions Sync Rule
Whenever new instructions are added here, check if they are relevant to any of the following files and update them accordingly:
- `.github/agents/*.agent.md` — agent behavior and rules
- `.github/prompts/*.prompt.md` — reusable prompt templates
- `.github/skills/*/SKILL.md` — workflow skills