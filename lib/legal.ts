import fs from 'fs'
import path from 'path'

export interface LegalPage {
  title: string
  slug: string
  contentHtml: string
  lastUpdated?: string
}

const legalDirectory = path.join(process.cwd(), 'data/legal')

/**
 * Get legal page content by slug (e.g., 'privacy-policy')
 * Reads HTML file directly from data/legal/
 */
export function getLegalPageBySlug(slug: string): LegalPage | null {
  try {
    const filePath = path.join(legalDirectory, `${slug}.html`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const contentHtml = fs.readFileSync(filePath, 'utf8')

    // Extract title from HTML (h1 tag)
    const titleMatch = contentHtml.match(/<h1>([^<]+)<\/h1>/)
    const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ')

    // Extract last updated date from HTML (strong tag with "Last Updated:")
    const dateMatch = contentHtml.match(/<strong>Last Updated:<\/strong>\s*([^<]+)/)
    const lastUpdated = dateMatch ? dateMatch[1] : undefined

    return {
      title,
      slug,
      contentHtml,
      lastUpdated,
    }
  } catch (error) {
    console.error(`Error loading legal page "${slug}":`, error)
    return null
  }
}

/**
 * Get list of all available legal pages
 */
export function getAllLegalPages(): string[] {
  try {
    const files = fs.readdirSync(legalDirectory)
    return files
      .filter((file) => file.endsWith('.html'))
      .map((file) => file.replace(/\.html$/, ''))
  } catch (error) {
    console.error('Error loading legal pages:', error)
    return []
  }
}
