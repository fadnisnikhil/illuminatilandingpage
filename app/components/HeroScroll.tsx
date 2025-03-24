'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import SplashEffect from './SplashEffect';
import ProductCanSVG from './ProductCanSVG';

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Create spring-based scroll progress for smoother animations
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Transform scroll progress into various animation values
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);
  const y = useTransform(smoothProgress, [0, 1], [0, -100]);
  
  // Parallax for hero image
  const heroImageY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 1.1]);
  
  // Rotate product can based on scroll
  const productRotate = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 45, 90, 135, 180, 360]);
  
  // Liquid splash effect timing
  const splashOpacity = useTransform(smoothProgress, [0, 0.2, 0.3, 0.4], [0, 0, 1, 0.5]);
  const splashScale = useTransform(smoothProgress, [0, 0.2, 0.3, 0.5], [0.5, 0.6, 1, 1.2]);
  
  return (
    <div 
      ref={containerRef}
      className="relative h-[150vh] overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: heroImageY, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900" />
      </motion.div>
      
      {/* Hero Content with Scroll Animation */}
      <motion.div 
        className="absolute inset-0 flex items-center"
        style={{ opacity, y, scale }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="lg:w-1/2 z-10">
              <motion.h1 
                className="text-4xl md:text-7xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Unlock Your <span className="text-emerald-500">Inner Potential</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-2xl text-gray-200 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Energize your mind. Elevate your performance. Experience the enlightenment.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6">
                  <Link href="/our-drink">Discover the Drink</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
                  <Link href="/stores">Find a Store</Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Product Can with Animation */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative z-10">
              <div className="relative h-[500px] max-w-[300px] mx-auto">
                {/* Animated Splash Effect */}
                <motion.div 
                  className="absolute inset-0 z-0"
                  style={{ opacity: splashOpacity, scale: splashScale }}
                >
                  <SplashEffect color="#10b981" />
                </motion.div>
                
                {/* Rotating Can */}
                <motion.div 
                  className="relative h-full w-full preserve-3d"
                  style={{ rotateY: productRotate }}
                >
                  <ProductCanSVG 
                    color="#10b981"
                    secondaryColor="#047857"
                    label="ILLUMINATI"
                  />
                </motion.div>
                
                {/* Glow Effect */}
                <motion.div 
                  className="absolute -inset-10 bg-emerald-500 rounded-full filter blur-[100px] opacity-20 z-[-1]"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
      >
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="text-emerald-500" size={24} />
        </motion.div>
      </motion.div>
      
      {/* Reveal Next Section Gradient */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black to-transparent z-10"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1])
        }}
      />
    </div>
  );
} 