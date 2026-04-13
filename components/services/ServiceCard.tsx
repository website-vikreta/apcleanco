'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Button from '../Button';
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center py-12 lg:py-16">
        {/* Image Container - Desktop Left Position */}
        {isImageLeft && (
          <div className="order-1 lg:col-span-1 h-80 md:h-72 lg:h-[420px] w-full">
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
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-3 lg:mb-4">
            {name}
          </h2>

          <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mb-6 max-w-xl">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="inline-flex">
              <Button
                variant="primary"
                size="md"
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                }
                iconPosition="left"
                aria-label={`Get a free quote for ${name}`}
              >
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Container - Desktop Right Position */}
        {!isImageLeft && (
          <div className="order-1 lg:order-2 lg:col-span-1 h-80 md:h-72 lg:h-[420px] w-full">
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
