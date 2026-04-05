import React from 'react'
import HeroSection from '@/components/Home/HeroSection'
import ServicesSection from '@/components/Home/ServicesSection'
import AboutSection from '@/components/Home/AboutSection'
import WhyApcleancoSection from '@/components/Home/WhyApcleancoSection'
import ImpactSection from '@/components/Home/ImpactSection'
import TestimonialsSection from '@/components/Home/TestimonialsSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyApcleancoSection />
      <ImpactSection />
      <TestimonialsSection />
    </main>
  )
}
