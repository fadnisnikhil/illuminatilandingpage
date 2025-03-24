'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProductCanSVG from './ProductCanSVG';

// Function to use parallax effect
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// Product data
const products = [
  {
    id: 'original',
    name: 'Original',
    tagline: 'The Ultimate Energy Experience',
    description: 'Our flagship formula combines natural caffeine, nootropics, and B-vitamins for peak mental and physical performance.',
    color: '#10b981',
    secondaryColor: '#047857',
    textColor: 'text-emerald-500',
    buttonClass: 'bg-emerald-500 hover:bg-emerald-600 border-emerald-500',
  },
  {
    id: 'zero-sugar',
    name: 'Zero Sugar',
    tagline: 'Clean Energy, Zero Compromise',
    description: 'All the mental clarity and physical energy boost without any of the sugar. Perfect for those monitoring their caloric intake.',
    color: '#3b82f6',
    secondaryColor: '#1d4ed8',
    textColor: 'text-blue-500',
    buttonClass: 'bg-blue-500 hover:bg-blue-600 border-blue-500',
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    tagline: 'Explosive Flavor, Sustained Energy',
    description: 'Bursting with berry flavor and our signature energy complex. A refreshing blast that awakens your senses.',
    color: '#8b5cf6',
    secondaryColor: '#6d28d9',
    textColor: 'text-purple-500',
    buttonClass: 'bg-purple-500 hover:bg-purple-600 border-purple-500',
  }
];

// Individual Product Section Component
function ProductSection({ 
  product, 
  index 
}: { 
  product: typeof products[0], 
  index: number 
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Create individual scroll animations for each product section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects
  const imageY = useParallax(scrollYProgress, 100);
  const textX = useParallax(scrollYProgress, 50 * (index % 2 === 0 ? -1 : 1));
  
  // Rotation effect
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 15 * (index % 2 === 0 ? 1 : -1)]);
  
  // Scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  return (
    <div 
      ref={sectionRef}
      className={`min-h-[90vh] py-20 mb-20 ${index % 2 === 0 ? 'bg-gray-900' : 'bg-black'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Product Image with parallax and rotation */}
          <motion.div 
            className="lg:w-1/2 relative"
            style={{ y: imageY }}
          >
            <motion.div
              style={{ 
                rotate: rotation,
                scale
              }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative aspect-square max-w-[500px] mx-auto"
            >
              <motion.div 
                className="absolute -inset-10 rounded-full filter blur-xl opacity-20 z-0"
                style={{ backgroundColor: product.color }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0] 
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              <div className="relative z-10 h-full">
                <ProductCanSVG 
                  color={product.color}
                  secondaryColor={product.secondaryColor}
                  label={product.name.toUpperCase()}
                />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Product Content with parallax */}
          <motion.div 
            className="lg:w-1/2"
            style={{ x: textX }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className={`${product.textColor} text-2xl font-bold mb-2`}>Illuminati</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h2>
              <p className="text-xl text-white mb-4">{product.tagline}</p>
              <p className="text-gray-300 mb-8 text-lg">{product.description}</p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild className={`bg-transparent hover:bg-transparent border-2 ${product.textColor}`}>
                  <Link href={`/our-drink/${product.id}`}>
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                <Button asChild className={`text-black ${product.buttonClass}`}>
                  <Link href="/stores">
                    Find in Stores
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ProductScroll() {
  // Create ref for the container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div 
      ref={containerRef} 
      className="relative py-20 overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-white text-center mb-20"
        >
          Discover the <span className="text-emerald-500">Collection</span>
        </motion.h2>
      </div>

      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} />
      ))}
      
      {/* Final CTA */}
      <motion.div 
        className="container mx-auto px-4 text-center mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Experience the Power?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Discover the full collection of Illuminati Energy drinks and find out why we&apos;re revolutionizing the energy drink industry.
        </p>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
          <Link href="/our-drink">
            Explore All Products
          </Link>
        </Button>
      </motion.div>
    </div>
  );
} 