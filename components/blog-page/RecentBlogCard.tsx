import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

interface RecentBlogCardProps {
  blog: BlogPost
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function RecentBlogCard({ blog }: RecentBlogCardProps) {
  return (
    <article aria-label={blog.title}>
      <Link
        href={`/blog/${blog.slug}`}
        className="group block focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded"
      >
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden mb-3">
          <Image
            src={blog.thumbnail}
            alt={`Cover image for: ${blog.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-primary-900 leading-snug tracking-tight group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
          {blog.title}
        </h3>

        {/* Date */}
        <time
          dateTime={blog.dateCreated}
          className="block mt-1.5 text-xs text-neutral-400"
        >
          {formatDate(blog.dateCreated)}
        </time>
      </Link>
    </article>
  )
}
