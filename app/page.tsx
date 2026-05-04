import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/Home/HeroSection'
import ServicesSection from '@/components/Home/ServicesSection'
import WhyTrustUsSection from '@/components/Home/WhyTrustUsSection'
import AboutSection from '@/components/Home/AboutSection'
import WhyApcleancoSection from '@/components/Home/WhyApcleancoSection'
import OurProcessSection from '@/components/Home/OurProcessSection'
import EcoFlywheel from '@/components/Home/EcoFlywheel'
import TestimonialsSection from '@/components/Home/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Garage Cleaning & Junk Removal Services NJ | AP cleanco',
  description: 'Professional garage cleanouts, junk removal & deep cleaning in New Jersey. Same-day service, eco-friendly disposal, affordable pricing. Get a free quote today.',
  keywords: [
    'garage cleaning near me',
    'junk removal near me',
    'garage cleanout service NJ',
    'deep cleaning services New Jersey',
    'affordable junk removal',
    'professional cleaners NJ',
    'garage decluttering',
    'same day cleaning service',
    'eco friendly junk disposal',
    'home organization services',
  ],
  openGraph: {
    title: 'Garage Cleaning & Junk Removal Services NJ | AP cleanco',
    description: 'Professional garage cleanouts, junk removal & deep cleaning in New Jersey. Same-day service, eco-friendly disposal.',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'Professional Garage Cleaning & Junk Removal NJ',
      },
    ],
  },
}

export default function HomePage() {
  return (
    <main>
      <div aria-hidden="true" className="h-0 md:h-10" />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyApcleancoSection />
      <WhyTrustUsSection />
      <OurProcessSection />
      <EcoFlywheel />
      {/* <TestimonialsSection /> */}
    </main>
  )
}
