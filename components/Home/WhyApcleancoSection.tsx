'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../Button'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────────

const COMPARISON_ROWS = [
  {
    id: 1,
    icon: 'bi-patch-check',
    feature: 'Cleaning Quality',
    apCleanco: 'Detailed, checklist-based clean',
    others: 'Inconsistent results',
  },
  {
    id: 2,
    icon: 'bi-flower1',
    feature: 'Products Used',
    apCleanco: 'Eco-friendly & family-safe',
    others: 'Harsh chemicals',
  },
  {
    id: 3,
    icon: 'bi-tag',
    feature: 'Pricing',
    apCleanco: 'Flat, transparent pricing',
    others: 'Hidden fees & upsells',
  },
  {
    id: 4,
    icon: 'bi-calendar-check',
    feature: 'Reliability',
    apCleanco: 'On-time, dependable scheduling',
    others: 'Late arrivals or cancellations',
  },
  {
    id: 5,
    icon: 'bi-sliders',
    feature: 'Customization',
    apCleanco: 'Fully customizable plans',
    others: 'One-size-fits-all',
  },
  {
    id: 6,
    icon: 'bi-emoji-smile',
    feature: 'Satisfaction',
    apCleanco: '100% satisfaction guarantee',
    others: 'Limited or none',
  },
  {
    id: 7,
    icon: 'bi-chat-dots',
    feature: 'Communication',
    apCleanco: 'Friendly, responsive support',
    others: 'Hard to reach',
  },
  {
    id: 8,
    icon: 'bi-gem',
    feature: 'Overall Value',
    apCleanco: 'Premium clean at fair pricing',
    others: 'Pay more, get less',
  },
  {
    id: 9,
    icon: 'bi-credit-card',
    feature: 'Payment Terms',
    apCleanco: 'Pay after the job is done',
    others: 'Upfront payment required',
  },
  {
    id: 10,
    icon: 'bi-lightning-charge',
    feature: 'Service Speed',
    apCleanco: 'Same-day service available when possible',
    others: 'Scheduling delays',
  },
] as const

// ── Check / Cross icons ───────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 text-primary-500"
      aria-hidden="true"
    >
      <i className="bi bi-check-circle-fill text-lg leading-none" />
    </span>
  )
}

function CrossIcon() {
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 text-neutral-400"
      aria-hidden="true"
    >
      <i className="bi bi-x-circle-fill text-lg leading-none" />
    </span>
  )
}

// ── Desktop row ───────────────────────────────────────────────────────────────

function DesktopRow({
  icon,
  feature,
  apCleanco,
  others,
  isLast,
}: {
  icon: string
  feature: string
  apCleanco: string
  others: string
  isLast: boolean
}) {
  return (
    <div
      className={`why-row grid grid-cols-[1fr_1fr_1fr] group transition-colors duration-200 hover:bg-neutral-100 ${
        isLast ? '' : 'border-b border-neutral-200'
      }`}
    >
      {/* Feature */}
      <div className="flex items-center gap-3 px-6 py-5">
        <span
          className="shrink-0 w-9 h-9 flex items-center justify-center bg-primary-50 text-primary-500"
          aria-hidden="true"
        >
          <i className={`bi ${icon} text-lg leading-none`} />
        </span>
        <span className="font-semibold text-primary-900 text-sm md:text-base tracking-tight">
          {feature}
        </span>
      </div>

      {/* APcleanco */}
      <div className="flex items-center gap-2.5 px-6 py-5 bg-primary-50/60 group-hover:bg-primary-50 transition-colors duration-200 border-x border-primary-200">
        <CheckIcon />
        <span className="text-primary-800 text-sm md:text-base font-medium">
          {apCleanco}
        </span>
      </div>

      {/* Others */}
      <div className="flex items-center gap-2.5 px-6 py-5">
        <CrossIcon />
        <span className="text-neutral-500 text-sm md:text-base">
          {others}
        </span>
      </div>
    </div>
  )
}

// ── Mobile card ───────────────────────────────────────────────────────────────

function MobileCard({
  icon,
  feature,
  apCleanco,
  others,
}: {
  icon: string
  feature: string
  apCleanco: string
  others: string
}) {
  return (
    <div className="why-card border border-neutral-200 overflow-hidden">
      {/* Feature title */}
      <div className="flex items-center gap-3 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
        <span
          className="shrink-0 w-8 h-8 flex items-center justify-center bg-primary-50 text-primary-500"
          aria-hidden="true"
        >
          <i className={`bi ${icon} text-base leading-none`} />
        </span>
        <span className="font-semibold text-primary-900 text-sm tracking-tight">
          {feature}
        </span>
      </div>

      {/* AP Cleanco row */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-primary-50/70 border-b border-primary-200">
        <CheckIcon />
        <div>
          <p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-0.5">
            AP cleanco
          </p>
          <p className="text-primary-800 text-sm font-medium">{apCleanco}</p>
        </div>
      </div>

      {/* Others row */}
      <div className="flex items-center gap-2.5 px-4 py-3">
        <CrossIcon />
        <div>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-0.5">
            Other Companies
          </p>
          <p className="text-neutral-500 text-sm">{others}</p>
        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function WhyApcleancoSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Heading
      gsap.from('.why-heading', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Desktop rows stagger
      gsap.from('.why-row', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.why-table',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Mobile cards stagger
      gsap.from('.why-card', {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.why-cards',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // CTA
      gsap.from('.why-ctas', {
        y: 20,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.why-ctas',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="why-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="why-heading text-center mb-10 md:mb-14">
          <h2
            id="why-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight"
          >
            Why{' '}
            <span className="text-primary-500">AP cleanco?</span>
          </h2>
        </div>

        {/* Intro Paragraph */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            We believe a garage and the space inside it should not feel cluttered or wasted. At AP cleanco, we focus on garage clean-out, garage deep cleaning, and garage organization so you can take back your garage space.
          </p>
        </div>

        {/* ── Desktop table (lg+) ─────────────────────────────────────────── */}
        <div
          className="why-table hidden lg:block border border-neutral-200 overflow-hidden mb-12"
          role="table"
          aria-label="AP cleanco vs other companies comparison"
        >
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_1fr_1fr] border-b border-neutral-200 bg-neutral-50"
            role="row"
          >
            <div className="px-6 py-4" role="columnheader" aria-label="Feature" />

            {/* AP cleanco header */}}
            <div
              className="flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 border-x border-primary-600"
              role="columnheader"
            >
              <i className="bi bi-check-circle-fill text-white text-base" aria-hidden="true" />
              <span className="text-white font-bold text-sm tracking-widest uppercase">
                AP cleanco
              </span>
            </div>

            {/* Others header */}
            <div
              className="flex items-center justify-center gap-2 px-6 py-4"
              role="columnheader"
            >
              <i className="bi bi-x-circle-fill text-neutral-400 text-base" aria-hidden="true" />
              <span className="text-neutral-500 font-semibold text-sm tracking-widest uppercase">
                Other Companies
              </span>
            </div>
          </div>

          {/* Rows */}
          <div role="rowgroup">
            {COMPARISON_ROWS.map((row, i) => (
              <DesktopRow
                key={row.id}
                icon={row.icon}
                feature={row.feature}
                apCleanco={row.apCleanco}
                others={row.others}
                isLast={i === COMPARISON_ROWS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile cards (< lg) ─────────────────────────────────────────── */}
        <div
          className="why-cards lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
          role="list"
          aria-label="AP cleanco vs other companies comparison"
        >
          {COMPARISON_ROWS.map((row) => (
            <div key={row.id} role="listitem">
              <MobileCard
                icon={row.icon}
                feature={row.feature}
                apCleanco={row.apCleanco}
                others={row.others}
              />
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="why-ctas flex flex-row flex-wrap justify-center gap-3 md:gap-4"
          role="group"
          aria-label="Why AP cleanco call to action buttons"
        >
          <Button
            variant="primary"
            size="md"
            className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl"
            icon={<i className="bi bi-telephone-fill text-base lg:text-lg leading-none" aria-hidden="true" />}
            iconPosition="left"
            aria-label="Schedule a free call with AP cleanco"
          >
            Schedule a Free Call
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl"
            aria-label="Learn more about AP cleanco"
          >
            About Us
          </Button>
        </div>

      </div>
    </section>
  )
}
