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
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className="w-7 h-7 text-primary-500" aria-hidden="true"
    >
      <path d="M1 4v6h6" />
      <path d="M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  )
}

function IconSort() {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className="w-7 h-7 text-primary-500" aria-hidden="true"
    >
      <rect x="3" y="3" width="5" height="18" rx="1" />
      <rect x="9.5" y="6" width="5" height="15" rx="1" />
      <rect x="16" y="9" width="5" height="12" rx="1" />
    </svg>
  )
}

function IconDonate() {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className="w-7 h-7 text-primary-500" aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconPlant() {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className="w-7 h-7 text-primary-500" aria-hidden="true"
    >
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

function CenterGlobe() {
  return (
    <svg
      viewBox="0 0 64 64" fill="none" stroke="white"
      strokeLinecap="round" strokeLinejoin="round"
      className="w-14 h-14 lg:w-16 lg:h-16" aria-hidden="true"
    >
      <circle cx="32" cy="32" r="26" strokeWidth="1.5" />
      <ellipse cx="32" cy="32" rx="10" ry="26" strokeWidth="1.5" />
      <path d="M6 32h52" strokeWidth="1.5" />
      <path d="M10 18h44" strokeWidth="1" opacity="0.6" />
      <path d="M10 46h44" strokeWidth="1" opacity="0.6" />
    </svg>
  )
}

// ── Stage Card ────────────────────────────────────────────────────────────────

function StageCard({ stage }: { stage: Stage }) {
  return (
    <div
      className="stage-card group bg-white border border-primary-200 rounded-2xl p-6 lg:p-7 transition-all duration-300 hover:border-primary-400 hover:scale-[1.02]"
      role="region"
      aria-label={`${stage.title}: ${stage.description}`}
    >
      {/* Badge + rule */}
      <div className="flex items-center gap-3 mb-5" aria-hidden="true">
        <span className="w-7 h-7 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-primary-600 transition-colors duration-300">
          {stage.id}
        </span>
        <div className="h-px flex-1 bg-primary-100" />
      </div>

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors duration-300">
        {getStageIcon(stage.id)}
      </div>

      {/* Title */}
      <h3 className="text-base lg:text-[1.0625rem] font-bold text-primary-900 mb-2 leading-snug">
        {stage.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-700 leading-relaxed">
        {stage.description}
      </p>
    </div>
  )
}

// ── Center Piece ──────────────────────────────────────────────────────────────

function CenterPiece({ centerRef }: { centerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={centerRef}
      className="col-start-2 row-start-2 flex flex-col items-center justify-center w-full min-h-[280px] lg:min-h-[320px] relative"
      aria-hidden="true"
    >
      {/* Animated SVG rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 320"
      >
        {/* Outer dashed animated ring */}
        <circle
          id="dash-ring"
          cx="160" cy="160" r="140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          className="text-primary-300"
        />
        {/* Inner solid ring */}
        <circle
          cx="160" cy="160" r="100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary-200 opacity-40"
        />
        {/* Innermost fill ring */}
        <circle
          cx="160" cy="160" r="75"
          fill="currentColor"
          className="text-primary-100 opacity-60"
        />
      </svg>

      {/* Globe + badge */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-primary-500 border-4 border-primary-400 flex items-center justify-center">
          <CenterGlobe />
        </div>
        <div className="bg-primary-900 rounded-full px-4 py-1.5">
          <p className="text-[11px] font-bold tracking-widest uppercase text-white">
            2 Trees Per Clean
          </p>
        </div>
      </div>
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

      // Heading block fade up
      gsap.from('.flywheel-heading', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })

      // Center globe scale + fade
      gsap.from(centerRef.current, {
        scale: 0.82, opacity: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })

      // SVG dashed ring draw (strokeDashoffset: circumference → 0)
      const dashRing = sectionRef.current?.querySelector('#dash-ring') as SVGCircleElement
      if (dashRing) {
        const circ = 2 * Math.PI * 140 // ≈ 879
        gsap.set(dashRing, { strokeDashoffset: circ })
        gsap.to(dashRing, {
          strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Stage cards staggered entry
      gsap.from('.stage-card', {
        y: 28, opacity: 0, duration: 0.65, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          toggleActions: 'play none none none',
        },
      })

      // Impact bar pillars stagger
      gsap.from('.impact-pillar', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.eco-impact-bar',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary-50 py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="eco-flywheel-title"
    >
      {/* ── Decorative background leaves ──────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 w-80 h-80 opacity-[0.04] pointer-events-none -translate-x-1/3 -translate-y-1/3 rotate-12"
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 300" fill="currentColor" className="text-primary-900 w-full h-full">
          <path d="M150 10 C180 40,290 80,275 190 C258 300,110 295,75 215 C40 135,60 55,150 10Z" />
        </svg>
      </div>
      <div
        className="absolute bottom-20 right-0 w-[30rem] h-[30rem] opacity-[0.04] pointer-events-none translate-x-1/3 rotate-[200deg]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 300" fill="currentColor" className="text-primary-900 w-full h-full">
          <path d="M150 10 C180 40,290 80,275 190 C258 300,110 295,75 215 C40 135,60 55,150 10Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section heading ──────────────────────────────────────────────── */}
        <div className="flywheel-heading text-center mb-12 md:mb-16">
          {/* Pill label */}
          <div className="inline-flex items-center gap-2 bg-primary-100 border border-primary-200 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" aria-hidden="true" />
            <span className="text-xs font-semibold text-primary-700 tracking-widest uppercase">
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

        {/* ── Desktop: 3 × 3 flywheel grid ────────────────────────────────── */}
        <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-6 lg:gap-10 items-center mb-12 lg:mb-16">

          {/* Row 1: Stage 1 top-center */}
          <div className="col-start-2 row-start-1">
            <StageCard stage={stages[0]} />
          </div>

          {/* Row 2: Stage 2 left */}
          <div className="col-start-1 row-start-2">
            <StageCard stage={stages[1]} />
          </div>

          {/* Row 2: Center piece */}
          <CenterPiece centerRef={centerRef} />

          {/* Row 2: Stage 3 right */}
          <div className="col-start-3 row-start-2">
            <StageCard stage={stages[2]} />
          </div>

          {/* Row 3: Stage 4 bottom-center */}
          <div className="col-start-2 row-start-3">
            <StageCard stage={stages[3]} />
          </div>
        </div>

        {/* ── Mobile: center visual + stacked cards ───────────────────────── */}
        <div className="md:hidden mb-10">
          {/* Compact center visual */}
          <div className="flex flex-col items-center gap-2 mb-8" aria-hidden="true">
            <div className="w-20 h-20 rounded-full bg-primary-500 border-4 border-primary-400 flex items-center justify-center">
              <svg
                viewBox="0 0 64 64" fill="none" stroke="white"
                strokeLinecap="round" strokeLinejoin="round"
                className="w-10 h-10"
              >
                <circle cx="32" cy="32" r="26" strokeWidth="1.5" />
                <ellipse cx="32" cy="32" rx="10" ry="26" strokeWidth="1.5" />
                <path d="M6 32h52" strokeWidth="1.5" />
                <path d="M10 18h44" strokeWidth="1" opacity="0.6" />
                <path d="M10 46h44" strokeWidth="1" opacity="0.6" />
              </svg>
            </div>
            <div className="bg-primary-900 rounded-full px-3 py-1">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white">
                2 Trees Per Clean
              </p>
            </div>
          </div>

          {/* Stage cards: 1-col xs, 2-col sm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stages.map((stage) => (
              <StageCard key={stage.id} stage={stage} />
            ))}
          </div>
        </div>

        {/* ── Impact bar ──────────────────────────────────────────────────── */}
        <div
          className="eco-impact-bar bg-primary-700 rounded-2xl overflow-hidden grid grid-cols-2 lg:grid-cols-4 gap-px"
          role="list"
          aria-label="Our eco impact pillars"
        >
          {IMPACT_PILLARS.map(({ label, desc }) => (
            <div
              key={label}
              className="impact-pillar bg-primary-900 px-5 py-6 lg:py-7 text-center"
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
