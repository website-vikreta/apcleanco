import React from 'react'
import type { Metadata } from 'next'
import { PricingHeader } from '@/components/pricing/PricingHeader'
import { PricingTable } from '@/components/pricing/PricingTable'
import { AddonsTable } from '@/components/pricing/AddonsTable'

export const metadata: Metadata = {
  title: 'Garage Cleaning & Junk Removal Pricing | Transparent Rates NJ',
  description: 'See our transparent, affordable pricing for garage cleanouts, junk removal, and deep cleaning services in New Jersey. No hidden fees, free quotes available.',
  keywords: [
    'garage cleaning cost NJ',
    'junk removal pricing New Jersey',
    'how much does garage cleaning cost',
    'affordable cleaning service',
    'garage cleanout price',
    'deep cleaning pricing',
    'cheap house cleaning NJ',
  ],
  openGraph: {
    title: 'Pricing | Garage Cleaning & Junk Removal NJ',
    description: 'Transparent, affordable pricing for professional garage cleanouts and junk removal services in New Jersey.',
    url: 'https://apcleanco.com/pricing',
  },
}

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
