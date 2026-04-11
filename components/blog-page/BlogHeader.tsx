import React from 'react'
import Image from 'next/image'

interface BlogHeaderProps {
  title: string
  dateCreated: string
  readTime: string
  thumbnail: string
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BlogHeader({ title, dateCreated, readTime, thumbnail }: BlogHeaderProps) {
  return (
    <header>
      {/* Thumbnail */}
      <div className="relative w-full aspect-video mb-8 overflow-hidden">
        <Image
          src={thumbnail}
          alt={`Cover image for: ${title}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          className="object-cover object-center"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-primary-900 leading-tight tracking-tight mb-5">
        {title}
      </h1>

      {/* Meta row */}
      <div
        className="flex items-center justify-between text-sm text-neutral-500 pb-6 border-b border-neutral-200"
        aria-label="Blog post metadata"
      >
        <time dateTime={dateCreated} className="font-medium">
          {formatDate(dateCreated)}
        </time>
        <span aria-label={`Estimated read time: ${readTime}`}>{readTime}</span>
      </div>
    </header>
  )
}
