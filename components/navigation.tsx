'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Drink', href: '/our-drink' },
  { name: 'Lifestyle', href: '/lifestyle' },
  { name: 'Brand Story', href: '/brand-story' },
  { name: 'Innovation', href: '/innovation' },
  { name: 'Store Locator', href: '/stores' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pathname = usePathname();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isScrolled = scrollPosition > 50;

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    return pathname === href;
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-black/90 py-2' : 'bg-transparent py-4'
    } pointer-events-auto`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="z-10 relative">
            <div className="relative h-12 w-[180px]">
              <div className="h-full w-full bg-emerald-500 flex items-center justify-center text-black font-bold">
                Illuminati Energy
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 relative z-[100]">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`${
                  isActiveLink(link.href) 
                    ? 'text-emerald-400 font-semibold' 
                    : 'text-white hover:text-emerald-400'
                } transition-colors font-medium relative z-[100]`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white z-[100]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-0 left-0 right-0 bg-black min-h-screen pt-24 px-4 z-[90]"
          >
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`${
                    isActiveLink(link.href) 
                      ? 'text-emerald-400 font-semibold' 
                      : 'text-white hover:text-emerald-400'
                  } transition-colors font-medium text-2xl`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 