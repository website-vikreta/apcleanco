'use client'

import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import flywheelData from '@/data/home/eco-flywheel.json'

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface Stage {
  id: number
  title: string
  description: string
  position: 'top' | 'left' | 'right' | 'bottom'
}

/**
 * EcoFlywheel Component
 * Circular infographic showing independent eco initiatives with GSAP animations
 */
export default function EcoFlywheel() {
  const sectionRef = useRef<HTMLElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const stagesRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Position map for circular layout
  const getPosition = (position: string) => {
    const positions: Record<string, string> = {
      top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
      left: 'top-1/2 left-0 -translate-y-1/2 -translate-x-1/2',
      right: 'top-1/2 right-0 -translate-y-1/2 translate-x-1/2',
      bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
    }
    return positions[position] || ''
  }

  useGSAP(
    () => {
      // Only animate if not reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      // Center graphic fade + scale in
      gsap.from(centerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      // Draw circular guideline (SVG stroke animation)
      const circleGuide = sectionRef.current?.querySelector('#circle-guide') as SVGCircleElement
      if (circleGuide) {
        const circumference = 2 * Math.PI * 80
        gsap.from(circleGuide, {
          strokeDashoffset: circumference,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Stagger stages appearing
      stagesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      })
    },
    { scope: sectionRef },
  )

  const handleStageHover = (id: number, isHover: boolean) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setHoveredId(isHover ? id : null)

    const el = stagesRef.current[id - 1]
    if (!el) return

    gsap.to(el, {
      scale: isHover ? 1.05 : 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Tint background
    const bg = el.querySelector('.stage-bg')
    if (bg) {
      gsap.to(bg, {
        backgroundColor: isHover ? 'rgba(31, 90, 68, 0.08)' : 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // Icon subtle rotation
    const icon = el.querySelector('.stage-icon')
    if (icon) {
      gsap.to(icon, {
        rotation: isHover ? 8 : 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50"
      aria-labelledby="eco-flywheel-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-14 lg:mb-16">
          <h2
            id="eco-flywheel-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight mb-3 md:mb-4"
          >
            {flywheelData.title}
          </h2>
          <p className="text-base md:text-lg text-neutral-700 max-w-2xl mx-auto">
            {flywheelData.subtitle}
          </p>
        </div>

        {/* Circular layout: desktop/tablet */}
        <div className="hidden sm:flex justify-center items-center min-h-[600px] lg:min-h-[700px] relative">
          {/* SVG: Subtle circular guideline */}
          <svg
            className="absolute inset-0 w-full h-full max-w-md lg:max-w-lg mx-auto"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle
              id="circle-guide"
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="502"
              strokeDashoffset="502"
              className="text-primary-300 opacity-30"
            />
          </svg>

          {/* Center visual */}
          <div
            ref={centerRef}
            className="absolute inset-1/2 w-32 h-32 lg:w-40 lg:h-40 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Center: leaf + globe concept */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-15" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl lg:text-5xl">
                🌍
              </div>
            </div>
          </div>

          {/* Stages: positioned around circle */}
          {(flywheelData.stages as Stage[]).map((stage, idx) => (
            <div
              key={stage.id}
              ref={(el) => {
                if (el) stagesRef.current[idx] = el
              }}
              className={`absolute w-40 lg:w-48 ${getPosition(stage.position)}`}
            >
              <div
                className="stage-bg p-5 lg:p-6 rounded-lg border border-primary-200 transition-all cursor-pointer"
                onMouseEnter={() => handleStageHover(stage.id, true)}
                onMouseLeave={() => handleStageHover(stage.id, false)}
                role="region"
                aria-label={`${stage.title}: ${stage.description}`}
              >
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white font-bold text-lg mb-3">
                  {stage.id}
                </div>

                {/* Icon */}
                <div className="stage-icon text-4xl mb-2" aria-hidden="true">
                  {getStageIcon(stage.id)}
                </div>

                {/* Title */}
                <h3 className="font-bold text-primary-900 text-sm lg:text-base leading-tight mb-2">
                  {stage.title}
                </h3>

                {/* Description */}
                <p className="text-xs lg:text-sm text-neutral-700 leading-snug">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stacked layout: mobile */}
        <div className="sm:hidden space-y-4">
          {(flywheelData.stages as Stage[]).map((stage) => (
            <div
              key={stage.id}
              className="p-5 rounded-lg border border-primary-200 bg-white"
              role="region"
              aria-label={`${stage.title}: ${stage.description}`}
            >
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-500 text-white font-bold text-base mb-3">
                {stage.id}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-2" aria-hidden="true">
                {getStageIcon(stage.id)}
              </div>

              {/* Title */}
              <h3 className="font-bold text-primary-900 text-base mb-2">
                {stage.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-700 leading-snug">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Get emoji icon for each stage
 */
function getStageIcon(id: number): string {
  const icons: Record<number, string> = {
    1: '♻️',  // Revive
    2: '🔍',  // Sort
    3: '🎁',  // Donate/Recycle
    4: '🌱', // Plant
  }
  return icons[id] || '✨'
}
