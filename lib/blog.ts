import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  title: string
  dateCreated: string
  readTime: string
  thumbnail: string
  slug: string
  excerpt: string
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
