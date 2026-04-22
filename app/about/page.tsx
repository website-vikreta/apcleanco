import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/about/HeroSection'
import StorySection from '@/components/about/StorySection'
import FoundersSection from '@/components/about/FoundersSection'
import VisionMissionSection from '@/components/about/VisionMissionSection'
import CTASection from '@/components/about/CTASection'

export const metadata: Metadata = {
  title: 'About AP Cleanco - Our Story & Mission | Premium Junk Removal',
  description:
    'Discover AP Cleanco\'s journey, founder story, and mission to transform spaces. Learn about our values, vision, and why we\'re the trusted choice for professional junk removal and garage cleanouts.',
  keywords: [
    'about ap cleanco',
    'junk removal company',
    'founder story',
    'professional cleaning company',
    'trusted junk removal',
    'garage cleanout service',
  ],
}

export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <FoundersSection />
      <VisionMissionSection />
      <CTASection />
    </main>
  )
}
