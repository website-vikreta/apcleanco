import fs from 'fs'
import path from 'path'

export interface LegalPage {
  slug: string
  contentHtml: string
}

const legalDirectory = path.join(process.cwd(), 'data/legal')

/**
 * Get legal page content by slug (e.g., 'privacy-policy')
 * Reads HTML file directly from data/legal/
 * Metadata (title, date) managed in page components
 */
export function getLegalPageBySlug(slug: string): LegalPage | null {
  try {
    const filePath = path.join(legalDirectory, `${slug}.html`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const contentHtml = fs.readFileSync(filePath, 'utf8')

    return {
      slug,
      contentHtml,
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
