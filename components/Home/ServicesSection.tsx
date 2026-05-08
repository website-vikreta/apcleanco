'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../Button'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: 1, title: 'Garage Clean-Out',             image: '/services/garage-after.jpeg', anchor: 'garage-cleanouts' },
  { id: 2, title: 'Garage Deep Cleaning',         image: '/services/deepcleaning-after.jpeg', anchor: 'deep-cleaning' },
  { id: 3, title: 'Garage Organization',          image: '/services/garage-organization-after.jpeg', anchor: 'garage-organisation' },
  { id: 4, title: 'Donation & Recycling Support', image: '/services/recycle.jpeg', anchor: '' },
]

// ── Service Row ───────────────────────────────────────────────────────────────

function ServiceRow({ title, image, index }: { title: string; image: string; index: number }) {
  const rowRef    = useRef<HTMLElement>(null)
  const imgRef    = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef  = useRef<HTMLHeadingElement>(null)

  const { contextSafe } = useGSAP({ scope: rowRef })

  const handleMouseEnter = contextSafe(() => {
    gsap.to(imgRef.current,   { scale: 1.06, duration: 0.5, ease: 'power2.out' })
    gsap.to(overlayRef.current, { opacity: 0.35, duration: 0.35, ease: 'power2.out' })
    gsap.to(titleRef.current, { x: 6, duration: 0.2, ease: 'power2.out' })
  })

  const handleMouseLeave = contextSafe(() => {
    gsap.to(imgRef.current,   { scale: 1, duration: 0.45, ease: 'power2.out' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(titleRef.current, { x: 0, duration: 0.2, ease: 'power2.out' })
  })

  return (
    <article
      ref={rowRef}
      className="service-card group flex items-stretch border-b border-neutral-200 last:border-0 cursor-pointer"
      aria-label={title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image panel — 40% width, fixed height */}
      <div className="relative w-2/5 h-36 md:h-44 shrink-0 overflow-hidden">
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <Image
            src={image}
            alt={`${title} service`}
            fill
            sizes="(max-width: 768px) 40vw, 25vw"
            className="object-cover"
          />
        </div>
        {/* Hover overlay */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="absolute inset-0 bg-primary-900 opacity-0 will-change-[opacity]"
        />
      </div>

      {/* Text panel */}
      <div className="flex-1 flex flex-col justify-center gap-2 px-6 md:px-8 py-5">
        <span className="text-neutral-300 text-xs font-semibold tabular-nums select-none" aria-hidden="true">
          0{index + 1}
        </span>
        <h3
          ref={titleRef}
          className="text-primary-900 font-bold text-lg md:text-xl lg:text-2xl leading-snug tracking-tight will-change-transform"
        >
          {title}
        </h3>
        <div aria-hidden="true" className="w-6 h-0.5 bg-primary-500 rounded-full mt-1 group-hover:w-10 transition-all duration-300" />
      </div>

      {/* Arrow */}
      <div className="flex items-center pr-6 shrink-0">
        <i
          className="bi bi-arrow-right text-neutral-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200"
          aria-hidden="true"
        />
      </div>
    </article>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.services-heading', {
        y: 24, opacity: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-heading', start: 'top 85%', toggleActions: 'play none none none' },
      })

      gsap.from('.service-card', {
        y: 16, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.services-list', start: 'top 82%', toggleActions: 'play none none none' },
      })

      gsap.from('.services-cta', {
        y: 12, opacity: 0, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: '.services-cta', start: 'top 92%', toggleActions: 'play none none none' },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-50 py-14 md:py-18 lg:py-22 px-4 sm:px-6 lg:px-8"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Two-column layout: heading left, list right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left — heading + CTA */}
          <div className="services-heading lg:col-span-2 lg:sticky lg:top-32">
            <h2
              id="services-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight leading-tight mb-5"
            >
              Everything Your Garage Needs
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed mb-8">
              From full clean-outs to deep cleaning and organization — every aspect of restoring your garage, handled.
            </p>
            <div className="services-cta">
              <Link href="/services">
                <Button
                  variant="primary"
                  size="md"
                  icon={<i className="bi bi-arrow-right leading-none" aria-hidden="true" />}
                  iconPosition="right"
                  aria-label="View all our garage services"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>

          {/* Right — service rows */}
          <div
            className="services-list lg:col-span-3"
            role="list"
            aria-label="Our services"
          >
            {SERVICES.map((service, i) => (
              <Link
                key={service.id}
                href={service.anchor ? `/services#${service.anchor}` : '/services'}
                role="listitem"
                className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded"
              >
                <ServiceRow title={service.title} image={service.image} index={i} />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

