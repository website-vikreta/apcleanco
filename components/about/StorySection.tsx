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
      id="story-section"
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
          <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed font-bold">
            We did not set out to start a cleaning company. We set out to fix a problem we could not ignore.
          </p>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            Like any good story, ours also started without a plan and just an idea, which we came across when we constantly visited our friend's house in New Jersey. We stepped into his garage, which, like many of our homes, had turned into a storage space of all sorts over the years. However, this was not the result of us being messy and disorganized. This is a result of “Life just moves fast," and none of us ever got to the garage to make it look like the rest of their home, where the car has not been in over years. Boxes that belonged to the previous move. Items to be donated "someday." Random items stored in places they did not belong. And tools, covered up by anything but tools.
          </p>

          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            In that moment, we both were thinking the same thing: that this is a solvable problem, not a small one, not a "spend a weekend and figure it out" kind of problem. The one that needed a structured approach using proper disposal and organizing and someone who actually cared about the outcome.
          </p>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            <i>Garages don't get cluttered because people are lazy. They get cluttered because nobody made it simple enough to fix. That's exactly what we do.</i>
          </p>

          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
            So we built <strong>AP cleanco</strong> to bridge that gap. A garage-first service designed to do the job properly and not just to haul things away, but sort, clean, organize, donate, and recycle responsibly. Every job is structured. Every space is left cleaner, more functional, and easier to maintain than we found it.
          </p>
        </div>
      </div>
    </section>
  )
}
