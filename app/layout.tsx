import type { Metadata } from 'next'
import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { StructuredData } from '@/components/StructuredData'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: {
    default: 'Garage Cleaning & Junk Removal Near Me | AP cleanco NJ',
    template: '%s | AP cleanco',
  },
  description: 'Professional garage cleanouts, junk removal, and deep cleaning services in New Jersey. Same-day availability, eco-friendly disposal, free quotes.',
  keywords: ['garage cleaning near me', 'junk removal near me', 'deep cleaning NJ', 'professional cleaners New Jersey'],
  metadataBase: new URL('https://apcleanco.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apcleanco.com',
    siteName: 'AP cleanco',
    title: 'Garage Cleaning & Junk Removal Near Me | AP cleanco NJ',
    description: 'Professional garage cleanouts, junk removal, and deep cleaning services in New Jersey.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AP cleanco - Garage Cleaning & Junk Removal NJ',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <ThemeSwitcher />
      </body>
    </html>
  )
}
