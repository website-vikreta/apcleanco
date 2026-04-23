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
    text: 'We handle your garage space with care',
  },
  {
    id: 2,
    icon: 'bi-check-circle',
    text: 'We focus on real results, not shortcuts',
  },
  {
    id: 3,
    icon: 'bi-brightness-high',
    text: 'We aim to leave every garage cleaner and more functional',
  },
  {
    id: 4,
    icon: 'bi-hand-thumbs-up',
    text: 'We make the process simple and easy for our customers',
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
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header: Heading + Intro ──────────────────────────────────────── */}
        <div className="mb-10 md:mb-12 text-center">
          <h2
            id="trust-heading"
            className="trust-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight mb-4 md:mb-6"
          >
            Why{' '}<span className="text-primary-500">Trust Us</span>
          </h2>

          <p className="trust-intro text-neutral-700 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We know that letting someone work in your space is a big decision. That&apos;s why we focus on keeping the process straightforward, respectful, and professional from start to finish.
          </p>
        </div>

        {/* ── Trust Points Grid ────────────────────────────────────────────── */}
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          role="list"
          aria-label="Trust points"
        >
          {TRUST_POINTS.map((point, index) => (
            <TrustItem
              key={point.id}
              icon={point.icon}
              text={point.text}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
