import type { Metadata } from 'next'
import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export const metadata: Metadata = {
  title: {
    default: 'AP cleanco',
    template: '%s | AP cleanco',
  },
  description: 'Professional garage clean-out and junk removal services.',
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
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <ThemeSwitcher />
      </body>
    </html>
  )
}
