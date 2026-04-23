'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// ── Data ──────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    id: 1,
    name: 'Priya M.',
    rating: 5,
    snippet:
      'The crew paid attention to every detail — separating items for donation rather than just hauling everything away.',
  },
  {
    id: 2,
    name: 'Karan S.',
    rating: 5,
    snippet:
      'Tight timeline after a tenant move-out. AP cleanco came through without a hitch — unit was ready the next day.',
  },
  {
    id: 3,
    name: 'Neha V.',
    rating: 5,
    snippet:
      'I regularly recommend AP cleanco to my clients before any redesign project. Reliable, tidy, and always easy to work with.',
  },
]

const AUTOPLAY_DELAY = 4000

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5 mb-3"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`bi bi-star-fill text-xs ${i < rating ? 'text-accent-500' : 'text-neutral-200'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

// ── Carousel ──────────────────────────────────────────────────────────────────

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const total = REVIEWS.length

  // ── GSAP slide transition ─────────────────────────────────────────────────
  const { contextSafe } = useGSAP({ scope: containerRef })

  const animateTo = contextSafe((direction: 1 | -1, onComplete: () => void) => {
    if (!slideRef.current) return
    gsap.timeline()
      .to(slideRef.current, {
        x: direction * -20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete,
      })
      .fromTo(
        slideRef.current,
        { x: direction * 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.28, ease: 'power2.out' },
      )
  })

  // ── Navigation ────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (next: number, direction: 1 | -1 = 1) => {
      animateTo(direction, () => setCurrent(next))
    },
    [animateTo],
  )

  const goNext = useCallback(() => {
    goTo((current + 1) % total, 1)
  }, [current, total, goTo])

  const goPrev = useCallback(() => {
    goTo((current - 1 + total) % total, -1)
  }, [current, total, goTo])

  // ── Autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (paused) return
    timerRef.current = setTimeout(goNext, AUTOPLAY_DELAY)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, paused, goNext])

  const review = REVIEWS[current]

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slide area */}
      <div
        ref={slideRef}
        role="region"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Review ${current + 1} of ${total}`}
        className="min-h-28"
      >
        <StarRating rating={review.rating} />
        <blockquote className="text-sm text-neutral-600 leading-relaxed mb-2 italic">
          &ldquo;{review.snippet}&rdquo;
        </blockquote>
        <cite className="not-italic text-xs font-medium text-primary-700">
          — {review.name}
        </cite>
      </div>

      {/* Controls row: arrows + dots */}
      <div className="flex items-center justify-between mt-5">

        {/* Prev arrow */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous review"
          className="flex items-center justify-center w-7 h-7 border border-neutral-200 text-neutral-400 hover:border-primary-400 hover:text-primary-600 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1"
        >
          <i className="bi bi-chevron-left text-xs" aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Review navigation">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === current}
              aria-label={`Go to review ${idx + 1}`}
              onClick={() => goTo(idx, idx > current ? 1 : -1)}
              className={`transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 ${
                idx === current
                  ? 'w-4 h-1.5 bg-primary-500'
                  : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-primary-300 rounded-full'
              }`}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Next review"
          className="flex items-center justify-center w-7 h-7 border border-neutral-200 text-neutral-400 hover:border-primary-400 hover:text-primary-600 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1"
        >
          <i className="bi bi-chevron-right text-xs" aria-hidden="true" />
        </button>

      </div>
    </div>
  )
}
