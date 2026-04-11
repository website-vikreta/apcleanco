import React from 'react'
import type { BlogPost } from '@/lib/blog'
import RecentBlogCard from './RecentBlogCard'

interface RecentBlogsProps {
  blogs: BlogPost[]
}

export default function RecentBlogs({ blogs }: RecentBlogsProps) {
  if (blogs.length === 0) return null

  return (
    <section
      aria-labelledby="recent-blogs-heading"
      className="mt-16 pt-12 border-t border-neutral-200"
    >
      <h2
        id="recent-blogs-heading"
        className="text-2xl font-bold text-primary-900 mb-8 tracking-tight"
      >
        Recent Articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <RecentBlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  )
}
