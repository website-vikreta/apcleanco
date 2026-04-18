'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ValueProps {
  title: string
  description: string
  icon: string
}

const ValueCard = ({ title, description, icon }: ValueProps) => {
  return (
    <div className="value-card flex flex-col gap-3 p-6 md:p-8 bg-white rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors duration-300">
      <div
        className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 text-lg"
        aria-hidden="true"
      >
        <i className={`bi ${icon}`} />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-primary-900">{title}</h3>
      <p className="text-neutral-700 leading-relaxed">{description}</p>
    </div>
  )
}

export default function ValuesSection() {
  const sectionRef = useRef<HTMLSection>(null)

  useGSAP(
    () => {
      // Heading appears
      gsap.from('.values-heading', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Value cards stagger in
      gsap.from('.value-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.values-grid',
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
      className="w-full bg-white py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="values-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <h2
            id="values-heading"
            className="values-heading text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-4 tracking-tight"
          >
            Our Core Values
          </h2>
          <p className="text-neutral-700 text-lg max-w-2xl">
            These principles guide every decision we make and every project we undertake.
          </p>
        </div>

        {/* Values Grid */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ValueCard
            title="Integrity"
            description="Honest pricing, no hidden fees. We tell you exactly what we'll do and how much it costs. Your trust is everything."
            icon="bi-check-circle-fill"
          />

          <ValueCard
            title="Excellence"
            description="Every job matters. Whether it's a single item or a full estate cleanout, we bring our best effort and attention to detail."
            icon="bi-star-fill"
          />

          <ValueCard
            title="Speed"
            description="Life is busy. We're fast and reliable so you can move on. Book today, get started tomorrow if you need us."
            icon="bi-lightning-fill"
          />

          <ValueCard
            title="Respect"
            description="Your home is sacred. We treat your space with care, respect your privacy, and leave everything clean and organized."
            icon="bi-hand-thumbs-up-fill"
          />

          <ValueCard
            title="Community"
            description="We give back. Through donations, local partnerships, and supporting causes that matter, we're invested in our community."
            icon="bi-heart-fill"
          />

          <ValueCard
            title="Sustainability"
            description="Waste shouldn't be wasted. We donate, recycle, and responsibly dispose of items whenever possible."
            icon="bi-leaf-fill"
          />
        </div>
      </div>
    </section>
  )
}
