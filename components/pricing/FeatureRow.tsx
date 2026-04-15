'use client'

import React from 'react'

interface FeatureRowProps {
  feature: string
  planIds: string[]
  includedPlans: Set<string>
}

export const FeatureRow: React.FC<FeatureRowProps> = ({ feature, planIds, includedPlans }) => {
  return (
    <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-neutral-900 bg-neutral-50">
        {feature}
      </td>
      {planIds.map(planId => (
        <td key={planId} className="px-6 py-4 text-center">
          {includedPlans.has(planId) ? (
            <svg
              className="w-5 h-5 text-primary-500 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-label="Included"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <span className="text-neutral-300">—</span>
          )}
        </td>
      ))}
    </tr>
  )
}
