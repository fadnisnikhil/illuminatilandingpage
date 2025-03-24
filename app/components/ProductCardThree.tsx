'use client';

import { useRef, useEffect, useState } from 'react';

// Define types for Three.js objects we'll use
interface ThreeGLTF {
  scene: any;
  scenes: any[];
  cameras: any[];
  animations: any[];
}

interface LoadProgressEvent {
  loaded: number;
  total: number;
}

// Props for the component
interface ProductCardThreeProps {
  color: string;
  index: number;
}

export default function ProductCardThree({ color, index }: ProductCardThreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Initialize Three.js after component mounts
  useEffect(() => {
    // Avoid re-initializing if already done
    if (!containerRef.current || isInitialized) {
      return;
    }

    let isMounted = true;
    let THREE: any = null;
    let GLTFLoader: any = null;
    let scene: any = null;
    let camera: any = null;
    let renderer: any = null;
    let model: any = null;
    let animationFrameId: number | null = null;

    // Load Three.js and initialize scene
    const loadScene = async () => {
      try {
        // Import modules
        const threeModule = await import('three');
        THREE = threeModule;
        
        const { GLTFLoader: GLTFLoaderClass } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        GLTFLoader = GLTFLoaderClass;
        
        if (!isMounted) return;
        
        // Create scene
        scene = new THREE.Scene();
        
        // Create camera
        camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer
        renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true
        });
        renderer.setSize(120, 180);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Handle THREE.js version compatibility
        if (renderer.outputEncoding !== undefined && THREE.sRGBEncoding !== undefined) {
          renderer.outputEncoding = THREE.sRGBEncoding;
        }
        
        // Add renderer to DOM
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(renderer.domElement);
        }
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        setIsInitialized(true);
        
        // Load model
        const loader = new GLTFLoader();
        const modelPath = '/can_soda_cocacola_gltf/scene.gltf';
        
        loader.load(
          modelPath,
          function(gltf: ThreeGLTF) {
            if (!isMounted) return;
            
            model = gltf.scene;
            scene.add(model);
            
            // Adjust model position and scale
            model.position.set(0, -0.1, 0);
            model.rotation.set(
              Math.PI, // 180 degrees X rotation
              Math.PI, // 180 degrees Y rotation
              Math.PI  // 180 degrees Z rotation
            );
            model.scale.set(0.6, 0.6, 0.6);
            
            // Apply color tint based on flavor
            model.traverse(function(node: any) {
              if (node.isMesh && node.material) {
                // Handle both single material and material array
                const materials = Array.isArray(node.material) ? node.material : [node.material];
                
                for (let i = 0; i < materials.length; i++) {
                  const mat = materials[i].clone();
                  
                  // Apply color tint based on product type
                  if (color === "#ff3366") { // Berry
                    mat.color = new THREE.Color(1.2, 0.8, 0.8);
                  } else if (color === "#00bfff") { // Zero
                    mat.color = new THREE.Color(0.8, 0.9, 1.2);
                  }
                  
                  mat.needsUpdate = true;
                  
                  if (Array.isArray(node.material)) {
                    node.material[i] = mat;
                  } else {
                    node.material = mat;
                  }
                }
              }
            });
            
            setModelLoaded(true);
            
            // Animation loop
            const animate = function() {
              if (!isMounted) return;
              
              // Slow rotation animation
              if (model) {
                model.rotation.y += 0.01;
              }
              
              renderer.render(scene, camera);
              animationFrameId = requestAnimationFrame(animate);
            };
            
            animate();
          },
          // Progress callback
          function(xhr: LoadProgressEvent) {
            if (!isMounted) return;
            const progress = Math.round((xhr.loaded / xhr.total) * 100);
            setLoadingProgress(progress);
          },
          // Error callback
          function(err: Error) {
            if (!isMounted) return;
            console.error('Error loading model:', err);
            setError(`Failed to load model: ${err.message}`);
          }
        );
        
        // Handle window resize
        const handleResize = () => {
          if (camera && renderer) {
            renderer.setSize(120, 180);
            camera.updateProjectionMatrix();
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup function
        return () => {
          isMounted = false;
          window.removeEventListener('resize', handleResize);
          
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
          }
          
          if (renderer) {
            renderer.dispose();
          }
          
          if (scene) {
            scene.clear();
          }
          
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
        };
      } catch (err: any) {
        if (!isMounted) return;
        console.error('Failed to initialize Three.js:', err);
        setError(`Initialization error: ${err.message}`);
      }
    };
    
    loadScene();
    
    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, [color, index, isInitialized]);
  
  // Show fallback if there's an error
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
    <div className="h-[180px] w-[120px] relative">
      {/* 3D container */}
      <div ref={containerRef} className="absolute inset-0 rounded-full overflow-hidden"></div>
      
      {/* Loading indicator */}
      {(!isInitialized || !modelLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-t-[#00c4a0] border-white/20 rounded-full animate-spin"></div>
          {loadingProgress > 0 && (
            <div className="absolute mt-12 text-xs text-white">{loadingProgress}%</div>
          )}
        </div>
      )}
    </div>
  );
} 