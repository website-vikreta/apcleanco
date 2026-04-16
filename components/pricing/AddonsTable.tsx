'use client'

import React from 'react'
import pricingData from '@/data/pricing.json'

export const AddonsTable: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
            Available Add-ons
          </h2>
          <p className="text-neutral-600 text-sm md:text-base">
            Enhance your chosen plan with any of these optional services, available regardless of your selected package.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="pb-3 font-semibold text-neutral-900">Service</th>
                <th className="pb-3 font-semibold text-neutral-900 hidden sm:table-cell">Description</th>
                <th className="pb-3 font-semibold text-neutral-900 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.addons.map((addon) => (
                <tr
                  key={addon.id}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                >
                  {/* Service Name */}
                  <td className="py-4 font-medium text-neutral-900">
                    {addon.name}
                  </td>

                  {/* Description (hidden on mobile) */}
                  <td className="py-4 text-neutral-600 hidden sm:table-cell">
                    {addon.note && !addon.note.includes('$')
                      ? addon.note
                      : addon.unit
                        ? `per ${addon.unit.replace('/', '').trim() || 'unit'}`
                        : 'One-time service'}
                  </td>

                  {/* Price */}
                  <td className="py-4 text-right font-semibold text-neutral-900">
                    {addon.note && addon.note.includes('$') ? (
                      <span className="text-sm">{addon.note}</span>
                    ) : addon.price === 0 ? (
                      <span className="text-sm text-primary-600 font-semibold">Included</span>
                    ) : (
                      <span>${addon.price}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <p className="text-xs text-neutral-400 mt-6 text-center tracking-wide">
          All add-ons can be combined with any plan. Contact us for custom requests.
        </p>
      </div>
    </section>
  )
}
