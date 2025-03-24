'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Types for props
interface ThreeComponentsProps {
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

// Loading indicator component
function LoadingIndicator() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#00c4a0] border-white/20 rounded-full animate-spin mb-3"></div>
        <p className="text-white text-sm">Loading 3D Components...</p>
      </div>
    </div>
  );
}

// Import ThreeContent with no SSR and explicit error handling
const ThreeContent = dynamic(() => 
  // We want to handle any import errors explicitly
  import('./ThreeContent')
    .then(mod => {
      const Component = mod.default;
      // Fix TypeScript error by using type assertion
      (Component as any).displayName = 'DynamicThreeContent';
      return Component;
    })
    .catch(err => {
      console.error('Failed to load ThreeContent:', err);
      // Return a component that will display the error
      const ErrorComponent = () => (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-red-900/80 text-white p-4 rounded-lg max-w-md text-center">
            <h3 className="text-lg font-bold mb-2">3D Rendering Error</h3>
            <p>Failed to load 3D components: {err.message}</p>
          </div>
        </div>
      );
      (ErrorComponent as any).displayName = 'ThreeContentError';
      return ErrorComponent;
    })
, { 
  ssr: false,
  loading: () => <LoadingIndicator />
});

// The main ThreeComponents wrapper
export default function ThreeComponents(props: ThreeComponentsProps) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Check for browser environment
  useEffect(() => {
    try {
      // Run on client only
      if (typeof window !== 'undefined') {
        setMounted(true);
      }
    } catch (err: any) {
      console.error('Error in ThreeComponents mount:', err);
      setError(err);
    }
  }, []);
  
  // Show nothing during SSR
  if (typeof window === 'undefined') {
    return null;
  }
  
  // Show error if anything went wrong
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-red-900/80 text-white p-4 rounded-lg max-w-md">
          <h3 className="text-lg font-bold mb-2">Error</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }
  
  // Return loading indicator until we confirm client-side rendering
  if (!mounted) {
    return <LoadingIndicator />;
  }
  
  // Render ThreeContent when ready
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <ThreeContent {...props} />
    </div>
  );
} 