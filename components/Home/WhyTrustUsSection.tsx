'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TrustItem from './TrustItem'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────────

const TRUST_POINTS = [
  {
    id: 1,
    icon: 'bi-shield-check',
    label: 'Careful Handling',
    text: 'We treat your garage space with respect — nothing gets damaged or overlooked.',
  },
  {
    id: 2,
    icon: 'bi-check-circle',
    label: 'Real Results',
    text: 'We focus on real results, not shortcuts — every job is done right the first time.',
  },
  {
    id: 3,
    icon: 'bi-brightness-high',
    label: 'Functional Outcome',
    text: 'We leave every garage cleaner, more open, and genuinely easier to use.',
  },
  {
    id: 4,
    icon: 'bi-hand-thumbs-up',
    label: 'Simple Process',
    text: 'We make the entire process easy — from booking to final walkthrough.',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function WhyTrustUsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Heading fade-up on scroll
      gsap.from('.trust-heading', {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.trust-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Intro text fade-up
      gsap.from('.trust-intro', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: '.trust-intro',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Cards stagger fade-up
      gsap.from('.trust-card', {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.trust-grid',
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
      className="bg-primary-900 py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-10 md:mb-14 text-center">
          <p
            className="text-accent-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            aria-hidden="true"
          >
            Why Choose Us
          </p>
          <h2
            id="trust-heading"
            className="trust-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4 md:mb-6"
          >
            Why{' '}<span className="text-primary-300">Trust Us</span>
          </h2>
          <p className="trust-intro text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Letting someone work in your space is a big decision. That&apos;s why we keep every
            job straightforward, respectful, and professional from start to finish.
          </p>
        </div>

        {/* ── Trust Cards Grid ─────────────────────────────────────────────── */}
        <ul
          className="trust-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          role="list"
          aria-label="Why trust AP cleanco"
        >
          {TRUST_POINTS.map((point) => (
            <li key={point.id} role="listitem">
              <article
                className="trust-card h-full flex flex-col items-start gap-4 p-6 md:p-7 rounded-xl border border-white/10 bg-white/6 backdrop-blur-sm"
                aria-label={`${point.label}: ${point.text}`}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-lg bg-white/10"
                  aria-hidden="true"
                >
                  <i className={`${point.icon} text-primary-300 text-xl leading-none`} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-white font-semibold text-sm md:text-base tracking-tight">
                    {point.label}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {point.text}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
