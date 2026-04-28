'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/components/Logo'


// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Services',   href: '/services' },
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

// ── Component ─────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer aria-label="Site footer">

      {/* ── 1. CTA Banner ── full-bleed cinematic ───────────────────────── */}
      <section
        className="relative w-full min-h-80 lg:min-h-112 overflow-hidden"
        aria-labelledby="footer-cta-heading"
      >
        {/* Full-bleed background photo */}
        <Image
          src="/hero-image.png"
          alt=""
          role="presentation"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />

        {/* Directional gradient: solid navy left → transparent right */}
        <div
          className="absolute inset-0 bg-linear-to-r from-primary-900 via-primary-900/85 to-primary-900/10"
          aria-hidden="true"
        />
        {/* Bottom depth vignette */}
        <div
          className="absolute inset-0 bg-linear-to-t from-primary-900/70 via-transparent to-transparent"
          aria-hidden="true"
        />

        {/* Content — sits in left 60% on desktop */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <div className="max-w-lg">

            {/* Eyebrow with rust rule */}
            <div className="flex items-center gap-3 mb-5" aria-hidden="true">
              <span className="block w-8 h-px bg-accent-500" />
              <p className="text-accent-400 text-xs font-semibold tracking-[0.2em] uppercase">
                Get Started Today
              </p>
            </div>

            <h2
              id="footer-cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4"
            >
              Ready to Transform Your Garage?
            </h2>
            <p className="text-white/60 text-base mb-6 leading-relaxed max-w-md">
              Get your free New Jersey estimate.
            </p>

            <a
              href="https://calendly.com/parthdharia99/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 h-11 rounded-lg text-base font-semibold bg-white text-primary-700 border-2 border-white hover:bg-white/90 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:px-8 lg:py-4 lg:text-lg lg:h-14 lg:rounded-xl"
              aria-label="Schedule your free garage estimate"
            >
              Get a Free Quote
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </a>

          </div>
        </div>
      </section>

      {/* ── 2. Compact footer strip ─────────────────────────────────────── */}
      <div className="bg-primary-900 w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 lg:py-10">

          {/* Row 1: Logo · Nav · Social */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            {/* Logo */}
            <div style={{ filter: 'brightness(0) invert(1)' }}>
              <Logo className="h-8 w-auto" />
            </div>

            {/* Nav links — horizontal */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" role="list">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/50 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social icons */}
            <ul className="flex items-center gap-2" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow AP cleanco on ${label}`}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/6 text-white/50 hover:bg-accent-500 hover:text-white transition-colors border border-white/10 hover:border-accent-500"
                  >
                    <i className={`bi ${icon} text-sm leading-none`} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-6" aria-hidden="true" />

          {/* Footer bottom: distributed layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-white/30">

            {/* Left: Dev credit */}
            <p className="text-center lg:text-left">
              Designed &amp; Developed by{' '}
              <a
                href="https://websitevikreta.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400/60 hover:text-accent-400 transition-colors"
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
              <ul className="flex flex-wrap items-center gap-x-1 gap-y-1 justify-center lg:justify-end" role="list">
                {LEGAL_LINKS.map(({ label, href }, index) => (
                  <React.Fragment key={label}>
                    <li>
                      <Link href={href} className="text-white/30 hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                    {index < LEGAL_LINKS.length - 1 && (
                      <li aria-hidden="true" className="text-white/20 select-none px-0.5">·</li>
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
