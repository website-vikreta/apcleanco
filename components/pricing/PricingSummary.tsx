'use client'

import React from 'react'
import Button from '@/components/Button'

interface PricingSummaryProps {
  planName: string
  baseCost: number
  addonsCost: number
  totalCost: number
}

export const PricingSummary: React.FC<PricingSummaryProps> = ({
  planName,
  baseCost,
  addonsCost,
  totalCost,
}) => {
  return (
    <aside className="sticky bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg md:shadow-none md:relative md:border-t-0 md:bg-neutral-50 md:p-6 md:rounded-lg">
      <div className="p-4 md:p-0 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">{planName} Plan</span>
          <span className="font-semibold text-neutral-900">${baseCost}</span>
        </div>

        {addonsCost > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Add-ons</span>
            <span className="font-semibold text-neutral-900">${addonsCost}</span>
          </div>
        )}

        <div className="border-t border-neutral-200 pt-3 flex justify-between">
          <span className="font-bold text-neutral-900">Total</span>
          <span className="text-2xl font-bold text-primary-500">${totalCost}</span>
        </div>

        <Button
          variant="primary"
          size="md"
          className="w-full mt-4"
          onClick={() => (window.location.href = '#contact')}
        >
          Book Now
        </Button>
      </div>
    </aside>
  )
}
