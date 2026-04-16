'use client'

import React from 'react'

export const PricingHeader: React.FC = () => {
  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
        Your Garage. Your Price.
      </h1>
      <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
        Flat-rate pricing. No surprises. Just honest service.
      </p>
    </header>
  )
}
