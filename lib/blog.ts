import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export interface BlogPost {
  title: string
  dateCreated: string
  readTime: string
  thumbnail: string
  slug: string
  excerpt: string
}

export interface BlogPostFull extends BlogPost {
  contentHtml: string
}

const blogsDirectory = path.join(process.cwd(), 'data/blog')

export function getAllBlogs(): BlogPost[] {
  const fileNames = fs.readdirSync(blogsDirectory).filter((f) => f.endsWith('.md'))

  const blogs: BlogPost[] = fileNames.map((fileName) => {
    const fullPath = path.join(blogsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      title: data.title ?? '',
      dateCreated: data.dateCreated ?? '',
      readTime: data.readTime ?? '',
      thumbnail: data.thumbnail ?? '/hero-image.png',
      slug: data.slug ?? fileName.replace(/\.md$/, ''),
      excerpt: data.excerpt ?? '',
    }
  })

  // Sort by date descending (newest first)
  return blogs.sort(
    (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(),
  )
}

export async function getBlogBySlug(slug: string): Promise<BlogPostFull | null> {
  const fileNames = fs.readdirSync(blogsDirectory).filter((f) => f.endsWith('.md'))

  for (const fileName of fileNames) {
    const fullPath = path.join(blogsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const fileSlug = data.slug ?? fileName.replace(/\.md$/, '')
    if (fileSlug !== slug) continue

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content)

    return {
      title: data.title ?? '',
      dateCreated: data.dateCreated ?? '',
      readTime: data.readTime ?? '',
      thumbnail: data.thumbnail ?? '/hero-image.png',
      slug: fileSlug,
      excerpt: data.excerpt ?? '',
      contentHtml: processedContent.toString(),
    }
  }

  return null
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(blogsDirectory).filter((f) => f.endsWith('.md'))
  return fileNames.map((fileName) => {
    const fullPath = path.join(blogsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return data.slug ?? fileName.replace(/\.md$/, '')
  })
}
