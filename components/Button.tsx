'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// ── Types ─────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outlined' | 'danger' | 'white'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right' | 'only'
  loading?: boolean
  magnetic?: boolean
  href?: string
}

// ── Style Maps ────────────────────────────────────────────────────────────────

const variantBase: Record<ButtonVariant, string> = {
  primary:  'bg-primary-500 text-white border-2 border-primary-500',
  secondary:'bg-transparent text-primary-500 border border-primary-500',
  accent:   'bg-accent-500 text-neutral-900 border border-accent-500',
  ghost:    'bg-transparent text-current border border-transparent',
  outlined: 'bg-transparent text-neutral-700 border border-neutral-300',
  danger:   'bg-red-600 text-white border border-red-600',
  white:    'bg-white text-primary-700 border border-white',
}

const shimmerFill: Record<ButtonVariant, string> = {
  primary:  'bg-white/25',
  secondary:'bg-primary-500/15',
  accent:   'bg-white/35',
  ghost:    'bg-neutral-900/[0.06]',
  outlined: 'bg-neutral-900/[0.06]',
  danger:   'bg-white/25',
  white:    'bg-primary-500/15',
}

const focusCls: Record<ButtonVariant, string> = {
  primary:  'focus-visible:outline-accent-400',
  secondary:'focus-visible:outline-primary-500',
  accent:   'focus-visible:outline-primary-500',
  ghost:    'focus-visible:outline-primary-500',
  outlined: 'focus-visible:outline-neutral-500',
  danger:   'focus-visible:outline-red-400',
  white:    'focus-visible:outline-white',
}

const sizeCls: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm h-9 rounded-md',
  md: 'px-6 py-3 text-base h-11 rounded-lg',
  lg: 'px-8 py-4 text-lg h-14 rounded-xl',
}

const gapCls: Record<ButtonSize, string> = {
  sm: 'gap-1.5',
  md: 'gap-2',
  lg: 'gap-2.5',
}

const iconOnlyWidth: Record<ButtonSize, string> = {
  sm: 'w-9',
  md: 'w-11',
  lg: 'w-14',
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  magnetic = false,
  href,
  children,
  className = '',
  onClick,
  ...rest
}: ButtonProps) {
  const btnRef   = useRef<HTMLElement>(null)
  const shimmerRef = useRef<HTMLSpanElement>(null)

  const isDisabled = disabled || loading
  const iconOnly   = iconPosition === 'only'
  const isExternal = Boolean(href && /^(https?:\/\/|mailto:|tel:)/i.test(href))

  // Set initial shimmer position off-screen left
  const { contextSafe } = useGSAP(
    () => {
      gsap.set(shimmerRef.current, { xPercent: -150, skewX: -15, opacity: 0 })
    },
    { scope: btnRef },
  )

  // ── GSAP event handlers (contextSafe ensures cleanup on unmount) ───────────

  const handleMouseEnter = contextSafe((_e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return
    // Lift + scale up
    gsap.to(btnRef.current, { y: -4, scale: 1.04, duration: 0.22, ease: 'power2.out' })
    // Shimmer sweep: left → right
    gsap.fromTo(
      shimmerRef.current,
      { xPercent: -150, opacity: 0.8 },
      { xPercent: 160,  opacity: 0,   duration: 0.55, ease: 'power1.inOut' },
    )
  })

  const handleMouseLeave = contextSafe((_e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return
    // Elastic spring back to rest
    gsap.to(btnRef.current, { y: 0, x: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.35)' })
  })

  const handleMouseDown = contextSafe((_e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return
    gsap.to(btnRef.current, { scale: 0.94, y: 1, duration: 0.09, ease: 'power3.in' })
  })

  const handleMouseUp = contextSafe((_e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return
    gsap.to(btnRef.current, { scale: 1.04, y: -4, duration: 0.18, ease: 'power2.out' })
  })

  // Magnetic: follow cursor inside button bounds
  const handleMouseMove = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled || !magnetic || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const cx   = rect.left + rect.width / 2
    const cy   = rect.top  + rect.height / 2
    gsap.to(btnRef.current, {
      x: (e.clientX - cx) * 0.25,
      y: (e.clientY - cy) * 0.25 - 4,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  // ── Render ────────────────────────────────────────────────────────────────

  const commonClassName = [
    'relative inline-flex items-center justify-center font-semibold',
    'overflow-hidden select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    variantBase[variant],
    focusCls[variant],
    sizeCls[size],
    iconOnly ? `px-0! ${iconOnlyWidth[size]}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handlePress = (e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) {
      e.preventDefault()
      return
    }

    if (!href) {
      e.preventDefault()
    }

    onClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>)
  }

  const content = (
    <>
      {/* ── Shimmer sweep overlay ──────────────────────────────────────────── */}
      <span
        ref={shimmerRef}
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none ${shimmerFill[variant]}`}
        style={{ borderRadius: 'inherit' }}
      />

      {/* ── Loading spinner (centred, replaces content visually) ─────────── */}
      {loading && (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            className="animate-spin w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </span>
      )}

      {/* ── Button content ─────────────────────────────────────────────────── */}
      <span
        className={`relative inline-flex items-center ${gapCls[size]} ${loading ? 'invisible' : ''}`}
      >
        {/* Left icon */}
        {!iconOnly && iconPosition === 'left' && icon && (
          <span aria-hidden="true" className="shrink-0 flex items-center">{icon}</span>
        )}

        {/* Icon-only */}
        {iconOnly ? (
          <span aria-hidden="true" className="shrink-0 flex items-center">{icon}</span>
        ) : (
          children
        )}

        {/* Right icon */}
        {!iconOnly && iconPosition === 'right' && icon && (
          <span aria-hidden="true" className="shrink-0 flex items-center">{icon}</span>
        )}
      </span>
    </>
  )

  if (href && !isExternal) {
    return (
      <Link
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={commonClassName}
        aria-busy={loading ? true : undefined}
        aria-disabled={isDisabled ? true : undefined}
        onClick={handlePress}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={magnetic ? handleMouseMove : undefined}
        {...rest}
      >
        {content}
      </Link>
    )
  }

  if (href || onClick) {
    return (
      <a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href ?? '#'}
        className={commonClassName}
        aria-busy={loading ? true : undefined}
        aria-disabled={isDisabled ? true : undefined}
        onClick={handlePress}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={magnetic ? handleMouseMove : undefined}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <span
      ref={btnRef as React.Ref<HTMLSpanElement>}
      className={commonClassName}
      aria-busy={loading ? true : undefined}
      aria-disabled={isDisabled ? true : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={magnetic ? handleMouseMove : undefined}
    >
      {content}
    </span>
  )
}
