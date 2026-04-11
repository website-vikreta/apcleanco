'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/components/Logo'
import Button from '@/components/Button'

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services',   href: '#services' },
  { label: 'About Us',   href: '#about'    },
  { label: 'Blog',       href: '/blog'     },
  { label: 'FAQ',        href: '#faq'      },
]

const SOCIAL_LINKS = [
  { label: 'YouTube',   icon: 'bi-youtube',   href: '#' },
  { label: 'Instagram', icon: 'bi-instagram', href: '#' },
  { label: 'Facebook',  icon: 'bi-facebook',  href: '#' },
  { label: 'TikTok',    icon: 'bi-tiktok',    href: '#' },
  { label: 'LinkedIn',  icon: 'bi-linkedin',  href: '#' },
]

const LEGAL_LINKS = [
  { label: 'Terms and Conditions', href: '/terms'      },
  { label: 'Privacy Policy',       href: '/privacy'    },
  { label: 'Disclaimer',           href: '/disclaimer' },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer aria-label="Site footer">

      {/* ── 1. CTA Banner ───────────────────────────────────────────────────── */}
      <section
        className="bg-primary-900 w-full overflow-hidden"
        aria-labelledby="footer-cta-heading"
      >
        <div className="flex flex-col lg:flex-row lg:min-h-72">

          {/* Left: hero image — visible on lg+ only */}
          <div className="hidden lg:block relative w-[44%] shrink-0">
            <Image
              src="/hero-image.png"
              alt="ApcleanCo team performing professional junk removal"
              fill
              className="object-cover object-center"
              sizes="44vw"
            />
            {/* Subtle darkening overlay so image reads as background */}
            <div className="absolute inset-0 bg-primary-900/40" aria-hidden="true" />
          </div>

          {/* Vertical separator — lg+ only */}
          <div
            className="hidden lg:block w-1.25 bg-primary-500 shrink-0 self-stretch"
            aria-hidden="true"
          />

          {/* Right: CTA content — full width on mobile, flex-1 on desktop */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-16 lg:py-0">
            <div className="max-w-xl">
              <p className="text-accent-400 text-xs font-semibold tracking-widest uppercase mb-4">
                Hassle-Free Service
              </p>
              <h2
                id="footer-cta-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-5"
              >
                We make Junk Removal look Easy
              </h2>
              <Button variant="primary" size="md" className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl" icon={<i className="bi bi-arrow-right" aria-hidden="true" />} iconPosition="right">
                Get a Free Quote
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. Footer Content ───────────────────────────────────────────────── */}
      <section
        className="bg-white border-t border-neutral-200 w-full"
        aria-label="Footer information"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="footer-content-grid grid lg:flex grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-48 lg:gap-y-8">

            {/* ── Column 1: Logo + Contact ──────────────────────────────────── */}
            <div className="lg:col-span-1 flex lg:flex-1 items-start gap-6">
              {/* Logo — left; h-14 matches lg Button height, width auto from 643:218 viewBox */}
              <div className="shrink-0">
                <Logo className="h-10 w-auto" />
              </div>
              {/* Contact — right; flex-1 lets address expand and stay on one line */}
              <address className="not-italic flex-1 space-y-2 min-w-0">
                <a
                  href="tel:+15551234567"
                  className="block text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors whitespace-nowrap"
                  aria-label="Call ApcleanCo at (555) 123-4567"
                >
                  (555) 123-4567
                </a>
                <a
                  href="https://maps.google.com/?q=123+Clean+Street+Austin+TX+78701"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors whitespace-nowrap"
                  aria-label="ApcleanCo address at 123 Clean Street, Austin TX 78701, opens in Google Maps"
                >
                  123 Clean Street, Austin, TX 78701
                </a>
              </address>
            </div>

            {/* ── Column 2: Navigation ──────────────────────────────────────── */}
            <div className="flex items-start">
              <nav aria-label="Footer navigation">
                <h3 className="text-primary-900 font-bold text-xs tracking-widest uppercase mb-4">
                  Quick Links
                </h3>
                <ul className="flex flex-col gap-y-2.5" role="list">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="footer-nav-link flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-500 transition-colors"
                      >
                        <i className="footer-nav-arrow bi bi-arrow-right text-xs text-primary-400 transition-transform duration-150" aria-hidden="true" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* ── Column 3: Social + CTA ────────────────────────────────────── */}
            <div>
              <h3 className="text-primary-900 font-bold text-xs tracking-widest uppercase mb-3">
                Follow Us
              </h3>
              <ul
                className="flex flex-wrap gap-2 mb-5"
                role="list"
                aria-label="Social media links"
              >
                {SOCIAL_LINKS.map(({ label, icon, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow ApcleanCo on ${label}`}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-neutral-100 text-neutral-600 hover:bg-primary-500 hover:text-white transition-colors border border-neutral-200 hover:border-primary-500"
                    >
                      <i className={`bi ${icon} text-sm leading-none`} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" size="sm" icon={<i className="bi bi-calendar2-check" aria-hidden="true" />} iconPosition="left">
                Schedule Call
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Copyright Bar ────────────────────────────────────────────────── */}
      <div
        className="bg-primary-800 border-t border-primary-700 w-full"
        aria-label="Copyright information"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-primary-300">

            {/* Left: Dev credit */}
            <p className="text-center lg:text-left">
              Designed &amp; Developed by{' '}
              <a
                href="https://websitevikreta.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:text-accent-300 font-semibold underline underline-offset-2 transition-colors"
                aria-label="Website Vikreta — opens in a new tab"
              >
                Website Vikreta
              </a>
            </p>

            {/* Center: Copyright */}
            <p className="text-center text-white shrink-0">
              © 2026 | All rights reserved to ApcleanCo
            </p>

            {/* Right: Legal links */}
            <nav aria-label="Legal links">
              <ul
                className="flex flex-wrap items-center gap-x-1 gap-y-1 justify-center lg:justify-end"
                role="list"
              >
                {LEGAL_LINKS.map(({ label, href }, index) => (
                  <React.Fragment key={label}>
                    <li>
                      <Link
                        href={href}
                        className="text-primary-300 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                    {index < LEGAL_LINKS.length - 1 && (
                      <li aria-hidden="true" className="text-primary-600 select-none px-1">
                        ·
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </nav>

          </div>
        </div>
      </div>

    </footer>
  )
}
