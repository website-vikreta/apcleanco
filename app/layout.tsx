import type { Metadata } from 'next'
import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from '@/components/Navbar'

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
        <Navbar />
        {children}
      </body>
    </html>
  )
}
