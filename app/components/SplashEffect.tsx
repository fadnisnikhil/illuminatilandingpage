'use client';

import { motion } from 'framer-motion';

interface SplashEffectProps {
  color?: string;
  width?: number;
  height?: number;
}

export default function SplashEffect({ 
  color = '#10b981', 
  width = 600, 
  height = 600 
}: SplashEffectProps) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1, 0.9],
        opacity: [0, 0.7, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
        times: [0, 0.4, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
    >
      {/* Main splash */}
      <motion.path
        d="M300 50C300 50 420 140 450 220C480 300 520 350 520 350C520 350 470 370 430 410C390 450 380 520 380 520C380 520 330 470 270 470C210 470 170 510 170 510C170 510 160 440 120 400C80 360 30 350 30 350C30 350 70 300 100 220C130 140 300 50 300 50Z"
        fill={color}
        fillOpacity="0.5"
        animate={{
          d: [
            "M300 50C300 50 420 140 450 220C480 300 520 350 520 350C520 350 470 370 430 410C390 450 380 520 380 520C380 520 330 470 270 470C210 470 170 510 170 510C170 510 160 440 120 400C80 360 30 350 30 350C30 350 70 300 100 220C130 140 300 50 300 50Z",
            "M300 80C300 80 400 160 430 230C460 300 490 340 490 340C490 340 450 370 410 410C370 450 370 490 370 490C370 490 330 450 280 450C230 450 190 490 190 490C190 490 180 450 140 410C100 370 60 340 60 340C60 340 90 300 120 230C150 160 300 80 300 80Z",
            "M300 50C300 50 420 140 450 220C480 300 520 350 520 350C520 350 470 370 430 410C390 450 380 520 380 520C380 520 330 470 270 470C210 470 170 510 170 510C170 510 160 440 120 400C80 360 30 350 30 350C30 350 70 300 100 220C130 140 300 50 300 50Z"
          ]
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Droplets */}
      <motion.circle 
        cx="400" 
        cy="240" 
        r="20" 
        fill={color} 
        fillOpacity="0.6"
        animate={{ 
          cx: [400, 420, 390], 
          cy: [240, 220, 260],
          r: [20, 15, 25]
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.circle 
        cx="200" 
        cy="240" 
        r="15" 
        fill={color} 
        fillOpacity="0.6"
        animate={{ 
          cx: [200, 180, 220], 
          cy: [240, 220, 260],
          r: [15, 20, 10]
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.circle 
        cx="300" 
        cy="150" 
        r="25" 
        fill={color} 
        fillOpacity="0.5"
        animate={{ 
          cx: [300, 320, 280], 
          cy: [150, 130, 170],
          r: [25, 20, 30]
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.svg>
  );
} 