'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface FlavorCanImageProps {
  color: string;
  flavor: string;
}

/**
 * A component to display 2D images of the energy drink cans for each flavor
 */
export default function FlavorCanImage({ color, flavor }: FlavorCanImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const objectRef = useRef<HTMLObjectElement>(null);

  // Map flavors to their image paths
  const getImagePath = (flavor: string) => {
    const flavorLower = flavor.toLowerCase();
    if (flavorLower === 'berry') {
      return '/assets/cans/berry-can.svg';
    } else if (flavorLower === 'zero') {
      return '/assets/cans/zero-can.svg';
    } else {
      // Default to original
      return '/assets/cans/original-can.svg';
    }
  };

  const imagePath = getImagePath(flavor);

  // Handle SVG loading with useEffect
  useEffect(() => {
    const objectElement = objectRef.current;
    
    if (!objectElement) return;
    
    const handleLoad = () => {
      setIsLoading(false);
    };
    
    const handleError = () => {
      setError('Failed to load image');
      setIsLoading(false);
    };
    
    // Set a timeout to make sure we don't wait forever
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 2000);
    
    objectElement.addEventListener('load', handleLoad);
    objectElement.addEventListener('error', handleError);
    
    return () => {
      objectElement.removeEventListener('load', handleLoad);
      objectElement.removeEventListener('error', handleError);
      clearTimeout(timer);
    };
  }, [isLoading]);

  // Display a fallback if there's an error
  if (error) {
    return (
      <div className="h-[180px] w-[120px] bg-gradient-to-b from-black/20 to-black/40 rounded-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[#00c4a0]/10 flex items-center justify-center">
          <div className="text-[#00c4a0] text-xs font-semibold">ILLUMINATI</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[180px] w-[120px] relative flex items-center justify-center">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-t-[#00c4a0] border-white/20 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Can image */}
      <object 
        ref={objectRef}
        data={imagePath}
        type="image/svg+xml"
        className={`w-full h-full transition-opacity duration-300 object-contain ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Fallback for browsers that don't support SVG */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-black/20 to-black/40 rounded-full">
          <div className="text-center">
            <div className="text-[#00c4a0] text-xs font-semibold">ILLUMINATI</div>
            <div className="text-white/80 text-xs mt-1">{flavor}</div>
          </div>
        </div>
      </object>
    </div>
  );
} 