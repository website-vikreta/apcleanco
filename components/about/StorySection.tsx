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
            AP cleanco started from something we kept seeing everywhere. No matter the house, the garage was often the same: cluttered, unorganized, and not even usable for what it was meant for. In many cases, people could not even park their car inside. Everything just gets pushed there over time: boxes, old items, and things people plan to &quot;deal with later.&quot; Eventually, the space becomes hard to use and easy to ignore.
          </p>

          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            For us, that never felt right. We&apos;ve always been the kind of people who need things to be clean and organized. If a space is messy, it stays on our mind until it&apos;s fixed. So instead of ignoring the problem, we decided to build something around it.
          </p>

          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            AP cleanco focuses on garage clean-out, garage deep cleaning, and garage organization to turn cluttered garages into clean, functional, and usable spaces. We also help with donation drop-off, recycling, and responsible item handling so things do not get thrown away if they still have value. The goal is simple: to help people take back their garage space and make it cleaner, more functional, and easier to manage.
          </p>
        </div>
      </div>
    </section>
  )
}
