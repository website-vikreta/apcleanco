import { Metadata } from 'next';
import { ServiceCard } from '@/components/services/ServiceCard';
import ServicesHero from '@/components/services/ServicesHero';

export const metadata: Metadata = {
  title: 'Our Services | AP cleanco',
  description:
    'Professional garage cleanouts, deep cleaning, and organization services. Discover how AP cleanco transforms your space.',
  openGraph: {
    title: 'Our Services | AP cleanco',
    description:
      'Professional garage cleanouts, deep cleaning, and organization services.',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'AP cleanco Services',
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
            beforeImage="/after-service.png"
            afterImage="/hero-image.png"
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
            beforeImage="/after-service.png"
            afterImage="/hero-image.png"
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
            beforeImage="/after-service.png"
            afterImage="/hero-image.png"
            imageAlt="Garage organization system"
            imagePosition="left"
          />
        </div>
      </section>
    </main>
  );
}
