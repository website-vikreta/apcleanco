'use client'

import React, { useState } from 'react'
import pricingData from '@/data/pricing.json'

interface AddonSelectorProps {
  onTotalChange?: (total: number) => void
}

export const AddonSelector: React.FC<AddonSelectorProps> = ({ onTotalChange }) => {
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set())

  const handleToggleAddon = (addonId: string) => {
    const updated = new Set(selectedAddons)
    if (updated.has(addonId)) {
      updated.delete(addonId)
    } else {
      updated.add(addonId)
    }
    setSelectedAddons(updated)

    // Calculate and report total
    const total = Array.from(updated).reduce((sum, id) => {
      const addon = pricingData.addons.find(a => a.id === id)
      return sum + (addon?.price || 0)
    }, 0)
    onTotalChange?.(total)
  }

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Add-ons & Extras
        </h2>
        <p className="text-neutral-600">
          Customize your service package with additional options
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className="sr-only">Available add-ons</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pricingData.addons.map(addon => (
            <label
              key={addon.id}
              className="flex items-center gap-3 p-4 rounded-lg border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedAddons.has(addon.id)}
                onChange={() => handleToggleAddon(addon.id)}
                className="w-5 h-5 rounded accent-primary-500"
                aria-label={`Add ${addon.name} for ${addon.note || `$${addon.price}${addon.unit}`}`}
              />
              <div className="flex-1">
                <div className="font-semibold text-neutral-900">{addon.name}</div>
                <div className="text-sm text-neutral-600">
                  {addon.note || `$${addon.price}${addon.unit}`}
                </div>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  )
}
