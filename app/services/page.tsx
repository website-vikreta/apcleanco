import { Metadata } from 'next';
import { ServiceCard } from '@/components/services/ServiceCard';

export const metadata: Metadata = {
  title: 'Our Services | ApCleanCo',
  description:
    'Professional garage cleanouts, deep cleaning, and organization services. Discover how ApCleanCo transforms your space.',
  openGraph: {
    title: 'Our Services | ApCleanCo',
    description:
      'Professional garage cleanouts, deep cleaning, and organization services.',
    images: [
      {
        url: '/hero-image.png',
        width: 1200,
        height: 630,
        alt: 'ApCleanCo Services',
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed">
              At ApCleanCo, we deliver professional space transformation services.
              Explore our comprehensive solutions designed to declutter, organize,
              and revitalize your garage.
            </p>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto py-8">
          {/* Service 1: Garage Cleanouts - Image Left */}
          <ServiceCard
            id="garage-cleanouts"
            name="Garage Cleanouts"
            description="Transform your cluttered garage into a clean, functional space. Our professional team removes unwanted items, debris, and junk, leaving your garage spotless and ready to use. We handle everything from sorting to responsible disposal."
            beforeImage="/hero-image.png"
            afterImage="/after-service.png"
            imageAlt="Garage cleanout transformation"
            imagePosition="left"
          />

          {/* Divider */}
          <hr className="my-8 lg:my-16 border-neutral-200" />

          {/* Service 2: Deep Cleaning - Image Right */}
          <ServiceCard
            id="deep-cleaning"
            name="Deep Cleaning"
            description="Experience a thorough clean that goes beyond the basics. Our deep cleaning service tackles every corner of your garage, including floors, walls, shelves, and hard-to-reach areas. We use eco-friendly methods to ensure your space is pristine and healthy."
            beforeImage="/hero-image.png"
            afterImage="/after-service.png"
            imageAlt="Deep cleaning service results"
            imagePosition="right"
          />

          {/* Divider */}
          <hr className="my-8 lg:my-16 border-neutral-200" />

          {/* Service 3: Garage Organisation - Image Left */}
          <ServiceCard
            id="garage-organisation"
            name="Garage Organisation"
            description="Create an organized system that lasts. We design custom storage solutions tailored to your needs, install shelving and racks, and organize items for easy access and maintenance. A well-organized garage saves time and reduces stress."
            beforeImage="/hero-image.png"
            afterImage="/after-service.png"
            imageAlt="Garage organization system"
            imagePosition="left"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-neutral-100 mb-8 max-w-2xl mx-auto">
            Get a free quote for any of our services. Our team is ready to help you
            create the garage of your dreams.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-accent-500 text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 focus:ring-offset-primary-900"
            aria-label="Contact us to get started"
          >
            Schedule Your Free Consultation
          </a>
        </div>
      </section>
    </main>
  );
}
