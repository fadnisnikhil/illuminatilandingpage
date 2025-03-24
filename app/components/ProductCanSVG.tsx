'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProductCanSVGProps {
  color?: string;
  secondaryColor?: string;
  label?: string;
  className?: string;
}

export default function ProductCanSVG({
  color = '#e9ff16',
  secondaryColor = '#121212',
  label = 'NITRO',
  className = ''
}: ProductCanSVGProps) {
  const canRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={canRef}
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Can body - using SVG for better control */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          {/* Can body - black background */}
          <rect x="35" y="40" width="130" height="320" rx="65" fill={secondaryColor} />
          
          {/* Top curve */}
          <ellipse cx="100" cy="40" rx="65" ry="20" fill={secondaryColor} />
          
          {/* Bottom curve */}
          <ellipse cx="100" cy="360" rx="65" ry="20" fill={secondaryColor} />
          
          {/* Lightning bolt logo - positioned based on Figma design */}
          <path
            d="M85 120 L120 180 L95 190 L115 260 L80 200 L105 190 L85 120Z"
            fill={color}
            opacity="0.95"
          />
          
          {/* Label highlights */}
          <rect
            x="45"
            y="150"
            width="110"
            height="100"
            rx="10"
            fill="transparent"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="2 4"
            opacity="0.5"
          />
          
          {/* Brand name */}
          <text
            x="100"
            y="130"
            fill={color}
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            {label}
          </text>
          
          {/* Small text */}
          <text
            x="100"
            y="285"
            fill={color}
            fontSize="14"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            ENERGY DRINK
          </text>
          
          {/* Volume */}
          <text
            x="100"
            y="310"
            fill={color}
            fontSize="12"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
          >
            473ml
          </text>
          
          {/* Highlights and reflections */}
          <rect
            x="50"
            y="70"
            width="5"
            height="240"
            fill="white"
            opacity="0.1"
          />
          <rect
            x="145"
            y="70"
            width="5"
            height="240"
            fill="white"
            opacity="0.1"
          />
        </svg>
        
        {/* Shine effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{ 
            opacity: [0, 0.15, 0],
            left: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        
        {/* Small glowing particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              backgroundColor: color,
              boxShadow: `0 0 5px ${color}, 0 0 8px ${color}`,
              top: 100 + Math.random() * 200 + 'px',
              left: 50 + Math.random() * 100 + 'px',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, -30, -60],
              x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
} 