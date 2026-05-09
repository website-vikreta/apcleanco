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
      className="bg-white py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
                  src="/services/scrubbing.jpeg"
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
                  icon={<i className="bi bi-arrow-right text-base lg:text-lg leading-none" aria-hidden="true" />}
                  iconPosition="right"
                  aria-label="Learn more about AP Clean Co on Our Story page"
                >
                  Learn more
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="md"
                href="https://calendly.com/parthdharia99/30min"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get a free quote — opens scheduling"
              >
                Get a Free Quote
              </Button>
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
                  src="/services/scrubbing.jpeg"
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
