---
description: "Project-wide coding guidelines for ApcleanCo. Always loaded."
applyTo: "**"
---

## Project
- Next.js 14 static website (App Router, TypeScript)
- Output: static export (`next build` → `out/`)

## Branching Strategy
- `main` → production (no direct commits)
- `dev` → staging (merges only)
- `feature/<name>` → all work, branched from `dev`
- **Enforcement**: See `.github/agents/git-manager.agent.md` for implementation

## Git Gate Rule
For ANY code task, invoke **Git Manager** agent first to verify/create feature branch.
- **Triggered by**: Git Manager description keywords (creating pages, building components, implementing features, fixing bugs, writing code)
- **Implementation**: See `.github/agents/git-manager.agent.md`

## Project Run Rule
When user mentions: "run project", "start project", "dev server", "npm run dev", invoke the **run-project** prompt.
- **Implementation**: See `.github/prompts/run-project.prompt.md`

## AI Accessibility Rule (STRICT)
ALL generated code must have 100% AI accessibility. No exceptions. Blocker—code is incomplete without it.
- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<button>`, `<form>` (never `<div>` for interactive)
- **ARIA labels**: `aria-label`, `aria-labelledby`, `aria-describedby`, `role` where semantic HTML insufficient
- **Heading hierarchy**: One `<h1>` per page, then `<h2>`, `<h3>` in order (no skipping)
- **Alt text**: Every `<img>` has descriptive `alt` or `alt=""` + `role="presentation"` if decorative
- **Form accessibility**: All inputs/textareas/selects linked via `<label htmlFor>` or wrapped in `<label>`
- **Button text**: Buttons have visible text or `aria-label` (no unlabeled icons)
- **Keyboard navigation**: Tab order logical, focus visible on all interactive elements
- **Color contrast**: Minimum WCAG AA (4.5:1 text, 3:1 graphics)
- **Enforcement**: Implemented in `.github/agents/frontend-dev.agent.md` and `.github/skills/frontend-dev/SKILL.md`

## Production-Grade Design Rule
ALL frontend work must have distinctive, bold aesthetics. No generic AI aesthetics.
- Distinctive typography (not Inter/Roboto/Arial)
- Cohesive color schemes (bold accents, not weak palettes)
- Atmospheric depth & memorable composition
- Intentional aesthetic direction (minimalist, maximalist, luxury, playful, etc.)
- **Enforcement**: See `.github/agents/frontend-dev.agent.md` and `.github/skills/frontend-dev/SKILL.md`

## Design System Rule (MANDATORY)
ALL frontend work (components, pages, styles) must follow `.github/instructions/design-system.instructions.md`.
- **Tailwind CSS**: Use utility classes for all styling; extend via `tailwind.config.js`
- **SCSS**: Use for custom animations, mixins, and complex interactions
- **Color System**: Reference `.github/instructions/design-system.instructions.md` Section 1 (primary, accent, neutral palettes)
- **Spacing & Layout**: Use Tailwind scale (p-1 through p-16) and responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`)
- **Components**: Follow button, form, card, nav patterns in Section 3
- **Motion**: Use Tailwind animation utilities + SCSS for complex effects (Section 4)
- **Responsive Design**: Mobile-first with Tailwind breakpoint modifiers (Section 5)
- **Enforcement**: Referenced in all frontend agents and skills; violations block code review

## Workflow Summary

| Trigger | Agent/Prompt | File | Purpose |
|---------|------|------|---------|
| Any code task | Git Manager | `.github/agents/git-manager.agent.md` | Branch gate enforcement |
| Run/start project | run-project | `.github/prompts/run-project.prompt.md` | Dev server setup |
| Build frontend | Frontend Dev | `.github/agents/frontend-dev.agent.md` | Orchestrate workflow + accessibility/design |
| Frontend detail | frontend-dev skill | `.github/skills/frontend-dev/SKILL.md` | Step-by-step procedures || Design reference | Design System | `.github/instructions/design-system.instructions.md` | Tailwind/SCSS conventions + component patterns |
| **Auto-loaded for** | **All frontend files** | **See applyTo patterns** | Color, spacing, motion, responsive design |
## Instructions Sync Rule
On new instructions, update relevant files in:
- `.github/instructions/design-system.instructions.md` — design & styling conventions (auto-loaded for app/**, components/**, styles/**)
- `.github/agents/*.agent.md` — enforcement mechanisms
- `.github/prompts/*.prompt.md` — task implementations
- `.github/skills/*/SKILL.md` — procedural details

## DON'T
Don't test anything on the browser. 
Don't execute npm run dev or npm run build.