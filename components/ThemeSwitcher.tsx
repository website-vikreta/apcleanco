'use client'

import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// ── Color Utilities ──────────────────────────────────────────────────────────

/**
 * Convert hex to RGB
 */
const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null
}

/**
 * Convert RGB to HSL
 */
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

/**
 * Convert HSL to RGB
 */
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h = h / 360
  s = s / 100
  l = l / 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
  ]
}

/**
 * Convert RGB to Hex
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}

/**
 * Generate a color palette from a primary color
 * Returns all CSS color variables for primary, neutral, etc.
 */
const generatePalette = (primaryHex: string): Record<string, string> => {
  const rgb = hexToRgb(primaryHex)
  if (!rgb) return {}

  const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2])

  // Generate primary palette (shades from light to dark)
  const primaryPalette: Record<string, string> = {}
  const primaryShades = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10]
  const primaryLabels = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']

  primaryShades.forEach((lightness, i) => {
    const [r, g, b] = hslToRgb(h, s, lightness)
    primaryPalette[`--color-primary-${primaryLabels[i]}`] = rgbToHex(r, g, b)
  })

  // Generate neutral palette (grayscale based on current palette)
  const neutralPalette: Record<string, string> = {}
  const neutralShades = [98, 95, 90, 80, 60, 50, 30, 15, 5]
  const neutralLabels = ['50', '100', '200', '300', '400', '500', '700', '800', '900']

  neutralShades.forEach((lightness, i) => {
    const [r, g, b] = hslToRgb(h, 15, lightness) // Low saturation for neutral
    neutralPalette[`--color-neutral-${neutralLabels[i]}`] = rgbToHex(r, g, b)
  })

  return { ...primaryPalette, ...neutralPalette }
}

// ── Component ────────────────────────────────────────────────────────────────

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#1f5a44')
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const colorInputRef = useRef<HTMLInputElement>(null)

  // Apply palette by updating CSS variables
  const applyPalette = (primaryHex: string) => {
    const palette = generatePalette(primaryHex)
    Object.entries(palette).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
    setPrimaryColor(primaryHex)
  }

  // GSAP animation for panel
  useGSAP(
    () => {
      if (isOpen && panelRef.current) {
        gsap.to(panelRef.current, {
          scale: 1,
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.3,
          ease: 'back.out',
        })
      } else if (panelRef.current) {
        gsap.to(panelRef.current, {
          scale: 0.8,
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.2,
          ease: 'power2.in',
        })
      }
    },
    { dependencies: [isOpen] },
  )

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    applyPalette(newColor)
  }

  const handleReset = () => {
    const defaultColor = '#1f5a44'
    applyPalette(defaultColor)
    if (colorInputRef.current) {
      colorInputRef.current.value = defaultColor
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle color picker"
        aria-expanded={isOpen}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
        </svg>
      </button>

      {/* Color Picker Panel */}
      <div
        ref={panelRef}
        className="fixed right-20 top-1/2 -translate-y-1/2 z-40 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 w-56 scale-80 opacity-0 pointer-events-none"
      >
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">
          Dynamic Color Picker
        </h3>

        {/* Color Picker Input */}
        <div className="space-y-3">
          <label htmlFor="theme-color" className="block text-xs font-medium text-neutral-700">
            Primary Color
          </label>
          <div className="flex gap-2">
            <input
              ref={colorInputRef}
              id="theme-color"
              type="color"
              value={primaryColor}
              onChange={handleColorChange}
              className="w-full h-10 rounded cursor-pointer border border-neutral-200"
              aria-label="Select primary color"
            />
            <div
              className="w-10 h-10 rounded border border-neutral-200"
              style={{ backgroundColor: primaryColor }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Color Value Display */}
        <div className="mt-3 p-2 bg-neutral-50 rounded text-xs font-mono text-neutral-700 text-center select-all">
          {primaryColor.toUpperCase()}
        </div>

        {/* Palette Preview */}
        <div className="mt-4">
          <p className="text-xs font-medium text-neutral-700 mb-2">Generated Palette</p>
          <div className="grid grid-cols-5 gap-1">
            {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => {
              const palette = generatePalette(primaryColor)
              const color = palette[`--color-primary-${shade}`] || '#ccc'
              return (
                <div
                  key={shade}
                  className="h-8 rounded border border-neutral-200"
                  style={{ backgroundColor: color }}
                  title={`${shade}`}
                  aria-label={`Primary ${shade}: ${color}`}
                />
              )
            })}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full mt-4 px-3 py-2 rounded-md text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Reset to Default
        </button>
      </div>
    </>
  )
}

