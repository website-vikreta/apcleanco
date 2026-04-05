'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Constants ─────────────────────────────────────────────────────────────────

const CALENDLY_URL = 'https://calendly.com/apcleanco'

/**
 * 7-vertex polygon for the bottom notch:
 * corners stay at 0/100% horizontally; the lower edge traces a soft V-arc.
 * Both states share the exact same vertex count so GSAP can interpolate.
 */
const CLIP_NOTCHED  = 'polygon(0% 0%, 100% 0%, 100% 82%, 75% 91%, 50% 98%, 25% 91%, 0% 82%)'
const CLIP_STRAIGHT = 'polygon(0% 0%, 100% 0%, 100% 100%, 75% 100%, 50% 100%, 25% 100%, 0% 100%)'

// Flat numeric pairs (x y) matching the two states — used for scrubbed interpolation
const NOTCHED_PTS  = [0, 0, 100, 0, 100, 82,  75,  91, 50,  98, 25,  91, 0, 82]
const STRAIGHT_PTS = [0, 0, 100, 0, 100, 100, 75, 100, 50, 100, 25, 100, 0, 100]

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildPolygon(pts: number[]): string {
  const pairs: string[] = []
  for (let i = 0; i < pts.length; i += 2) {
    pairs.push(`${pts[i]}% ${pts[i + 1]}%`)
  }
  return `polygon(${pairs.join(', ')})`
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      // ── 1. Set initial clip-path ───────────────────────────────────────────
      gsap.set(section, { clipPath: CLIP_NOTCHED })

      // ── 2. Entry animations (staggered reveal) ────────────────────────────
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-heading', { y: 50, opacity: 0, duration: 1.0 })
        .from('.hero-sub',     { y: 35, opacity: 0, duration: 0.85 }, '-=0.65')
        .from('.hero-pills',   { y: 25, opacity: 0, duration: 0.75 }, '-=0.55')
        .from('.hero-ctas',    { y: 25, opacity: 0, duration: 0.75 }, '-=0.5')

      // ── 3. Parallax background ────────────────────────────────────────────
      //    Background div is taller than the section (top extended upward,
      //    bottom extended downward) so it never runs out of image as it moves.
      gsap.to(bgRef.current, {
        y: '18%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // ── 4. Shape morph: notch → straight as user scrolls 0 → 200 px ──────
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=500',
        scrub: 0.4,
        onUpdate: (self) => {
          const p   = self.progress
          const pts = NOTCHED_PTS.map((v, i) => v + (STRAIGHT_PTS[i] - v) * p)
          gsap.set(section, { clipPath: buildPolygon(pts) })
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-label="Hero: Transform your garage into a clean, functional space"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ clipPath: CLIP_NOTCHED }}
    >
      {/* ── Background image (parallax target) ──────────────────────────────── */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-x-0 w-full"
        style={{
          top: '-18%',
          height: '136%',
          willChange: 'transform',
        }}
      >
        <Image
          src="/hero-image.png"
          alt=""
          role="presentation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Atmospheric gradient overlay — ensures text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-primary-900/90 via-primary-800/75 to-primary-700/55"
        />
      </div>

      {/* ── Hero content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36 sm:pt-36 sm:pb-48">

        {/* Heading */}
        <h1 className="hero-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.07] tracking-tight mb-6">
          Transform Your Garage Into a{' '}
          <span className="text-accent-400">
            Clean, Functional Space
          </span>
        </h1>

        {/* Subheading */}
        <p className="hero-sub text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-10">
          Professional garage clean-out, deep cleaning, organization, and eco-friendly
          donation drop-off — designed to save you time, reduce clutter, and create a
          space you can actually use.
        </p>

        {/* Bullet pills */}
        <div
          className="hero-pills flex items-center justify-center gap-4 sm:gap-8 mb-12"
          role="list"
          aria-label="Core service pillars"
        >
          {(['Declutter', 'Organize', 'Sustain'] as const).map((word, i) => (
            <React.Fragment key={word}>
              <span
                role="listitem"
                className="text-accent-400 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase"
              >
                {word}
              </span>
              {i < 2 && (
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full bg-white/35 shrink-0"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center items-center"
          role="group"
          aria-label="Call to action buttons"
        >
          {/* Primary CTA — Calendly */}
          <Button
            variant="white"
            size="md"
            magnetic
            className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl lg:gap-2.5"
            icon={<i className="bi bi-calendar2-check text-lg lg:text-xl leading-none" aria-hidden="true" />}
            iconPosition="left"
            onClick={() =>
              window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
            }
            aria-label="Schedule a call — opens Calendly in a new tab"
          >
            Schedule a Call
          </Button>

          {/* Secondary CTA — styled for dark hero background */}
          <button
            type="button"
            className="
              inline-flex items-center justify-center
              px-6 py-3 h-11 rounded-lg text-base
              lg:px-8 lg:py-4 lg:h-14 lg:rounded-xl lg:text-lg
              border-2 border-white/60 text-white font-semibold
              tracking-tight
              hover:border-white hover:bg-white/10
              transition-all duration-200
              focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-white
            "
            aria-label="Get a free quote"
          >
            Get a Free Quote
          </button>
        </div>
      </div>
    </section>
  )
}
