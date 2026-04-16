'use client'

import React, { useRef, useState } from 'react'
import pricingData from '@/data/pricing.json'
import Button from '@/components/Button'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ── Types ─────────────────────────────────────────────────────────────────────

export type GarageSize = '1_car' | '2_car' | '3_car'

const GARAGE_SIZES: { value: GarageSize; label: string }[] = [
  { value: '1_car', label: '1 Car Garage' },
  { value: '2_car', label: '2 Car Garage' },
  { value: '3_car', label: '3 Car Garage' },
]

const CALENDLY_URL = 'https://calendly.com/apcleanco'

// ── Component ─────────────────────────────────────────────────────────────────

export const PricingTable: React.FC = () => {
  const [size, setSize] = useState<GarageSize>('2_car')
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleSizeChange = (newSize: GarageSize) => {
    setSize(newSize)
  }

  useGSAP(
    () => {
      gsap.from('.pricing-card', {
        y: 48,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <div ref={sectionRef} className="w-full">

      {/* ── Garage Size Selector ────────────────────────────────────────────── */}
      <div className="flex justify-center mb-12 px-4 sm:px-0">
        <fieldset className="w-full sm:w-auto">
          <legend className="sr-only">Select your garage size</legend>
          <div className="flex gap-3 w-full sm:w-auto sm:inline-flex flex-wrap justify-center" role="group">
            {GARAGE_SIZES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => handleSizeChange(s.value)}
                aria-pressed={size === s.value}
                className={`
                  px-6 sm:px-6 py-3 rounded-full text-sm font-semibold tracking-tight
                  transition-all duration-300 ease-out
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
                  ${size === s.value
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:scale-102 hover:shadow-md hover:shadow-neutral-200/50'
                  }
                `}
              >
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.label.replace(' Garage', '')}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ── Plan Cards ──────────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 items-stretch"
        role="list"
        aria-label="Available pricing plans"
      >
        {pricingData.plans.map((plan) => {
          const isRecommended = plan.featured
          const price = plan.pricing[size]
          const currentSizeLabel = GARAGE_SIZES.find((s) => s.value === size)?.label ?? ''

          return (
            <article
              key={plan.id}
              role="listitem"
              className={`
                pricing-card flex flex-col
                ${isRecommended
                  ? 'bg-linear-to-br from-primary-600 to-primary-700 z-10 order-first md:order-0'
                  : plan.id === 'gold'
                    ? 'bg-primary-50 border border-primary-200'
                    : 'bg-white border border-neutral-200'
                }
              `}
              aria-label={`${plan.name} plan — $${price} for a ${currentSizeLabel}`}
            >
              {/* ── Top bar: subtle badge (recommended) or invisible spacer ───── */}
              <div
                className={`
                  py-2.5 text-xs font-extrabold tracking-[0.18em] uppercase text-center
                  ${isRecommended
                    ? 'bg-white/20 text-white'
                    : 'text-transparent select-none'
                  }
                `}
                aria-hidden={!isRecommended || undefined}
                aria-label={isRecommended ? 'Recommended plan' : undefined}
              >
                {isRecommended ? '★  Recommended' : '\u00A0'}
              </div>

              <div className="p-8 lg:p-10 flex flex-col flex-1">

                {/* Plan name */}
                <h3 className={`
                  text-xs font-extrabold tracking-[0.25em] uppercase mb-5
                  ${isRecommended ? 'text-white' : 'text-primary-500'}
                `}>
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-8">
                  <div className={`flex items-end gap-1 leading-none ${isRecommended ? 'text-white' : 'text-primary-900'}`}>
                    <span className="text-xl font-semibold mb-1.5" aria-hidden="true">$</span>
                    <span
                      key={`price-${plan.id}-${size}`}
                      className="text-7xl font-black tabular-nums leading-none animate-fade-in"
                      aria-live="polite"
                      aria-label={`$${price}`}
                    >
                      {price}
                    </span>
                  </div>
                  <p className={`text-xs mt-2.5 tracking-wide ${isRecommended ? 'text-white/50' : 'text-neutral-400'}`}>
                    one-time flat-rate
                  </p>
                </div>

                {/* Divider */}
                <div className={`h-px mb-8 ${isRecommended ? 'bg-white/10' : 'bg-neutral-200'}`} aria-hidden="true" />

                {/* Features */}
                <ul
                  className="space-y-3.5 flex-1 mb-10"
                  aria-label={`${plan.name} plan features`}
                >
                  {plan.description.map((feat, i) => {
                    const isInherit = feat.toLowerCase().startsWith('all ')
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={`
                            shrink-0 mt-0.5 leading-none
                            ${isInherit
                              ? `text-xs font-bold tracking-widest ${isRecommended ? 'text-white/60' : 'text-primary-300'}`
                              : isRecommended ? 'text-white' : 'text-primary-500'
                            }
                          `}
                          aria-hidden="true"
                        >
                          {isInherit
                            ? '↳'
                            : <i className="bi bi-check2 text-sm" />
                          }
                        </span>
                        <span className={`
                          text-sm leading-relaxed
                          ${isInherit
                            ? (isRecommended ? 'text-white/50 italic' : 'text-neutral-400 italic')
                            : (isRecommended ? 'text-white/90' : 'text-neutral-700')
                          }
                        `}>
                          {feat}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                {/* CTA */}
                <Button
                  variant={isRecommended ? 'accent' : 'secondary'}
                  size="md"
                  className="w-full justify-center"
                  aria-label={`Book ${plan.name} plan — $${price} for a ${currentSizeLabel}`}
                  onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')}
                >
                  Book This Plan
                </Button>

              </div>
            </article>
          )
        })}
      </div>

      {/* ── Fine print ──────────────────────────────────────────────────────── */}
      <p className="text-center text-xs text-neutral-400 mt-8 tracking-wide">
        Flat-rate, one-time service. No hidden fees. Price may vary based on garage condition.
      </p>

    </div>
  )
}
