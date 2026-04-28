import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getLegalPageBySlug } from '@/lib/legal'
import LegalHeader from '@/components/legal/LegalHeader'
import LegalContent from '@/components/legal/LegalContent'

/**
 * Privacy Policy Page
 * Route: /legal/privacy-policy
 * Renders WYSIWYG HTML content from data/legal/privacy-policy.html
 * Uses semantic HTML structure and accessible typography
 */

export const metadata: Metadata = {
  title: 'Privacy Policy | ApcleanCo',
  description: 'Privacy Policy for ApcleanCo. Learn how we collect, use, and protect your personal information.',
  robots: 'index, follow',
  openGraph: {
    title: 'Privacy Policy | ApcleanCo',
    description: 'Privacy Policy for ApcleanCo. Learn how we collect, use, and protect your personal information.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | ApcleanCo',
    description: 'Privacy Policy for ApcleanCo. Learn how we collect, use, and protect your personal information.',
  },
}

export default function PrivacyPolicyPage() {
  // Load privacy policy content from data/legal/privacy-policy.html
  const legalPage = getLegalPageBySlug('privacy-policy')

  if (!legalPage) {
    notFound()
  }

  return (
    <main aria-label="Privacy Policy" className="bg-neutral-50">
      {/* Centered container with max-width for optimal readability */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 lg:py-16">
        {/* Page header with title and meta */}
        <LegalHeader title={legalPage.title} lastUpdated={legalPage.lastUpdated} />

        {/* Legal content rendered as WYSIWYG HTML */}
        <LegalContent
          contentHtml={legalPage.contentHtml}
          aria="Privacy Policy document content"
        />

        {/* Footer CTA or additional info (optional) */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-neutral-200">
          <p className="text-sm md:text-base text-neutral-700">
            <strong>Questions about our privacy practices?</strong> Contact our Privacy Officer at{' '}
            <a
              href="mailto:privacy@apcleanco.com"
              className="text-primary-500 underline hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500"
            >
              privacy@apcleanco.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
