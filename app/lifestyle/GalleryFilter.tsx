'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import Image from 'next/image';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import lgZoom from 'lightgallery/plugins/zoom';
import { SocialShare } from './SocialShare';

// Define the gallery item type
interface GalleryItem {
  id: number;
  image: string;
  title: string;
  location: string;
  type: string;
}

interface GalleryFilterProps {
  items: GalleryItem[];
}

export function GalleryFilter({ items }: GalleryFilterProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredGallery = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.type === activeFilter);
  
  return (
    <>
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger 
            value="all" 
            onClick={() => setActiveFilter('all')}
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="events" 
            onClick={() => setActiveFilter('events')}
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black"
          >
            Events
          </TabsTrigger>
          <TabsTrigger 
            value="people" 
            onClick={() => setActiveFilter('people')}
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black"
          >
            People
          </TabsTrigger>
          <TabsTrigger 
            value="products" 
            onClick={() => setActiveFilter('products')}
            className="data-[state=active]:bg-emerald-500 data-[state=active]:text-black"
          >
            Products
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <LightGallery speed={500} plugins={[lgZoom]}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div key={item.id} className="group relative cursor-pointer overflow-hidden rounded-lg" data-src={item.image}>
              <div className="aspect-w-3 aspect-h-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-6 flex flex-col justify-end">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-300">{item.location}</p>
                </div>
              </div>
              
              <SocialShare id={item.id} />
            </div>
          ))}
        </div>
      </LightGallery>
    </>
  );
} 