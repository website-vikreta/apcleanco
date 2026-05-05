import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLegalPageBySlug } from '@/lib/legal'
import LegalHeader from '@/components/legal/LegalHeader'
import LegalContent from '@/components/legal/LegalContent'

/**
 * Terms and Conditions Page
 * Route: /legal/terms-and-conditions
 */

const PAGE_TITLE = 'Terms and Conditions'
const LAST_UPDATED = 'March 15, 2026'

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ApcleanCo`,
  description: 'Terms and Conditions for ApcleanCo. Read our complete terms of service for using our website and services.',
  robots: 'index, follow',
  openGraph: {
    title: `${PAGE_TITLE} | ApcleanCo`,
    description: 'Terms and Conditions for ApcleanCo. Read our complete terms of service for using our website and services.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${PAGE_TITLE} | ApcleanCo`,
    description: 'Terms and Conditions for ApcleanCo. Read our complete terms of service for using our website and services.',
  },
}

export default function TermsAndConditionsPage() {
  const legalPage = getLegalPageBySlug('terms-and-conditions')

  if (!legalPage) {
    notFound()
  }

  return (
    <main aria-label="Terms and Conditions" className="bg-neutral-50">
      <div aria-hidden="true" className="h-16 md:h-32 lg:h-40" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 lg:py-16">
        <LegalHeader title={PAGE_TITLE} lastUpdated={LAST_UPDATED} />

        <LegalContent
          contentHtml={legalPage.contentHtml}
          aria="Terms and Conditions document content"
        />

        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-neutral-200">
          <p className="text-sm md:text-base text-neutral-700">
            <strong>Questions about our terms?</strong> Contact us at{' '}
            <a
              href="mailto:apcleancosupport@gmail.com"
              className="text-primary-500 underline hover:text-primary-700 focus:ring-2 focus:ring-primary-500 rounded"
            >
              apcleancosupport@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
