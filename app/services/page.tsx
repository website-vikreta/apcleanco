import { Metadata } from 'next';
import { ServiceCard } from '@/components/services/ServiceCard';
import ServicesHero from '@/components/services/ServicesHero';
import { AdditionalServicesGrid } from '@/components/services/AdditionalServicesGrid';
import OurProcessSection from '@/components/Home/OurProcessSection';

export const metadata: Metadata = {
  title: 'Garage Cleaning & Organization Services | Services NJ',
  description: 'Professional garage cleaning, deep cleaning, house organizing, and pressure washing services throughout New Jersey. Expert decluttering solutions.',
  keywords: [
    'garage cleaning services NJ',
    'deep cleaning services NJ',
    'house organization services',
    'professional cleaners NJ',
    'garage organizing service',
    'pressure washing NJ',
    'debris removal NJ',
    'garage declutter service',
  ],
  openGraph: {
    title: 'Our Services | Garage Cleaning & Organization NJ',
    description:
      'Professional garage cleanouts, deep cleaning, and organization services throughout New Jersey.',
    url: 'https://apcleanco.com/services',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'AP cleanco Services - Garage Cleaning NJ',
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <main className="w-full">
      <div aria-hidden="true" className="h-0 md:h-10" />
      {/* Hero Section */}
      <ServicesHero />

      {/* Services Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto py-8">
          {/* Service 1: Garage Cleanouts - Image Left */}
          <ServiceCard
            id="garage-cleanouts"
            name="Garage Cleanouts"
            description="Transform your cluttered garage into a clean, functional space. Our professional team removes unwanted items, debris, and junk, leaving your garage spotless and ready to use. We handle everything from sorting to responsible disposal."
            beforeImage="/services/garage-after.jpeg"
            afterImage="/services/garage-before.jpeg"
            imageAlt="Garage cleanout transformation"
            imagePosition="left"
          />

          {/* Divider */}
          <hr className="my-6 lg:my-10 border-neutral-200" />

          {/* Service 2: Deep Cleaning - Image Right */}
          <ServiceCard
            id="deep-cleaning"
            name="Deep Cleaning"
            description="Experience a thorough clean that goes beyond the basics. Our deep cleaning service tackles every corner of your garage, including floors, walls, shelves, and hard-to-reach areas. We use eco-friendly methods to ensure your space is pristine and healthy."
            beforeImage="/services/deepcleaning-after.jpeg"
            afterImage="/services/deepcleaning-before.jpeg"
            imageAlt="Deep cleaning service results"
            imagePosition="right"
          />

          {/* Divider */}
          <hr className="my-6 lg:my-10 border-neutral-200" />

          {/* Service 3: Garage Organisation - Image Left */}
          <ServiceCard
            id="garage-organisation"
            name="Garage Organisation"
            description="Create an organized system that lasts. We design custom storage solutions tailored to your needs, install shelving and racks, and organize items for easy access and maintenance. A well-organized garage saves time and reduces stress."
            beforeImage="/services/garage-organization-after.jpeg"
            afterImage="/services/garage-organization-before.jpeg"
            imageAlt="Garage organization system"
            imagePosition="left"
          />
        </div>
      </section>

      {/* Additional Services Section */}
      <AdditionalServicesGrid />

      {/* Our Process Section */}
      <OurProcessSection />
    </main>
  );
}
