import React from 'react'

interface BlogContentProps {
  contentHtml: string
}

export default function BlogContent({ contentHtml }: BlogContentProps) {
  return (
    <article
      className="prose-blog mt-8"
      aria-label="Blog post content"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}
