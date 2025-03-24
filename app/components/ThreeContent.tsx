'use client';

import { useRef, useEffect, Suspense, useMemo, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, Html, Environment } from '@react-three/drei';
import { Group, Object3D } from 'three';
import * as THREE from 'three';
import gsap from 'gsap';

// Define model path constant to ensure consistency
const MODEL_PATH = '/can_soda_cocacola_gltf/scene.gltf';

// Types for props
interface ThreeContentProps {
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

// Loading indicator inside canvas
function LoadingIndicator() {
  return (
    <Html center>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-[#00c4a0] border-white/20 rounded-full animate-spin mx-auto mb-3"></div>
        <div className="text-white text-sm bg-black/60 px-4 py-2 rounded-md">
          Loading 3D Model...
        </div>
      </div>
    </Html>
  );
}

// Shadow plane component
function ShadowPlane() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial transparent opacity={0.5} />
    </mesh>
  );
}

// Coke can 3D model component with enhanced error handling
function CokeCanModel({ 
  initialPosition, 
  initialRotation, 
  targetPosition, 
  targetRotation, 
  targetScale, 
  isSection1, 
  isSection2, 
  isSection3, 
  modelRef,
  onLoad
}: {
  initialPosition: [number, number, number];
  initialRotation: [number, number, number];
  initialScale?: number;
  targetPosition: [number, number, number];
  targetRotation: [number, number, number];
  targetScale: number;
  isSection1: boolean;
  isSection2: boolean;
  isSection3: boolean;
  modelRef: React.RefObject<Object3D>;
  onLoad?: () => void;
}) {
  // Create a local ref for the model
  const localRef = useRef<Group>(null);
  const { scene } = useThree();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  
  // Load the model with error handling
  const { scene: model, nodes } = useGLTF(MODEL_PATH, undefined, undefined, 
    (e: Error | any) => {
      console.error('Error loading model:', e);
      setModelError(`Failed to load model: ${e.message || 'Unknown error'}`);
    }) as any;
  
  // Set up model on first render
  useEffect(() => {
    if (model && localRef.current) {
      try {
        // Clone the model to avoid conflicts
        const clonedScene = model.clone();
        
        // Clear any previous content
        while (localRef.current.children.length > 0) {
          localRef.current.remove(localRef.current.children[0]);
        }
        
        // Add the cloned model to our group
        localRef.current.add(clonedScene);
        
        // Update model properties
        if (localRef.current) {
          localRef.current.position.set(...initialPosition);
          localRef.current.rotation.set(...initialRotation.map(r => r * Math.PI / 180) as [number, number, number]);
          localRef.current.scale.set(targetScale, targetScale, targetScale);
          
          // Update the external ref if provided
          if (modelRef) {
            if (modelRef.current) {
              modelRef.current.position.copy(localRef.current.position);
              modelRef.current.rotation.copy(localRef.current.rotation);
              modelRef.current.scale.copy(localRef.current.scale);
            }
          }
        }
        
        // Set model as loaded
        setModelLoaded(true);
        
        // Notify parent component
        if (onLoad) {
          onLoad();
        }
        
        console.log('3D model loaded successfully');
      } catch (error) {
        console.error('Error setting up model:', error);
        setModelError('Error setting up model');
      }
    }
  }, [model, initialPosition, initialRotation, targetScale, modelRef, onLoad]);
  
  // Animation effect for position and rotation
  useEffect(() => {
    if (localRef.current && modelLoaded) {
      try {
        // Animate to target position and rotation
        gsap.to(localRef.current.position, {
          x: targetPosition[0],
          y: targetPosition[1],
          z: targetPosition[2],
          duration: 1.5,
          ease: "power3.inOut"
        });
        
        gsap.to(localRef.current.rotation, {
          x: targetRotation[0] * Math.PI / 180,
          y: targetRotation[1] * Math.PI / 180,
          z: targetRotation[2] * Math.PI / 180,
          duration: 1.5,
          ease: "power3.inOut"
        });
        
        gsap.to(localRef.current.scale, {
          x: targetScale,
          y: targetScale,
          z: targetScale,
          duration: 1.5,
          ease: "power3.inOut"
        });
      } catch (error) {
        console.error('Animation error:', error);
      }
    }
  }, [targetPosition, targetRotation, targetScale, modelLoaded]);
  
  // Additional animations based on current section
  useFrame((state) => {
    if (localRef.current && modelLoaded) {
      try {
        // Continuous rotation animation in section 1
        if (isSection1) {
          localRef.current.rotation.y += 0.003;
        }
        
        // Different animation for section 2
        if (isSection2) {
          localRef.current.rotation.y += 0.001;
        }
      } catch (error) {
        // Silently handle frame update errors
        console.error('Frame update error:', error);
      }
    }
  });
  
  // If there was an error loading the model, show error message
  if (modelError) {
    return (
      <Html center>
        <div className="bg-red-900/80 text-white p-3 rounded-md">
          <p>Error: {modelError}</p>
        </div>
      </Html>
    );
  }
  
  // Return the group that will contain our model
  return <group ref={localRef} />;
}

// The main Three.js content that will be loaded dynamically
export default function ThreeContent({
  currentSection,
  section1State,
  section2State,
  section3State,
  onModelLoad
}: ThreeContentProps) {
  const canModelRef = useRef<Object3D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState('Initializing canvas...');

  // Handle potential errors
  const handleError = (err: Error) => {
    console.error('Three.js error:', err);
    setError(`Error loading 3D graphics: ${err.message}`);
  };

  // If we caught an error, show an error message
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-black/80 p-6 rounded-lg">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  // Add a try-catch wrapper to handle any render errors
  try {
    return (
      <>
        <Canvas 
          ref={canvasRef} 
          shadows 
          camera={{ position: [0, 0, 10], fov: 35 }} 
          gl={{ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 2]} // Responsive pixel ratio for better performance
          onError={(e: any) => handleError(e as Error)} // Handle any errors from r3f
          onCreated={() => setDebugInfo('Canvas created successfully')}
        >
          <color attach="background" args={['transparent']} />
          
          {/* Lights */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.4} />
          
          {/* Content with suspense */}
          <Suspense fallback={<LoadingIndicator />}>
            <CokeCanModel 
              initialPosition={section1State.position}
              initialRotation={section1State.rotation}
              initialScale={section1State.scale}
              targetPosition={currentSection === 0 ? section1State.position : 
                             currentSection === 1 ? section2State.position : 
                             section3State.position}
              targetRotation={currentSection === 0 ? section1State.rotation : 
                            currentSection === 1 ? section2State.rotation : 
                            section3State.rotation}
              targetScale={currentSection === 0 ? section1State.scale : 
                         currentSection === 1 ? section2State.scale : 
                         section3State.scale}
              isSection1={currentSection === 0}
              isSection2={currentSection === 1}
              isSection3={currentSection === 2}
              modelRef={canModelRef}
              onLoad={onModelLoad}
            />
            <ShadowPlane />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
        
        {/* Debug info if in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-50">
            {debugInfo}
          </div>
        )}
      </>
    );
  } catch (err: any) {
    console.error('Error rendering Three.js content:', err);
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-black/80 p-6 rounded-lg">
          <p className="text-red-500">Failed to render 3D content: {err.message}</p>
        </div>
      </div>
    );
  }
}

// Preload model safely at the end
if (typeof window !== 'undefined') {
  try {
    useGLTF.preload(MODEL_PATH);
    console.log('Preloaded 3D model:', MODEL_PATH);
  } catch (e) {
    console.error('Error preloading model:', e);
  }
} 