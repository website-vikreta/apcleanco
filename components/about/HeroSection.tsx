'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Button from '../Button'

gsap.registerPlugin(useGSAP)

export default function HeroSection() {
  const sectionRef = useRef<HTMLSection>(null)

  useGSAP(
    () => {
      // Fade in label
      gsap.from('.hero-label', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      // Fade in heading with slight upward motion
      gsap.from('.hero-heading', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.08,
      })

      // Fade in subheading
      gsap.from('.hero-subheading', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.16,
      })

      // Fade in CTAs
      gsap.from('.hero-ctas', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.24,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-neutral-50"
      aria-labelledby="hero-heading"
    >
      {/* Minimal accent line — top right corner */}
      <div
        className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-l from-accent-400 to-transparent"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <p className="hero-label text-xs md:text-sm font-semibold tracking-widest uppercase text-primary-600 mb-4">
            About Our Company
          </p>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="hero-heading text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 leading-tight tracking-tight mb-6"
          >
            About <span className="text-accent-600">AP Cleanco</span>
          </h1>

          {/* Divider */}
          <div
            className="mx-auto mb-6 h-0.5 w-12 bg-accent-400"
            aria-hidden="true"
          />

          {/* Subheading */}
          <p className="hero-subheading text-base sm:text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            Two founders, one mission: make junk removal simple, affordable, and stress-free.
            Discover the story behind AP Cleanco.
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
            role="group"
            aria-label="Hero section call to action buttons"
          >
            <Button
              variant="primary"
              size="lg"
              icon={<i className="bi bi-calendar-check text-base" aria-hidden="true" />}
              iconPosition="left"
              magnetic
            >
              Book a Free Call
            </Button>
            <Button
              variant="outlined"
              size="lg"
              className="border-primary-500 text-primary-500 hover:bg-primary-50"
              icon={<i className="bi bi-arrow-down text-base" aria-hidden="true" />}
              iconPosition="right"
            >
              Scroll to Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
