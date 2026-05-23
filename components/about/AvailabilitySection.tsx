'use client'

import React from 'react'
import Image from 'next/image'

export default function AvailabilitySection() {
  return (
    <section
      className="bg-white py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="availability-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Container: Two-column (image left, content right) on desktop ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* ── LEFT COLUMN: Hero Image (reordered on mobile via order) ──── */}
          <div className="relative w-full aspect-video lg:aspect-auto lg:h-full order-2 lg:order-1 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Image container with subtle border accent */}
              <div className="absolute inset-0 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200">
                <Image
                  src="/services/garage-inspection.jpeg"
                  alt="ApcleanCo team available on weekends - professional garage cleaning services"
                  fill
                  className="object-cover object-[50%]"
                  priority
                />
              </div>

              {/* Accent decoration (subtle depth) */}
              <div
                className="absolute -z-10 inset-0 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100"
                style={{
                  transform: 'translate(12px, 12px)',
                  opacity: 0.6,
                }}
              />
            </div>
          </div>

          {/* ── RIGHT COLUMN: Content ──────────────────────────────────────── */}
          <article className="flex flex-col gap-6 lg:gap-8 order-1 lg:order-2">

            {/* Availability Badge */}
            <div className="inline-flex w-fit">
              <span
                className="px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-600"
                role="status"
                aria-label="Availability status"
              >
                Available Friday, Saturday &amp; Sunday
              </span>
            </div>

            {/* Section Heading */}
            <header>
              <h2
                id="availability-heading"
                className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-primary-900 leading-tight"
              >
                Always Available When You Need Us
              </h2>
            </header>

            {/* Main Content - Split into logical paragraphs for readability */}
            <div className="space-y-5 text-lg md:text-lg lg:text-xl text-neutral-700 leading-relaxed">
              <p>
                We operate on weekends because that is when most people actually have time to deal with their garage. Friday through Sunday, we are on the ground in New Jersey and we make a point of being reachable throughout the job. If you want to walk through something, change a decision mid-clean, or just check in, we are there.{' '}
                <span className="font-semibold text-primary-900">
                  You are not handing your space over to strangers and hoping for the best.
                </span>
              </p>

              <p>
                That said, your presence is never required. If you need to step out, we handle it. If you want to be involved in every decision, we work with that too. Most customers land somewhere in between.
              </p>
            </div>

            {/* Optional: CTA or spacer (kept flexible for future) */}
            <div className="pt-4" />
          </article>
        </div>
      </div>
    </section>
  )
}
