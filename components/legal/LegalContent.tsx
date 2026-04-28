import React from 'react'

interface LegalContentProps {
  contentHtml: string
  aria?: string
}

/**
 * LegalContent Component
 * Renders WYSIWYG HTML content from legal documents (privacy policy, terms, etc.)
 * Uses prose-blog styles for consistent typography and readability
 * Ensures semantic HTML structure for accessibility
 */
export default function LegalContent({ contentHtml, aria = 'Legal content' }: LegalContentProps) {
  return (
    <article className="prose-blog mt-8 md:mt-10" aria-label={aria}>
      {/* dangerouslySetInnerHTML used with sanitized HTML from trusted source */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  )
}
