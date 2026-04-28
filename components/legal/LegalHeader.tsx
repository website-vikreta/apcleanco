import React from 'react'

interface LegalHeaderProps {
  title: string
  lastUpdated?: string
  description?: string
}

/**
 * LegalHeader Component
 * Displays legal page title, last updated date, and optional description
 * Semantically structured with proper heading hierarchy
 */
export default function LegalHeader({
  title,
  lastUpdated,
  description,
}: LegalHeaderProps) {
  return (
    <header className="mb-8 md:mb-10 border-b border-neutral-200 pb-6 md:pb-8">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-2 md:mb-4">
        {title}
      </h1>

      {/* Meta Information */}
      {lastUpdated && (
        <p className="text-sm md:text-base text-neutral-600">
          <span className="font-semibold text-neutral-700">Last updated:</span>{' '}
          <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>
      )}

      {/* Optional Description */}
      {description && (
        <p className="text-base md:text-lg text-neutral-700 mt-3 md:mt-4">{description}</p>
      )}
    </header>
  )
}
