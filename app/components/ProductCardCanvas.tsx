'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Three.js content with no SSR
const ProductCardThree = dynamic(() => import('./ProductCardThree'), { 
  ssr: false,
  loading: () => (
    <div className="h-[180px] w-[120px] relative">
      <div className="h-full w-full bg-gradient-to-b from-black/20 to-black/40 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-t-[#00c4a0] border-white/20 rounded-full animate-spin"></div>
      </div>
    </div>
  )
});

// Product Card Canvas component
export default function ProductCardCanvas({ 
  color, 
  index 
}: {
  color: string;
  index: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Only render on client-side - after hydration is complete
  useEffect(() => {
    try {
      // Check if window object is available
      if (typeof window !== 'undefined') {
        // Check if WebGL is supported
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setError('WebGL not supported by your browser');
          return;
        }
        
        // If we reach here, WebGL is supported
        setMounted(true);
      }
    } catch (err) {
      setError('Error initializing WebGL');
      console.error(err);
    }
  }, []);
  
  // Handle error if component fails to load
  const handleError = (err: Error) => {
    console.error('Error loading 3D component:', err);
    setError(err.message);
  };
  
  // Return a static placeholder during SSR and initial client render
  // This ensures hydration matching
  if (!mounted) {
    return (
      <div className="h-[180px] w-[120px] relative">
        <div className="h-full w-full bg-gradient-to-b from-black/20 to-black/40 rounded-full flex items-center justify-center">
          <div className="text-[#00c4a0] text-xs font-semibold">ILLUMINATI</div>
        </div>
      </div>
    );
  }
  
  // Show error fallback if there was an error
  if (error) {
    return (
      <div className="h-[180px] w-[120px] relative">
        <div className="h-full w-full bg-gradient-to-b from-black/20 to-black/40 rounded-full flex items-center justify-center">
          <div className="text-[#00c4a0] text-xs font-semibold">ILLUMINATI</div>
        </div>
      </div>
    );
  }
  
  // Show actual Three.js content once mounted
  return (
    <div className="h-[180px] w-[120px] relative rounded-full overflow-hidden">
      <ProductCardThree color={color} index={index} />
    </div>
  );
} 