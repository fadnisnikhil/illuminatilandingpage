'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';

// Sitemap structure
const SITEMAP_SECTIONS = [
  {
    title: 'Main Pages',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Our Drink', href: '/our-drink' },
      { name: 'Lifestyle', href: '/lifestyle' },
      { name: 'Brand Story', href: '/brand-story' },
      { name: 'Innovation', href: '/innovation' },
      { name: 'Store Locator', href: '/stores' },
      { name: 'Blogs', href: '/blogs' },
      { name: 'Contact', href: '/contact' },
    ]
  },
  {
    title: 'Product Pages',
    links: [
      { name: 'All Products', href: '/our-drink' },
      { name: 'Original Classic', href: '/our-drink/original' },
      { name: 'Berry Wildberry Blast', href: '/our-drink/berry-blast' },
      { name: 'Zero Sugar', href: '/our-drink/zero-sugar' },
      { name: 'Product Comparison', href: '/our-drink/compare' },
    ]
  },
  {
    title: 'Support',
    links: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Store Locator', href: '/stores' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Accessibility', href: '/accessibility' },
    ]
  },
  {
    title: 'About Us',
    links: [
      { name: 'Brand Story', href: '/brand-story' },
      { name: 'Innovation', href: '/innovation' },
      { name: 'Lifestyle', href: '/lifestyle' },
    ]
  }
];

export default function SitemapPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[30vh] w-full">
        <Image
          src="/about/sitemap-hero.jpg"
          alt="Illuminati Energy Sitemap"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-emerald-500">Sitemap</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Find everything on our website with this complete site navigation.
            </p>
          </div>
        </div>
      </section>
      
      {/* Sitemap Content */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITEMAP_SECTIONS.map((section, index) => (
              <div key={index} className="bg-black p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center"
                      >
                        <ChevronRight size={16} className="text-emerald-500 mr-2" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Special Links Section */}
          <div className="mt-12 bg-black p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Button asChild variant="outline" className="border-emerald-500 hover:bg-emerald-500 hover:text-black text-emerald-400">
                <Link href="/our-drink">Shop Products</Link>
              </Button>
              <Button asChild variant="outline" className="border-emerald-500 hover:bg-emerald-500 hover:text-black text-emerald-400">
                <Link href="/stores">Find Stores</Link>
              </Button>
              <Button asChild variant="outline" className="border-emerald-500 hover:bg-emerald-500 hover:text-black text-emerald-400">
                <Link href="/faq">FAQ</Link>
              </Button>
              <Button asChild variant="outline" className="border-emerald-500 hover:bg-emerald-500 hover:text-black text-emerald-400">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back Button */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black">
            <Link href="/" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 