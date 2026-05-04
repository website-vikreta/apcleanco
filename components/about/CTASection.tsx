'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../Button'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Content appears on scroll
      gsap.from('.cta-heading', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-heading',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.cta-subheading', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        delay: 0.1,
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      gsap.from('.cta-button', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.cta-content',
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
      className="w-full bg-neutral-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="cta-content flex flex-col gap-6 md:gap-8 text-center p-10 md:p-14 lg:p-16 bg-white rounded-lg border border-neutral-200"
        >
          <h2
            id="cta-heading"
            className="cta-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 tracking-tight leading-tight"
          >
            Ready to Transform Your Space?
          </h2>

          <p className="cta-subheading text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Schedule your free consultation today. We'll assess your project, answer all your
            questions, and give you a transparent quote—no pressure, no hidden fees.
          </p>

          <div className="cta-button flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <Button
              variant="primary"
              size="lg"
              href="https://calendly.com/parthdharia99/30min"
              target="_blank"
              rel="noopener noreferrer"
              icon={<i className="bi bi-calendar2-check text-xl" aria-hidden="true" />}
              iconPosition="left"
              magnetic
              aria-label="Book a free consultation — opens in a new tab"
            >
              Book a Free Slot
            </Button>
            <a
              href="mailto:apcleancosupport@gmail.com"
              className="inline-flex"
              aria-label="Email us at apcleancosupport@gmail.com"
            >
              <Button
                variant="outlined"
                size="lg"
                className="border-primary-500 text-primary-500 hover:bg-primary-50"
                icon={<i className="bi bi-chat-dots text-xl" aria-hidden="true" />}
                iconPosition="right"
              >
                Chat with Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
