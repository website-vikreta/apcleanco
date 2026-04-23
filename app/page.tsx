import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/Home/HeroSection'
import ServicesSection from '@/components/Home/ServicesSection'
import WhyTrustUsSection from '@/components/Home/WhyTrustUsSection'
import AboutSection from '@/components/Home/AboutSection'
import WhyApcleancoSection from '@/components/Home/WhyApcleancoSection'
import OurProcessSection from '@/components/Home/OurProcessSection'
import ImpactSection from '@/components/Home/ImpactSection'
import TestimonialsSection from '@/components/Home/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Garage Clean-Out & Junk Removal Services | AP cleanco',
  description:
    'Professional garage clean-out, junk removal, deep cleaning, and eco-friendly donation drop-off services. Fast, affordable, and reliable solutions to declutter and organize your space. Get a free quote today.',
  keywords: [
    'garage clean out services',
    'junk removal near me',
    'garage cleaning service',
    'debris removal',
    'furniture removal',
    'home organization services',
    'eco friendly junk removal',
    'donation pickup service',
    'garage decluttering',
    'residential junk removal',
    'affordable junk removal',
    'professional cleaning services',
    'ap cleanco',
  ],
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WhyTrustUsSection />
      <AboutSection />
      <WhyApcleancoSection />
      <OurProcessSection />
      <ImpactSection />
      {/* <TestimonialsSection /> */}
    </main>
  )
}
