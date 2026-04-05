'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Shubham Gujarathi',
    designation: 'Homeowner',
    testimonial: 'Amazing service! My garage has never looked this clean and organized.',
  },
  {
    id: 2,
    name: 'Rohit Sharma',
    designation: 'Property Owner',
    testimonial: 'Quick, professional, and eco-friendly. Highly recommend!',
  },
  {
    id: 3,
    name: 'Ankit Patel',
    designation: 'Business Owner',
    testimonial: 'They handled everything from start to finish. Super easy process.',
  },
  {
    id: 4,
    name: 'Priya Mehta',
    designation: 'Homeowner',
    testimonial: 'Loved the attention to detail and friendly team.',
  },
  {
    id: 5,
    name: 'Karan Shah',
    designation: 'Landlord',
    testimonial: 'Cleared out my property quickly and responsibly.',
  },
  {
    id: 6,
    name: 'Neha Verma',
    designation: 'Interior Designer',
    testimonial: 'Perfect for clients who need clean, organized spaces.',
  },
] as const

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Tailwind-safe colour variants for avatar backgrounds
const AVATAR_COLORS = [
  'bg-primary-600',
  'bg-primary-500',
  'bg-primary-700',
  'bg-primary-400',
  'bg-primary-600',
  'bg-primary-500',
]

// ── Testimonial Card ──────────────────────────────────────────────────────────

function TestimonialCard({
  name,
  designation,
  testimonial,
  colorClass,
}: {
  name: string
  designation: string
  testimonial: string
  colorClass: string
}) {
  return (
    <article
      className="
        testimonial-card
        flex flex-col justify-between
        bg-white border border-neutral-200
        px-6 py-6
        min-w-0
        transition-transform duration-200 ease-out
        hover:-translate-y-1
      "
      aria-label={`Testimonial from ${name}`}
    >
      {/* Quote icon */}
      <div className="mb-4">
        <i
          className="bi bi-quote text-4xl text-primary-200 leading-none"
          aria-hidden="true"
        />
      </div>

      {/* Testimonial text */}
      <p className="text-neutral-700 text-sm md:text-base leading-relaxed flex-1 mb-6">
        {testimonial}
      </p>

      {/* Footer: avatar + name + stars */}
      <div className="flex items-center gap-3">
        {/* Avatar (initials fallback) */}
        <div
          className={`shrink-0 w-10 h-10 flex items-center justify-center text-white font-bold text-sm ${colorClass}`}
          aria-hidden="true"
        >
          {getInitials(name)}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-primary-900 text-sm truncate">{name}</p>
          <p className="text-neutral-500 text-xs truncate">{designation}</p>
        </div>

        {/* 5 stars */}
        <div
          className="flex gap-0.5 shrink-0"
          aria-label="5 out of 5 stars"
          role="img"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className="bi bi-star-fill text-accent-500 text-xs leading-none"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </article>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)

  const [activeIdx, setActiveIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const isPausedRef = useRef(false)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = TESTIMONIALS.length

  // Number of visible cards per breakpoint (used for display only — CSS handles the widths)
  // We use a simple step-by-step slide: one step = one card
  const slideToIdx = useCallback((idx: number) => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll<HTMLElement>('.t-card-wrap')
    if (!cards.length) return
    const cardW = cards[0].getBoundingClientRect().width
    gsap.to(track, {
      x: -idx * cardW,
      duration: 0.5,
      ease: 'power2.inOut',
    })
    setActiveIdx(idx)
  }, [])

  const next = useCallback(() => {
    const nextIdx = (activeIdx + 1) % total
    slideToIdx(nextIdx)
  }, [activeIdx, total, slideToIdx])

  const prev = useCallback(() => {
    const prevIdx = (activeIdx - 1 + total) % total
    slideToIdx(prevIdx)
  }, [activeIdx, total, slideToIdx])

  // Autoplay
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }
    timerRef.current = setTimeout(() => {
      if (!isPausedRef.current) next()
    }, 3500)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, activeIdx, next])

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => slideToIdx(activeIdx)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIdx, slideToIdx])

  // Scroll entry animations
  useGSAP(
    () => {
      gsap.from('.testimonials-heading', {
        y: 24, opacity: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('.testimonials-slider', {
        y: 32, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-slider',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="testimonials-heading text-center mb-10 md:mb-14">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight"
          >
            What Our{' '}
            <span className="text-primary-500">Customers Say</span>
          </h2>
        </div>

        {/* Slider */}
        <div
          className="testimonials-slider"
          role="region"
          aria-label="Customer testimonials carousel"
          aria-roledescription="carousel"
          onMouseEnter={() => { isPausedRef.current = true }}
          onMouseLeave={() => { isPausedRef.current = false }}
        >
          {/* Track — overflow visible so next card peeks */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex"
              style={{ willChange: 'transform' }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${i + 1} of ${total}`}
                  aria-hidden={i !== activeIdx}
                  className="
                    t-card-wrap
                    shrink-0 px-3
                    w-full
                    sm:w-1/2
                    md:w-1/3
                    lg:w-1/4
                  "
                >
                  <TestimonialCard
                    name={t.name}
                    designation={t.designation}
                    testimonial={t.testimonial}
                    colorClass={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-center gap-4 mt-8">

            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              className="
                w-10 h-10 flex items-center justify-center
                border border-neutral-300 text-neutral-600
                hover:border-primary-500 hover:text-primary-500
                transition-colors duration-200
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
              "
              aria-label="Previous testimonial"
            >
              <i className="bi bi-chevron-left text-base leading-none" aria-hidden="true" />
            </button>

            {/* Dots */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Testimonial slides"
            >
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIdx}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => slideToIdx(i)}
                  className={`
                    transition-all duration-200
                    ${i === activeIdx
                      ? 'w-6 h-2 bg-primary-500'
                      : 'w-2 h-2 bg-neutral-300 hover:bg-primary-300'
                    }
                  `}
                />
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              className="
                w-10 h-10 flex items-center justify-center
                border border-neutral-300 text-neutral-600
                hover:border-primary-500 hover:text-primary-500
                transition-colors duration-200
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
              "
              aria-label="Next testimonial"
            >
              <i className="bi bi-chevron-right text-base leading-none" aria-hidden="true" />
            </button>

            {/* Play / Pause */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="
                w-10 h-10 flex items-center justify-center
                border border-neutral-300 text-neutral-600
                hover:border-primary-500 hover:text-primary-500
                transition-colors duration-200
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
              "
              aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
              aria-pressed={!isPlaying}
            >
              <i
                className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} text-base leading-none`}
                aria-hidden="true"
              />
            </button>

          </div>
        </div>

      </div>
    </section>
  )
}
