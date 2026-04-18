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
            <h2
              id="about-heading"
              className="about-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight"
            >
              Fast, Affordable Junk Removal{' '}
              <span className="text-primary-500">in United States</span>
            </h2>

            {/* Image — shown here only on sm/md, hidden on lg+ (no parallax needed) */}
            <div
              className="about-image-wrap relative w-full overflow-hidden lg:hidden order-2"
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

            {/* Body */}
            <div className="about-body flex flex-col gap-4 order-3">
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                Life can get cluttered, but your home or business shouldn&apos;t be!
                AP Clean Co Junk Removal is here to take the stress out of hauling away
                your unwanted items. Whether you&apos;re clearing out a garage full of old
                furniture, removing construction debris from a renovation project, or just
                need that broken appliance gone, our professional team handles it all.
              </p>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                We make junk removal easy. <strong className="text-primary-800 font-semibold">You point, we haul!</strong>{' '}
                Our licensed crew does all the heavy lifting, loading, and hauling, so you
                can sit back and relax. From single items to entire property cleanouts, no
                job is too big or small for us.
              </p>
            </div>

            {/* CTAs */}
            <div
              className="about-ctas flex flex-row flex-wrap gap-3 md:gap-4 order-4"
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
              <Button
                variant="secondary"
                size="md"
                className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl"
                aria-label="Get a free quote"
              >
                Get a free Quote
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
