'use client';

import { useRef, useEffect, useState } from 'react';
import Head from 'next/head';

// Props interface matches our existing components
interface PureClientThreeProps {
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

export default function PureClientThree(props: PureClientThreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSectionState, setCurrentSectionState] = useState(props.currentSection);

  // Main initialization effect - runs once after component mounts
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (isInitialized) {
      return;
    }

    let isMounted = true;
    let THREE: any = null;
    let GLTFLoader: any = null;
    let gsap: any = null;
    let scene: any = null;
    let camera: any = null;
    let renderer: any = null;
    let model: any = null;

    // Import scripts and initialize
    const initThree = async () => {
      try {
        // Step 1: Load THREE core
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/three@0.133.0/build/three.min.js';
          script.onload = () => {
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load Three.js core'));
          document.head.appendChild(script);
        });

        if (!isMounted) return;
        
        // Step 2: Load GLTFLoader
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/three@0.133.0/examples/js/loaders/GLTFLoader.js';
          script.onload = () => {
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load GLTFLoader'));
          document.head.appendChild(script);
        });

        if (!isMounted) return;
        
        // Step 3: Load GSAP for animations
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
          script.onload = () => {
            gsap = (window as any).gsap;
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load GSAP'));
          document.head.appendChild(script);
        });

        if (!isMounted) return;

        // Step 4: Setup scene
        THREE = (window as any).THREE;
        GLTFLoader = THREE.GLTFLoader;
        
        if (!THREE || !GLTFLoader) {
          throw new Error('Three.js libraries not loaded correctly');
        }

        // Create scene, camera, renderer
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(
          35, 
          window.innerWidth / window.innerHeight, 
          0.1, 
          1000
        );
        camera.position.z = 10;
        
        renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true // Important for texture rendering
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Better shadow quality
        renderer.outputEncoding = THREE.sRGBEncoding; // Correct color space for textures
        
        // Clear container and append renderer
        if (containerRef.current) {
          while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
          }
          containerRef.current.appendChild(renderer.domElement);
        }
        
        // Setup lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        // Improve shadow quality
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        scene.add(directionalLight);
        
        // Add highlight light from another angle
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
        fillLight.position.set(-5, 2, 2);
        scene.add(fillLight);
        
        // Add shadow plane
        const shadowPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(100, 100),
          new THREE.ShadowMaterial({ opacity: 0.5 })
        );
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = -3;
        shadowPlane.receiveShadow = true;
        scene.add(shadowPlane);

        setIsInitialized(true);
        
        // Step 5: Load model with correct texture settings
        const loader = new GLTFLoader();
        
        // Add texture loading manager for debugging
        const loadingManager = new THREE.LoadingManager();
        loadingManager.onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
        };
        loadingManager.onError = (url: string) => {
        };
        loader.manager = loadingManager;
        
        // Critical fix: absolute URL to ensure correct path resolution
        const modelUrl = window.location.origin + '/can_soda_cocacola_gltf/scene.gltf';
        
        loader.load(
          modelUrl,
          (gltf: any) => {
            if (!isMounted) return;
            
            model = gltf.scene;
            modelRef.current = model;
            scene.add(model);
            
            // Add shadows and improve material settings for textures
            model.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Enhance materials to display textures better
                if (child.material) {
                  // If it's an array of materials
                  if (Array.isArray(child.material)) {
                    child.material = child.material.map((mat: any) => {
                      // Clone to avoid affecting other instances
                      const newMat = mat.clone();
                      newMat.needsUpdate = true;
                      
                      // Enable high quality rendering
                      newMat.roughness = 0.2;
                      newMat.metalness = 0.9;
                      
                      return newMat;
                    });
                  } else {
                    // Clone single material
                    const newMat = child.material.clone();
                    newMat.needsUpdate = true;
                    
                    // Enable high quality rendering
                    newMat.roughness = 0.2;
                    newMat.metalness = 0.9;
                    
                    child.material = newMat;
                  }
                }
              }
            });
            
            // Set initial position
            model.position.set(
              props.section1State.position[0],
              props.section1State.position[1],
              props.section1State.position[2]
            );
            
            // Rotate the can to horizontal position and show the front side
            model.rotation.set(
              90 * Math.PI / 180, // Exact 90 degrees on X to make it perfectly horizontal
              Math.PI, // 180 degrees on Y-axis to show the front side instead of the back
              270 * Math.PI / 180  // 90 degrees Z to show the label facing forward
            );
            
            model.scale.set(
              props.section1State.scale,
              props.section1State.scale,
              props.section1State.scale
            );
            
            // Adjust position to center the can now that rotation has changed
            model.position.y -= 0.5; // Minor adjustment to center the can better
            
            setModelLoaded(true);
            
            // Notify parent component
            if (props.onModelLoad) {
              props.onModelLoad();
            }
            
            // Start animation loop
            let previousSection = props.currentSection;
            const animate = () => {
              if (!isMounted) return;
              
              // Check section changes - now with smoother transitions
              if (previousSection !== props.currentSection) {
                updateModelForSection(props.currentSection);
                previousSection = props.currentSection;
              }
              
              // Always render each frame for smoother transitions
              renderer.render(scene, camera);
              
              // Request next frame
              requestAnimationFrame(animate);
            };
            
            // Start animation
            animate();
          },
          (progress: { loaded: number; total: number }) => {
            if (!isMounted) return;
            const percent = Math.round((progress.loaded / progress.total) * 100);
          },
          (error: { message: string }) => {
            if (!isMounted) return;
            setError(`Failed to load model: ${error.message}`);
          }
        );
        
        // Handle window resize
        const handleResize = () => {
          if (!isMounted || !camera || !renderer) return;
          
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Set up section change handler with GSAP for smooth animations
        const updateModelForSection = (currentSection: number) => {
          if (!isMounted || !model || !gsap) return;
          
          const targetState = 
            currentSection === 0 ? props.section1State :
            currentSection === 1 ? props.section2State :
            props.section3State;
          
          // Use GSAP for smooth animations
          if (currentSection === 1) {
            // For section 1 (ENHANCE YOUR FOCUS), position the can next to the text
            gsap.to(model.position, {
              x: -2, // Position in the left column but not too far left
              y: 0,  // Keep at normal height to ensure visibility
              z: 3,  // Push the can forward in 3D space to ensure it's visible
              duration: 2.5, // Much slower transition
              ease: "power1.inOut", // More gradual easing
              onStart: () => {
              },
              onComplete: () => {
              }
            });
          } else if (currentSection === 2) {
            // For section 2 (Original), position the can vertically in the center
            // Create a timeline for coordinated animations
            const tl = gsap.timeline({
              onStart: () => {
              },
              onComplete: () => {
                // Add continuous slow rotation after the initial animation
                gsap.to(model.rotation, {
                  y: model.rotation.y + Math.PI * 2,
                  duration: 12,
                  ease: "none",
                  repeat: -1
                });
              }
            });

            // First move to position while maintaining current rotation
            tl.to(model.position, {
              x: 0,
              y: 0.2,  // Raise slightly to center in card
              z: 3,    // Bring closer for better visibility
              duration: 2,
              ease: "power2.inOut"
            })
            // Then rotate to vertical position
            .to(model.rotation, {
              x: 0,
              y: Math.PI,
              z: 0,
              duration: 2,
              ease: "power2.inOut"
            }, "-=1.5") // Start rotation before position animation ends
            // Scale adjustment happens last and quickly
            .to(model.scale, {
              x: 1.2,  // Increased scale to match card dimensions
              y: 1.2,  // Increased scale to match card dimensions
              z: 1.2,  // Increased scale to match card dimensions
              duration: 1,
              ease: "power2.inOut"
            }, "-=1"); // Start scale before rotation ends
          } else {
            // For other sections, use the default target position
            gsap.to(model.position, {
              x: targetState.position[0],
              y: targetState.position[1],
              z: targetState.position[2],
              duration: 2.5, // Much slower transition
              ease: "power1.inOut", // More gradual easing
              onStart: () => {
              },
              onComplete: () => {
              }
            });
          }
          
          // Calculate rotations - horizontal for section 0, vertical for section 1, illuminati formula for section 2
          let targetXRotation, targetYRotation, targetZRotation;
          
          if (currentSection === 0) {
            // Perfectly horizontal orientation in section 0 (parallel to button)
            targetXRotation = 90 * Math.PI / 180; // Exact 90 degrees horizontal
            targetYRotation = Math.PI; // 180 degrees on Y-axis to show the front side
            targetZRotation = 90 * Math.PI / 180; // 90 degrees Z to show label facing forward
          } else if (currentSection === 1) {
            // Gradually rotate toward vertical but not fully vertical right away
            targetXRotation = 45 * Math.PI / 180; // Half-way between horizontal and vertical
            targetYRotation = Math.PI; // 180 degrees on Y-axis to show the front side
            targetZRotation = 45 * Math.PI / 180; // Partial Z rotation
          } else if (currentSection === 2) {
            // Vertical position with slight tilt for better readability
            targetXRotation = 0; // Vertical position
            targetYRotation = Math.PI; // Front facing
            targetZRotation = 0; // No Z rotation needed for vertical position
          } else {
            // Default rotation for other sections
            targetXRotation = targetState.rotation[0] * Math.PI / 180;
            targetYRotation = targetState.rotation[1] * Math.PI / 180;
            targetZRotation = targetState.rotation[2] * Math.PI / 180;
          }
          
          // Add rotation animation with sync to scroll speed
          gsap.to(model.rotation, {
            x: targetXRotation,
            y: targetYRotation,
            z: targetZRotation,
            duration: 2.5, // Much slower to match scroll speed
            ease: "power1.inOut" // More gradual easing
          });
          
          gsap.to(model.scale, {
            x: targetState.scale,
            y: targetState.scale,
            z: targetState.scale,
            duration: 4.2, 
            ease: "power2.inOut"
          });
          
          // Update state
          setCurrentSectionState(currentSection);
        };
        
        // Initial update
        updateModelForSection(props.currentSection);
                
        // Cleanup on unmount
        return () => {
          isMounted = false;
          window.removeEventListener('resize', handleResize);
          
          if (renderer) {
            renderer.dispose();
          }
          
          if (containerRef.current) {
            while (containerRef.current.firstChild) {
              containerRef.current.removeChild(containerRef.current.firstChild);
            }
          }
        };
      } catch (err: any) {
        if (!isMounted) return;
        setError(`Error: ${err.message}`);
      }
    };
    
    initThree();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  // Effect to handle section changes
  const { currentSection, section1State, section2State, section3State } = props;
  useEffect(() => {
    // This ensures the model updates properly when sections change
    if (currentSection !== currentSectionState && modelRef.current && (window as any).gsap && isInitialized) {
      const gsap = (window as any).gsap;
      const model = modelRef.current;
      
      const targetState = 
        currentSection === 0 ? section1State :
        currentSection === 1 ? section2State :
        section3State;
      
      // Use GSAP for smooth animations
      if (currentSection === 1) {
        // For section 1 (ENHANCE YOUR FOCUS), position the can next to the text
        gsap.to(model.position, {
          x: -2, // Position in the left column but not too far left
          y: 0,  // Keep at normal height to ensure visibility
          z: 3,  // Push the can forward in 3D space to ensure it's visible
          duration: 2.5, // Much slower transition
          ease: "power1.inOut", // More gradual easing
          onStart: () => {
          },
          onComplete: () => {
          }
        });
      } else if (currentSection === 2) {
        // For section 2 (Original), position the can vertically in the center
        // Create a timeline for coordinated animations
        const tl = gsap.timeline({
          onStart: () => {
          },
          onComplete: () => {
            // Add continuous slow rotation after the initial animation
            gsap.to(model.rotation, {
              y: model.rotation.y + Math.PI * 2,
              duration: 12,
              ease: "none",
              repeat: -1
            });
          }
        });

        // First move to position while maintaining current rotation
        tl.to(model.position, {
          x: 0,
          y: 0.2,  // Raise slightly to center in card
          z: 3,    // Bring closer for better visibility
          duration: 2,
          ease: "power2.inOut"
        })
        // Then rotate to vertical position
        .to(model.rotation, {
          x: 0,
          y: Math.PI,
          z: 0,
          duration: 2,
          ease: "power2.inOut"
        }, "-=1.5") // Start rotation before position animation ends
        // Scale adjustment happens last and quickly
        .to(model.scale, {
          x: 1.2,  // Increased scale to match card dimensions
          y: 1.2,  // Increased scale to match card dimensions
          z: 1.2,  // Increased scale to match card dimensions
          duration: 1,
          ease: "power2.inOut"
        }, "-=1"); // Start scale before rotation ends
      } else {
        // For other sections, use the default target position
        gsap.to(model.position, {
          x: targetState.position[0],
          y: targetState.position[1],
          z: targetState.position[2],
          duration: 2.5,
          ease: "power1.inOut",
          onStart: () => {
          },
          onComplete: () => {
          }
        });
      }
      
      // Calculate rotations - horizontal for section 0, vertical for section 1, illuminati formula for section 2
      let targetXRotation, targetYRotation, targetZRotation;
      
      if (currentSection === 0) {
        // Perfectly horizontal orientation in section 0 (parallel to button)
        targetXRotation = 90 * Math.PI / 180; // Exact 90 degrees horizontal
        targetYRotation = Math.PI; // 180 degrees on Y-axis to show the front side
        targetZRotation = 90 * Math.PI / 180; // 90 degrees Z to show label facing forward
      } else if (currentSection === 1) {
        // Gradually rotate toward vertical but not fully vertical right away
        targetXRotation = 45 * Math.PI / 180; // Half-way between horizontal and vertical
        targetYRotation = Math.PI; // 180 degrees on Y-axis to show the front side
        targetZRotation = 45 * Math.PI / 180; // Partial Z rotation
      } else if (currentSection === 2) {
        // Vertical position with slight tilt for better readability
        targetXRotation = 0; // Vertical position
        targetYRotation = Math.PI; // Front facing
        targetZRotation = 0; // No Z rotation needed for vertical position
      } else {
        // Default rotation for other sections
        targetXRotation = targetState.rotation[0] * Math.PI / 180;
        targetYRotation = targetState.rotation[1] * Math.PI / 180;
        targetZRotation = targetState.rotation[2] * Math.PI / 180;
      }
      
      // Add rotation animation with sync to scroll speed
      gsap.to(model.rotation, {
        x: targetXRotation,
        y: targetYRotation,
        z: targetZRotation,
        duration: 2.5, // Much slower to match scroll speed
        ease: "power1.inOut" // More gradual easing
      });
      
      gsap.to(model.scale, {
        x: targetState.scale,
        y: targetState.scale,
        z: targetState.scale,
        duration: 1.2, 
        ease: "power2.inOut"
      });
      
      setCurrentSectionState(currentSection);
    }
  }, [currentSection, section1State, section2State, section3State, currentSectionState, modelRef, isInitialized]);
  
  return (
    <>
      {/* Container for the 3D scene */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-none z-50" />
      
      {/* Loading indicator */}
      {(!isInitialized || !modelLoaded) && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none">
          <div className="w-16 h-16 border-4 border-t-[#00c4a0] border-white/30 rounded-full animate-spin mb-4"></div>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-none">
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 max-w-md">
            <h3 className="text-red-500 font-bold text-lg mb-2">Error Loading 3D Content</h3>
            <p className="text-white">{error}</p>
            <p className="text-white/70 mt-4 text-sm">
              Try refreshing the page or check your internet connection.
            </p>
          </div>
        </div>
      )}
    </>
  );
} 