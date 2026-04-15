'use client'

import React from 'react'

export type GarageSize = '1_car' | '2_car' | '3_car'

interface PricingToggleProps {
  value: GarageSize
  onChange: (size: GarageSize) => void
}

export const PricingToggle: React.FC<PricingToggleProps> = ({ value, onChange }) => {
  const sizes: { value: GarageSize; label: string }[] = [
    { value: '1_car', label: '1 Car' },
    { value: '2_car', label: '2 Car' },
    { value: '3_car', label: '3 Car' },
  ]

  return (
    <div className="flex justify-center gap-4 mb-12">
      <fieldset>
        <legend className="sr-only">Select garage size</legend>
        <div className="flex gap-3">
          {sizes.map(size => (
            <button
              key={size.value}
              onClick={() => onChange(size.value)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${ value === size.value
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:border-primary-300'
                }`}
              aria-pressed={value === size.value}
              type="button"
            >
              {size.label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
