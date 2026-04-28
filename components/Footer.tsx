'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/components/Logo'
import Button from '@/components/Button'

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services',   href: '#services' },
  { label: 'About Us',   href: '/about'    },
  { label: 'Blog',       href: '/blog'     },
  { label: 'FAQ',        href: '/faq'      },
  { label: 'Pricing',    href: '/pricing'  },
]

const SOCIAL_LINKS = [
  { label: 'YouTube',   icon: 'bi-youtube',   href: 'https://www.youtube.com/@apcleanco' },
  { label: 'Instagram', icon: 'bi-instagram', href: 'https://www.instagram.com/ap_cleanco' },
  { label: 'Facebook',  icon: 'bi-facebook',  href: 'https://www.facebook.com/apcleanco' },
  { label: 'LinkedIn',  icon: 'bi-linkedin',  href: 'https://www.linkedin.com/company/apcleanco/' },
]

const LEGAL_LINKS = [
  { label: 'Terms and Conditions', href: '/legal/terms-and-conditions' },
  { label: 'Privacy Policy',       href: '/legal/privacy-policy'       },
  { label: 'Disclaimer',           href: '/legal/disclaimer'           },
]

// ── Trust signals for footer ──────────────────────────────────────────────────

const TRUST_SIGNALS = [
  { icon: 'bi-geo-alt-fill',          label: 'New Jersey Based'         },
  { icon: 'bi-lightning-charge-fill', label: 'Same-Day Available'       },
  { icon: 'bi-patch-check-fill',      label: '100% Satisfaction'        },
  { icon: 'bi-leaf',                  label: 'Eco-Friendly Disposal'    },
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
              alt="AP cleanco team performing professional junk removal"
              fill
              className="object-cover object-center"
              sizes="44vw"
            />
            <div className="absolute inset-0 bg-primary-900/50" aria-hidden="true" />
          </div>

          {/* Vertical accent separator */}
          <div
            className="hidden lg:block w-0.75 bg-accent-500 shrink-0 self-stretch"
            aria-hidden="true"
          />

          {/* Right: CTA content */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-16 lg:py-0">
            <div className="max-w-xl">
              <p
                className="text-accent-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                aria-hidden="true"
              >
                Get Started Today
              </p>
              <h2
                id="footer-cta-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-3"
              >
                Ready to Transform Your Garage?
              </h2>
              <p className="text-white/60 text-base mb-8 leading-relaxed">
                Get your free New Jersey estimate. We&apos;ll leave your garage cleaner, more functional, and easy to maintain.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="white"
                  size="md"
                  className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl"
                  icon={<i className="bi bi-arrow-right" aria-hidden="true" />}
                  iconPosition="right"
                  aria-label="Get a free garage clean-out quote"
                >
                  Get a Free Quote
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  className="lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl text-white/70! hover:text-white! border-2 border-white/20! hover:border-white/50!"
                  icon={<i className="bi bi-telephone-fill text-sm" aria-hidden="true" />}
                  iconPosition="left"
                  aria-label="Call AP cleanco at (732) 770-3342"
                >
                  (732) 770-3342
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. Trust signals bar ────────────────────────────────────────────── */}
      <div
        className="bg-primary-800 border-y border-primary-700 w-full"
        aria-label="Trust signals"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ul
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            role="list"
            aria-label="Why choose AP cleanco"
          >
            {TRUST_SIGNALS.map(({ icon, label }, i) => (
              <React.Fragment key={label}>
                <li className="flex items-center gap-2" role="listitem">
                  <i className={`bi ${icon} text-accent-400 text-sm`} aria-hidden="true" />
                  <span className="text-white/70 text-xs font-medium tracking-wide">{label}</span>
                </li>
                {i < TRUST_SIGNALS.length - 1 && (
                  <li aria-hidden="true" className="hidden sm:block text-primary-600 select-none">·</li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 3. Footer Content ───────────────────────────────────────────────── */}
      <section
        className="bg-primary-900 w-full"
        aria-label="Footer information"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="footer-content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-x-16">

            {/* ── Column 1: Logo + Contact ──────────────────────────────────── */}
            <div className="flex flex-col gap-6">
              {/* Logo — CSS filter to white */}
              <div style={{ filter: 'brightness(0) invert(1)' }}>
                <Logo className="h-10 w-auto" />
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Professional garage clean-out, deep cleaning, and organization services across New Jersey.
              </p>
              <address className="not-italic space-y-2.5">
                <a
                  href="tel:+17327703342"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-accent-400 transition-colors"
                  aria-label="Call AP cleanco at (732) 770-3342"
                >
                  <i className="bi bi-telephone-fill text-accent-500 text-xs" aria-hidden="true" />
                  (732) 770-3342
                </a>
                <a
                  href="https://maps.google.com/?q=New+Jersey+USA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-accent-400 transition-colors"
                  aria-label="AP cleanco address at New Jersey, USA, opens in Google Maps"
                >
                  <i className="bi bi-geo-alt-fill text-accent-500 text-xs" aria-hidden="true" />
                  New Jersey, USA
                </a>
              </address>
            </div>

            {/* ── Column 2: Navigation ──────────────────────────────────────── */}
            <div>
              <nav aria-label="Footer navigation">
                <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-5">
                  Quick Links
                </h3>
                <ul className="flex flex-col gap-y-3" role="list">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="footer-nav-link flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
                      >
                        <i
                          className="footer-nav-arrow bi bi-arrow-right text-xs text-accent-500 transition-transform duration-150"
                          aria-hidden="true"
                        />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* ── Column 3: Social + Schedule ──────────────────────────────── */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-4">
                  Follow Us
                </h3>
                <ul
                  className="flex flex-wrap gap-2"
                  role="list"
                  aria-label="Social media links"
                >
                  {SOCIAL_LINKS.map(({ label, icon, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow AP cleanco on ${label}`}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/8 text-white/60 hover:bg-accent-500 hover:text-white transition-colors border border-white/10 hover:border-accent-500"
                      >
                        <i className={`bi ${icon} text-sm leading-none`} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-4">
                  Book a Job
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70! hover:text-white! border-2 border-white/20! hover:border-white/50!"
                  icon={<i className="bi bi-calendar2-check" aria-hidden="true" />}
                  iconPosition="left"
                  aria-label="Schedule a call with AP cleanco"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Copyright Bar ────────────────────────────────────────────────── */}
      <div
        className="bg-primary-900 border-t border-white/10 w-full"
        aria-label="Copyright information"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 text-xs text-white/40">

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
            <p className="text-center text-white/60 shrink-0">
              © 2026 | All rights reserved to AP cleanco
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
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                    {index < LEGAL_LINKS.length - 1 && (
                      <li aria-hidden="true" className="text-white/20 select-none px-1">
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
