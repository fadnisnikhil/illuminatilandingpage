'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from '../../components/ui/accordion';
import { Download, Plus } from 'lucide-react';

// Hotspot interface
interface Hotspot {
  id: number;
  x: number;
  y: number;
  title: string;
  description: string;
  image?: string;
}

// Manufacturing process hotspots
const HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    x: 20,
    y: 30,
    title: 'Ingredient Sourcing',
    description: 'We source premium ingredients from around the world, ensuring the highest quality standards for our energy drinks.',
    image: '/innovation/ingredients.jpg',
  },
  {
    id: 2,
    x: 45,
    y: 55,
    title: 'Formula Mixing',
    description: 'Our proprietary mixing process ensures perfect balance of flavors and active ingredients in every can.',
    image: '/innovation/mixing.jpg',
  },
  {
    id: 3,
    x: 70,
    y: 25,
    title: 'Quality Testing',
    description: 'Each batch undergoes rigorous testing for taste, efficacy, and consistency before proceeding to packaging.',
    image: '/innovation/testing.jpg',
  },
  {
    id: 4,
    x: 85,
    y: 70,
    title: 'Packaging',
    description: 'Our sustainable packaging process minimizes waste while ensuring product freshness and shelf stability.',
    image: '/innovation/packaging.jpg',
  },
];

export default function InnovationPage() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const openHotspotDetail = (hotspot: Hotspot) => {
    setActiveHotspot(hotspot);
  };
  
  const closeHotspotDetail = () => {
    setActiveHotspot(null);
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/innovation/innovation-hero.jpg"
          alt="Illuminati Innovation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-emerald-500">Innovation</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Discover the science and passion behind Illuminati Energy. Explore our state-of-the-art production facility and the innovative processes that create our superior energy drinks.
            </p>
          </div>
        </div>
      </section>
      
      {/* Manufacturing Process */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Manufacturing <span className="text-emerald-500">Process</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <div 
                ref={mapRef}
                className="relative h-full w-full bg-gray-900 rounded-lg"
              >
                <Image
                  src="/innovation/manufacturing-map.jpg"
                  alt="Manufacturing Process Map"
                  fill
                  className="object-cover"
                />
                
                {HOTSPOTS.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    className={`absolute w-8 h-8 rounded-full -ml-4 -mt-4 flex items-center justify-center transition-all duration-300 ${
                      activeHotspot?.id === hotspot.id ? 'bg-white' : 'bg-emerald-500'
                    }`}
                    style={{ 
                      left: `${hotspot.x}%`, 
                      top: `${hotspot.y}%`,
                    }}
                    onClick={() => openHotspotDetail(hotspot)}
                  >
                    <Plus 
                      size={16} 
                      className={activeHotspot?.id === hotspot.id ? 'text-emerald-500' : 'text-white'} 
                    />
                  </button>
                ))}
                
                {activeHotspot && (
                  <div className="absolute bottom-6 left-6 right-6 bg-black/80 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-bold text-lg">{activeHotspot.title}</h3>
                        <p className="text-gray-300 mt-1">{activeHotspot.description}</p>
                      </div>
                      <button 
                        className="ml-4 text-white opacity-70 hover:opacity-100"
                        onClick={closeHotspotDetail}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Crafted With Precision</h3>
              <p className="text-gray-300 mb-4">
                At our state-of-the-art production facility, we&apos;ve perfected the art and science of creating the perfect energy drink. Our manufacturing process combines cutting-edge technology with traditional craftsmanship to ensure every can of Illuminati Energy delivers consistent quality and performance.
              </p>
              <p className="text-gray-300 mb-6">
                From carefully sourcing the finest ingredients to our proprietary mixing and quality testing protocols, every step in our process is designed to create an energy drink that delivers on our promise of mental clarity and sustained physical energy.
              </p>
              
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  alert('In a real implementation, this would start a guided virtual tour of our facility.');
                }}>
                  Take Virtual Tour
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Science Behind The Drink */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            The <span className="text-emerald-500">Science</span> Behind Our Drink
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="caffeine">
                  <AccordionTrigger className="text-white text-xl font-medium">Natural Caffeine Complex</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>Our natural caffeine comes from green tea and guarana, providing a smoother, more sustained energy release compared to synthetic caffeine.</p>
                    <p className="mt-2">The combination with L-theanine helps promote alertness without the jitters commonly associated with caffeine.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b-vitamins">
                  <AccordionTrigger className="text-white text-xl font-medium">B-Vitamin Blend</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>Our comprehensive B-vitamin complex includes B3, B5, B6, and B12, which support energy metabolism at the cellular level.</p>
                    <p className="mt-2">These vitamins play crucial roles in converting food into energy and supporting neural function.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="taurine">
                  <AccordionTrigger className="text-white text-xl font-medium">Taurine Optimization</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>We&apos;ve perfected the taurine dosage to enhance physical performance and reduce exercise-induced fatigue.</p>
                    <p className="mt-2">Our research shows this amino acid also supports cardiovascular function and mental performance when properly formulated.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="nootropics">
                  <AccordionTrigger className="text-white text-xl font-medium">Nootropic Elements</AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p>Unlike standard energy drinks, we&apos;ve incorporated cognitive enhancers like rhodiola rosea and alpha-GPC to improve mental clarity and focus.</p>
                    <p className="mt-2">These ingredients work synergistically with our energy complex to enhance both physical and mental performance.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-8">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    alert('In a real implementation, this would download a detailed PDF about our formula science.');
                  }}>
                    <Download size={16} className="mr-2" /> Download Research Paper
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/innovation/science.jpg"
                alt="Scientific Research"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Certifications */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Quality <span className="text-emerald-500">Certifications</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['ISO 9001', 'Organic', 'GMP', 'Clean Label'].map((cert, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <Image
                    src={`/innovation/cert-${index + 1}.svg`}
                    alt={cert}
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-white font-bold mb-2">{cert}</h3>
                <p className="text-gray-400 text-sm">Certified Quality</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* R&D */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Research & Development
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Our R&D lab is constantly working on the next generation of energy drinks. 
            We&apos;re committed to pushing boundaries and exploring new possibilities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold">1</span>
              </div>
              <h3 className="text-white font-bold mb-3">Research</h3>
              <p className="text-gray-400">
                Our scientists study the latest research in nutrition and cognitive science to identify ingredients with real benefits.
              </p>
            </div>
            
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold">2</span>
              </div>
              <h3 className="text-white font-bold mb-3">Development</h3>
              <p className="text-gray-400">
                We create and test thousands of formulations to find the perfect balance of taste, efficacy, and consistency.
              </p>
            </div>
            
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold">3</span>
              </div>
              <h3 className="text-white font-bold mb-3">Testing</h3>
              <p className="text-gray-400">
                Our products undergo extensive testing both in the lab and with real users to ensure they meet our high standards.
              </p>
            </div>
          </div>
          
          <Button asChild className="mt-12 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href="/contact">
              Connect with Our R&D Team
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 