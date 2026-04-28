import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBlogBySlug, getAllBlogs, getAllSlugs } from '@/lib/blog'
import BlogHeader from '@/components/blog-page/BlogHeader'
import BlogContent from '@/components/blog-page/BlogContent'
import RecentBlogs from '@/components/blog-page/RecentBlogs'

interface BlogDetailPageProps {
  params: { slug: string }
}

// Static generation: pre-render all known slugs
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Dynamic SEO metadata per post
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug)
  if (!blog) return {}

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.thumbnail, alt: blog.title }],
      type: 'article',
      publishedTime: blog.dateCreated,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.thumbnail],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  // Get up to 3 most recent blogs excluding the current one
  const recentBlogs = getAllBlogs()
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3)

  return (
    <main aria-label={`Blog post: ${blog.title}`}>
      <div aria-hidden="true" className="h-22 md:h-32" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 lg:py-16">
        {/* Blog header: thumbnail, title, meta */}
        <BlogHeader
          title={blog.title}
          dateCreated={blog.dateCreated}
          readTime={blog.readTime}
          thumbnail={blog.thumbnail}
        />

        {/* Markdown content */}
        <BlogContent contentHtml={blog.contentHtml} />

        {/* Recent articles */}
        <RecentBlogs blogs={recentBlogs} />
      </div>
    </main>
  )
}
