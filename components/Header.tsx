'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import Logo from './Logo'
import { useGSAP } from '@gsap/react'
import Button from './Button'

gsap.registerPlugin(useGSAP)

// ── Routes with hero sections (dark image background overlay) ────────────────
const ROUTES_WITH_HERO = ['/', '/services', '/blog']

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Pricing',  href: '/pricing' },
//   { label: 'Blog',     href: '/blog' },
]

const SOCIAL_LINKS = [
  { icon: 'bi-youtube',   href: 'https://www.youtube.com/@apcleanco',        label: 'YouTube' },
  { icon: 'bi-instagram', href: 'https://www.instagram.com/ap_cleanco',      label: 'Instagram' },
  { icon: 'bi-facebook',  href: 'https://www.facebook.com/apcleanco',        label: 'Facebook' },
  // { icon: 'bi-tiktok',    href: 'https://tiktok.com',    label: 'TikTok' },
  { icon: 'bi-linkedin',  href: 'https://www.linkedin.com/company/apcleanco/', label: 'LinkedIn' },
]

const CALENDLY_URL = 'https://calendly.com/parthdharia99/30min'

// ── Component ─────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname()
  
  // Determine if current route has a hero section
  const hasHeroSection = ROUTES_WITH_HERO.some(route => 
    route === '/' ? pathname === '/' : pathname.startsWith(route)
  )
  
  const headerRef     = useRef<HTMLElement>(null)
  const topbarWrapRef = useRef<HTMLDivElement>(null)
  const topbarRef     = useRef<HTMLDivElement>(null)
  const navInnerRef   = useRef<HTMLDivElement>(null)
  const menuRef       = useRef<HTMLDivElement>(null)

  // Use a ref to track open state — avoids stale closure inside contextSafe callbacks
  const menuOpenRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [atTop, setAtTop] = useState(hasHeroSection)
  const collapsedRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  // Use a ref so the GSAP scroll closure always reads the latest value (avoids stale closure)
  const hasHeroRef = useRef(hasHeroSection)

  // Update both atTop state and ref whenever the route changes
  useEffect(() => {
    hasHeroRef.current = hasHeroSection
    setAtTop(hasHeroSection)
    collapsedRef.current = false
  }, [hasHeroSection])

  // ── GSAP: scroll-driven topbar hide / navbar compact (optimized) ─────────
  const { contextSafe } = useGSAP(() => {
    // Read topbar height dynamically so resize events get the correct value
    const getTopbarH = () => topbarRef.current?.scrollHeight ?? 0

    // Initialise wrapper height from natural topbar height
    gsap.set(topbarWrapRef.current, { height: getTopbarH() })

    let lastScrollY = 0
    let lastAtTop = true
    let pendingAnimationState: boolean | null = null

    const triggerAnimation = (shouldCollapse: boolean) => {
      // Cancel any pending RAF callbacks
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      // Re-read height at animation time so it's always current (handles resize)
      const topbarH = getTopbarH()

      // Use a single timeline for coordinated animations (better performance)
      const tl = gsap.timeline({ overwrite: 'auto' })

      const duration = shouldCollapse ? 0.22 : 0.3
      const ease = shouldCollapse ? 'power2.in' : 'power2.out'

      tl.to(
        topbarWrapRef.current,
        { height: shouldCollapse ? 0 : topbarH, duration, ease },
        0,
      )
        .to(
          topbarRef.current,
          { y: shouldCollapse ? -topbarH : 0, duration, ease },
          0,
        )
        .to(
          navInnerRef.current,
          {
            paddingTop: shouldCollapse ? '0.5rem' : '1.25rem',
            paddingBottom: shouldCollapse ? '0.5rem' : '1.25rem',
            duration,
            ease,
          },
          0,
        )

      // Update logo filter with CSS class instead of inline style
      if (logoRef.current) {
        if (shouldCollapse) {
          logoRef.current.classList.add('logo-collapsed')
          logoRef.current.classList.remove('logo-expanded')
        } else {
          logoRef.current.classList.add('logo-expanded')
          logoRef.current.classList.remove('logo-collapsed')
        }
      }
    }

    const onScroll = () => {
      const y = window.scrollY
      
      // For hero pages: atTop drives transparent navbar; for others: always false (white navbar)
      const currentAtTop = hasHeroRef.current ? y < 100 : false
      const goingDown = y > lastScrollY && y > getTopbarH()

      // Update state (batched, only when threshold crossed)
      if (currentAtTop !== lastAtTop) {
        lastAtTop = currentAtTop
        setAtTop(currentAtTop)
      }

      // Only animate if collapsed state changes
      const shouldCollapse = goingDown
      if (shouldCollapse !== collapsedRef.current) {
        collapsedRef.current = shouldCollapse
        pendingAnimationState = shouldCollapse

        // Batch scroll calculations with RAF to reduce jank
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
        }

        rafIdRef.current = requestAnimationFrame(() => {
          if (pendingAnimationState !== null) {
            triggerAnimation(pendingAnimationState)
          }
          rafIdRef.current = null
        })
      }

      lastScrollY = Math.max(0, y)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // On resize, re-sync the wrapper height in case topbar visibility changed (mobile ↔ desktop)
    const onResize = () => {
      if (!collapsedRef.current) {
        gsap.set(topbarWrapRef.current, { height: getTopbarH() })
      }
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, { scope: headerRef })

  // ── GSAP: mobile menu open / close (contextSafe for post-mount callbacks) ─

  const openMenu = contextSafe(() => {
    gsap.set(menuRef.current, { display: 'block', opacity: 0, y: -8 })
    gsap.to(menuRef.current,  { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' })
    // Stagger nav links in
    gsap.from('.mob-nav-link', {
      x: -14, opacity: 0, stagger: 0.04, duration: 0.18, ease: 'power2.out', delay: 0.05,
    })
  })

  const closeMenu = contextSafe((onComplete?: () => void) => {
    gsap.to(menuRef.current, {
      opacity: 0, y: -8, duration: 0.16, ease: 'power2.in',
      onComplete: () => {
        gsap.set(menuRef.current, { display: 'none' })
        onComplete?.()
      },
    })
  })

  const toggleMenu = contextSafe(() => {
    const opening = !menuOpenRef.current
    menuOpenRef.current = opening
    setMenuOpen(opening)
    opening ? openMenu() : closeMenu()
  })

  // Called from mobile nav links so the menu closes before navigation
  const handleMobileLinkClick = contextSafe(() => {
    if (!menuOpenRef.current) return
    menuOpenRef.current = false
    setMenuOpen(false)
    closeMenu()
  })

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-50">

      {/* ── Topbar ───────────────────────────────────────────────────────── */}
      {/* overflow-hidden + animated height = clean slide-collapse on scroll */}
      <div ref={topbarWrapRef} className="overflow-hidden hidden md:block">
        <div ref={topbarRef} className="bg-primary-900 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-neutral-300">

            {/* Left — phone + address */}
            <div className="flex items-center gap-6">
              <a
                href="tel:+17327703342"
                className="flex items-center gap-2 hover:text-primary-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary-400 focus-visible:outline-offset-2 rounded"
                aria-label="Call our office: +1 (732) 770-3342"
              >
                <i className="bi bi-telephone-fill text-primary-500 text-[11px]" aria-hidden="true" />
                <span>+1 (732) 770-3342</span>
              </a>
              <a
                href="https://maps.google.com/?q=New+Jersey+USA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-400 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary-400 focus-visible:outline-offset-2 rounded"
                aria-label="Get directions: New Jersey, USA"
              >
                <i className="bi bi-geo-alt-fill text-primary-500 text-[11px]" aria-hidden="true" />
                <span>New Jersey, USA</span>
              </a>
            </div>

            {/* Right — social icons */}
            <div className="flex items-center gap-4">
              <span
                className="text-neutral-200 text-[10px] uppercase tracking-[0.18em]"
                aria-hidden="true"
              >
                Follow
              </span>
              <div className="flex items-center gap-3" role="list" aria-label="Social media links">
                {SOCIAL_LINKS.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`Follow us on ${label}`}
                    className="text-neutral-200 hover:text-primary-400 transition-colors duration-150 text-[15px] leading-none focus-visible:outline-2 focus-visible:outline-primary-400 focus-visible:outline-offset-1 rounded"
                  >
                    <i className={`bi ${icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Main Navbar ──────────────────────────────────────────────────── */}
      <nav
        className={`transition-colors duration-300 ${
          atTop ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-neutral-200/40'
        }`}
        aria-label="Site navigation"
      >
        <div
          ref={navInnerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6"
          style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem' }}
        >

          {/* Logo */}
          <Link
            href="/"
            aria-label="AP cleanco — return to home page"
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded"
          >
            <div style={{ filter: atTop ? 'brightness(0) invert(1)' : 'none', transition: 'filter 0.35s ease' }}>
              <Logo className="h-12 w-auto" />
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul
            className="hidden md:flex items-center gap-0.5 lg:gap-1 flex-1 justify-center"
            role="list"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} role="listitem">
                <Link
                  href={href}
                  className={`relative px-3 py-1.5 text-base font-medium transition-colors duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 rounded ${
                    atTop
                      ? 'text-white/85 hover:text-white focus-visible:outline-white'
                      : 'text-neutral-800 hover:text-primary-500 focus-visible:outline-primary-500'
                  }`}
                >
                  {label}
                  {/* Accent underline — CSS transition on group-hover (no GSAP needed for a simple scale) */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full ${
                      atTop ? 'bg-white/40' : 'bg-primary-500'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Desktop CTA */}
            <div className="hidden md:block">
               <Button
                  variant="primary"
                  size="md"
                  icon={<i className="bi bi-calendar2-check text-[13px]" aria-hidden="true" />}
                  iconPosition="left"
                  onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')}
                  aria-label="Schedule a call — opens in a new tab"
                  className={`${atTop ? 'className="border bg-transparent border-white/35 text-white/90 hover:bg-white/10 hover:border-white/60 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white' : ''}`}
               >
               Schedule a Call
               </Button>
            </div>

            {/* Mobile CTA (compact, always visible in header) */}
            <div className="md:hidden">
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')}
                aria-label="Schedule a call — opens in a new tab"
              >
                Schedule a Call
              </Button>
            </div>


            {/* Hamburger toggle */}
            <button
              onClick={toggleMenu}
              className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 ${
                atTop
                  ? 'text-white/85 hover:bg-white/10 focus-visible:outline-white'
                  : 'text-neutral-700 hover:bg-neutral-100 focus-visible:outline-primary-500'
              }`}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
            >
              <i
                className={`bi text-xl ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}
                aria-hidden="true"
              />
            </button>

          </div>
        </div>

        {/* ── Mobile dropdown (display:none by default; GSAP toggles visibility) */}
        <div
          ref={menuRef}
          id="mobile-nav-menu"
          style={{ display: 'none' }}
          className="md:hidden border-t border-neutral-100 bg-white"
          aria-label="Mobile navigation menu"
        >
          {/* Nav links */}
          <ul className="py-1" role="list" aria-label="Navigation links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} role="listitem">
                <Link
                  href={href}
                  className="mob-nav-link flex items-center px-5 py-3.5 text-base font-medium text-neutral-800 hover:bg-primary-50 hover:text-primary-500 border-l-2 border-transparent hover:border-primary-500 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:-outline-offset-2"
                  onClick={handleMobileLinkClick}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile footer: full CTA + phone + socials */}
          <div className="border-t border-neutral-100 px-5 py-4 space-y-3">
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              icon={<i className="bi bi-calendar2-check text-[13px]" aria-hidden="true" />}
              iconPosition="left"
              onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')}
              aria-label="Schedule a call — opens in a new tab"
            >
              Schedule a Call
            </Button>

            <div className="flex items-center justify-between pt-0.5">
              <a
                href="tel:+17327703342"
                aria-label="Call our office: +1 (732) 770-3342"
                className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary-500 transition-colors duration-150"
              >
                <i className="bi bi-telephone-fill text-[11px] text-primary-500" aria-hidden="true" />
                <span>+1 (732) 770-3342</span>
              </a>
              <div className="flex items-center gap-3" role="list" aria-label="Social media">
                {SOCIAL_LINKS.slice(0, 4).map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`Follow us on ${label}`}
                    className="text-neutral-400 hover:text-primary-500 transition-colors duration-150 text-base leading-none"
                  >
                    <i className={`bi ${icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </nav>

    </header>
  )
}
