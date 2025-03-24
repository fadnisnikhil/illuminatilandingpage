'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// The props interface matches ThreeComponents
interface ThreeWrapperProps {
  currentSection: number;
  section1State: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  };
  section2State: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  };
  section3State: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  };
  onModelLoad?: () => void;
}

// A simple loading spinner component
function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="flex flex-col items-center justify-center bg-black/40 p-6 rounded-lg">
        <div className="w-12 h-12 border-4 border-t-[#00c4a0] border-white/20 rounded-full animate-spin mb-3"></div>
        <p className="text-white text-base">Loading 3D Components...</p>
        <p className="text-white/70 text-sm mt-2">This may take a few moments</p>
      </div>
    </div>
  );
}

// Dynamically import PureClientThree with no SSR
// This is the key change - we're using a different approach that doesn't rely on @react-three packages
const ThreeScene = dynamic(() => import('./PureClientThree'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

export default function ThreeWrapper(props: ThreeWrapperProps) {
  const [mounted, setMounted] = useState(false);
  
  // Safer approach to client-side detection with useEffect
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Show nothing during initial render - this avoids hydration mismatch
  if (!mounted) {
    return null;
  }
  
  // Only render the Three.js scene after client-side mount is confirmed
  return <ThreeScene {...props} />;
} 