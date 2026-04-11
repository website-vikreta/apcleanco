import React from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import ReviewsCarousel from './ReviewsCarousel'

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { label: 'Garage Cleanouts',  href: '/#services' },
  { label: 'Junk Removal',      href: '/#services' },
  { label: 'Debris Removal',    href: '/#services' },
  { label: 'Furniture Removal', href: '/#services' },
  { label: 'Deep Cleaning',     href: '/#services' },
  { label: 'Donation Drop-Off', href: '/#services' },
]

// ── Sidebar ───────────────────────────────────────────────────────────────────

export default function BlogSidebar() {
  return (
    <aside
      aria-label="Blog sidebar"
      className="flex flex-col gap-8"
    >
      {/* ── 1. Our Services ─────────────────────────────────────────────────── */}
      <div className="border border-neutral-200 bg-white p-6">
        <h2 className="text-base font-semibold text-primary-900 uppercase tracking-widest mb-4">
          Our Services
        </h2>
        <nav aria-label="Service links">
          <ul className="flex flex-col" role="list">
            {SERVICES.map((service) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="group flex items-center gap-2 py-1.5 text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 px-2 -mx-2 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
                >
                  <i
                    className="bi bi-arrow-right-short text-primary-300 text-base shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary-500"
                    aria-hidden="true"
                  />
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── 2. Reviews carousel ──────────────────────────────────────────── */}
      <div className="border border-neutral-200 bg-white p-6">
        <h2 className="text-base font-semibold text-primary-900 uppercase tracking-widest mb-5">
          What Clients Say
        </h2>
        <ReviewsCarousel />
      </div>

      {/* ── 3. Sticky CTA Card ──────────────────────────────────────────────── */}
      {/*
          sticky is applied here to the card itself, within the parent
          sidebar flex column. The sidebar sits inside the grid which
          has align-items: start, so sticky naturally stops when the
          parent column ends — preventing footer overlap.
      */}
      <div
        className="group sticky top-28 bg-primary-600 hover:bg-primary-700 p-6 text-white transition-colors duration-200"
        aria-label="Consultation booking call to action"
      >
        {/* Decorative accent bar */}
        <div aria-hidden="true" className="w-8 h-0.5 bg-accent-400 mb-5 transition-all duration-300 group-hover:w-14 group-hover:bg-accent-300" />

        <h2 className="text-xl font-bold text-white leading-snug mb-3">
          Book a Free Consultation
        </h2>
        <p className="text-primary-100 text-sm leading-relaxed mb-6">
          Ready to reclaim your garage? Our team is standing by with a no-obligation quote — same
          day in most cases.
        </p>

        <Link
          href="https://calendly.com/apcleanco"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a free consultation — opens in new tab"
          className="block"
        >
          <Button
            variant="white"
            size="md"
            className="w-full justify-center"
          >
            Book Now
          </Button>
        </Link>

        {/* Trust indicators */}
        <ul
          className="flex flex-col gap-2 mt-5"
          aria-label="Service guarantees"
          role="list"
        >
          {['No commitment required', 'Same-day availability', 'Eco-friendly disposal'].map(
            (item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-primary-100">
                <i className="bi bi-check-circle-fill text-accent-400 text-sm shrink-0" aria-hidden="true" />
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    </aside>
  )
}
