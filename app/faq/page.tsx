import type { Metadata } from 'next'
import FAQAccordion from '@/components/faq/FAQAccordion'
import faqs from '@/data/faqs.json'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Garage Cleaning Services NJ',
  description: 'Have questions about garage cleaning or home organization? Find answers to common FAQs about AP cleanco services in New Jersey.',
  keywords: [
    'how much does garage cleaning cost',
    'garage cleaning FAQs',
    'garage organization help',
  ],
  openGraph: {
    title: 'FAQs | Garage Cleaning Services NJ',
    description:
      'Answers to your questions about AP cleanco garage cleaning services in New Jersey.',
    url: 'https://apcleanco.com/faq',
    siteName: 'AP cleanco',
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
        <div aria-hidden="true" className="h-22 md:h-32" />
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
