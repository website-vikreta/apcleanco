---
name: frontend-dev
description: 'Complete frontend development workflow for ApcleanCo. Use when: creating pages, building components, implementing features, or making frontend changes. Guides git branching, project setup, accessibility-first development, production-grade design, and testing.'
argument-hint: '[feature name] e.g. coming-soon-page'
user-invocable: true
---

# Frontend Development Workflow

Complete end-to-end process for building distinctive, production-grade, accessible frontend features in ApcleanCo.

## When to Use
- Creating new pages or components
- Implementing features or UI changes
- Building landing pages and UI components
- Updating existing components
- Designing interfaces with bold aesthetic direction

## Step-by-Step Procedure

### 1. Git Gate (Branch Verification)
Invoke the **Git Manager** agent to check/create a feature branch:
- If not on `feature/*`, Git Manager creates one from `dev`
- Feature branch name: lowercase kebab-case (e.g., `feature/contact-page`)
- Proceed only after confirmation

### 2. Start Dev Server
Invoke the **run-project** prompt:
- If project already running on port 3000 → skip to browser
- If not running → `npm install`, `npm run dev`, then open browser
- Browser auto-opens to `http://localhost:3000`

### 3. Design Thinking & Aesthetic Direction
Before coding, commit to a BOLD, distinctive design direction (see Production-Grade Design Rule in `.github/instructions/copilot.instructions.md`):

**Understand the Context:**
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, or something unexpected.
- **Constraints**: Technical requirements, performance, brand guidelines.
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**NEVER default to generic AI aesthetics:**
- ❌ Overused font families (Inter, Roboto, Arial, system fonts)
- ❌ Clichéd color schemes (purple gradients on white backgrounds)
- ❌ Predictable layouts and cookie-cutter patterns
- ❌ Timid, evenly-distributed palettes

**Frontend Aesthetics (Production-Grade Guidelines):**

| Element | Best Practice |
|---------|---------------|
| **Typography** | Bold, distinctive display font paired with refined body font. Avoid generic choices. Make fonts *characterful* and emotionally resonant. |
| **Color & Theme** | Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform weak palettes. |
| **Motion** | High-impact page load with staggered reveals (animation-delay). Scroll-triggering and hover states that surprise. CSS-first for HTML, Motion library for React. |
| **Spatial Composition** | Unexpected layouts: asymmetry, overlap, diagonal flow, grid-breaking elements, generous negative space OR controlled density. |
| **Backgrounds & Details** | Atmosphere & depth: gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, grain overlays. |

**Match complexity to vision:**
- Maximalist designs → elaborate code with extensive animations & effects
- Minimalist designs → restraint, precision, careful spacing & typography
- Refined designs → elegance through intentional execution

### 4. Plan Component Structure (Accessibility-First)
Design with WCAG AA compliance AND bold aesthetics from the start (see AI Accessibility Rule in `.github/instructions/copilot.instructions.md`).

### 5. Build the Component/Page
Create `.tsx` file(s) in `app/` or component folder, following:
- TypeScript strict mode
- React functional components
- Apply ALL accessibility requirements from `.github/instructions/copilot.instructions.md` (AI Accessibility Rule section)
- **Design System Compliance** (See `.github/instructions/design-system.instructions.md`):
  - Colors: Use Tailwind primary/accent/neutral palettes defined in Section 1
  - Spacing & Layout: Use Tailwind utilities (`p-*`, `m-*`, `gap-*`) and responsive modifiers (`sm:`, `md:`, `lg:`, `xl:`)
  - Components: Follow button, form, card, navigation patterns from Section 3
  - Motion: Use Tailwind animations + SCSS mixins for complex effects (Section 4)
  - Responsive: Mobile-first with Tailwind breakpoint modifiers (Section 5)
- Implement bold aesthetic direction from Step 3:
  - Use distinctive typography (CSS imports from Google Fonts or similar)
  - Apply color scheme aligned with design system
  - Add motion/animations for key interactions
  - Create memorable spatial composition
  - Include atmospheric backgrounds & details
- Test keyboard navigation mentally (can you tab through all interactive elements?)
- **CRITICAL**: Don't let accessibility constraints dilute the bold design—integrate them seamlessly

### 6. Test in Browser
- Refresh dev server (auto-reloads on file changes)
- Visual check: Does the bold aesthetic come through? Is the design memorable?
- Keyboard navigation: Tab through the page — all interactive elements reachable? Focus visible? Focus style matches aesthetic?
- Screen reader simulation: Read the HTML structure mentally — does it make sense to a screen reader user?
- Color contrast: Use browser DevTools or [contrast checker](https://webaim.org/resources/contrastchecker/) — verify even bold color combos meet WCAG AA

### 7. Verify Accessibility (Blocker)
Confirm ALL accessibility requirements from `.github/instructions/copilot.instructions.md` (AI Accessibility Rule section) are met:
- [ ] Semantic HTML used throughout (no `<div>` for buttons, links, form controls)
- [ ] Heading hierarchy proper (`<h1>` once, then `<h2>`, `<h3>` in order)
- [ ] All `<img>` tags have descriptive `alt` (or empty `alt=""` + `role="presentation"`)
- [ ] All form inputs have `<label htmlFor>` or wrapped in `<label>`
- [ ] Buttons have visible text or `aria-label` and styled for focus visibility
- [ ] ARIA attributes used where semantic HTML insufficient
- [ ] Keyboard navigation works (tab order logical, focus visible)
- [ ] Color contrast ≥ 4.5:1 for text, ≥ 3:1 for graphics
- [ ] Screen reader verification passed
- [ ] Bold aesthetic is preserved AND fully accessible (no compromise on either)

**Blocker**: Code is incomplete without 100% AI accessibility. Design must NOT be sacrificed; integrate seamlessly.

### 8. Commit & Push
- Stage changes: `git add .`
- Commit: `git commit -m "feat: [description] (100% accessible, bold design)"`
- Push to feature branch: `git push origin feature/<name>`

### 9. Merge to Dev (When Ready)
Invoke Git Manager to merge feature → dev:
- Merge with `--no-ff` to preserve history
- Delete feature branch after merge
- Feature is now staged for next release

## Quick Checklist

Before marking a feature as complete (detailed requirements in `.github/instructions/copilot.instructions.md`):

```
Git & Setup:
[ ] Feature branch active (Git Manager confirms)
[ ] Dev server running and accessible

Design System Compliance:
[ ] Colors use Tailwind primary/accent/neutral palettes (Section 1)
[ ] Spacing uses Tailwind utilities + responsive modifiers (Section 2)
[ ] Components follow design system patterns (buttons, forms, cards, nav) (Section 3)
[ ] Motion uses Tailwind animations + SCSS (Section 4)
[ ] Responsive design mobile-first with breakpoint modifiers (Section 5)
[ ] Reference: `.github/instructions/design-system.instructions.md`

Design:
[ ] Bold aesthetic direction chosen and executed
[ ] Distinctive typography (not generic fonts)
[ ] Cohesive color scheme with accents
[ ] Motion/animations for key moments
[ ] Memorable spatial composition
[ ] Atmospheric backgrounds & details
[ ] Design is UNFORGETTABLE (not generic AI)

Accessibility (100% Blocker):
[ ] Semantic HTML throughout
[ ] Proper heading hierarchy
[ ] Alt text on all images
[ ] Form labels linked to inputs
[ ] Buttons labeled (text or aria-label)
[ ] ARIA attributes where needed
[ ] Keyboard navigation works
[ ] Color contrast ≥ WCAG AA
[ ] Accessibility + design seamlessly integrated

Testing & Finalization:
[ ] Tested in browser (visual + keyboard + contrast)
[ ] Changes committed and pushed to feature branch
[ ] Ready to merge to dev
```

## AI Accessibility Rules (100% Requirement) — Reference

**STRICT**: All generated code must be 100% accessible. This is non-negotiable.

**Detailed rules**: See `.github/instructions/copilot.instructions.md` (AI Accessibility Rule section).

Quick summary:
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<button>`, `<form>`, `<label>`, never `<div>` for interactive)
- Heading hierarchy (`<h1>` once, then `<h2>`, `<h3>` in order, no skipping)
- Alt text on all images (descriptive or `alt=""` + `role="presentation"`)
- Form labels linked via `<label htmlFor>` or wrapped in `<label>`
- Button labels (visible text or `aria-label`)
- ARIA (when semantic HTML insufficient)
- Keyboard navigation (logical tab order, visible focus)
- Color contrast (4.5:1 text, 3:1 graphics, minimum WCAG AA)
- Screen reader compatibility (mentally verify page structure makes sense)

## Resources

**Design System** (MANDATORY):
- [ApcleanCo Design System](`.github/instructions/design-system.instructions.md`) — Tailwind CSS + SCSS conventions, color system, spacing scale, component patterns, animations, responsive design

**Accessibility** (100% Required):
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN: Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantic_HTML)
- [MDN: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Typography & Design**:
- [Google Fonts](https://fonts.google.com/) — for distinctive typography
- [CSS Animation Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/)

## Avoiding Generic AI Aesthetics (CRITICAL)

**Reference**: `.github/instructions/copilot.instructions.md` (Production-Grade Design Rule section).

**DO NOT:**
- ❌ Use Inter, Roboto, Arial, or system fonts for display elements
- ❌ Default to purple gradients on white backgrounds
- ❌ Copy predictable component patterns (card → card → card layouts)
- ❌ Create one design and reuse it for every project
- ❌ Use only light backgrounds without atmosphere or depth
- ❌ Ignore font pairing; avoid mismatched font families

**DO:**
- ✅ Choose a distinctive display font (Playfair, Abril, Montserrat, Courier Prime, etc.)
- ✅ Commit to one bold aesthetic direction (minimalist OR maximalist, not in-between)
- ✅ Use dominant colors + sharp accents (not evenly-distributed weak palettes)
- ✅ Create asymmetric layouts that break predictable grid patterns
- ✅ Add atmospheric depth: gradients, textures, shadows, layered transparencies
- ✅ Implement thoughtful motion: high-impact page loads, scroll triggers, meaningful hoverstates
- ✅ Vary designs across projects—no two should look identical
- ✅ Make one intentional choice that someone will remember about this design

**Remember**: Claude can create extraordinary work. Don't hold back. Think outside the box and commit fully to a distinctive vision.
