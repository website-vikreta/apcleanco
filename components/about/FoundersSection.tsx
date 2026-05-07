'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface FounderCardProps {
  name: string
  quote: string
  description: string
  linkedIn: string
  instagram?: string
  image: string
}

const FounderCard = ({ name, quote, description, linkedIn, instagram, image }: FounderCardProps) => {
  return (
    <div className="founder-card flex flex-col gap-4">
      {/* Founder image */}
      <img
        src={image}
        alt={`${name}, ApcleanCo founder`}
        className="w-full aspect-square rounded-lg overflow-hidden founder-avatar object-cover"
        loading="lazy"
      />

      {/* Name */}
      <h3 className="text-2xl font-bold text-primary-900">{name}</h3>

      {/* Quote */}
      <p className="text-lg italic text-primary-600 font-medium leading-relaxed">&quot;{quote}&quot;</p>

      {/* Description */}
      <p className="text-neutral-700 text-base leading-relaxed">{description}</p>
    </div>
  )
}

export default function FoundersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Heading appears
      gsap.from('.founders-heading', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.founders-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Founder cards stagger in
      gsap.from('.founder-card', {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.founders-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Avatar hover effect — slight zoom on avatar
      document.querySelectorAll('.founder-avatar').forEach((avatar) => {
        avatar.addEventListener('mouseenter', () => {
          gsap.to(avatar, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
        })
        avatar.addEventListener('mouseleave', () => {
          gsap.to(avatar, { scale: 1, duration: 0.3, ease: 'power2.out' })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="w-full bg-neutral-50 py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="founders-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          id="founders-heading"
          className="founders-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-4 tracking-tight"
        >
          Meet the Founders
        </h2>
        <p className="text-neutral-700 text-lg mb-12 md:mb-16 max-w-2xl">
          Two entrepreneurs driven by a simple belief: cleanliness and clarity transform lives.
        </p>

        {/* Founders Grid */}
        <div className="founders-grid grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          <FounderCard
            name="Parth Dharia"
            quote="Your space should reflect your goals, not your stress."
            description="Operations and strategy drive. Parth ensures every project runs flawlessly, from the first quote to the final cleanup. Relentless about quality and customer satisfaction."
            linkedIn="https://linkedin.com/in/parth-dharia"
            instagram="https://instagram.com/parth_dharia"
            image="/team/parth.png"
          />

          <FounderCard
            name="Arvind Dhankhad"
            quote="We're not just removing junk—we're removing burden."
            description="Creative vision and growth. Arvind leads the brand, community, and innovation. Passionate about building genuine connections and reimagining what garage cleaning can be."
            linkedIn="https://linkedin.com/in/arvind-dhankhad"
            instagram="https://instagram.com/arvind_dhankhad"
            image="/team/arvind.png"
          />
        </div>
      </div>
    </section>
  )
}
