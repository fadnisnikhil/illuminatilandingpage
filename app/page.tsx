'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewsletterForm } from './NewsletterForm';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="Illuminati Energy Drink"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Unlock Your <span className="text-emerald-500">Inner Potential</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Energize your mind. Elevate your performance. Experience the enlightenment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6">
                  <Link href="/our-drink">Discover the Drink</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
                  <Link href="/stores">Find a Store</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="text-emerald-500" size={24} />
          </motion.div>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our <span className="text-emerald-500">Energy Drinks</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Original', desc: 'Our flagship formula for peak mental and physical performance.' },
              { name: 'Zero Sugar', desc: 'All the energy and focus benefits without the sugar.' },
              { name: 'Berry Blast', desc: 'Bursting with berry flavor and our signature energy complex.' }
            ].map((product, index) => (
              <div key={index} className="bg-gray-900 rounded-lg overflow-hidden group hover:shadow-emerald-500/20 hover:shadow-lg transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src={`/products/${product.name.toLowerCase().replace(' ', '-')}.jpg`}
                    alt={`Illuminati ${product.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Illuminati {product.name}</h3>
                  <p className="text-gray-400 mb-4">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <Link href={`/our-drink/${product.name.toLowerCase().replace(' ', '-')}`} className="text-emerald-500 hover:text-emerald-400 flex items-center">
                      View Details <ArrowRight size={16} className="ml-2" />
                    </Link>
                    <Button asChild variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black">
                      <Link href="/stores">
                        <ShoppingCart size={16} className="mr-2" /> Buy Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/our-drink">
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Illuminati */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why <span className="text-emerald-500">Illuminati</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-black rounded-lg">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                <Image src="/icons/brain.svg" alt="Mental Clarity" width={32} height={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mental Clarity</h3>
              <p className="text-gray-400">
                Our nootropic blend enhances focus, memory, and cognitive function without the jitters or crash.
              </p>
              <Link href="/innovation" className="text-emerald-500 hover:text-emerald-400 flex items-center mt-4">
                Learn More <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="p-8 bg-black rounded-lg">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                <Image src="/icons/battery.svg" alt="Sustained Energy" width={32} height={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Sustained Energy</h3>
              <p className="text-gray-400">
                Our proprietary formula delivers long-lasting energy without the crash associated with other energy drinks.
              </p>
              <Link href="/innovation" className="text-emerald-500 hover:text-emerald-400 flex items-center mt-4">
                Learn More <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="p-8 bg-black rounded-lg">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                <Image src="/icons/nutrition.svg" alt="Premium Ingredients" width={32} height={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Premium Ingredients</h3>
              <p className="text-gray-400">
                We source only the highest quality natural ingredients, with no artificial colors or preservatives.
              </p>
              <Link href="/innovation" className="text-emerald-500 hover:text-emerald-400 flex items-center mt-4">
                Learn More <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/lifestyle/lifestyle-hero.jpg" 
            alt="Illuminati Lifestyle" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join the <span className="text-emerald-500">Movement</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Illuminati Energy is more than a drink—it&apos;s a lifestyle for those who refuse to settle for mediocrity. From athletes to entrepreneurs, our community is built on a shared desire to excel.
            </p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/lifestyle">
                Explore Lifestyle
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Featured In</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {['forbes', 'wired', 'techcrunch', 'menshealth', 'espn'].map((press, index) => (
              <div key={index} className="opacity-60 hover:opacity-100 transition-opacity">
                <Image
                  src={`/press/${press}.svg`}
                  alt={press}
                  width={140}
                  height={60}
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-emerald-500">#</span>IlluminatiEnergy
            </h2>
            <Link href="https://instagram.com" className="text-emerald-500 hover:text-emerald-400 flex items-center">
              Follow Us <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Link key={i} href="https://instagram.com" className="group relative overflow-hidden">
                <div className="aspect-square">
                  <Image
                    src={`/instagram/${i}.jpg`}
                    alt="Instagram post"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium">View Post</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-emerald-900">
        <div className="container mx-auto px-4">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
} 