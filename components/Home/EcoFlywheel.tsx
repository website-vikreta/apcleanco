'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import flywheelData from '@/data/home/eco-flywheel.json'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stage {
  id: number
  title: string
  description: string
  position: string
}

// ── Static Data ───────────────────────────────────────────────────────────────

const IMPACT_PILLARS = [
  { label: 'Minimize Waste',         desc: 'Reduce what goes to landfill'                },
  { label: 'Support Communities',    desc: 'We donate to local families & organizations' },
  { label: 'Save Resources',         desc: 'Recycle & reuse to conserve resources'       },
  { label: 'Build a Greener Future', desc: 'Small actions today, better planet tomorrow' },
]

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function IconRevive() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-primary-500" aria-hidden="true">
      <path d="M1 4v6h6" />
      <path d="M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  )
}

function IconSort() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-primary-500" aria-hidden="true">
      <rect x="3" y="3" width="5" height="18" rx="1" />
      <rect x="9.5" y="6" width="5" height="15" rx="1" />
      <rect x="16" y="9" width="5" height="12" rx="1" />
    </svg>
  )
}

function IconDonate() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-primary-500" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconPlant() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className="w-5 h-5 text-primary-500" aria-hidden="true">
      <path d="M12 22v-10" />
      <path d="M12 12s-5-3-5-8a5 5 0 0 1 10 0c0 5-5 8-5 8z" />
      <path d="M7 17c2 1 5 1.5 5 1.5s3-.5 5-1.5" />
    </svg>
  )
}

function getStageIcon(id: number) {
  switch (id) {
    case 1: return <IconRevive />
    case 2: return <IconSort />
    case 3: return <IconDonate />
    case 4: return <IconPlant />
    default: return null
  }
}

// ── Stage Card (horizontal landscape layout) ──────────────────────────────────
// Icon on left, step label + title + description on right.
// Landscape orientation means each card is short in height.
// Two stacked cards per side ≈ same height as the center globe.

function StageCard({ stage }: { stage: Stage }) {
  return (
    <div
      className="stage-card group bg-white border border-primary-200 rounded-2xl p-5 lg:p-6 flex items-start gap-4 transition-all duration-300 hover:border-primary-400 hover:scale-[1.01] will-change-transform"
      role="region"
      aria-label={`${stage.title}: ${stage.description}`}
    >
      {/* Icon box — fixed width, shrinks nothing */}
      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
        {getStageIcon(stage.id)}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-primary-500 tracking-[0.1em] uppercase mb-1">
          Step {stage.id}
        </p>
        <h3 className="text-base lg:text-[1.0625rem] font-bold text-primary-900 mb-1 leading-snug">
          {stage.title}
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          {stage.description}
        </p>
      </div>
    </div>
  )
}

// ── Center Piece ──────────────────────────────────────────────────────────────

function CenterPiece({ centerRef }: { centerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={centerRef}
      className="shrink-0 w-52 lg:w-64 flex flex-col items-center justify-center self-stretch relative"
      aria-hidden="true"
    >
      {/* SVG rings fill the full height */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 256 256"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          id="dash-ring"
          cx="128" cy="128" r="118"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          className="text-primary-300"
        />
        <circle
          cx="128" cy="128" r="85"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary-200 opacity-40"
        />
        <circle
          cx="128" cy="128" r="64"
          fill="currentColor"
          className="text-primary-200 opacity-50"
        />
      </svg>

      {/* Globe + badge */}
      <div className="relative z-10 flex flex-col items-center gap-3 py-10">
        <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-primary-500 border-4 border-primary-400 flex items-center justify-center">
          <svg viewBox="0 0 64 64" fill="none" stroke="white"
            strokeLinecap="round" strokeLinejoin="round"
            className="w-12 h-12 lg:w-14 lg:h-14" aria-hidden="true">
            <circle cx="32" cy="32" r="26" strokeWidth="1.5" />
            <ellipse cx="32" cy="32" rx="10" ry="26" strokeWidth="1.5" />
            <path d="M6 32h52" strokeWidth="1.5" />
            <path d="M10 18h44" strokeWidth="1" opacity="0.6" />
            <path d="M10 46h44" strokeWidth="1" opacity="0.6" />
          </svg>
        </div>
        <div className="bg-primary-900 rounded-full px-4 py-1.5">
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-white">
            2 Trees Per Clean
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Connector arrows (left side points right → center, right side ← center) ──

function ConnectorLeft() {
  return (
    <div className="hidden lg:flex items-center justify-end absolute right-0 top-1/2 -translate-y-1/2 translate-x-full pr-1 pointer-events-none" aria-hidden="true">
      <div className="w-6 h-px bg-primary-300" />
      <svg viewBox="0 0 8 8" className="w-2 h-2 text-primary-400 fill-current -ml-px">
        <polygon points="0,0 8,4 0,8" />
      </svg>
    </div>
  )
}

function ConnectorRight() {
  return (
    <div className="hidden lg:flex items-center justify-start absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pl-1 pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 8 8" className="w-2 h-2 text-primary-400 fill-current -mr-px rotate-180">
        <polygon points="0,0 8,4 0,8" />
      </svg>
      <div className="w-6 h-px bg-primary-300" />
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function EcoFlywheel() {
  const sectionRef = useRef<HTMLElement>(null)
  const centerRef  = useRef<HTMLDivElement>(null)
  const stages     = flywheelData.stages as Stage[]

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Set initial hidden states (set+to pattern — reliable with ScrollTrigger)
      gsap.set('.flywheel-heading', { y: 30, opacity: 0 })
      gsap.set(centerRef.current,   { scale: 0.85, opacity: 0 })
      gsap.set('.stage-card-left',   { x: -24, opacity: 0 })
      gsap.set('.stage-card-right',  { x: 24,  opacity: 0 })
      gsap.set('.stage-card',        { y: 20,  opacity: 0 })  // mobile fallback
      gsap.set('.impact-pillar',     { y: 20, opacity: 0 })

      const dashRing = sectionRef.current?.querySelector('#dash-ring') as SVGCircleElement
      const circ = 2 * Math.PI * 118 // ≈ 741
      if (dashRing) gsap.set(dashRing, { strokeDashoffset: circ })

      gsap.to('.flywheel-heading', {
        y: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true, invalidateOnRefresh: true },
      })

      gsap.to(centerRef.current, {
        scale: 1, opacity: 1, duration: 0.95, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true, invalidateOnRefresh: true },
      })

      if (dashRing) {
        gsap.to(dashRing, {
          strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true, invalidateOnRefresh: true },
        })
      }

      // Left cards slide in from left, right cards from right
      gsap.to('.stage-card-left', {
        x: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true, invalidateOnRefresh: true },
      })
      gsap.to('.stage-card-right', {
        x: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true, invalidateOnRefresh: true },
      })
      // Mobile cards (y-based)
      gsap.to('.stage-card', {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true, invalidateOnRefresh: true },
      })

      gsap.to('.impact-pillar', {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.09, ease: 'power2.out',
        scrollTrigger: { trigger: '.eco-impact-bar', start: 'top 92%', once: true, invalidateOnRefresh: true },
      })
    },
    { scope: sectionRef },
  )

  // Left and right stage sets
  const leftStages  = [stages[0], stages[1]]
  const rightStages = [stages[2], stages[3]]

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary-100 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="eco-flywheel-title"
    >
      {/* ── Decorative background leaves ─────────────────────────────── */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-[0.08] pointer-events-none -translate-x-1/3 -translate-y-1/3 rotate-12" aria-hidden="true">
        <svg viewBox="0 0 300 300" fill="currentColor" className="text-primary-900 w-full h-full">
          <path d="M150 10 C180 40,290 80,275 190 C258 300,110 295,75 215 C40 135,60 55,150 10Z" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-0 w-[28rem] h-[28rem] opacity-[0.08] pointer-events-none translate-x-1/3 rotate-[200deg]" aria-hidden="true">
        <svg viewBox="0 0 300 300" fill="currentColor" className="text-primary-900 w-full h-full">
          <path d="M150 10 C180 40,290 80,275 190 C258 300,110 295,75 215 C40 135,60 55,150 10Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Heading ──────────────────────────────────────────────────── */}
        <div className="flywheel-heading text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-200 border border-primary-300 rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            <span className="text-xs font-semibold text-primary-700 tracking-[0.1em] uppercase">
              Eco Commitment
            </span>
          </div>
          <h2
            id="eco-flywheel-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight mb-3 md:mb-4 leading-tight"
          >
            {flywheelData.title}
          </h2>
          <p className="text-base md:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            {flywheelData.subtitle}
          </p>
        </div>

        {/* ── Desktop: 3-column orbital layout ─────────────────────────── */}
        {/*   [Left cards] [Globe] [Right cards]                           */}
        {/*   Two landscape cards per side stacked; globe fills center.    */}
        <div className="hidden md:flex items-stretch gap-5 lg:gap-8 mb-8 lg:mb-10">

          {/* Left column: stages 1 & 2 */}
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {leftStages.map((stage) => (
              <div key={stage.id} className="stage-card stage-card-left relative">
                <StageCard stage={stage} />
                <ConnectorLeft />
              </div>
            ))}
          </div>

          {/* Center: globe with rings */}
          <CenterPiece centerRef={centerRef} />

          {/* Right column: stages 3 & 4 */}
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {rightStages.map((stage) => (
              <div key={stage.id} className="stage-card stage-card-right relative">
                <ConnectorRight />
                <StageCard stage={stage} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: globe badge + stacked cards ──────────────────────── */}
        <div className="md:hidden mb-8">
          <div className="flex flex-col items-center gap-2 mb-6" aria-hidden="true">
            <div className="w-16 h-16 rounded-full bg-primary-500 border-4 border-primary-400 flex items-center justify-center">
              <svg viewBox="0 0 64 64" fill="none" stroke="white"
                strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
                <circle cx="32" cy="32" r="26" strokeWidth="1.5" />
                <ellipse cx="32" cy="32" rx="10" ry="26" strokeWidth="1.5" />
                <path d="M6 32h52" strokeWidth="1.5" />
                <path d="M10 18h44" strokeWidth="1" opacity="0.6" />
                <path d="M10 46h44" strokeWidth="1" opacity="0.6" />
              </svg>
            </div>
            <div className="bg-primary-900 rounded-full px-3 py-1">
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-white">
                2 Trees Per Clean
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stages.map((stage) => (
              <div key={stage.id} className="stage-card">
                <StageCard stage={stage} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Impact bar ───────────────────────────────────────────────── */}
        <div
          className="eco-impact-bar bg-primary-700 rounded-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-4 gap-px"
          role="list"
          aria-label="Our eco impact pillars"
        >
          {IMPACT_PILLARS.map(({ label, desc }) => (
            <div
              key={label}
              className="impact-pillar bg-primary-900 px-5 py-5 lg:py-6 text-center"
              role="listitem"
            >
              <p className="font-bold text-white text-sm lg:text-[0.9375rem] mb-1 leading-snug">
                {label}
              </p>
              <p className="text-primary-300 text-xs leading-snug">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
