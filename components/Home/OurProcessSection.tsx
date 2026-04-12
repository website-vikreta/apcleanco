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

// ── Component ─────────────────────────────────────────────────────────────────

export default function OurProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])
  const contentsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      // ── Heading fade-up ──────────────────────────────────────────────────
      gsap.from('.process-heading', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.process-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // ── Get viewport width to determine horizontal vs vertical timeline ───
      const updateAnimations = () => {
        // Clear any existing ScrollTriggers for this section
        ScrollTrigger.getAll().forEach((trigger) => {
          const triggerElement = trigger.vars.trigger
          if (
            triggerElement &&
            typeof triggerElement === 'object' &&
            'closest' in triggerElement &&
            triggerElement.closest?.('.process-timeline')
          ) {
            trigger.kill()
          }
        })

        const isHorizontal = window.innerWidth >= 768 // md breakpoint
        const timeline = containerRef.current?.querySelector('.process-timeline')
        if (!timeline) return

        if (isHorizontal) {
          animateHorizontalTimeline()
        } else {
          animateVerticalTimeline()
        }
      }

      // ── Horizontal Timeline (Desktop) ────────────────────────────────────
      const animateHorizontalTimeline = () => {
        // Animate line drawing from left to right
        if (lineRef.current) {
          const line = lineRef.current
          const pathLength = line.getTotalLength?.() || 0

          gsap.set(line, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          })

          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '.process-timeline',
              start: 'top 65%',
              end: 'bottom 35%',
              scrub: 1,
              markers: false,
            },
          })
        }

        // Stagger node animations
        nodesRef.current.forEach((node, idx) => {
          if (!node) return
          gsap.from(node, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out',
            scrollTrigger: {
              trigger: '.process-timeline',
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: idx * 0.15,
          })
        })

        // Stagger content animations
        contentsRef.current.forEach((content, idx) => {
          if (!content) return
          gsap.from(content, {
            y: 16,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.process-timeline',
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: idx * 0.12 + 0.1,
          })
        })

        // Subtle parallax on nodes
        nodesRef.current.forEach((node, idx) => {
          if (!node) return
          gsap.to(node, {
            y: -8 * (idx % 2 === 0 ? 1 : -1),
            scrollTrigger: {
              trigger: '.process-timeline',
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 0.5,
              markers: false,
            },
          })
        })
      }

      // ── Vertical Timeline (Mobile) ───────────────────────────────────────
      const animateVerticalTimeline = () => {
        // Animate line drawing from top to bottom
        if (lineRef.current) {
          const line = lineRef.current
          const pathLength = line.getTotalLength?.() || 0

          gsap.set(line, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          })

          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: '.process-timeline',
              start: 'top 50%',
              end: 'bottom 10%',
              scrub: 1,
              markers: false,
            },
          })
        }

        // Stagger node animations for vertical
        nodesRef.current.forEach((node, idx) => {
          if (!node) return
          gsap.from(node, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out',
            scrollTrigger: {
              trigger: `.process-step-${idx}`,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        })

        // Content fade-in for vertical
        contentsRef.current.forEach((content, idx) => {
          if (!content) return
          gsap.from(content, {
            x: 16,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.process-step-${idx}`,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        })
      }

      // Initial animation setup
      updateAnimations()

      // Refresh on window resize
      const handleResize = () => {
        ScrollTrigger.refresh()
        updateAnimations()
      }

      const resizeObserver = new ResizeObserver(handleResize)
      if (sectionRef.current) {
        resizeObserver.observe(sectionRef.current)
      }

      return () => {
        resizeObserver.disconnect()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-50 py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="process-heading text-center mb-12 md:mb-16 lg:mb-20">
          <h2
            id="process-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight"
          >
            Our <span className="text-accent-500">Process</span>
          </h2>
          <p className="text-neutral-600 text-base md:text-lg mt-4 max-w-2xl mx-auto">
            A clear, structured approach to transforming your garage into a clean, organized space.
          </p>
        </div>

        {/* Desktop: Horizontal Timeline (hidden on md below) */}
        <div className="hidden md:block">
          <div ref={containerRef} className="process-timeline-container relative">
            {/* SVG Path: Horizontal curved line */}
            <svg
              className="process-timeline absolute top-0 left-0 w-full h-40 pointer-events-none"
              viewBox="0 0 1200 150"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={lineRef}
                d="M 80 80 Q 300 120, 520 80 T 960 80"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-neutral-300"
              />
            </svg>

            {/* Steps Grid */}
            <div className="process-timeline grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0 pt-32">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  className={`process-step process-step-${idx} flex flex-col items-center md:flex-col-reverse md:pt-4`}
                >
                  {/* Content */}
                  <div
                    ref={(el) => {
                      if (el) contentsRef.current[idx] = el
                    }}
                    className="text-center mt-6 md:mt-0 md:mb-16 px-2"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-primary-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Node (Circle) */}
                  <div
                    ref={(el) => {
                      if (el) nodesRef.current[idx] = el
                    }}
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white font-bold text-2xl shadow-lg ring-4 ring-neutral-50 shrink-0 relative"
                    aria-label={`Step ${step.id}: ${step.title}`}
                  >
                    {step.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Vertical Timeline (visible on md below) */}
        <div className="md:hidden">
          <div ref={containerRef} className="process-timeline-container relative">
            {/* SVG Path: Vertical line on left */}
            <svg
              className="process-timeline absolute left-6 top-0 w-1 h-full pointer-events-none"
              viewBox="0 0 10 800"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={lineRef}
                d="M 5 0 L 5 800"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-neutral-300"
              />
            </svg>

            {/* Steps: Vertical stack */}
            <div className="space-y-8 pl-28">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  className={`process-step process-step-${idx} relative`}
                >
                  {/* Node positioned absolutely on the left */}
                  <div
                    ref={(el) => {
                      if (el) nodesRef.current[idx] = el
                    }}
                    className="absolute left-0 -translate-x-1/2 w-14 h-14 rounded-full bg-primary-500 text-white font-bold text-lg flex items-center justify-center shadow-lg ring-4 ring-neutral-50"
                    style={{ top: '-4px' }}
                    aria-label={`Step ${step.id}: ${step.title}`}
                  >
                    {step.id}
                  </div>

                  {/* Content */}
                  <div
                    ref={(el) => {
                      if (el) contentsRef.current[idx] = el
                    }}
                  >
                    <h3 className="text-base font-semibold text-primary-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
