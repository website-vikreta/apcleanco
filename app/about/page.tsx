import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/about/HeroSection'
import StorySection from '@/components/about/StorySection'
import FoundersSection from '@/components/about/FoundersSection'
import VisionMissionSection from '@/components/about/VisionMissionSection'
import CTASection from '@/components/about/CTASection'

export const metadata: Metadata = {
  title: 'About AP cleanco | NJ\'s Most Trusted Garage Cleaning Company',
  description: 'Meet the AP cleanco team. Discover our mission, values, and why New Jersey families trust us for professional garage cleanouts and junk removal since [year].',
  keywords: [
    'about AP cleanco',
    'professional cleaning company NJ',
    'trusted junk removal company',
    'best cleaning service New Jersey',
    'garage cleanout experts',
    'top rated cleaners NJ',
    'licensed cleaning company',
  ],
  openGraph: {
    title: 'About AP cleanco | NJ\'s Trusted Garage Cleaning Company',
    description: 'Our story, mission, and commitment to professional garage cleanouts and junk removal in New Jersey.',
    url: 'https://apcleanco.com/about',
  },
}

export default function AboutPage() {
  return (
    <main>
      <div aria-hidden="true" className="h-0 md:h-10" />
      <HeroSection />
      <StorySection />
      <FoundersSection />
      <VisionMissionSection />
      <CTASection />
    </main>
  )
}
