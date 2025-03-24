'use client';

import { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import FlavorCanImage from './FlavorCanImage';

// Simple client-side wrapper that safely loads 3D components
import ThreeWrapper from './ThreeWrapper';

// Dynamically import ProductCardCanvas with no SSR - Only used for the main animation, not for product cards
const ProductCardCanvas = dynamic(() => import('./ProductCardCanvas'), { ssr: false });

// Lightning effect component
function LightningEffect({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="lightning-container w-full h-full flex items-center justify-center">
        <div className="lightning-wrapper w-full h-full relative">
          {/* Main lightning flash */}
          <Image 
            src="/assets/cans/Lightning.png" 
            alt="Lightning Effect" 
            width={1200} 
            height={800}
            className={`w-full h-full object-cover lightning-flicker ${isVisible ? 'active' : ''}`}
            priority
          />
          
          {/* Secondary lightning flash with delay and different position */}
          <Image 
            src="/assets/cans/Lightning.png" 
            alt="Lightning Effect" 
            width={1200} 
            height={800}
            className={`absolute top-0 left-0 w-full h-full object-cover lightning-flicker-delayed mirror-x ${isVisible ? 'active' : ''}`}
            priority
            style={{ transform: 'scaleX(-1) rotate(15deg)', opacity: 0.7 }}
          />
          
          {/* Screen flash overlay */}
          <div className={`absolute inset-0 bg-white screen-flash ${isVisible ? 'active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}

export default function RollingCanScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const prevSectionRef = useRef(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  
  // Only render client-side components after hydration
  useEffect(() => {
    setIsClient(true);
    
    // Set up scroll direction detection
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
          setScrollDirection('down');
        } else if (currentScrollY < lastScrollY.current) {
          setScrollDirection('up');
        }
        lastScrollY.current = currentScrollY;
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Model transform states for each section
  const [section1State] = useState({
    position: [0, -2, 0] as [number, number, number],  // Centered but slightly lowered
    rotation: [0, 45, 0] as [number, number, number],  // Slight rotation to show the can design
    scale: 0.8             // Starting scale for the model
  });
  
  const [section2State] = useState({
    position: [-2, 0, 0] as [number, number, number],  // Positioned left but at normal height to be clearly visible
    rotation: [45, 120, 45] as [number, number, number],  // Transitional rotation between horizontal and vertical
    scale: 0.7              // Slightly smaller to fit with text
  });
  
  const [section3State] = useState({
    position: [0, -20, 0] as [number, number, number],  // Off-screen position
    rotation: [0, 0, 0] as [number, number, number],
    scale: 0                // Hidden
  });
  
  const [assetsLoaded, setAssetsLoaded] = useState({
    model: false,
    orange: false,
    leaf: false
  });
  
  // Show lightning effect when section changes - but only when scrolling down
  useEffect(() => {
    if (prevSectionRef.current !== currentSection) {
      // Only show lightning when:
      // 1. Going to a higher-numbered section (moving forward)
      // 2. AND scrolling direction is downward (or using dot navigation)
      const isMovingForward = currentSection > prevSectionRef.current;
      const isScrollingDown = scrollDirection === 'down' || scrollDirection === null;
      
      if (isMovingForward && isScrollingDown) {
        // Trigger lightning effect
        setShowLightning(true);
        
        // Apply camera shake effect to the main content
        const contentElement = document.querySelector('.relative.z-40');
        if (contentElement) {
          // Add shake class
          contentElement.classList.add('camera-shake');
          
          // Remove shake class after animation completes
          setTimeout(() => {
            contentElement.classList.remove('camera-shake');
          }, 500); // Reduced from 1000ms to 500ms
        }
        
        // Hide lightning after animation completes
        const timer = setTimeout(() => {
          setShowLightning(false);
        }, 600); // Reduced from 1200ms to 600ms
        
        return () => clearTimeout(timer);
      }
      
      // Always update the previous section reference
      prevSectionRef.current = currentSection;
    }
  }, [currentSection, scrollDirection]);
  
  // Register ScrollTrigger plugin
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Clean up any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Set initial positions for decorative elements
      gsap.set("#orange", {
        top: "65%",
        right: "15%", 
        scale: 0.9,
        rotate: 0,
      });
      
      gsap.set("#leaf", {
        top: "35%", 
        left: "12%",
        scale: 0.9,
        rotate: 0,
      });
      
      // Section 1 to Section 2 transition
      ScrollTrigger.create({
        trigger: ".section-two",
        start: "top 90%", // Start when section is barely visible
        end: "center center", // End when section is centered
        scrub: 4,          // Even more scrubbing for smoother transitions
        onEnter: () => {
          // When scrolling down from section 1 to 2
          setCurrentSection(1);
          // Explicitly set scroll direction
          setScrollDirection('down');
        },
        onLeaveBack: () => {
          // When scrolling back up from section 2 to 1
          setCurrentSection(0);
          // Explicitly set scroll direction
          setScrollDirection('up');
        }
      });
      
      // Section 2 to Section 3 transition
      ScrollTrigger.create({
        trigger: ".section-three",
        start: "top center",
        end: "top top",
        scrub: 1,
        onEnter: () => {
          // When scrolling down from section 2 to 3
          setCurrentSection(2);
          // Explicitly set scroll direction
          setScrollDirection('down');
          // Hide the 3D can when entering section 3
          gsap.to(".fixed.inset-0.pointer-events-none.z-20", {
            opacity: 0,
            duration: 0.5
          });
        },
        onLeaveBack: () => {
          // When scrolling back up from section 3 to 2
          setCurrentSection(1);
          // Explicitly set scroll direction
          setScrollDirection('up');
          // Show the 3D can when going back to section 2
          gsap.to(".fixed.inset-0.pointer-events-none.z-20", {
            opacity: 1,
            duration: 0.5
          });
        }
      });
      
      // Orange animation
      const orangeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-two",
          start: "top 80%",
          end: "center 30%",
          scrub: 1,
        }
      });
      
      orangeTl.to("#orange", {
        top: "70%",
        right: "15%",
        rotate: 45,
        scale: 0.8,
        duration: 1,
        ease: "power1.inOut",
      });
      
      // Leaf animation
      const leafTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-two",
          start: "top 80%",
          end: "center 30%",
          scrub: 1,
        }
      });
      
      leafTl.to("#leaf", {
        top: "30%",
        left: "12%",
        rotate: -30,
        scale: 0.7,
        duration: 1,
        ease: "power1.inOut",
      });
      
      // Fade out elements when entering section three
      ScrollTrigger.create({
        trigger: ".section-three",
        start: "top 70%",
        end: "top 30%",
        scrub: true,
        onUpdate: (self) => {
          // Smoothly fade elements based on scroll progress
          gsap.to(["#orange", "#leaf"], {
            autoAlpha: 1 - self.progress,
            duration: 0.3
          });
        }
      });

      // Fade elements back in when scrolling back from section three to section two
      ScrollTrigger.create({
        trigger: ".section-two",
        start: "bottom 30%",
        end: "bottom 10%", 
        scrub: true,
        onUpdate: (self) => {
          if (self.direction === -1) { // Scrolling up
            gsap.to(["#orange", "#leaf"], {
              autoAlpha: self.progress,
              duration: 0.3
            });
          }
        }
      });
      
      // Text animations for each section
      gsap.utils.toArray('.animate-text').forEach((element: any) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
      
      // Dot navigation
      const sections = document.querySelectorAll('section');
      const navDots = document.querySelectorAll('.nav-dot');
      
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => activateDot(index),
          onEnterBack: () => activateDot(index)
        });
      });
      
      const activateDot = (index: number) => {
        navDots.forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      };
      
      // Clean up on component unmount
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [assetsLoaded]);
  
  // Handle dot navigation click
  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[index]) {
      // If we're navigating forward in the sections, we'll show the lightning effect
      if (index > currentSection) {
        // Manually set scroll direction to down for forward navigation
        setScrollDirection('down');
      } else if (index < currentSection) {
        // Manually set scroll direction to up for backward navigation 
        setScrollDirection('up');
        // For backwards navigation, update prevSectionRef manually to prevent lightning
        prevSectionRef.current = index;
      }
      
      window.scrollTo({
        top: sections[index].offsetTop,
        behavior: 'smooth'
      });
    }
    
    // If we're scrolling to the products section (index 2), highlight it
    if (index === 2) {
      // Add a temporary highlight class to the products section
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.classList.add('highlight-section');
        // Remove the highlight after animation completes
        setTimeout(() => {
          productsSection.classList.remove('highlight-section');
        }, 1500);
      }
    }
  };
  
  // Add a function to scroll to the products section by ID for better reliability
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      // Since we're going to the products section (Section 3) from wherever we are
      if (currentSection < 2) {
        // If going forward/down, set the scroll direction explicitly
        setScrollDirection('down');
      } else {
        // If already at section 2 or beyond, don't show lightning
        prevSectionRef.current = 2;
        setScrollDirection('up');
      }
      
      productsSection.scrollIntoView({ behavior: 'smooth' });
      
      // Add a temporary highlight class
      productsSection.classList.add('highlight-section');
      // Remove the highlight after animation completes
      setTimeout(() => {
        productsSection.classList.remove('highlight-section');
      }, 1500);
    }
  };
  
  // Handle image load events
  const handleImageLoad = (asset: 'orange' | 'leaf') => {
    console.log(`${asset} loaded successfully`);
    setAssetsLoaded(prev => ({
      ...prev,
      [asset]: true
    }));
  };
  
  // Handle model load
  const handleModelLoad = () => {
    console.log('3D model loaded successfully');
    setAssetsLoaded(prev => ({
      ...prev,
      model: true
    }));
  };
  
  return (
    <div ref={containerRef} className="relative">
      {/* Lightning Effect */}
      {isClient && <LightningEffect isVisible={showLightning} />}
      
      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            className={`nav-dot w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 transition-colors ${dot === currentSection ? 'active' : ''}`}
            onClick={() => scrollToSection(dot)}
            aria-label={`Go to section ${dot + 1}`}
          />
        ))}
      </div>
      
      {/* 3D Components loaded through ThreeWrapper - only on client side */}
      {isClient && (
        <div className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-500">
          <ThreeWrapper
            currentSection={currentSection}
            section1State={section1State}
            section2State={section2State}
            section3State={section3State}
            onModelLoad={handleModelLoad}
          />
        </div>
      )}
      
      {/* Fixed decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Orange Image */}
        <Image 
          id="orange" 
          src="/assets/orange.png" 
          alt="Orange" 
          width={150}
          height={150}
          className="absolute transform-gpu opacity-90 pointer-events-none"
          style={{
            width: "150px",
            height: "auto",
            top: "65%",
            right: "15%",
            transform: "rotate(0deg) scale(0.9)"
          }}
          onLoad={() => handleImageLoad('orange')}
        />
        
        {/* Leaf Image */}
        <Image 
          id="leaf" 
          src="/assets/leaf.png" 
          alt="Leaf" 
          width={120}
          height={120}
          className="absolute transform-gpu opacity-90 pointer-events-none"
          style={{
            width: "120px",
            height: "auto",
            top: "35%",
            left: "12%",
            transform: "rotate(0deg) scale(0.9)"
          }}
          onLoad={() => handleImageLoad('leaf')}
        />
      </div>
      
      {/* Background gradient overlay - stays fixed behind everything */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-[-1] pointer-events-none"></div>
      
      {/* Content Sections - Higher z-index so text appears on top of animations */}
      <div className="relative z-40">
        {/* Hero Section - Fully transparent background */}
        <section className="section-one min-h-screen flex flex-col justify-center items-center relative z-30">
          <div className="container mx-auto px-6 py-24 relative">
            <div className="hero-content text-center max-w-4xl mx-auto relative">
              {/* Main title with enhanced visibility */}
              <h1 className="main-title mb-6">ILLUMINATI</h1>
              <p className="sub-title mb-12 max-w-xl mx-auto">
                Unleash the power of illumination with our revolutionary energy drink.
                Experience clarity like never before.
              </p>
              <button 
                onClick={() => scrollToProducts()} 
                className="bg-[#00c4a0] hover:bg-[#00b090] text-black py-3 px-8 rounded-full 
                font-bold text-lg tracking-wide transform transition-all duration-300 
                hover:scale-105 hover:shadow-lg shadow-[0_0_15px_rgba(0,196,160,0.5)] border-2 border-[#00c4a0]/80">
                Discover More
              </button>
            </div>
          </div>
        </section>
        
        {/* Section 2 - Flavor Section - Transparent background with better contrast */}
        <section className="section-two min-h-screen flex flex-col justify-center relative z-30">
          <div className="container mx-auto px-6 py-24">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
              {/* Left column - Space for can animation with transparency */}
              <div className="left-two h-[600px] relative hidden md:flex md:items-center md:justify-center md:col-span-2">
                {/* Subtle glow effect behind can - make it larger and moved higher */}
                <div className="absolute w-[600px] h-[600px] rounded-full bg-[#00c4a0]/10 filter blur-[80px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
                
                {/* Empty container for can positioning with larger dimensions */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  {/* This is where the can appears in section 1 */}
                  <div className="h-[450px] w-[300px] relative flex items-center justify-center">
                  </div>
                </div>
              </div>
              
              {/* Right Column: Text content, make it even more visible */}
              <div className="right-two px-4 md:px-0 max-w-lg md:col-span-3">
                <h3 className="text-[#00c4a0] font-bold text-xl mb-4 
                  text-shadow-lg tracking-wider">REVOLUTIONARY ENERGY</h3>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-white 
                  leading-tight tracking-tight
                  text-shadow-xl">ENHANCE YOUR <span className="text-[#00c4a0] relative 
                  inline-block transform">FOCUS</span></h2>
                <div className="space-y-6">
                  <p className="text-white text-lg leading-relaxed font-medium
                    text-shadow text-shadow-black">
                    ILLUMINATI energy is crafted with premium ingredients that boost your mental 
                    clarity and physical performance. Our proprietary blend delivers 
                    sustained energy without the crash.
                  </p>
                  <ul className="space-y-3">
                    {['Natural Caffeine', 'Zero Sugar', 'B-Vitamins', 'Electrolytes'].map((item, i) => (
                      <li key={i} className="flex items-center text-white">
                        <div className="w-2 h-2 rounded-full bg-[#00c4a0] mr-3"></div>
                        <span className="font-medium text-shadow text-shadow-black">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 3 - Products - Transparent background */}
        <section id="products" className="section-three min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            {/* Enhanced header with background element for better visibility */}
            <div className="text-center mb-16 relative">
              <div className="absolute inset-0 bg-black/30 filter blur-md rounded-2xl -z-10"></div>
              <h1 className="main-title mb-3">OUR PRODUCTS</h1>
              <h2 className="animate-text text-white text-4xl md:text-5xl font-bold drop-shadow-text">
                CHOOSE YOUR <span className="text-[#00c4a0] drop-shadow-glow">ILLUMINATI</span>
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mt-4 text-lg">
                Explore our range of energy drinks, each formulated to enhance your potential and illuminate your path to success.
              </p>
            </div>
            
            {/* Product cards with transparent background */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { name: 'BERRY', color: '#ff3366', description: 'Wild Berry Blast' },
                { name: 'ORIGINAL', color: '#00c4a0', description: 'Classic Illuminati Formula' },
                { name: 'ZERO', color: '#00bfff', description: 'Zero Sugar, Full Power' }
              ].map((product, index) => (
                <div
                  key={product.name}
                  className="card product-card flex flex-col items-center bg-transparent p-8 rounded-lg border border-white/10 shadow-xl hover:border-opacity-30 transition-all"
                  style={{ 
                    borderColor: product.color,
                    boxShadow: `0 5px 20px rgba(0,0,0,0.2), 0 0 15px ${product.color}20`
                  }}
                >
                  <div className="rounded-full mb-6 relative overflow-hidden h-[180px] w-[120px] bg-black/10 backdrop-blur-sm flex items-center justify-center">
                    {/* Use the 2D image instead of 3D model */}
                    <FlavorCanImage color={product.color} flavor={product.name} />
                  </div>
                  
                  <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-text" style={{ color: product.color }}>
                    {product.name}
                  </h3>
                  <p className="text-white/80 text-center mb-6 drop-shadow-sm">
                    {product.description}
                  </p>
                  
                  <Link 
                    href="/our-drink"
                    className="px-6 py-2 border rounded-full transition-colors text-sm inline-flex items-center hover:bg-white/5"
                    style={{ 
                      borderColor: product.color,
                      color: product.color
                    }}
                  >
                    View Details <ArrowRight size={14} className="ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      {/* Add CSS for active dot state and animations */}
      <style jsx global>{`
        /* Navigation dots */
        .nav-dot.active {
          background-color: #00c4a0;
          transform: scale(1.5);
        }
        
        /* Product cards */
        .card {
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 196, 160, 0.1);
        }
        
        /* Highlight animation for sections */
        @keyframes highlight-pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 196, 160, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(0, 196, 160, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 196, 160, 0); }
        }
        
        .highlight-section {
          animation: highlight-pulse 1.5s ease-out;
        }
        
        /* Lightning flicker animation */
        @keyframes lightning-flicker {
          0% { opacity: 0; }
          5% { opacity: 0.9; }
          10% { opacity: 0.2; }
          15% { opacity: 1; }
          20% { opacity: 0.3; }
          25% { opacity: 0.9; }
          30% { opacity: 0.2; }
          35% { opacity: 0.9; }
          40% { opacity: 0.3; }
          45% { opacity: 0.8; }
          50% { opacity: 1; }
          55% { opacity: 0.7; }
          60% { opacity: 0.3; }
          65% { opacity: 0.9; }
          70% { opacity: 0.2; }
          75% { opacity: 0.5; }
          80% { opacity: 0.1; }
          85% { opacity: 0.3; }
          90% { opacity: 0.1; }
          95% { opacity: 0.05; }
          100% { opacity: 0; }
        }
        
        /* Delayed lightning flicker for secondary lightning */
        @keyframes lightning-flicker-delayed {
          0% { opacity: 0; }
          15% { opacity: 0; }
          20% { opacity: 0.7; }
          25% { opacity: 0.1; }
          30% { opacity: 0.6; }
          35% { opacity: 0.2; }
          40% { opacity: 0.8; }
          45% { opacity: 0.3; }
          50% { opacity: 0.7; }
          55% { opacity: 0.5; }
          60% { opacity: 0.3; }
          65% { opacity: 0.6; }
          70% { opacity: 0.1; }
          75% { opacity: 0.4; }
          80% { opacity: 0.1; }
          85% { opacity: 0.2; }
          90% { opacity: 0.1; }
          95% { opacity: 0.05; }
          100% { opacity: 0; }
        }
        
        /* Screen flash animation */
        @keyframes screen-flash {
          0% { opacity: 0; }
          5% { opacity: 0.4; }
          10% { opacity: 0; }
          15% { opacity: 0.2; }
          20% { opacity: 0; }
          25% { opacity: 0.3; }
          30% { opacity: 0; }
          100% { opacity: 0; }
        }
        
        .lightning-flicker {
          opacity: 0;
        }
        
        .lightning-flicker.active {
          animation: lightning-flicker 600ms forwards;
        }
        
        .lightning-flicker-delayed.active {
          animation: lightning-flicker-delayed 600ms forwards;
        }
        
        .screen-flash {
          opacity: 0;
          mix-blend-mode: overlay;
        }
        
        .screen-flash.active {
          animation: screen-flash 600ms forwards;
        }
        
        /* Lightning container styles */
        .lightning-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }
        
        .lightning-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          mix-blend-mode: screen;
        }
        
        /* Enable hardware acceleration for smoother animations */
        .transform-gpu {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform;
        }
        
        /* Text shadows for better readability */
        .drop-shadow-text {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7),
                       0 4px 8px rgba(0, 0, 0, 0.5);
        }
        
        /* Enhanced glow for main title */
        .drop-shadow-glow {
          text-shadow: 0 0 20px rgba(0, 196, 160, 0.9),
                       0 0 40px rgba(0, 196, 160, 0.7),
                       0 0 60px rgba(0, 196, 160, 0.5),
                       0 2px 4px rgba(0, 0, 0, 1);
        }

        /* Stronger text shadow for better visibility against animations */
        .drop-shadow-strong {
          text-shadow: 0 0 3px rgba(0, 0, 0, 1),
                       0 2px 4px rgba(0, 0, 0, 1),
                       0 4px 8px rgba(0, 0, 0, 0.8);
        }
        
        /* Ensure dark page background */
        body {
          background-color: black;
        }

        /* Text outline for extreme visibility */
        h1, h2, h3 {
          -webkit-text-stroke: 1px rgba(0, 196, 160, 0.3);
        }

        /* White text outline for better contrast */
        p {
          -webkit-text-stroke: 0.2px rgba(255, 255, 255, 0.3);
        }

        .landing-page {
          /* Page background - keep dark */
          background-color: #000;
          color: white;
        }

        .main-title {
          font-weight: 900;
          font-size: clamp(4rem, 10vw, 8rem);
          letter-spacing: -0.05em;
          text-transform: uppercase;
          line-height: 0.9;
          /* Enhanced text shadow with dual layer effect */
          text-shadow: 
            0 0 12px rgba(0, 196, 160, 0.8),
            0 0 25px rgba(0, 196, 160, 0.6),
            0 1px 1px rgba(0, 0, 0, 0.8),
            0 2px 2px rgba(0, 0, 0, 0.8),
            0 4px 4px rgba(0, 0, 0, 0.8),
            0 8px 8px rgba(0, 0, 0, 0.8);
          background: linear-gradient(to bottom, #fff, #00c4a0);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          position: relative;
        }

        /* Enhanced sub-title style for better visibility */
        .sub-title {
          font-weight: 600;
          font-size: clamp(1.2rem, 4vw, 1.8rem);
          text-shadow: 
            0 0 10px rgba(0, 0, 0, 0.8),
            0 0 20px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(0, 0, 0, 0.5);
          color: white;
        }

        /* Camera shake animation */
        @keyframes camera-shake {
          0% { transform: translate(0, 0) rotate(0); }
          10% { transform: translate(-5px, -5px) rotate(-0.5deg); }
          20% { transform: translate(4px, 4px) rotate(0.5deg); }
          30% { transform: translate(-3px, 5px) rotate(0.5deg); }
          40% { transform: translate(4px, -4px) rotate(0.5deg); }
          50% { transform: translate(-1px, 3px) rotate(-0.5deg); }
          60% { transform: translate(2px, -2px) rotate(0.5deg); }
          70% { transform: translate(3px, 3px) rotate(-0.5deg); }
          80% { transform: translate(-2px, -2px) rotate(0.5deg); }
          90% { transform: translate(2px, 1px) rotate(0deg); }
          100% { transform: translate(0, 0) rotate(0); }
        }

        .camera-shake {
          animation: camera-shake 500ms ease;
        }
      `}</style>
    </div>
  );
} 