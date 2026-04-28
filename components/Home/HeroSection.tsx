'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Constants ─────────────────────────────────────────────────────────────────

const CALENDLY_URL = 'https://calendly.com/parthdharia99/30min'

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
        .from('.hero-badge',   { y: 20, opacity: 0, duration: 0.75 })
        .from('.hero-heading', { y: 50, opacity: 0, duration: 1.0 }, '-=0.4')
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
        {/* Cinematic overlay — dark base + radial vignette for atmospheric depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-primary-900/65"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 65% 35%, rgba(37,99,235,0.10) 0%, rgba(15,23,42,0.50) 100%)',
          }}
        />
        {/* Top-edge gradient — ensures transparent nav always has contrast over bright image areas */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-primary-900/85 to-transparent"
        />
      </div>

      {/* ── Hero content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-36 sm:pt-40 sm:pb-48">

        {/* Trust badge */}
        <div
          className="hero-badge flex justify-center mb-8"
          role="status"
          aria-label="Social proof: Trusted across New Jersey"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-sm text-white/65 text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0" aria-hidden="true" />
            Trusted Across New Jersey
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0" aria-hidden="true" />
          </span>
        </div>

        {/* Heading */}
        <h1 className="hero-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.07] tracking-tight mb-6">
          Transform Your Garage Into a{' '}
          <br className="hidden sm:block" />
          <span className="font-light italic text-white/90">
            Clean, Functional Space
          </span>
        </h1>

        {/* Subheading */}
        <p className="hero-sub text-base sm:text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-10">
          We offer garage clean-out, deep cleaning, garage organization, donation drop-off, and recycling support in New Jersey, built to help you take back your garage space.
        </p>

        {/* Bullet pills — editorial thin-rule separator */}
        <div
          className="hero-pills flex items-center gap-3 sm:gap-4 md:gap-6 mb-12 w-full max-w-2xl mx-auto px-4 sm:px-0"
          role="list"
          aria-label="Core service pillars"
        >
          <span aria-hidden="true" className="flex-1 h-px bg-white/15" />
          {(['Declutter', 'Organize', 'Sustain'] as const).map((word, i) => (
            <React.Fragment key={word}>
              <span
                role="listitem"
                className="text-white/50 font-medium text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase whitespace-nowrap"
              >
                {word}
              </span>
              {i < 2 && (
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full bg-white/20 shrink-0"
                />
              )}
            </React.Fragment>
          ))}
          <span aria-hidden="true" className="flex-1 h-px bg-white/15" />
        </div>

        {/* CTA buttons */}
        <div
          className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center items-center"
          role="group"
          aria-label="Call to action buttons"
        >
          {/* Primary CTA — Calendly */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 h-11 rounded-lg text-base font-semibold bg-white text-primary-700 border-2 border-white hover:bg-white/90 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl lg:gap-2.5"
            aria-label="Schedule a free estimate"
          >
            <i className="bi bi-calendar2-check text-lg lg:text-xl leading-none" aria-hidden="true" />
            Schedule Free Estimate
          </a>

          {/* Secondary CTA */}
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 h-11 rounded-lg text-base font-medium border border-white/25 text-white/75 hover:border-white/50 hover:bg-white/[0.07] hover:text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:px-8 lg:py-4 lg:h-14 lg:rounded-xl lg:text-lg"
            aria-label="View our services"
          >
            View Services
            <i className="bi bi-arrow-right text-sm leading-none" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
