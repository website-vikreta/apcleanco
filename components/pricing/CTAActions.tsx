'use client'

import React from 'react'
import Button from '@/components/Button'

export const CTAActions: React.FC = () => {
  return (
    <section className="mt-16 py-12 bg-neutral-50 rounded-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Ready to Get Your Garage Cleaned?
        </h2>
        <p className="text-lg text-neutral-600 mb-8">
          Schedule your appointment or get a free quote today
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              // TODO: Connect to Calendly
              window.open('https://calendly.com', '_blank')
            }}
          >
            Book a Slot
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              window.location.href = '#contact'
            }}
          >
            Get a Free Quote
          </Button>
        </div>

        <p className="text-sm text-neutral-500 mt-6">
          No credit card required • Free consultation • Same-day quotes
        </p>
      </div>
    </section>
  )
}
