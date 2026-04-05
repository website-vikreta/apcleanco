---
description: "ApcleanCo Design System. Reference and conventions for all components, pages, and frontend design using Tailwind CSS and SCSS. Use when: building components, pages, or UI elements. Enforces consistent color, spacing, motion, and responsive design across the site."
applyTo: "app/**,components/**,styles/**"
---

# ApcleanCo Design System

Site-wide design conventions for building consistent, accessible, distinctive interfaces using **Tailwind CSS** and **SCSS**.

**Important**: This is a strong recommendation guide. Special cases may require exceptions, but default to these conventions.

## Design Philosophy

- **Distinctive first**: Every design should have a bold, intentional aesthetic direction (see Production-Grade Design Rule in `copilot.instructions.md`)
- **Accessible always**: 100% AI accessibility is non-negotiable (see AI Accessibility Rule in `copilot.instructions.md`)
- **Cohesive second**: Use design system to maintain consistency across features
- **Never generic**: Avoid cookie-cutter patterns, overly timid palettes, or predictable layouts

## Tailwind CSS & SCSS Setup

All styles are built using:
- **Tailwind CSS v4**: Utility-first classes via `@import "tailwindcss"` in `app/globals.css`
- **SCSS**: Custom mixins and component styles in `styles/` — use `@use 'mixins'` to import

**Key Files**:
- `app/globals.css` — Tailwind import, `@theme` color tokens, `@layer base` styles, keyframes
- `styles/_mixins.scss` — Reusable `@apply`-based mixins (button-primary, form-input, etc.)
- `styles/index.scss` — Barrel file: `@use 'mixins'`

**Font**: Geist (`--font-sans`) is applied site-wide via `app/globals.css`. Do NOT add new fonts without explicit approval.

---

## 1. Color System

### Palette Structure (Tailwind CSS)
- **Primary color**: Main brand color (extends Tailwind `primary` palette)
- **Accent color**: Bold secondary color for highlights
- **Neutral colors**: Backgrounds, subtle accents (gray palette)
- **Dark color**: Text, contrast (Tailwind `gray` shades)

### Tailwind v4 Theme Configuration
Colors are defined in `app/globals.css` using the `@theme` directive (Tailwind v4 syntax):

```css
/* app/globals.css */
@theme {
  /* Primary (Deep Eco Green) */
  --color-primary-50: #eef5f1;
  --color-primary-100: #d6e6de;
  --color-primary-200: #b7d2c5;
  --color-primary-300: #8fb8a7;
  --color-primary-400: #5f9a86;
  --color-primary-500: #1f5a44;   /* MAIN BRAND */
  --color-primary-600: #174836;
  --color-primary-700: #12392b;
  --color-primary-800: #0f2f23;
  --color-primary-900: #0b1f17;

  /* Accent (Soft Premium Highlight - Warm Neutral Gold) */
  --color-accent-50: #faf6e8;
  --color-accent-100: #f3e8c7;
  --color-accent-200: #e8d999;
  --color-accent-300: #dcc56b;
  --color-accent-400: #d4b24a;
  --color-accent-500: #caa33a;
  --color-accent-600: #a8842f;

  /* Neutral (Warm, not dull gray) */
  --color-neutral-50: #f7f9f8;   /* MAIN BACKGROUND */
  --color-neutral-100: #eef2f0;
  --color-neutral-200: #dde5e1;
  --color-neutral-300: #c2cec8;
  --color-neutral-400: #94a8a0;
  --color-neutral-500: #6b7f77;
  --color-neutral-700: #3e4f49;
  --color-neutral-900: #0b1f17;

  /* Semantic */
  --color-success-500: #2f855a;
  --color-error-500: #c53030;
  --color-warning-500: #d69e2e;
}
```

These tokens are automatically available as Tailwind utilities: `bg-primary-500`, `text-accent-400`, `border-neutral-200`, etc.

### SCSS Variables
Define corresponding SCSS variables in `styles/variables.scss`:

```scss
// Brand colors
$primary: #1f5a44;
$primary-light: #d6e6de;
$primary-dark: #0f2f23;

// Accent (premium highlight)
$accent: #caa33a;
$accent-light: #f3e8c7;
$accent-dark: #a8842f;

// Neutral palette (warm, clean)
$bg-light: #f7f9f8;
$bg-muted: #eef2f0;
$bg-card: #ffffff;

$text-dark: #0b1f17;
$text-base: #1f2d28;
$text-muted: rgba(31, 45, 40, 0.7);

$border-color: rgba(11, 31, 23, 0.08);

// Semantic
$error: #c53030;
$success: #2f855a;
$warning: #d69e2e;
```

### Rules
- **Contrast**: All text must meet WCAG AA minimum (4.5:1 text, 3:1 graphics)
  - Test bold color combos with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
  - Never assume low contrast is acceptable for "design effect"
- **Dominant + Accent**: Use 1–2 dominant colors + 1 bold accent, NOT evenly-distributed weak palettes
- **Avoid**: Purple on white, pastel-only schemes, murky/muddy combinations
- **Use Tailwind utilities**: Always apply color via Tailwind classes (`text-primary-900`, `bg-neutral-50`, `border-neutral-200`)
- **No overuse of accent color** — max 5% of UI surface. Accent is for single highlights, badges, or underlines only — never backgrounds, large blocks, or repeated elements
- **No pure gray backgrounds** — use warm neutrals from the palette (`neutral-50`, `neutral-100`); never `bg-gray-*` or `bg-slate-*`
- **No random green shades outside the system** — only use `primary-*` tokens defined in `@theme`; no arbitrary hex greens or Tailwind `green-*` / `emerald-*` utilities
- **No box shadows** — shadows add visual noise; use spacing and contrast to create depth instead
- **Use spacing + contrast instead of shadows** — increase padding, use border or background contrast (`bg-white` on `bg-neutral-50`) to separate elements
- **Keep UI breathable** — padding is preferred over visual effects; generous whitespace > decorative flourishes
- **CTA must always use `primary-500`** — all primary call-to-action buttons use `bg-primary-500`; never substitute with accent, neutral, or custom colors for the main CTA

### Tailwind Color Usage Examples
```html
<!-- Background -->
<section className="bg-neutral-50">
<div className="bg-white border border-neutral-200">

<!-- Text -->
<h1 className="text-primary-900">Redefining Clean</h1>
<p className="text-neutral-700">Premium cleaning solutions...</p>

<!-- CTA Primary -->
<button className="bg-primary-500 text-white hover:bg-primary-600 transition-all">
  Schedule a Call
</button>

<!-- CTA Secondary -->
<button className="border border-primary-500 text-primary-500 hover:bg-primary-50">
  Learn More
</button>

<!-- Accent Usage (VERY LIMITED) -->
<span className="text-accent-500">Coming Soon</span>
```

---

## 2. Spacing & Layout System

### Base Unit & Scale (Tailwind)
Tailwind uses a base unit of 4px (1 = 4px). Use Tailwind spacing utilities throughout:

```
Tailwind spacing scale:
- p-1, m-1 = 4px (0.25rem)
- p-2, m-2 = 8px (0.5rem) — small gaps
- p-3, m-3 = 12px (0.75rem)
- p-4, m-4 = 16px (1rem) — standard
- p-6, m-6 = 24px (1.5rem) — section spacing
- p-8, m-8 = 32px (2rem) — large sections
- p-12, m-12 = 48px (3rem) — hero sections
- p-16, m-16 = 64px (4rem) — page padding
```

### Tailwind Grid System
Tailwind CSS provides a 12-column grid by default:

```html
<!-- Desktop: max-width 1200px, padding sides -->
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Content -->
  </div>
</div>

<!-- Responsive padding -->
<section className="px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:px-16 lg:py-16">
  Content with responsive padding
</section>
```

### SCSS for Custom Spacing Mixins
```scss
// _spacing.scss
@mixin section-padding {
  @apply px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:px-16 lg:py-16;
}

@mixin component-spacing {
  @apply p-4 md:p-6 lg:p-8;
}

@mixin tight-spacing {
  @apply gap-2 md:gap-4;
}

@mixin loose-spacing {
  @apply gap-6 md:gap-8 lg:gap-12;
}

// Usage
section {
  @include section-padding;
}

.card {
  @include component-spacing;
}

.grid {
  @include loose-spacing;
}
```

### Rules
- Use Tailwind `gap` utilities (flexbox/grid) instead of margin hacks
- Consistent padding around sections (esp. header, footer, hero)
- Asymmetric layouts encouraged (don't evenly space everything)
- Generous negative space OR controlled density (not both)
- Responsive modifiers: `sm:`, `md:`, `lg:`, `xl:` for breakpoint-specific spacing

### Tailwind Spacing Examples
```html
<!-- Consistent section spacing -->
<section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
  <h2 className="text-3xl font-bold mb-8">Section Title</h2>
</section>

<!-- Component with responsive gap -->
<div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Grid with responsive columns -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="p-4 bg-neutral-50">Card</div>
  <div className="p-4 bg-neutral-50">Card</div>
  <div className="p-4 bg-neutral-50">Card</div>
</div>
```

---

## 3. Component Patterns (Tailwind CSS)

### Buttons

> **ALWAYS use `<Button>` from `components/Button.tsx`** — never hand-roll button styles.
> The component handles all GSAP interactions (shimmer, spring, press, magnetic) automatically.
> Only use raw `<button>` for one-off cases that cannot use the component (e.g. form submit inside a complex RSC).

#### Component API

```tsx
import Button from '@/components/Button'

// Full prop signature (all optional except children/aria-label for icon-only)
<Button
  variant="primary"         // 'primary' | 'secondary' | 'accent' | 'ghost' | 'outlined' | 'danger'
  size="md"                 // 'sm' | 'md' | 'lg'  — default: 'md'
  icon={<IconNode />}       // ReactNode — any inline SVG or icon component
  iconPosition="left"       // 'left' | 'right' | 'only'  — default: 'left'
  loading={false}           // shows centred spinner, disables interaction
  magnetic={false}          // enables cursor-tracking magnetic pull (hero/CTA only)
  disabled={false}          // standard HTML disabled; opacity-40 + cursor-not-allowed
  type="button"             // 'button' | 'submit' | 'reset'
  onClick={handler}
  className=""              // append extra Tailwind classes (colour overrides on dark bg)
  aria-label="..."          // REQUIRED for icon-only buttons
>
  Label text
</Button>
```

#### Variants — when to use each

| Variant | Use case | Background | Text |
|---------|----------|------------|------|
| `primary` | Main CTA — one per section max | `bg-primary-500` | `text-white` |
| `secondary` | Secondary action alongside primary | transparent | `text-primary-500` (light bg) or `text-primary-100!` (dark bg) |
| `accent` | Highlight / promotional CTA | `bg-accent-500` | `text-neutral-900` |
| `ghost` | Tertiary / nav / low-emphasis | transparent | inherits (`text-current`) |
| `outlined` | Neutral secondary, light or dark surfaces | transparent | `text-neutral-700` (light) or `text-neutral-300!` (dark bg) |
| `danger` | Destructive actions (delete, cancel booking) | `bg-red-600` | `text-white` |

#### Sizes

| Size | Height | Padding | Text | Use case |
|------|--------|---------|------|----------|
| `sm` | `h-9` (36px) | `px-4 py-2` | `text-sm` | Compact UI, tables, inline form actions |
| `md` | `h-11` (44px) | `px-6 py-3` | `text-base` | Default — body sections, cards, forms |
| `lg` | `h-14` (56px) | `px-8 py-4` | `text-lg` | Hero CTAs, magnetic feature buttons |

#### States — how they render

| State | What happens | How to trigger |
|-------|--------------|----------------|
| Default | Full opacity, interactive | (no props) |
| Hover | Lifts `y:-4px`, scale `1.04`, shimmer sweep | mouse enter |
| Press | Compresses `scale:0.94`, `y:1px` | mouse down |
| Release | Springs back to hover state | mouse up |
| Leave | Elastic spring to rest `scale:1, y:0` | mouse leave |
| Disabled | `opacity-40`, `cursor-not-allowed`, no GSAP events | `disabled` prop |
| Loading | Centred spinner replaces label, interaction blocked | `loading` prop |
| Focus | `outline-2 outline-offset-2` in variant colour | keyboard tab |
| Magnetic | Cursor-tracks within button bounds (hero only) | `magnetic` prop |

#### Icon buttons

```tsx
// Icon on the left (default)
<Button variant="primary" icon={<IconCalendar />} iconPosition="left">
  Book Appointment
</Button>

// Icon on the right
<Button variant="accent" icon={<IconArrowRight />} iconPosition="right">
  Get a Quote
</Button>

// Icon-only — MUST have aria-label
<Button variant="primary" size="md" icon={<IconCheck />} iconPosition="only" aria-label="Confirm action" />
<Button variant="danger"  size="sm" icon={<IconClose />} iconPosition="only" aria-label="Remove item" />
```

#### Colour overrides on dark backgrounds

On dark surfaces (`bg-primary-900`, `bg-primary-700`, etc.) `secondary` and `outlined` variants need explicit colour overrides via `className`. Use Tailwind v4 `!` important suffix:

```tsx
// Secondary on dark background
<Button variant="secondary" className="text-primary-100! border-primary-100/40 hover:bg-primary-100/10">
  Learn More
</Button>

// Outlined on dark background
<Button variant="outlined" className="text-neutral-300! border-neutral-500 hover:border-neutral-200 hover:text-white!">
  View Portfolio
</Button>

// Ghost on dark background (text-current inherits white from parent)
<Button variant="ghost" className="hover:bg-white/10 border-transparent">
  Browse Services
</Button>
```

#### Magnetic CTA (hero sections only)

Use sparingly — max 2–3 per page, on large prominent CTAs. The button physically follows the cursor and snaps back with elastic physics on leave.

```tsx
<Button variant="primary" size="lg" icon={<IconCalendar />} iconPosition="left" magnetic>
  Book Appointment
</Button>
```

#### Loading state

Use when an async action (form submit, booking, network call) is in-flight. Replaces label with animated spinner; re-enables on completion.

```tsx
const [busy, setBusy] = useState(false)

const handleSubmit = async () => {
  setBusy(true)
  await submitForm()
  setBusy(false)
}

<Button variant="primary" loading={busy} aria-label={busy ? 'Submitting…' : 'Submit'} onClick={handleSubmit}>
  Submit
</Button>
```

#### AI agent decision guide

When choosing a button, pick based on **hierarchy and surface**:

```
One dominant action on the page/section?         → variant="primary"
Supporting action alongside a primary?           → variant="secondary"
Promotional / limited-time offer CTA?            → variant="accent"
Hero or section-defining CTA (large, memorable)? → size="lg" + magnetic (optionally)
Destructive / irreversible action?               → variant="danger"
Low-emphasis / nav / text-level action?          → variant="ghost"
Neutral secondary on a white/light card?         → variant="outlined"
Compact inline action (table rows, badges)?      → size="sm"
Action with directional or symbolic meaning?     → add icon + iconPosition
Action triggers network request / async work?    → add loading={isLoading}
Action on a dark-background section?             → secondary/outlined + className colour override
```

**Accessibility rules (non-negotiable)**:
- Icon-only buttons **must** have `aria-label`
- Loading buttons **must** update `aria-label` to reflect state (e.g. `"Submitting…"`)
- Never use `outline-none` — every button has a visible focus ring via the component
- Minimum touch target: `sm` = 36px, `md` = 44px ✓, `lg` = 56px ✓ — prefer `md`/`lg` for primary CTAs

### Forms
**Tailwind Classes**:
- **Input fields**: `px-4 py-3 border border-neutral-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 rounded-md transition-colors`
- **Labels**: `block text-sm font-medium text-text-base mb-2` (linked via `htmlFor`)
- **Placeholder**: Built-in placeholder styling, use `placeholder:text-text-muted`
- **Error state**: `border-error focus:ring-error/20` + helper text in error color
- **Spacing**: `mb-4` between fields, `mb-2` between label and input
- **Min height**: `h-11` (44px)

**SCSS Mixin**:
```scss
@mixin form-input {
  @apply px-4 py-3 w-full border border-neutral-300 rounded-md;
  @apply focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20;
  @apply transition-colors placeholder:text-text-muted;
}

@mixin form-label {
  @apply block text-sm font-medium text-text-base mb-2;
}

@mixin form-error {
  @apply border-error focus:ring-error/20;
}

.form-group {
  @apply mb-4;
}

input {
  @include form-input;
  
  &.error {
    @include form-error;
  }
}

label {
  @include form-label;
}
```

**Usage**:
```html
<div className="form-group">
  <label for="email" className="form-label">Email Address</label>
  <input 
    id="email" 
    type="email" 
    className="form-input" 
    placeholder="your@email.com"
    aria-required="true"
    aria-describedby="email-hint"
  />
  <span id="email-hint" className="text-xs text-text-muted mt-1 block">
    We'll never share your email.
  </span>
</div>
```

**Accessibility**:
- All inputs must have associated `<label htmlFor>`
- Error messages linked via `aria-describedby`
- Required fields marked with `aria-required="true"`
- Visible focus on inputs

### Cards & Containers
- **Border**: `border border-neutral-200` or no border
- **Background**: `bg-white` or `bg-neutral-50`
- **Padding**: `p-6` standard, `p-4` compact
- **Shadows**: `shadow-sm` subtle, `shadow-md` elevated, or remove
- **Radius**: `rounded-md` default

**Tailwind Usage**:
```html
<div className="bg-white border border-neutral-200 rounded-md shadow-sm p-6">
  <!-- Card content -->
</div>

<div className="bg-neutral-50 p-6 rounded-lg">
  <!-- Muted container -->
</div>
```

### Navigation
- **List**: Semantic `<nav>`, `<ul>`, `<li>`
- **Links**: `text-primary-500 hover:text-accent-500 border-b-2 border-b-transparent hover:border-b-accent-500`
- **Focus**: `focus-visible:outline-2 focus-visible:outline-accent-500`
- **Active state**: `text-accent-500 border-b-accent-500` or use Tailwind's `group-active` utilities
- **Spacing**: `gap-6` or `gap-8` between nav items

**SCSS Mixin**:
```scss
@mixin nav-links {
  @apply flex gap-6 md:gap-8;
  
  li a {
    @apply text-text-base hover:text-accent-500 border-b-2 border-b-transparent;
    @apply transition-colors focus-visible:outline-2 focus-visible:outline-accent-500;
    
    &.active {
      @apply text-accent-500 border-b-accent-500;
    }
  }
}

nav {
  @include nav-links;
}
```

---

## 4. Motion & Animation (Tailwind CSS + SCSS)

**Principles**:
- Smooth, purposeful animations (never random or jarring)
- Duration: `duration-200` (200ms) for micro-interactions, `duration-500` (500ms) for page transitions
- Easing: `ease-in-out` for UI elements, `ease-in` for exits, `ease-out` for entrances
- Respect `prefers-reduced-motion` (remove all animations if user prefers)

**Tailwind Animation Utilities**:
- **Fade in/out**: `opacity-0 animate-fadeIn` or `opacity-100 animate-fadeOut`
- **Scale**: `scale-95 hover:scale-100 transition` 
- **Slide**: `translate-y-4 animate-slideUp` 
- **Spin**: `animate-spin` (loading spinner)
- **Pulse**: `animate-pulse` (subtle attention)
- **Bounce**: `animate-bounce` (rarely used, reserved)
- **Duration**: `duration-200 md:duration-300 lg:duration-500`
- **Easing**: `ease-in`, `ease-out`, `ease-in-out`, `ease-linear`

**SCSS for Custom Animations**:
```scss
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-fadeIn { animation: fadeIn 0.3s ease-out; }
.animate-slideUp { animation: slideUp 0.4s ease-out; }
.animate-scaleIn { animation: scaleIn 0.2s ease-out; }

// Staggered animations (via CSS variables or nth-child)
@for $i from 1 through 5 {
  .stagger-item:nth-child(#{$i}) {
    animation-delay: calc(#{$i} * 100ms);
  }
}

// Complex hover interaction
@mixin interactive-hover {
  @apply transition-all duration-200 ease-in-out;
  
  &:hover {
    @apply scale-105 shadow-md;
  }
  
  &:active {
    @apply scale-95;
  }
}
```

**Usage Examples**:
```html
<!-- Fade in on load -->
<div className="opacity-0 animate-fadeIn duration-500">Content fades in</div>

<!-- Hover scale -->
<button className="hover:scale-105 transition-transform duration-200">Hover me</button>

<!-- Loading spinner -->
<svg className="animate-spin h-6 w-6 text-accent-500">
  <!-- spinner SVG -->
</svg>

<!-- Staggered list animation -->
<ul>
  <li className="animate-slideUp stagger-item duration-500">Item 1</li>
  <li className="animate-slideUp stagger-item duration-500">Item 2</li>
  <li className="animate-slideUp stagger-item duration-500">Item 3</li>
</ul>
```

**Respect prefers-reduced-motion**:
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    @apply motion-safe:animate-none !important;
    @apply transition-none !important;
  }
}
```

In `app/globals.css` via `@theme` (Tailwind v4):
```css
@theme {
  --animate-fade-in: fadeIn 0.3s ease-out;
  --animate-slide-up: slideUp 0.4s ease-out;
  --animate-scale-in: scaleIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

**Accessibility**:
- No auto-playing animations that distract
- Provide alternative to animated content
- Respect `prefers-reduced-motion: reduce` media query
- Use `aria-live` regions for dynamic updates

---

## 5. Responsive Design (Tailwind CSS)

### Breakpoints
Tailwind uses mobile-first breakpoints:
```
- (default) = mobile (< 640px)
- sm: = small (640px+)
- md: = medium (768px+)
- lg: = large (1024px+)
- xl: = extra large (1280px+)
- 2xl: = 2x extra large (1536px+)
```

**Mobile-First Approach**:
- Design mobile first (default styles)
- Enhance for larger screens (add breakpoint prefixes)
- Never use `max-width` queries; use `min-width` (mobile-first)

### Responsive Examples

**Typography**:
```html
<!-- Mobile: 16px, Tablet: 18px, Desktop: 20px -->
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Heading
</h1>

<!-- Body text responsive -->
<p className="text-base md:text-lg leading-relaxed">
  Paragraph adapts across devices
</p>
```

**Padding/Spacing**:
```html
<!-- Mobile: p-4, Tablet: p-6, Desktop: p-8 -->
<section className="px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
  Section with responsive padding
</section>

<!-- Container with responsive max-width -->
<div className="max-w-full md:max-w-2xl lg:max-w-4xl mx-auto px-4">
  Content with responsive max-width
</div>
```

**Grid/Flexbox**:
```html
<!-- Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  <div className="p-4 bg-neutral-50">Card 1</div>
  <div className="p-4 bg-neutral-50">Card 2</div>
  <div className="p-4 bg-neutral-50">Card 3</div>
</div>

<!-- Flex direction responsive -->
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
  <div className="md:flex-1">Sidebar</div>
  <div className="md:flex-2">Main content</div>
</div>
```

**Display (show/hide)**:
```html
<!-- Hide on mobile, show on tablet+ -->
<nav className="hidden md:block">
  Desktop navigation
</nav>

<!-- Show mobile menu, hide on desktop -->
<button className="md:hidden">Mobile menu</button>
```

**Images & Media**:
```html
<!-- Responsive image sizing -->
<img 
  src="image.jpg" 
  alt="Description"
  className="w-full h-auto md:w-1/2 lg:w-1/3"
/>

<!-- Picture element for art direction -->
<picture>
  <source media="(min-width: 1024px)" srcset="desktop.jpg" />
  <source media="(min-width: 768px)" srcset="tablet.jpg" />
  <img src="mobile.jpg" alt="Responsive image" className="w-full h-auto" />
</picture>
```

### Rules & Best Practices

**Touch Targets**:
- Minimum 44px × 44px for buttons/links
- Minimum 8px gap between touch targets
- Test on real devices (not just browser emulation)

**Text Sizing**:
- Never smaller than 16px on mobile (unless deliberately small text)
- Tablet: 16px–18px body, larger for headings
- Desktop: 18px–20px body, scale headings proportionally
- Use Tailwind `text-*` utilities: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, etc.

**Container Queries** (Optional, Advanced):
```html
<!-- Adapt component based on its container width, not viewport -->
<div className="@container">
  <div className="@md:grid @md:grid-cols-2">
    Adapts based on container width
  </div>
</div>
```

**SCSS Responsive Mixin**:
```scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (min-width: 640px) { @content; }
  } @else if $breakpoint == 'md' {
    @media (min-width: 768px) { @content; }
  } @else if $breakpoint == 'lg' {
    @media (min-width: 1024px) { @content; }
  } @else if $breakpoint == 'xl' {
    @media (min-width: 1280px) { @content; }
  }
}

// Usage
.component {
  padding: 1rem;

  @include respond-to('md') {
    padding: 2rem;
  }

  @include respond-to('lg') {
    padding: 3rem;
  }
}
```

### Accessibility in Responsive Design
- Test keyboard navigation on all screen sizes
- Ensure focus indicators visible on all devices
- Don't hide interactive elements without accessible alternative
- Use `aria-hidden="true"` only on decorative elements hidden by `display: none`
- Use `<picture>` element for art-directed images on different screen sizes

---

## Deviations & Exceptions

This design system is a **strong recommendation**, not a hard blocker. Exceptions are allowed when:
- A specific feature requires a unique interaction pattern
- Brand guidelines override convention (e.g., client logo placement)
- A particular page has a distinctive design direction

**Always document exceptions** in component comments or README.

---

## Related Rules & References

- **AI Accessibility Rule**: `.github/instructions/copilot.instructions.md` (100% non-negotiable)
- **Production-Grade Design**: `.github/instructions/copilot.instructions.md` (distinctive, bold aesthetics)
- **Frontend Dev Skill**: `.github/skills/frontend-dev/SKILL.md` (build procedures)
- **Frontend Dev Agent**: `.github/agents/frontend-dev.agent.md` (orchestration)

---

## Enforcement

This design system is reviewed during:
1. **Code review**: Consistency check (unless documented exception)
2. **Design approval**: Visual verification of contrast, alignment, motion
3. **Frontend Dev workflow**: Step 3–4 (aesthetic direction) and Step 6 (testing)

**Question**: Should we create a design system audit tool (e.g., Lighthouse plugin) to detect violations?
