'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';

interface ProductCan3DProps {
  productImage: string;
  accentColor: string;
  scrollTarget?: React.RefObject<HTMLElement>;
}

export default function ProductCan3D({ 
  productImage, 
  accentColor = 'emerald',
  scrollTarget
}: ProductCan3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse movement for interactive rotation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  
  // Add a spring animation to make the rotation smoother
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  
  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: scrollTarget || containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress into various effects
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  
  // Spring animations for smoother transitions
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  
  return (
    <div 
      ref={containerRef}
      className="relative h-[600px] w-full flex items-center justify-center perspective"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background glow */}
      <motion.div 
        className={`absolute w-[300px] h-[300px] rounded-full bg-${accentColor}-500 filter blur-[100px] opacity-30`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ y: springY }}
      />
      
      {/* 3D Can Container */}
      <motion.div
        className="relative w-[300px] h-[500px] preserve-3d"
        style={{ 
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: springScale,
          rotate: springRotate,
          y: springY,
          opacity
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Can image */}
        <div className="relative w-full h-full">
          <Image
            src={productImage}
            alt="Energy Drink Can"
            fill
            priority
            className="object-contain"
          />
        </div>
        
        {/* Reflection effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
          animate={{
            left: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            repeatDelay: 1
          }}
        />
        
        {/* Shadow */}
        <motion.div
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[200px] h-[50px] bg-black opacity-20 rounded-full blur-md"
          style={{
            scale: useTransform(springRotateX, [-15, 15], [0.8, 1.2]),
          }}
        />
      </motion.div>
    </div>
  );
} 