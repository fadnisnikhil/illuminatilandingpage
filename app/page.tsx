'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewsletterForm } from './NewsletterForm';
import RollingCanScroll from './components/RollingCanScroll';
import { BrainIcon, BatteryIcon, NutritionIcon } from './components/IconComponents';

export default function HomePage() {
  // Function to scroll to products section
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      
      // Add a temporary highlight class
      productsSection.classList.add('highlight-section');
      // Remove the highlight after animation completes
      setTimeout(() => {
        productsSection.classList.remove('highlight-section');
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Rolling Can Scroll Animation */}
      <RollingCanScroll />

      {/* Why Illuminati */}
      <section className="py-20 bg-gray-900 relative z-50" id="why-illuminati">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why <span className="text-emerald-500">Illuminati</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-black rounded-lg">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                <BrainIcon className="text-emerald-700" size={32} />
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
                <BatteryIcon className="text-emerald-700" size={32} />
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
                <NutritionIcon className="text-emerald-700" size={32} />
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
          
          <div className="flex justify-center mt-12">
            <button 
              onClick={scrollToProducts}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-full 
                transition-all duration-300 hover:scale-105 flex items-center font-medium">
              Discover Our Products <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="https://images.unsplash.com/photo-1507235071172-438ca6950a8e?q=80&w=2000&auto=format&fit=crop" 
            alt="Illuminati Lifestyle" 
            fill 
            sizes="100vw"
            priority
            quality={85}
            className="object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Featured In</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {['forbes', 'wired', 'techcrunch', 'menshealth', 'espn'].map((press, index) => (
              <motion.div 
                key={index} 
                className="opacity-60 hover:opacity-100 transition-opacity"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Image
                  src={`/press/${press}.svg`}
                  alt={press}
                  width={140}
                  height={60}
                  className="mx-auto"
                />
              </motion.div>
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
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Link href="https://instagram.com" className="group relative overflow-hidden">
                  <div className="aspect-square bg-gray-800 relative">
                    <svg 
                      viewBox="0 0 100 100" 
                      className="absolute inset-0 w-full h-full"
                    >
                      <rect width="100" height="100" fill="#374151" />
                      <circle cx="50" cy="50" r="30" fill="#10b981" fillOpacity={0.2} />
                      <path 
                        d={`M20,${20 + (i * 5)} L${80 - (i * 3)},${30 + (i * 2)} L${50 + (i * 4)},${80 - (i * 3)} L${30 + (i * 2)},${60 - (i * 4)} Z`} 
                        fill="#10b981" 
                        fillOpacity={0.4} 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-medium opacity-50">Image {i}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium">View Post</span>
                  </div>
                </Link>
              </motion.div>
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

      {/* Footer */}
      <footer className="bg-black text-gray-400 pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Footer Main */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <div className="h-12 w-[180px] bg-emerald-500 flex items-center justify-center text-black font-bold mb-4">
                  Illuminati Energy
                </div>
                <p className="text-sm">
                  Engineered for those who demand more. Illuminati Energy fuels your mind and body with premium ingredients for sustained performance.
                </p>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="https://twitter.com" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://instagram.com" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://facebook.com" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://youtube.com" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/our-drink" className="hover:text-emerald-400 transition-colors">Our Products</Link></li>
                <li><Link href="/lifestyle" className="hover:text-emerald-400 transition-colors">Lifestyle</Link></li>
                <li><Link href="/brand-story" className="hover:text-emerald-400 transition-colors">Our Story</Link></li>
                <li><Link href="/innovation" className="hover:text-emerald-400 transition-colors">Innovation</Link></li>
                <li><Link href="/stores" className="hover:text-emerald-400 transition-colors">Store Locator</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/shipping" className="hover:text-emerald-400 transition-colors">Shipping Info</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-500 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>100 Illuminati Way<br />Los Angeles, CA 90210</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-emerald-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>(800) 555-ENERGY</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-emerald-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>info@illuminatienergy.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 my-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Illuminati Energy. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms</Link>
              <Link href="/accessibility" className="hover:text-emerald-400 transition-colors">Accessibility</Link>
              <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 