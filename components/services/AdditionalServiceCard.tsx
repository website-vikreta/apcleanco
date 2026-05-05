'use client';

import Image from 'next/image';

interface AdditionalServiceCardProps {
  title: string;
  image: string;
  index: number;
}

export const AdditionalServiceCard = ({
  title,
  image,
  index,
}: AdditionalServiceCardProps) => {
  return (
    <div className="additional-service-card bg-white border border-neutral-200 rounded-xl overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Title with Icon */}
      <div className="p-5">
        <div className="flex items-start gap-2">
          <h3 className="text-sm md:text-base font-semibold text-primary-900 leading-snug">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};
       