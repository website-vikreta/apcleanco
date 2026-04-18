'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLSection>(null)

  useGSAP(
    () => {
      // Heading appears
      gsap.from('.vm-heading', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.vm-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Vision and Mission cards stagger in
      gsap.from('.vm-card', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.vm-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="w-full bg-neutral-50 py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="vm-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          id="vm-heading"
          className="vm-heading text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-12 md:mb-16 tracking-tight"
        >
          Our Vision & Mission
        </h2>

        {/* Grid */}
        <div className="vm-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Vision Card */}
          <div
            className="vm-card flex flex-col gap-4 p-8 md:p-10 bg-white rounded-lg border border-neutral-200"
            role="region"
            aria-labelledby="vision-title"
          >
            <div
              className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center text-white text-xl"
              aria-hidden="true"
            >
              <i className="bi bi-eye-fill" />
            </div>
            <h3 id="vision-title" className="text-2xl md:text-3xl font-bold text-primary-900">
              Our Vision
            </h3>
            <p className="text-neutral-700 text-lg leading-relaxed">
              To be the most trusted, customer-centric junk removal company in North America—where
              every homeowner knows they can count on us to transform their space with integrity,
              speed, and genuine care.
            </p>
          </div>

          {/* Mission Card */}
          <div
            className="vm-card flex flex-col gap-4 p-8 md:p-10 bg-white rounded-lg border border-neutral-200"
            role="region"
            aria-labelledby="mission-title"
          >
            <div
              className="w-12 h-12 rounded-lg bg-accent-500 flex items-center justify-center text-neutral-900 text-xl"
              aria-hidden="true"
            >
              <i className="bi bi-flag-fill" />
            </div>
            <h3 id="mission-title" className="text-2xl md:text-3xl font-bold text-primary-900">
              Our Mission
            </h3>
            <p className="text-neutral-700 text-lg leading-relaxed">
              Make junk removal simple, affordable, and stress-free. We handle the heavy lifting so
              you can reclaim your space, your time, and your peace of mind. Honest pricing. No
              surprises. Professional service, every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
