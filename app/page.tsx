'use client'

import React, { useState } from 'react'

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate submission delay
    setTimeout(() => {
      setSubmitted(true)
      setEmail('')
      setLoading(false)
      setTimeout(() => setSubmitted(false), 4000)
    }, 800)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-primary-50 to-neutral-50 px-4 sm:px-6 lg:px-8">
      {/* Decorative background element */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content container */}
      <div className="w-full max-w-2xl">
        {/* Headline section */}
        <div className="text-center mb-12">
          {/* Accent badge */}
          <div className="mb-6 inline-block">
            <span className="inline-block px-4 py-2 bg-accent-400/10 border border-accent-400 text-accent-600 text-sm font-semibold rounded-full">
              Coming Soon
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-primary-900 mb-6 leading-tight tracking-tight">
            Redefining Clean
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Premium cleaning solutions designed to transform your space into a sanctuary of pristine elegance.
          </p>
        </div>

        {/* Email signup section */}
        <div>
          {submitted ? (
            // Success state
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Thank you!</h2>
              <p className="text-green-700">
                We'll notify you as soon as ApcleanCo launches.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/60 backdrop-blur-md border border-neutral-200 rounded-xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Form heading */}
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center sm:text-left">
                Be First to Know
              </h2>

              {/* Email input group */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    aria-label="Enter your email address to be notified when we launch"
                    aria-required="true"
                    disabled={loading}
                    className="w-full px-5 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-accent-400 focus-visible:outline-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 whitespace-nowrap"
                  aria-label={loading ? 'Subscribing...' : 'Subscribe to updates'}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Subscribing</span>
                    </span>
                  ) : (
                    'Notify Me'
                  )}
                </button>
              </div>

              {/* Helper text */}
              <p className="text-xs text-neutral-500 mt-4 text-center sm:text-left">
                We'll never share your email. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>

        {/* Footer note */}
        <div className="text-center mt-16">
          <div className="text-sm text-neutral-600 space-y-2">
            <p>Follow our journey</p>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                aria-label="Visit ApcleanCo on Instagram"
                className="text-neutral-600 hover:text-accent-500 transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 rounded"
              >
                Instagram
              </a>
              <a
                href="#"
                aria-label="Visit ApcleanCo on Twitter"
                className="text-neutral-600 hover:text-accent-500 transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 rounded"
              >
                Twitter
              </a>
              <a
                href="#"
                aria-label="Visit ApcleanCo on LinkedIn"
                className="text-neutral-600 hover:text-accent-500 transition-colors focus-visible:outline-2 focus-visible:outline-accent-400 rounded"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add stagger animation delay utilities if not in Tailwind config */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  )
}
