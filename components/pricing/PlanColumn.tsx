'use client'

import React from 'react'
import Button from '@/components/Button'

interface Plan {
  id: string
  name: string
  pricing: {
    '1_car': number
    '2_car': number
    '3_car': number
  }
  featured: boolean
}

interface PlanColumnProps {
  plan: Plan
  currentPrice: number
}

export const PlanColumn: React.FC<PlanColumnProps> = ({ plan, currentPrice }) => {
  const planClass = plan.featured
    ? 'bg-primary-50 border border-primary-200'
    : 'bg-white'

  return (
    <div className={`p-6 rounded-lg ${planClass}`}>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
      <div className="mb-6">
        <div className="text-4xl font-bold text-primary-500">${currentPrice}</div>
        <p className="text-sm text-neutral-600 mt-1">one-time service</p>
      </div>
      <Button
        variant={plan.featured ? 'primary' : 'outlined'}
        size="md"
        className="w-full"
        href="https://calendly.com/parthdharia99/30min"
        target="_blank"
        rel="noopener noreferrer"
      >
        Book a Slot
      </Button>
    </div>
  )
}
