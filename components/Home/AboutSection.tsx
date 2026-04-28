'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../Button'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Component ─────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // ── Content fade-up on enter ──────────────────────────────────────────
      gsap.from('.about-heading', {
        y: 32,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.about-body', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-body',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.about-stats', {
        y: 16,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.about-ctas', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-ctas',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.about-image-wrap', {
        x: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-image-wrap',
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
      className="bg-neutral-50 py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/*
          ── Desktop: two-column (60/40)
          ── Mobile/tablet: stacked — heading → image → body → CTAs
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-16 xl:gap-20">

          {/* ── LEFT: Content column ──────────────────────────────────────── */}
          <div className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-0">

            {/* Heading — visible first on all screens */}
            <div className="flex flex-col gap-2 order-1">
              <p
                className="text-accent-500 text-xs font-semibold tracking-[0.2em] uppercase"
                aria-hidden="true"
              >
                About Us
              </p>
              <h2
                id="about-heading"
                className="about-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight"
              >
                Fast, Affordable clean-out & deep cleaning services{' '}
                <span className="text-primary-500">in New Jersey</span>
              </h2>
            </div>

            {/* Image — shown here only on sm/md, hidden on lg+ (no parallax needed) */}
            <div
              className="about-image-wrap relative w-full overflow-hidden lg:hidden order-3"
              style={{ height: '340px' }}
              aria-hidden="true"
            >
              <div className="absolute inset-0">
                <Image
                  src="/hero-image.png"
                  alt="AP Clean Co team removing junk"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={false}
                />
                {/* Subtle gradient overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-br from-primary-900/15 via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Stats badges */}
            <div className="about-stats flex flex-wrap items-center gap-x-5 gap-y-3 order-2">
              {[
                { label: 'NJ-Based Service',    icon: 'bi-geo-alt-fill' },
                { label: 'Same-Day Available',   icon: 'bi-lightning-charge-fill' },
                { label: '100% Satisfaction',    icon: 'bi-patch-check-fill' },
                { label: 'Eco-Friendly',         icon: 'bi-leaf' },
              ].map(({ label, icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <i className={`${icon} text-accent-500 text-sm`} aria-hidden="true" />
                  <span className="text-neutral-600 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="about-body flex flex-col gap-4 order-4">
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                Garages fill up over time and it becomes cluttered, hard to use, and easy to ignore. We help fix that properly through garage clean-out, garage deep cleaning, and garage organization services in New Jersey.
              </p>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                From removing clutter and cleaning the space to improving the overall setup, we focus on turning messy garage spaces into clean, functional, and easy-to-use environments.
              </p>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                We also support donation drop-off, recycling, and selective item recovery, helping give usable items a second life while reducing unnecessary waste.
              </p>
            </div>

            {/* CTAs */}
            <div
              className="about-ctas flex flex-row flex-wrap gap-3 md:gap-4 order-5"
              role="group"
              aria-label="About us call to action buttons"
            >
              <Link href="/about">
                <Button
                  variant="primary"
                  size="md"
                  className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl"
                  icon={<i className="bi bi-arrow-right text-base lg:text-lg leading-none" aria-hidden="true" />}
                  iconPosition="right"
                  aria-label="Learn more about AP Clean Co on Our Story page"
                >
                  Learn more
                </Button>
              </Link>
              <a
                href="https://calendly.com/parthdharia99/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold overflow-hidden select-none focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer bg-neutral-100 text-primary-900 border-2 border-neutral-100 focus-visible:outline-primary-500 px-6 py-3 text-base h-11 rounded-lg lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                aria-label="Get a free quote — opens scheduling"
              >
                Get a Free Quote
              </a>
            </div>

          </div>

          {/* ── RIGHT: Image column — desktop only ───────────────────────── */}
          <div
            className="about-image-wrap hidden lg:block relative overflow-hidden"
            aria-hidden="true"
          >
            {/* Tall aspect ratio container */}
            <div
              className="relative w-full overflow-hidden"
              style={{ paddingBottom: '130%' }}
            >
              <div className="absolute inset-0">
                <Image
                  src="/hero-image.png"
                  alt="AP Clean Co team removing junk"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-br from-primary-900/15 via-transparent to-transparent"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
