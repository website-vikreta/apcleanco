'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface TrustItemProps {
  icon: string // Bootstrap icon class name (e.g., 'bi-shield-check')
  text: string // Trust point text
  index: number // For stagger timing
}

export default function TrustItem({ icon, text, index }: TrustItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Staggered fade-up on scroll
      gsap.from(itemRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: index * 0.12, // Stagger by 120ms per item
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: itemRef },
  )

  // Hover animation: scale + background tint
  const handleMouseEnter = () => {
    gsap.to(itemRef.current, {
      scale: 1.02,
      backgroundColor: 'rgba(37, 99, 235, 0.05)', // subtle primary blue tint
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, {
      scale: 1,
      backgroundColor: 'rgba(37, 99, 235, 0)',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={itemRef}
      className="flex flex-col items-start gap-4 p-6 md:p-7 rounded-lg border border-neutral-200 bg-white transition-all duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="listitem"
      aria-label={text}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-md bg-primary-100"
        aria-hidden="true"
      >
        <i className={`${icon} text-primary-500 text-xl leading-none`} />
      </div>

      {/* Text */}
      <p className="text-neutral-700 text-sm md:text-base font-medium leading-relaxed">
        {text}
      </p>
    </div>
  )
}
