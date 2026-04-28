import { redirect } from 'next/navigation'

/**
 * Legal Index Route
 * Redirects to the privacy policy page
 * Future expansion: can serve as hub for multiple legal pages (ToS, GDPR, etc.)
 */
export default function LegalPage() {
  redirect('/legal/privacy-policy')
}
