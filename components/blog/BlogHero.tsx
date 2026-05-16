'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function BlogHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.blog-hero-heading', { y: 60, opacity: 0, duration: 1.0 })
        .from('.blog-hero-sub', { y: 40, opacity: 0, duration: 0.85 }, '-=0.6')
        .from('.blog-hero-divider', { scaleX: 0, opacity: 0, duration: 0.6 }, '-=0.5')
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="blog-hero-heading"
      className="relative w-full min-h-105 md:min-h-130 flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div ref={bgRef} aria-hidden="true" className="absolute inset-0">
        <Image
          src="/services/garage-inspection.jpeg"
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
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-20 md:py-28">
        <h1
          id="blog-hero-heading"
          className="blog-hero-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          AP cleanco Blogs
        </h1>

        {/* Decorative divider */}
        <div
          aria-hidden="true"
          className="blog-hero-divider mx-auto mb-6 h-0.5 w-16 bg-primary-400 origin-left"
        />

        <p className="blog-hero-sub text-base sm:text-lg md:text-xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
          Stay updated with the latest garage cleaning tips, industry insights, and news from AP
          cleanco
        </p>
      </div>
    </section>
  )
}
