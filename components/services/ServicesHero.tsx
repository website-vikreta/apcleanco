'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.services-hero-heading', { y: 60, opacity: 0, duration: 1.0 })
        .from('.services-hero-divider', { scaleX: 0, opacity: 0, duration: 0.6 }, '-=0.6')
        .from('.services-hero-sub', { y: 40, opacity: 0, duration: 0.85 }, '-=0.5')
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-hero-heading"
      className="relative w-full min-h-105 md:min-h-130 flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/hero-image.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center]"
        />
        {/* Primary-color overlay for readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-primary-900/90"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-20 md:py-28">
        <h1
          id="services-hero-heading"
          className="services-hero-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          Our <span className="text-primary-400">Professional Services</span>
        </h1>

        {/* Decorative divider */}
        <div
          aria-hidden="true"
          className="services-hero-divider mx-auto mb-6 h-0.5 w-16 bg-primary-400 origin-left"
        />

        <p className="services-hero-sub text-base sm:text-lg md:text-xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
          Professional garage cleanouts, deep cleaning, and organization solutions designed to
          transform your space. Discover how AP cleanco can declutter, organize, and revitalize
          your garage.
        </p>
      </div>
    </section>
  )
}
