'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function ClosingSection() {
  const sectionRef = useRef<HTMLSection>(null)

  useGSAP(
    () => {
      // Content appears on scroll
      gsap.from('.closing-content', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.closing-content',
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
      className="w-full bg-primary-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="closing-title"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="closing-content">
          <p
            id="closing-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 leading-relaxed"
          >
            Built for homeowners who value{' '}
            <span className="text-accent-600">clarity, cleanliness, and peace of mind.</span>
          </p>
          <p className="text-neutral-700 text-lg mt-6 md:mt-8 leading-relaxed">
            When your space is clear, your mind is clear. And that changes everything.
          </p>
        </div>
      </div>
    </section>
  )
}
