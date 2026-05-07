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
    testimonial: 'My garage was completely overrun with years of clutter, and AP cleanco cleared it out in a single day. The team was thorough, respectful of my space, and left everything spotless. Honestly one of the best home services I have ever hired.',
  },
  {
    id: 2,
    name: 'Rohit Sharma',
    designation: 'Property Owner',
    testimonial: 'AP cleanco handled the cleanout at my rental property quickly and without any hassle on my end. What impressed me most was how they sorted recyclables on the spot rather than dumping everything. I will definitely be calling them again for my next turnover.',
  },
  {
    id: 3,
    name: 'Ankit Patel',
    designation: 'Business Owner',
    testimonial: 'We needed our old office equipment and furniture cleared before a renovation — AP cleanco showed up on time and managed the whole process professionally. They even provided a disposal certificate for our records. Made a stressful project completely stress-free.',
  },
  {
    id: 4,
    name: 'Priya Mehta',
    designation: 'Homeowner',
    testimonial: 'The crew paid attention to every detail, carefully separating items for donation versus disposal rather than just hauling everything away. My living space felt transformed after just one visit. I appreciated the care they showed for both my home and the environment.',
  },
  {
    id: 5,
    name: 'Karan Shah',
    designation: 'Landlord',
    testimonial: 'After a tenant move-out, my property needed a full cleanout on a very tight timeline — AP cleanco came through without a hitch. They were communicative, fast, and left the unit ready for viewing the very next day. Exceptional turnaround.',
  },
  {
    id: 6,
    name: 'Neha Verma',
    designation: 'Interior Designer',
    testimonial: 'I regularly recommend AP cleanco to my clients before we begin any redesign project because a clean, clutter-free space makes all the difference. Their team is reliable, tidy, and always easy to coordinate with. My clients have never been disappointed.',
  },
] as const

const total = TESTIMONIALS.length
// Triple-clone for seamless infinite loop
const CLONED = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

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
        flex flex-col
        bg-white border border-neutral-200
        px-5 py-5
        min-w-0
        transition-transform duration-200 ease-out
        hover:-translate-y-1
      "
      aria-label={`Testimonial from ${name}`}
    >
      {/* Top row: stars + quote icon */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="flex items-center gap-1"
          aria-label="5 out of 5 stars"
          role="img"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className="bi bi-star-fill text-primary-400 text-base leading-none"
              aria-hidden="true"
            />
          ))}
          <span className="ml-1.5 text-xs font-semibold text-primary-600 leading-none">5.0</span>
        </div>
        <i
          className="bi bi-quote text-3xl text-primary-100 leading-none"
          aria-hidden="true"
        />
      </div>

      {/* Testimonial text */}
      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed flex-1 mb-4">
        {testimonial}
      </p>

      {/* Footer: avatar + name + designation inline */}
      <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
        <div
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs ${colorClass}`}
          aria-hidden="true"
        >
          {getInitials(name)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-primary-900 text-sm leading-tight truncate">{name}</p>
          <p className="text-neutral-400 text-xs leading-tight truncate">{designation}</p>
        </div>
      </div>
    </article>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  // extIdxRef tracks position within CLONED; starts at middle copy (index = total)
  const extIdxRef  = useRef<number>(total)
  const [activeIdx, setActiveIdx] = useState(0)  // 0..total-1 for dots
  const [isPlaying, setIsPlaying] = useState(true)
  const isPausedRef = useRef(false)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getCardWidth = useCallback((): number => {
    const card = trackRef.current?.querySelector<HTMLElement>('.t-card-wrap')
    return card ? card.getBoundingClientRect().width : 0
  }, [])

  const slideToIdx = useCallback((idx: number, animate = true) => {
    const track = trackRef.current
    if (!track) return
    const cardW = getCardWidth()
    if (cardW === 0) return

    extIdxRef.current = idx
    setActiveIdx(idx % total)

    gsap.to(track, {
      x: -idx * cardW,
      duration: animate ? 0.5 : 0,
      ease: 'power2.inOut',
      onComplete: () => {
        // Seamless loop: silently jump to equivalent position in middle copy
        if (idx >= total * 2) {
          const reset = idx - total
          extIdxRef.current = reset
          gsap.set(track, { x: -reset * cardW })
        } else if (idx < total) {
          const reset = idx + total
          extIdxRef.current = reset
          gsap.set(track, { x: -reset * cardW })
        }
      },
    })
  }, [getCardWidth])

  const next = useCallback(() => {
    slideToIdx(extIdxRef.current + 1)
  }, [slideToIdx])

  const prev = useCallback(() => {
    slideToIdx(extIdxRef.current - 1)
  }, [slideToIdx])

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

  // Recalculate position on resize
  useEffect(() => {
    const handleResize = () => {
      const cardW = getCardWidth()
      if (cardW > 0 && trackRef.current)
        gsap.set(trackRef.current, { x: -extIdxRef.current * cardW })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getCardWidth])

  // Initial track position + scroll entry animations
  useGSAP(
    () => {
      // Position track at the middle copy on mount
      const cardW = getCardWidth()
      if (cardW > 0) gsap.set(trackRef.current, { x: -total * cardW })

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
    { scope: sectionRef, dependencies: [getCardWidth] },
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
          className="testimonials-slider w-full"
          role="region"
          aria-label="Customer testimonials carousel"
          aria-roledescription="carousel"
          onMouseEnter={() => { isPausedRef.current = true }}
          onMouseLeave={() => { isPausedRef.current = false }}
        >
          {/* Track — infinite loop via triple-cloned slides */}
          <div className="overflow-hidden w-full">
            <div
              ref={trackRef}
              className="flex max-w-full"
              style={{ willChange: 'transform' }}
            >
              {CLONED.map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${(i % total) + 1} of ${total}`}
                  aria-hidden={(i % total) !== activeIdx}
                  className="
                    t-card-wrap
                    shrink-0 px-3
                    w-full
                    md:w-1/2
                    lg:w-1/3
                  "
                >
                  <TestimonialCard
                    name={t.name}
                    designation={t.designation}
                    testimonial={t.testimonial}
                    colorClass={AVATAR_COLORS[(t.id - 1) % AVATAR_COLORS.length]}
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
                  onClick={() => slideToIdx(total + i)}
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
