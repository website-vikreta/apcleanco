'use client'

import React, { useState } from 'react'
import { PricingToggle, type GarageSize } from './PricingToggle'
import { FeatureRow } from './FeatureRow'
import { PlanColumn } from './PlanColumn'
import pricingData from '@/data/pricing.json'

export const PricingTable: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<GarageSize>('2_car')

  // Collect all unique features from all plans
  const allFeatures = Array.from(
    new Set(pricingData.plans.flatMap(plan => plan.description))
  )

  // Helper to check if a feature is in a plan's description
  const isPlanFeatureIncluded = (planId: string, feature: string): boolean => {
    const plan = pricingData.plans.find(p => p.id === planId)
    if (!plan) return false

    // For Silver and Gold, include previous tier features
    if (planId === 'silver') {
      const basicPlan = pricingData.plans.find(p => p.id === 'basic')
      return basicPlan?.description.includes(feature) || plan.description.includes(feature)
    }
    if (planId === 'gold') {
      return pricingData.plans.some(p => ['basic', 'silver'].includes(p.id) && p.description.includes(feature)) ||
        plan.description.includes(feature)
    }

    return plan.description.includes(feature)
  }

  const planIds = pricingData.plans.map(p => p.id)

  return (
    <section className="w-full">
      <PricingToggle value={selectedSize} onChange={setSelectedSize} />

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-neutral-50 border-b-2 border-neutral-200">
              <th className="px-6 py-4 text-left font-bold text-neutral-900">Features</th>
              {pricingData.plans.map(plan => (
                <th
                  key={plan.id}
                  className="px-6 py-4 text-center font-bold text-neutral-900"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Feature rows */}
            {allFeatures.map(feature => (
              <FeatureRow
                key={feature}
                feature={feature}
                planIds={planIds}
                includedPlans={
                  new Set(
                    planIds.filter(planId => isPlanFeatureIncluded(planId, feature))
                  )
                }
              />
            ))}

            {/* Pricing & CTA row */}
            <tr className="border-t-2 border-neutral-200">
              <td className="px-6 py-6 font-bold text-neutral-900 bg-neutral-50">
                Pricing
              </td>
              {pricingData.plans.map(plan => (
                <td key={plan.id} className="px-6 py-6 text-center">
                  <PlanColumn
                    plan={plan}
                    currentPrice={plan.pricing[selectedSize]}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-6">
        {pricingData.plans.map(plan => (
          <div
            key={plan.id}
            className={`p-6 rounded-lg border ${
              plan.featured
                ? 'bg-primary-50 border-primary-200'
                : 'bg-white border-neutral-200'
            }`}
          >
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              {plan.name}
            </h3>

            <div className="mb-6">
              <div className="text-3xl font-bold text-primary-500">
                ${plan.pricing[selectedSize]}
              </div>
              <p className="text-sm text-neutral-600 mt-1">one-time service</p>
            </div>

            <details className="mb-6">
              <summary className="cursor-pointer font-semibold text-neutral-900 hover:text-primary-500">
                View features
              </summary>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {plan.description.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </details>

            <button
              onClick={() => (window.location.href = '#contact')}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
                plan.featured
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'border border-primary-500 text-primary-500 hover:bg-primary-50'
              }`}
            >
              Book a Slot
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
