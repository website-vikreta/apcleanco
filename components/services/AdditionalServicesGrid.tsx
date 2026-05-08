'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Button from '@/components/Button';
import { AdditionalServiceCard } from './AdditionalServiceCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const additionalServices = [
  'Garage Inspection & Consultation',
  'Sorting & Categorization',
  'Junk & Debris Removal',
  'Responsible Disposal & Recycling',
  'Floor Vacuuming & Dust Removal',
  'Power Washing for Deep Clean',
  'Floor Mopping & Finishing',
  'Dusting Shelves, Walls & Corners',
  'Stain & Grime Scrubbing',
  'Final Organization & Storage Setup',
];

// Intelligent image mapping for services - uses all available images
const serviceImageMap: { [key: string]: string } = {
  'Garage Inspection & Consultation': '/services/garage-inspection.jpeg',
  'Sorting & Categorization': '/services/sorting-category.jpeg',
  'Junk & Debris Removal': '/services/junk-debris-removal.jpeg',
  'Responsible Disposal & Recycling': '/services/recycle.jpeg',
  'Floor Vacuuming & Dust Removal': '/services/vaccuming-floor.jpeg',
  'Power Washing for Deep Clean': '/services/power-wash.jpeg',
  'Floor Mopping & Finishing': '/services/floor-mopping.jpeg',
  'Dusting Shelves, Walls & Corners': '/services/dusting-shelves.jpeg',
  'Stain & Grime Scrubbing': '/services/scrubbing.jpeg',
  'Final Organization & Storage Setup': '/services/sorting-organize.jpeg',
};

const getServiceImage = (serviceName: string): string => {
  return serviceImageMap[serviceName] || '/hero-image.png';
};

export const AdditionalServicesGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.additional-service-card');

      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Enhanced Typography */}
        <div className="text-center mb-12 md:mb-16">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full mb-4">
            <svg
              className="w-4 h-4 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-semibold text-primary-700 uppercase tracking-wide">
              Complete Service Suite
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 leading-tight">
            Additional Services We Offer
          </h2>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 mb-12"
        >
          {additionalServices.map((service, index) => (
            <AdditionalServiceCard
              key={index}
              title={service}
              image={getServiceImage(service)}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link href="/pricing" className="inline-flex">
            <Button variant="primary" size="lg">
              View Pricing
            </Button>
          </Link>

          <a
            href="https://calendly.com/your-calendly-link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button variant="secondary" size="lg">
              Book a Free Call
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
