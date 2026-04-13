'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

gsap.registerPlugin(useGSAP);

interface BeforeAfterImageProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  className?: string;
}

export const BeforeAfterImage = ({
  beforeImage,
  afterImage,
  alt,
  className = '',
}: BeforeAfterImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const afterLayerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useGSAP(
    (context, contextSafe) => {
      const handleMouseMove = contextSafe((e: MouseEvent) => {
        if (!containerRef.current || !afterLayerRef.current || !dividerRef.current) {
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        // Constrain between 0 and 100
        const constrainedPercentage = Math.max(0, Math.min(100, percentage));

        gsap.to(afterLayerRef.current, {
          width: `${constrainedPercentage}%`,
          duration: 0.1,
          overwrite: 'auto',
        });

        gsap.to(dividerRef.current, {
          left: `${constrainedPercentage}%`,
          duration: 0.1,
          overwrite: 'auto',
        });

        setIsInteracting(true);
      });

      const handleTouchMove = contextSafe((e: TouchEvent) => {
        if (!containerRef.current || !afterLayerRef.current || !dividerRef.current) {
          return;
        }

        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        // Constrain between 0 and 100
        const constrainedPercentage = Math.max(0, Math.min(100, percentage));

        gsap.to(afterLayerRef.current, {
          width: `${constrainedPercentage}%`,
          duration: 0.1,
          overwrite: 'auto',
        });

        gsap.to(dividerRef.current, {
          left: `${constrainedPercentage}%`,
          duration: 0.1,
          overwrite: 'auto',
        });

        setIsInteracting(true);
      });

      const handleMouseEnter = () => {
        setIsInteracting(true);
      };

      const handleMouseLeave = contextSafe(() => {
        // Animate back to 50% when mouse leaves
        gsap.to(afterLayerRef.current, {
          width: '50%',
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.to(dividerRef.current, {
          left: '50%',
          duration: 0.5,
          ease: 'power2.out',
        });

        setIsInteracting(false);
      });

      const container = containerRef.current;
      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('touchmove', handleTouchMove, {
          passive: true,
        });

        return () => {
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('mouseenter', handleMouseEnter);
          container.removeEventListener('mouseleave', handleMouseLeave);
          container.removeEventListener('touchmove', handleTouchMove);
        };
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-neutral-100 rounded-lg ${className}`}
      role="img"
      aria-label={`Before and after comparison: ${alt}`}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage}
          alt={`Before: ${alt}`}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
        />
      </div>

      {/* After Image (Masked, Top Layer) */}
      <div
        ref={afterLayerRef}
        className="absolute inset-0 w-1/2 h-full overflow-hidden will-change-[width]"
        aria-hidden="true"
      >
        <Image
          src={afterImage}
          alt={`After: ${alt}`}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
        />
      </div>

      {/* Vertical Divider Line */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-1/2 w-1 h-full bg-white transform -translate-x-1/2 shadow-lg will-change-[left] cursor-col-resize z-10"
        aria-hidden="true"
      >
        {/* Small handle indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-primary-500">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-primary-500 rounded-full" />
            <div className="w-0.5 h-4 bg-primary-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      {!isInteracting && (
        <>
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
            Before
          </div>
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
            After
          </div>
        </>
      )}
    </div>
  );
};
