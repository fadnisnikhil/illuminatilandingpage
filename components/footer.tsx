'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="h-12 w-[160px] bg-emerald-500 flex items-center justify-center text-black font-bold">
              Illuminati Energy
            </div>
            <p className="text-gray-400 mt-4">
              Energize your mind. Elevate your performance.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="https://instagram.com" className="text-gray-400 hover:text-emerald-500">
                <Instagram size={20} />
              </Link>
              <Link href="https://facebook.com" className="text-gray-400 hover:text-emerald-500">
                <Facebook size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-emerald-500">
                <Twitter size={20} />
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-emerald-500">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/our-drink" className="text-gray-400 hover:text-emerald-500">Our Drink</Link></li>
              <li><Link href="/lifestyle" className="text-gray-400 hover:text-emerald-500">Lifestyle</Link></li>
              <li><Link href="/brand-story" className="text-gray-400 hover:text-emerald-500">Brand Story</Link></li>
              <li><Link href="/innovation" className="text-gray-400 hover:text-emerald-500">Innovation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/stores" className="text-gray-400 hover:text-emerald-500">Store Locator</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-emerald-500">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-emerald-500">FAQs</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-emerald-500">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news and offers.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to our newsletter!');
              e.currentTarget.reset();
            }}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-emerald-500"
                required
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Illuminati Energy. All Rights Reserved.</p>
          <div className="flex justify-center mt-4 space-x-6">
            <Link href="/privacy" className="hover:text-emerald-500">Privacy Policy</Link>
            <Link href="/legal" className="hover:text-emerald-500">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 