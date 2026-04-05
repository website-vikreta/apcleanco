'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { id: 1, value: 100,  suffix: '+',      label: 'Jobs Completed',      icon: 'bi-briefcase-fill' },
  { id: 2, value: 143,  suffix: '+',      label: 'Tons Recycled',       icon: 'bi-recycle' },
  { id: 3, value: 50,   suffix: '+',      label: 'Neighborhoods Served', icon: 'bi-geo-alt-fill' },
  { id: 4, value: 5.0,  suffix: ' Stars', label: 'Customer Rating',     icon: 'bi-star-fill' },
] as const

// ── Component ─────────────────────────────────────────────────────────────────

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Heading fade-up
      gsap.from('.impact-heading', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.impact-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Stat blocks stagger in
      gsap.from('.impact-stat', {
        y: 32,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.impact-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Count-up animation for each stat number
      STATS.forEach((stat) => {
        const el = sectionRef.current?.querySelector(`[data-stat-id="${stat.id}"]`)
        if (!el) return
        const isFloat = stat.value % 1 !== 0
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate() {
            el.textContent = isFloat
              ? obj.val.toFixed(1) + stat.suffix
              : Math.floor(obj.val) + stat.suffix
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-primary-900 py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="impact-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="impact-heading text-center mb-10 md:mb-12">
          <h2
            id="impact-heading"
            className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight"
          >
            Our{' '}
            <span className="text-accent-400">Impact</span>
          </h2>
        </div>

        {/* Stats grid: 1 col xs → 2 col md → 4 col lg */}
        <dl
          className="impact-grid grid grid-cols-2 lg:grid-cols-4 divide-x divide-primary-700"
          aria-label="AP Cleanco impact statistics"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.id}
              className="impact-stat flex flex-col items-center text-center px-6 py-8 lg:py-0"
            >
              <span
                className="mb-3 w-12 h-12 flex items-center justify-center bg-primary-700 text-accent-400"
                aria-hidden="true"
              >
                <i className={`bi ${stat.icon} text-2xl leading-none`} />
              </span>
              <dt className="sr-only">{stat.label}</dt>
              <dd
                className="text-4xl md:text-5xl font-black text-white tracking-tight tabular-nums"
                data-stat-id={stat.id}
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                {/* Initial display — JS will count up from 0 */}
                0{stat.suffix}
              </dd>
              <p className="mt-2 text-primary-300 text-sm md:text-base font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>

      </div>
    </section>
  )
}
