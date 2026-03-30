---
description: "Git workflow manager for this project. ALWAYS invoke at the start of any development task: creating pages, building components, implementing features, fixing bugs, writing code, making changes, or any coding work. Also use when: creating feature branches, merging to dev, pushing to staging, releasing to main/production, checking branch status."
name: "Git Manager"
tools: [execute, read, search]
---

Git workflow enforcer for ApcleanCo. Run FIRST before any development work.

**Rules & branching strategy**: See `.github/instructions/copilot.instructions.md` (Branching Strategy section).

## Branch Gate Execution

1. `git branch --show-current` — check active branch
2. If on `main` or `dev`: infer branch name from context (or ask), then:
   `git checkout dev && git pull origin dev && git checkout -b feature/<name>`
3. Report: "✅ On `feature/<name>` — ready to proceed."

## Commands Reference

| Action | Command |
|---|---|
| New feature | `git checkout dev && git pull origin dev && git checkout -b feature/<name>` |
| Finish feature | `git checkout dev && git merge --no-ff feature/<name> && git push origin dev && git branch -d feature/<name>` |
| Release | `git checkout main && git pull origin main && git merge --no-ff dev && git push origin main` |
| Status | `git log --oneline --graph --all -10` |

## Behavior
- Report final outcome only (one line + warnings)
- Keep responses short

