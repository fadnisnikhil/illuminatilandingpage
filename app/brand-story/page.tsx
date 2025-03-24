'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Play } from 'lucide-react';

const timelineEvents = [
  {
    year: 2015,
    title: 'The Inception',
    description: 'A group of visionary entrepreneurs and biochemists came together with a mission to create an energy drink that would not only provide physical energy but also mental clarity and focus.',
    image: '/brand-story/inception.jpg',
  },
  {
    year: 2016,
    title: 'The Formula',
    description: 'After countless iterations and rigorous testing, our team developed the proprietary Illuminati Energy formula—a perfect balance of natural caffeine, taurine, B-vitamins, and our unique nootropic blend.',
    image: '/brand-story/formula.jpg',
  },
  {
    year: 2017,
    title: 'First Launch',
    description: 'Illuminati Energy made its debut in select metropolitan areas, quickly gaining popularity among professionals, students, and fitness enthusiasts seeking sustained energy without the crash.',
    image: '/brand-story/launch.jpg',
  },
  {
    year: 2019,
    title: 'Expanding Horizons',
    description: 'With growing demand, we expanded distribution nationwide and introduced our Zero Sugar variant, providing the same energy-boosting benefits without the calories.',
    image: '/brand-story/expansion.jpg',
  },
  {
    year: 2021,
    title: 'Global Presence',
    description: 'Illuminati Energy went international, bringing our enlightening beverage to energy drink enthusiasts across multiple continents while maintaining our commitment to quality and innovation.',
    image: '/brand-story/global.jpg',
  },
  {
    year: 2023,
    title: 'New Flavors & Innovations',
    description: 'We expanded our product line with Berry Blast and Tropical Surge, while also introducing sustainable packaging initiatives to reduce our environmental footprint.',
    image: '/brand-story/innovation.jpg',
  },
];

export default function BrandStoryPage() {
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/brand-story/hero.jpg"
          alt="Illuminati Brand Story"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-emerald-500">Brand Story</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              From humble beginnings to a global phenomenon, discover the journey behind Illuminati Energy and our mission to enlighten and energize the world.
            </p>
          </div>
        </div>
      </section>
      
      {/* Founder's Message */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/brand-story/founder.jpg"
                alt="Founder of Illuminati Energy"
                fill
                className="object-cover"
              />
              <button 
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
                onClick={() => setActiveVideoModal(true)}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Play size={24} className="text-black ml-1" />
                </div>
              </button>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">A Message From Our Founder</h2>
              <blockquote className="text-gray-300 border-l-4 border-emerald-500 pl-4 italic mb-6">
                &ldquo;We founded Illuminati Energy with a simple yet powerful vision: to create an energy drink that enhances both body and mind, without the drawbacks of traditional energy products. Our journey has been one of continuous innovation and a relentless pursuit of perfection.&rdquo;
              </blockquote>
              <p className="text-gray-400 mb-6">
                Dr. Alexandra Chen, a biochemist with a passion for performance optimization, saw a gap in the market for an energy drink that could deliver sustained energy without the crash that comes with most caffeinated beverages.
              </p>
              <p className="text-gray-400">
                Together with a team of nutrition experts and flavor scientists, she developed the proprietary formula that would become Illuminati Energy—a perfect balance of natural ingredients designed to enhance mental clarity and physical performance.
              </p>
              
              <Button 
                className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setActiveVideoModal(true)}
              >
                Watch Full Interview
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Video Modal - Would be replaced with a proper video player in a real implementation */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setActiveVideoModal(false)}>
          <div className="relative w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
            <div className="absolute top-4 right-4">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
                onClick={() => setActiveVideoModal(false)}
              >
                ✕
              </Button>
            </div>
            <div className="bg-gray-800 w-full h-full flex items-center justify-center">
              <p className="text-white text-xl">Founder&apos;s Interview Video Player</p>
              <p className="text-gray-400 absolute bottom-10">In a real implementation, this would be an embedded video player.</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Timeline */}
      <section className="py-20 bg-gray-900" ref={ref}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Our <span className="text-emerald-500">Journey</span>
          </h2>
          
          <div className="relative">
            {/* Timeline Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-emerald-500"></div>
            
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={event.year}
                className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.7, 
                      delay: index * 0.2 
                    }
                  }
                }}
              >
                <div className="flex-1 p-6">
                  <div className={`text-right ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                    <span className="text-5xl font-bold text-emerald-500">{event.year}</span>
                    <h3 className="text-2xl font-bold text-white mt-2 mb-4">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                    <Button 
                      variant="link" 
                      className="mt-4 p-0 text-emerald-500 hover:text-emerald-400"
                      onClick={() => {
                        // In a real app, this would open a modal with more details or navigate to a dedicated page
                        alert(`More information about ${event.title} would appear here.`);
                      }}
                    >
                      Read More
                    </Button>
                  </div>
                </div>
                
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center z-10 my-4 md:my-0">
                  <span className="text-black font-bold">{index + 1}</span>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Our <span className="text-emerald-500">Values</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <Image src="/icons/innovation.svg" alt="Innovation" width={32} height={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-gray-400">
                We continuously strive to improve our formulas and develop new products that push the boundaries of what an energy drink can be.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <Image src="/icons/quality.svg" alt="Quality" width={32} height={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Quality</h3>
              <p className="text-gray-400">
                We use only the finest ingredients and maintain rigorous quality control standards to ensure every can delivers the Illuminati experience.
              </p>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <Image src="/icons/community.svg" alt="Community" width={32} height={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Community</h3>
              <p className="text-gray-400">
                We&apos;re building more than a brand—we&apos;re creating a community of like-minded individuals who strive for excellence in everything they do.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Our Story */}
      <section className="py-20 bg-emerald-900 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Become Part of Our Story</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            The Illuminati Energy journey continues with you. Join our community and help shape the future of energy drinks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-emerald-900 hover:bg-gray-100">
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/stores">Find Our Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Community Section - Added from 3plaintext.txt */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our <span className="text-emerald-500">Community</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={`/brand-story/community-${i}.jpg`}
                    alt={`Illuminati Community ${i}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Illuminati Energy Drinks has built a strong, vibrant community of individuals who are passionate about performance, focus, and staying energized. Whether you're an athlete and busy professional, Illuminati brings people together with its shared mission to fuel success. The brand actively engages with its community through social media, events, and promotions, creating a sense of belonging.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Fans of Illuminati energy drinks often share their experiences, tips, and success stories, forming a supportive network that motivates one another. The community embraces those who are driven and focused, reflecting the brand's values of peak performance.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Illuminati energy drinks encourages users to push their limits and reach new heights, fostering a culture of achievement and positivity. By connecting with others who share similar goals, it's more than just an energy drink—it's a lifestyle. Whether online or in person, Illuminati energy drinks community remains dedicated to helping each other stay sharp and successful.
                </p>
                <div className="mt-8">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Join Our Community
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 