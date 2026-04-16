'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../Button'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: 1, title: 'Junk Removal',       image: '/hero-image.png' },
  { id: 2, title: 'Debris Removal',     image: '/hero-image.png' },
  { id: 3, title: 'Furniture Removal',  image: '/hero-image.png' },
  { id: 4, title: 'Garage Cleanouts',   image: '/hero-image.png' },
] as const

// ── Service Card ──────────────────────────────────────────────────────────────

function ServiceCard({ title, image }: { title: string; image: string }) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const imgRef   = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP({ scope: cardRef })

  const handleMouseEnter = contextSafe(() => {
    gsap.to(imgRef.current, {
      scale: 1.25,
      rotation: 10,
      duration: 0.55,
      ease: 'power2.out',
    })
  })

  const handleMouseLeave = contextSafe(() => {
    gsap.to(imgRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.45)',
    })
  })

  return (
    <article
      ref={cardRef}
      className="group relative flex flex-col cursor-default"
      aria-label={title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image container — overflow hidden to clip zoom + rotation */}
      <div className="relative w-full aspect-4/3 overflow-hidden">
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <Image
            src={image}
            alt={`${title} service`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
          {/* Subtle top-to-transparent overlay for readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-primary-900/30 via-transparent to-transparent"
          />
        </div>
      </div>

      {/* Title box — overlaps image bottom by ~20px */}
      <div className="relative z-10 -mt-5 mx-4 bg-white border border-neutral-200 px-5 py-4 text-center">
        <h3 className="text-primary-900 font-semibold text-base lg:text-lg leading-snug tracking-tight">
          {title}
        </h3>
      </div>
    </article>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Heading fade-up
      gsap.from('.services-heading', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Cards stagger fade-up
      gsap.from('.service-card', {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // CTA fade-up
      gsap.from('.services-cta', {
        y: 20,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-cta',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="services-heading text-center mb-10 md:mb-14">
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight"
          >
            Big or Small,{' '}
            <span className="text-primary-500">We Haul it All</span>
          </h2>
        </div>

        {/* Cards grid: 2 cols on sm/md, 4 cols on lg+ */}
        <div
          className="services-grid grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          role="list"
          aria-label="Our services"
        >
          {SERVICES.map((service) => (
            <div key={service.id} className="service-card" role="listitem">
              <ServiceCard title={service.title} image={service.image} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="services-cta flex justify-center mt-12 md:mt-14">
          <Button
            variant="primary"
            size="md"
            className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl"
            icon={<i className="bi bi-arrow-right text-base lg:text-lg leading-none" aria-hidden="true" />}
            iconPosition="right"
            aria-label="Explore all our services"
          >
            Explore all our Services
          </Button>
        </div>

      </div>
    </section>
  )
}
