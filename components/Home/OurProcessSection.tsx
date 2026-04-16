'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Emptying the Garage',
    description:
      'We start by creating a clear list to handle everything in a structured manner. We then start emptying the entire space, getting rid of the clutter and preparing the garage for clean-out.',
  },
  {
    id: 2,
    title: 'Deep Cleaning the Garage',
    description:
      'After decluttering, we start with deep cleaning. We will deal with dust and debris, floors, and surfaces.',
  },
  {
    id: 3,
    title: 'Improve the Setup',
    description:
      'Once the deep cleaning is done, we will bring the garage back together in a cleaner way. This can include restructuring and organizing the garage into sections, making a proper set up.',
  },
  {
    id: 4,
    title: 'Leave the Space Better Than Before',
    description:
      'Our goal is to leave the garage cleaner, more open, functional, and easy to maintain. We want the space to feel more useful, more manageable, and better set up for everyday use.',
  },
] as const

// ── Desktop SVG viewBox constants ─────────────────────────────────────────────
// viewBox: 0 0 1000 200
// Nodes sit exactly ON the wave path at these x-positions
const NODE_X = [100, 367, 633, 900] as const
// Each node's y is determined by evaluating the wave at that x
// Wave: y = 100 + A*sin(π*(x-100)/800)  where A = 60 (wavy) → 0 (straight)
// At x=100 → 100, x=367 → ~160, x=633 → ~160, x=900 → 100
// We store the node y-centers along the WAVY path, and animate them to y=100 (flat)
const NODE_Y_WAVE  = [100, 160, 40, 100] as const // alternating wave crest/trough
const NODE_Y_FLAT  = [100, 100, 100, 100] as const

// The wavy SVG path connecting nodes (desktop, viewBox 1000×200)
const WAVE_PATH =
  'M 100 100 C 183 160, 284 160, 367 160 S 550 40, 633 40 S 817 100, 900 100'

// The flat (straight) SVG path — same x, all y=100
const FLAT_PATH =
  'M 100 100 C 183 100, 284 100, 367 100 S 550 100, 633 100 S 817 100, 900 100'

// ── Component ─────────────────────────────────────────────────────────────────

export default function OurProcessSection() {
  const sectionRef     = useRef<HTMLElement>(null)
  const svgPathRef     = useRef<SVGPathElement>(null)     // desktop animated path
  const nodeCirclesRef = useRef<(SVGGElement | null)[]>([]) // desktop SVG node groups
  const contentCardsRef = useRef<(HTMLDivElement | null)[]>([]) // desktop text cards
  const mobileLineRef  = useRef<SVGPathElement>(null)    // mobile vertical path
  const mobileNodesRef = useRef<(HTMLDivElement | null)[]>([]) // mobile DOM nodes
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]) // mobile text cards

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // ── DESKTOP (md+) ─────────────────────────────────────────────────────
      mm.add('(min-width: 768px)', () => {
        const path = svgPathRef.current
        if (!path) return

        // 1. Set initial state: path drawn fully but wavy, nodes invisible
        const totalLength = path.getTotalLength()
        gsap.set(path, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
          attr: { d: WAVE_PATH },
        })
        nodeCirclesRef.current.forEach((g) => {
          if (g) gsap.set(g, { scale: 0, transformOrigin: '50% 50%', opacity: 0 })
        })
        contentCardsRef.current.forEach((card) => {
          if (card) gsap.set(card, { opacity: 0, y: 20 })
        })

        // 2. Master timeline, triggered when section enters viewport
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
            once: true,
          },
        })

        // Step A: Draw the wave line left → right
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        })

        // Step B: Nodes pop onto the line one by one with stagger
        tl.to(
          nodeCirclesRef.current.filter(Boolean),
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            stagger: 0.18,
            ease: 'back.out(1.8)',
          },
          '-=0.3' // slight overlap with line end
        )

        // Step C: Content cards fade+slide up, staggered
        tl.to(
          contentCardsRef.current.filter(Boolean),
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.14,
            ease: 'power2.out',
          },
          '-=0.6'
        )

        // 3. Scrub: wave → straight as user scrolls through the section
        //    Nodes y-positions also animate from wave y → flat y
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 60%',
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress
            // Interpolate path from WAVE to FLAT
            const interpolatePath = (progress: number) => {
              // control points interpolation: wavy → straight
              // wave: C 183 160, 284 160, 367 160 S 550 40, 633 40 S 817 100, 900 100
              // flat: C 183 100, 284 100, 367 100 S 550 100, 633 100 S 817 100, 900 100
              const lerp = (a: number, b: number) => a + (b - a) * progress
              const c1y1 = lerp(160, 100)
              const c1y2 = lerp(160, 100)
              const n1y  = lerp(160, 100)
              const c2y1 = lerp(40,  100)
              const n2y  = lerp(40,  100)
              const n3y  = lerp(100, 100)
              return `M 100 100 C 183 ${c1y1}, 284 ${c1y2}, 367 ${n1y} S 550 ${c2y1}, 633 ${n2y} S 817 ${n3y}, 900 100`
            }

            if (path) {
              path.setAttribute('d', interpolatePath(p))
            }

            // Move each SVG node group to follow the interpolated y
            nodeCirclesRef.current.forEach((g, i) => {
              if (!g) return
              const yw = NODE_Y_WAVE[i] ?? 100
              const yf = NODE_Y_FLAT[i] ?? 100
              const newY = yw + (yf - yw) * p
              g.setAttribute('transform', `translate(${NODE_X[i]}, ${newY})`)
            })
          },
        })
      })

      // ── MOBILE (<md) ──────────────────────────────────────────────────────
      mm.add('(max-width: 767px)', () => {
        const line = mobileLineRef.current
        if (!line) return

        const totalLength = line.getTotalLength()
        gsap.set(line, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        })
        mobileNodesRef.current.forEach((n) => {
          if (n) gsap.set(n, { scale: 0, opacity: 0, transformOrigin: '50% 50%' })
        })
        mobileCardsRef.current.forEach((c) => {
          if (c) gsap.set(c, { opacity: 0, x: 16 })
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
            once: true,
          },
        })

        // Draw vertical line top → bottom
        tl.to(line, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })

        // Nodes pop on one by one
        tl.to(
          mobileNodesRef.current.filter(Boolean),
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.2,
            ease: 'back.out(1.8)',
          },
          '-=0.3'
        )

        // Cards slide in
        tl.to(
          mobileCardsRef.current.filter(Boolean),
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.16,
            ease: 'power2.out',
          },
          '-=0.55'
        )
      })

      // Heading fade-up
      gsap.from('.process-heading', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="bg-white py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <div className="process-heading text-center mb-10 md:mb-6">
          <h2
            id="process-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight"
          >
            Our <span className="text-accent-500">Process</span>
          </h2>
          <p className="text-neutral-500 text-base md:text-lg mt-3 max-w-xl mx-auto">
            A clear, structured approach to transforming your garage into a clean, organized space.
          </p>
        </div>

        {/* ── DESKTOP: SVG-driven horizontal timeline ────────────────────── */}
        <div className="hidden md:block" aria-hidden="false">
          {/*
            Strategy: one SVG holds BOTH the connecting path AND the numbered circles.
            This guarantees nodes are always precisely on the line at every viewport.
            Content cards live below in a CSS grid, centered under each node x-position.
          */}
          <div className="relative w-full">
            <svg
              viewBox="0 0 1000 200"
              preserveAspectRatio="xMidYMid meet"
              className="w-full"
              style={{ height: '200px' }}
              aria-hidden="true"
              focusable="false"
            >
              {/* Dashed track (always visible, full length) */}
              <path
                d={WAVE_PATH}
                stroke="var(--color-neutral-200)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6 5"
              />

              {/* Animated fill path (draws left→right, morphs wavy→straight) */}
              <path
                ref={svgPathRef}
                d={WAVE_PATH}
                stroke="var(--color-primary-400)"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Node circles — positioned at NODE_X, NODE_Y_WAVE initially */}
              {PROCESS_STEPS.map((step, idx) => (
                <g
                  key={step.id}
                  ref={(el) => { nodeCirclesRef.current[idx] = el }}
                  transform={`translate(${NODE_X[idx]}, ${NODE_Y_WAVE[idx]})`}
                  role="img"
                  aria-label={`Step ${step.id}: ${step.title}`}
                >
                  {/* Outer ring */}
                  <circle r="28" fill="white" stroke="var(--color-primary-200)" strokeWidth="1.5" />
                  {/* Inner filled circle */}
                  <circle r="22" fill="var(--color-primary-500)" />
                  {/* Step number */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="18"
                    fontWeight="700"
                    fontFamily="var(--font-sans)"
                  >
                    {step.id}
                  </text>
                </g>
              ))}
            </svg>

            {/* Content cards — 4-col grid, each card centred under its node x% */}
            <div className="grid grid-cols-4 gap-x-4 mt-4">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  ref={(el) => { contentCardsRef.current[idx] = el }}
                  className="flex flex-col items-center text-center px-3"
                >
                  <h3 className="text-sm lg:text-base font-semibold text-primary-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE: Vertical timeline ──────────────────────────────────── */}
        <div className="md:hidden relative" aria-label="Our process steps">
          {/*
            The SVG vertical line sits as an absolute overlay on the left edge.
            Each step row has a DOM node bubble centered on that line.
          */}
          <div className="relative pl-14">
            {/* Vertical SVG line — absolute, left-aligned */}
            <svg
              className="absolute left-0 top-0 h-full"
              style={{ width: '28px' }}
              preserveAspectRatio="none"
              viewBox="0 0 28 800"
              aria-hidden="true"
              focusable="false"
            >
              {/* Track */}
              <line
                x1="14" y1="0" x2="14" y2="800"
                stroke="var(--color-neutral-200)"
                strokeWidth="2"
                strokeDasharray="6 5"
              />
              {/* Animated fill line */}
              <path
                ref={mobileLineRef}
                d="M 14 0 L 14 800"
                stroke="var(--color-primary-400)"
                strokeWidth="2.5"
                fill="none"
              />
            </svg>

            {/* Steps */}
            <ol className="space-y-10" aria-label="Process steps">
              {PROCESS_STEPS.map((step, idx) => (
                <li
                  key={step.id}
                  className="relative flex items-start gap-5"
                >
                  {/* Node bubble — centred on the left SVG line (left: -14 + 14 = 0 relative to pl-14 parent => -14px from pl-14 start = on the line centre) */}
                  <div
                    ref={(el) => { mobileNodesRef.current[idx] = el }}
                    className="absolute -left-14 top-0 flex items-center justify-center"
                    style={{ width: '28px', height: '28px' }}
                    aria-hidden="true"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center ring-2 ring-white ring-offset-2 ring-offset-white">
                      <span className="text-white text-sm font-bold leading-none">{step.id}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    ref={(el) => { mobileCardsRef.current[idx] = el }}
                    className="pt-0.5"
                  >
                    <h3 className="text-base font-semibold text-primary-900 mb-1.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </section>
  )
}
