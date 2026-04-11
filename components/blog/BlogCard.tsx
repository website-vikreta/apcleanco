import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'
import Button from '@/components/Button'

interface BlogCardProps {
  blog: BlogPost
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article
      className="flex flex-col sm:flex-row border border-neutral-200 bg-white overflow-hidden"
      aria-label={blog.title}
    >
      {/* Thumbnail — left side on sm+, full width on mobile */}
      <Link
        href={`/blog/${blog.slug}`}
        className="block relative w-full sm:w-65 md:w-75 shrink-0 aspect-video sm:aspect-auto focus-visible:outline-2 focus-visible:outline-primary-500"
        aria-label={`Read ${blog.title}`}
        tabIndex={0}
      >
        <Image
          src={blog.thumbnail}
          alt={`Thumbnail for: ${blog.title}`}
          fill
          sizes="(max-width: 640px) 100vw, 300px"
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </Link>

      {/* Content — right side */}
      <div className="flex flex-col justify-between p-5 md:p-6 flex-1 min-w-0">
        {/* Top: title + meta */}
        <div>
          <Link
            href={`/blog/${blog.slug}`}
            className="group focus-visible:outline-2 focus-visible:outline-primary-500 rounded"
          >
            <h2 className="text-lg md:text-xl font-semibold text-primary-900 leading-snug tracking-tight mb-3 group-hover:text-primary-600 transition-colors duration-200">
              {blog.title}
            </h2>
          </Link>

          <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {blog.excerpt}
          </p>

          {/* Meta row */}
          <div
            className="flex items-center gap-4 text-xs text-neutral-400 mb-5"
            aria-label="Article metadata"
          >
            <span className="flex items-center gap-1.5">
              <i className="bi bi-calendar3" aria-hidden="true" />
              <time dateTime={blog.dateCreated}>{formatDate(blog.dateCreated)}</time>
            </span>
            <span
              aria-hidden="true"
              className="w-1 h-1 rounded-full bg-neutral-300"
            />
            <span className="flex items-center gap-1.5">
              <i className="bi bi-clock" aria-hidden="true" />
              <span>{blog.readTime}</span>
            </span>
          </div>
        </div>

        {/* CTA */}
        <div>
          <Link
            href={`/blog/${blog.slug}`}
            tabIndex={-1}
            aria-hidden="true"
          >
            <Button
              variant="secondary"
              size="sm"
              aria-label={`Read full article: ${blog.title}`}
            >
              Read Full Article
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
