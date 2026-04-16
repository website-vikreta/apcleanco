'use client'

import React, { useState } from 'react'
import { PricingHeader } from '@/components/pricing/PricingHeader'
import { PricingTable } from '@/components/pricing/PricingTable'
import { AddonSelector } from '@/components/pricing/AddonSelector'
import { PricingSummary } from '@/components/pricing/PricingSummary'
import { CTAActions } from '@/components/pricing/CTAActions'
import pricingData from '@/data/pricing.json'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('silver')
  const [selectedSize, setSelectedSize] = useState<'1_car' | '2_car' | '3_car'>('2_car')
  const [addonsCost, setAddonsCost] = useState(0)

  // Get current plan
  const currentPlan = pricingData.plans.find(p => p.id === selectedPlan)
  const baseCost = currentPlan?.pricing[selectedSize] || 0
  const totalCost = baseCost + addonsCost

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section className="py-16 md:py-20">
        <PricingHeader />
      </section>

      {/* Pricing Table */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <PricingTable
            onPlanChange={setSelectedPlan}
            onSizeChange={setSelectedSize}
          />
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AddonSelector onTotalChange={setAddonsCost} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CTAActions />
        </div>
      </section>

      {/* Sticky Summary - only show on mobile */}
      <div className="md:hidden">
        <PricingSummary
          planName="Silver"
          baseCost={baseCost}
          addonsCost={addonsCost}
          totalCost={totalCost}
        />
      </div>
    </main>
  )
}
