'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { BeforeAfterImage } from './BeforeAfterImage';

export interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  imageAlt: string;
  children?: ReactNode;
  imagePosition?: 'left' | 'right';
}

export const ServiceCard = ({
  id,
  name,
  description,
  beforeImage,
  afterImage,
  imageAlt,
  imagePosition = 'left',
}: ServiceCardProps) => {
  const isImageLeft = imagePosition === 'left';

  return (
    <section
      id={id}
      className="scroll-mt-20"
      aria-label={`${name} service`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center py-16 lg:py-20">
        {/* Image Container - Desktop Left Position */}
        {isImageLeft && (
          <div className="order-1 lg:col-span-1 h-96 md:h-80 lg:h-[500px] w-full">
            <BeforeAfterImage
              beforeImage={beforeImage}
              afterImage={afterImage}
              alt={imageAlt}
              className="h-full"
            />
          </div>
        )}

        {/* Content Container */}
        <div
          className={`order-2 lg:col-span-1 flex flex-col justify-center ${
            isImageLeft ? '' : 'lg:order-2'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-4 lg:mb-6">
            {name}
          </h2>

          <p className="text-lg text-neutral-700 leading-relaxed mb-8 max-w-xl">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label={`Get a free quote for ${name}`}
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* Image Container - Desktop Right Position */}
        {!isImageLeft && (
          <div className="order-1 lg:order-2 lg:col-span-1 h-96 md:h-80 lg:h-[500px] w-full">
            <BeforeAfterImage
              beforeImage={beforeImage}
              afterImage={afterImage}
              alt={imageAlt}
              className="h-full"
            />
          </div>
        )}
      </div>
    </section>
  );
};
