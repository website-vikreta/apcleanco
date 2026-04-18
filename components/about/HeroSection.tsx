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
      // Fade in heading with slight upward motion
      gsap.from('.hero-heading', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })

      // Fade in subheading
      gsap.from('.hero-subheading', {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.15,
      })

      // Fade in CTAs
      gsap.from('.hero-ctas', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.25,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0b1f17 0%, #1f5a44 100%)',
      }}
      aria-labelledby="hero-heading"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #caa33a 0%, transparent 50%), radial-gradient(circle at 80% 80%, #1f5a44 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1
            id="hero-heading"
            className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6 md:mb-8"
          >
            More Than Cleaning.{' '}
            <span className="text-accent-400">We Create Space That Works.</span>
          </h1>

          {/* Subheading */}
          <p className="hero-subheading text-lg sm:text-xl text-neutral-100 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
            Premium junk removal and garage cleanouts designed for homeowners who value clarity,
            cleanliness, and peace of mind.
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
              icon={<i className="bi bi-calendar-check text-xl" aria-hidden="true" />}
              iconPosition="left"
              magnetic
            >
              Book a Free Call
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="text-primary-100! border-primary-100/40 hover:bg-primary-100/10"
              icon={<i className="bi bi-arrow-down-right text-xl" aria-hidden="true" />}
              iconPosition="right"
            >
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
