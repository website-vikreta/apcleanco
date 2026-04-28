'use client'

import React from 'react'
import { PricingHeader } from '@/components/pricing/PricingHeader'
import { PricingTable } from '@/components/pricing/PricingTable'
import { AddonsTable } from '@/components/pricing/AddonsTable'

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div aria-hidden="true" className="h-22 md:h-32" />
      {/* Header */}
      <section className="py-16 md:py-20">
        <PricingHeader />
      </section>

      {/* Pricing Table */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <PricingTable />
        </div>
      </section>

      {/* Add-ons Table */}
      <section className="px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AddonsTable />
        </div>
      </section>
    </main>
  )
}
