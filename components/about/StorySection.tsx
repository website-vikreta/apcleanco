'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Heading appears on scroll
      gsap.from('.story-heading', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Body paragraphs stagger in
      gsap.from('.story-body p', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.story-body',
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
      className="w-full bg-white py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="story-heading"
    >
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h2
          id="story-heading"
          className="story-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-8 md:mb-12 tracking-tight leading-tight"
        >
          Our Story
        </h2>

        {/* Body */}
        <div className="story-body space-y-6 md:space-y-8">
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            AP Cleanco was born from frustration. Parth and Arvind watched friends and family
            struggle with cluttered garages, overflowing storage, and the mental weight of junk
            they didn&apos;t know how to remove. Professional services were either absent, expensive,
            or unreliable. So in 2023, they decided to solve the problem themselves.
          </p>

          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            Starting with just a van and a vision, they began taking on every project—small apartment
            cleanouts, massive garage transformations, construction debris removal. Every job taught
            them something new about what homeowners truly need: honesty, speed, fair pricing, and
            respect for their space. No hidden fees. No excuses. Just professionals who care.
          </p>

          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            Today, AP Cleanco has become the trusted choice for junk removal across the region.
            But the mission hasn&apos;t changed: make it simple, affordable, and stress-free to reclaim
            your space. Because when your environment is clear, your mind is clear. And that makes all
            the difference.
          </p>
        </div>
      </div>
    </section>
  )
}
