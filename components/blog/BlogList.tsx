'use client'

import React, { useState, useCallback } from 'react'
import type { BlogPost } from '@/lib/blog'
import BlogCard from './BlogCard'

const PAGE_SIZE = 5

interface BlogListProps {
  blogs: BlogPost[]
}

export default function BlogList({ blogs }: BlogListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const hasMore = visibleCount < blogs.length
  const visibleBlogs = blogs.slice(0, visibleCount)

  const loadMore = useCallback(() => {
    const scrollY = window.scrollY
    setVisibleCount((prev) => prev + PAGE_SIZE)
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    })
  }, [])

  return (
    <section aria-label="Blog articles">
      <div className="flex flex-col gap-6">
        {visibleBlogs.map((blog, idx) => {
          const isLast = idx === visibleBlogs.length - 1
          return (
            <div key={blog.slug}>
              <BlogCard blog={blog} />

              {/* Load More link sits directly below the last visible card */}
              {isLast && hasMore && (
                <div className="group mt-6 border border-neutral-200 hover:border-primary-300 bg-neutral-50 hover:bg-primary-50 px-5 py-3 flex items-center justify-between transition-colors duration-150 cursor-pointer" onClick={loadMore}>
                  <p className="text-xs text-neutral-400 group-hover:text-primary-600 transition-colors duration-150">
                    Showing {visibleCount} of {blogs.length} articles
                  </p>
                  <button
                    type="button"
                    onClick={loadMore}
                    aria-label={`Load more articles. Currently showing ${visibleCount} of ${blogs.length}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-primary-600 group-hover:text-primary-800 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 rounded"
                  >
                    Load more
                    <i className="bi bi-chevron-down text-xs group-hover:translate-y-0.5 transition-transform duration-150" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* All loaded indicator */}
      {!hasMore && blogs.length > PAGE_SIZE && (
        <p className="mt-6 text-center text-xs text-neutral-400" aria-live="polite">
          All {blogs.length} articles loaded
        </p>
      )}
    </section>
  )
}
