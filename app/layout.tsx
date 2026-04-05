import type { Metadata } from 'next'
import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ApcleanCo',
  description: 'Welcome to ApcleanCo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        {/* Spacer compensates for fixed header height:
            mobile  — navbar only  ≈ 88px  (h-22)
            desktop — topbar+navbar ≈ 128px (h-32) */}
        <div aria-hidden="true" className="h-22 md:h-32" />
        {children}
        <Footer />
      </body>
    </html>
  )
}
