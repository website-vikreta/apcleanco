import type { Metadata } from 'next'
import { getAllBlogs } from '@/lib/blog'
import BlogHero from '@/components/blog/BlogHero'
import BlogList from '@/components/blog/BlogList'
import BlogSidebar from '@/components/blog/BlogSidebar'

export const metadata: Metadata = {
  title: 'Blog | Garage Cleaning Tips & Industry Insights',
  description:
    'Stay updated with the latest garage cleaning tips, junk removal guides, industry insights, and news from the AP cleanco team.',
  keywords: [
    'garage cleaning tips',
    'junk removal guide',
    'garage declutter',
    'cleanout advice',
    'ap cleanco blog',
    'debris removal insights',
  ],
}

export default function BlogPage() {
  const blogs = getAllBlogs()

  return (
    <main>
      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <BlogHero />

      {/* ── Blog Listing + Sidebar ────────────────────────────────────────────── */}
      <section
        aria-labelledby="blog-listing-heading"
        className="bg-neutral-50 py-12 md:py-16 lg:py-20"
      >
        {/* Screen-reader-only heading for the listing region */}
        <h2 id="blog-listing-heading" className="sr-only">
          All Blog Articles
        </h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            lg: two-column grid (70/30)
            md/sm: single column (list first, then sidebar)
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 lg:gap-12 items-start">
            {/* ── Left column: Blog List ──────────────────────────────────────── */}
            <BlogList blogs={blogs} />

            {/* ── Right column: Sidebar ───────────────────────────────────────── */}
            <BlogSidebar />
          </div>
        </div>
      </section>
    </main>
  )
}
