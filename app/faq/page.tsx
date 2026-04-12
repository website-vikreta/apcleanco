import type { Metadata } from 'next'
import FAQAccordion from '@/components/faq/FAQAccordion'
import faqs from '@/data/faqs.json'

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Find answers to common questions about APcleanco garage clean-out, organization, and junk removal services. Learn what we offer, how we work, and how to get started.',
  openGraph: {
    title: 'FAQs | APcleanco',
    description:
      'Have questions? Browse our FAQ to learn about APcleanco garage services, timelines, add-ons, and how to get started.',
    url: 'https://apcleanco.com/faq',
    siteName: 'APcleanco',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      {/* FAQPage JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main id="main-content">
        {/* Page Header */}
        <section
          aria-labelledby="faq-heading"
          className="px-4 sm:px-6 py-12 sm:py-16"
        >
          <div className="max-w-2xl mx-auto">
            <h1
              id="faq-heading"
              className="text-2xl sm:text-3xl font-semibold text-primary-900"
            >
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-neutral-700 text-sm sm:text-base">
              Everything you need to know about our garage services.
            </p>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section aria-label="FAQ list" className="px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="max-w-2xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>
      </main>
    </>
  )
}
