'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

// Products data
const PRODUCTS = [
  {
    id: 'original',
    name: 'Original',
    tagline: 'The Ultimate Energy Experience',
    description: 'Our flagship formula combines natural caffeine, nootropics, and B-vitamins for peak mental and physical performance.',
    caffeine: '150mg',
    calories: '120',
    image: '/products/original.jpg',
    benefits: [
      'Enhanced Mental Clarity',
      'Sustained Physical Energy',
      'Improved Reaction Time',
      'No Crash Formula'
    ],
    flavors: ['Classic', 'Citrus', 'Blue Lightning']
  },
  {
    id: 'zero-sugar',
    name: 'Zero Sugar',
    tagline: 'All the Energy, None of the Sugar',
    description: 'Experience the full cognitive and energy benefits of Illuminati Energy without the sugar or calories.',
    caffeine: '150mg',
    calories: '10',
    image: '/products/zero-sugar.jpg',
    benefits: [
      'Zero Sugar Formula',
      'Full Energy Complex',
      'Enhanced Mental Focus',
      'Keto-Friendly'
    ],
    flavors: ['Original', 'Berry', 'Tropical']
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    tagline: 'Bursting with Flavor and Energy',
    description: 'A vibrant mix of berry flavors combined with our signature energy formula for a refreshing boost.',
    caffeine: '150mg',
    calories: '130',
    image: '/products/berry-blast.jpg',
    benefits: [
      'Robust Berry Flavor',
      'Antioxidant Enhanced',
      'Vitamin B Complex',
      'Mental Clarity Boost'
    ],
    flavors: ['Mixed Berry', 'Strawberry', 'Blueberry Acai']
  },
  {
    id: 'tropical-surge',
    name: 'Tropical Surge',
    tagline: 'Exotic Flavor Meets Power',
    description: 'Transport yourself to a tropical paradise while enjoying elite mental and physical performance.',
    caffeine: '150mg',
    calories: '125',
    image: '/products/tropical-surge.jpg',
    benefits: [
      'Tropical Fruit Blend',
      'Electrolyte Enhanced',
      'Cognitive Performance',
      'Refreshing Energy Boost'
    ],
    flavors: ['Pineapple Coconut', 'Mango', 'Passion Fruit']
  }
];

export default function OurDrinkPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(item => item !== id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, id]);
    } else {
      alert('You can compare up to 3 products at a time');
    }
  };

  // Filter products based on active tab
  const filteredProducts = activeTab === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => 
        activeTab === 'regular' ? p.calories >= '100' : p.calories < '100'
      );

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        <Image
          src="/products/hero-products.jpg"
          alt="Illuminati Energy Drinks"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-emerald-500">Products</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Discover the perfect Illuminati Energy drink to fuel your mind and body. Engineered for those who demand more.
            </p>
          </div>
        </div>
      </section>
      
      {/* Products */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
            <Tabs defaultValue="all" className="w-full sm:w-auto">
              <TabsList className="bg-gray-800">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-emerald-600"
                  onClick={() => setActiveTab('all')}
                >
                  All Products
                </TabsTrigger>
                <TabsTrigger 
                  value="regular" 
                  className="data-[state=active]:bg-emerald-600"
                  onClick={() => setActiveTab('regular')}
                >
                  Regular
                </TabsTrigger>
                <TabsTrigger 
                  value="zero" 
                  className="data-[state=active]:bg-emerald-600"
                  onClick={() => setActiveTab('zero')}
                >
                  Zero Sugar
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {compareList.length > 0 && (
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href={`/our-drink/compare?products=${compareList.join(',')}`}>
                  Compare Selected ({compareList.length})
                </Link>
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-black rounded-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={`Illuminati ${product.name}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
                      compareList.includes(product.id) 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {compareList.includes(product.id) ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Illuminati {product.name}</h3>
                  <p className="text-emerald-500 font-medium mb-4">{product.tagline}</p>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  
                  <div className="flex gap-6 mb-6">
                    <div>
                      <span className="text-gray-500 text-sm">Caffeine</span>
                      <p className="text-white font-bold">{product.caffeine}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Calories</span>
                      <p className="text-white font-bold">{product.calories}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button asChild variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black">
                      <Link href="/stores">
                        <ShoppingCart size={16} className="mr-2" /> Buy Now
                      </Link>
                    </Button>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Link href={`/our-drink/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Nutrition */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Nutrition & <span className="text-emerald-500">Ingredients</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            We carefully select every ingredient in our energy drinks for maximum efficacy and optimal taste, with no artificial colors or preservatives.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/icons/brain.svg" alt="Nootropics" width={24} height={24} />
              </div>
              <h3 className="text-white font-bold mb-3">Nootropic Complex</h3>
              <p className="text-gray-400">
                Cognitive enhancers that support focus, memory, and mental clarity.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/icons/battery.svg" alt="Caffeine" width={24} height={24} />
              </div>
              <h3 className="text-white font-bold mb-3">Natural Caffeine</h3>
              <p className="text-gray-400">
                Sourced from green tea and guarana for sustained energy without jitters.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/icons/nutrition.svg" alt="Vitamins" width={24} height={24} />
              </div>
              <h3 className="text-white font-bold mb-3">B-Vitamin Complex</h3>
              <p className="text-gray-400">
                Essential vitamins that support energy metabolism and neural function.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/icons/quality.svg" alt="Electrolytes" width={24} height={24} />
              </div>
              <h3 className="text-white font-bold mb-3">Electrolyte Blend</h3>
              <p className="text-gray-400">
                Supports hydration and optimal neurological function during intense activity.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/innovation">
                Learn More About Our Science
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked <span className="text-emerald-500">Questions</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How much caffeine is in Illuminati Energy drinks?',
                a: 'Most of our products contain 150mg of natural caffeine, which is approximately equivalent to a 12oz cup of coffee. Our focus is on sustained energy release rather than high caffeine content.'
              },
              {
                q: 'Are Illuminati Energy drinks vegan?',
                a: 'Yes, all Illuminati Energy drinks are vegan-friendly. We do not use any animal-derived ingredients in our formulations.'
              },
              {
                q: 'How should I consume Illuminati Energy for best results?',
                a: 'For optimal performance, we recommend drinking Illuminati Energy chilled, 15-30 minutes before you need heightened focus or energy. Limit consumption to 1-2 cans per day.'
              },
              {
                q: 'Where can I purchase Illuminati Energy drinks?',
                a: 'Illuminati Energy is available at select retailers nationwide and through our online store. Use our Store Locator to find the nearest location or order directly for home delivery.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-black p-6 rounded-lg">
                <h3 className="text-white font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black">
              <Link href="/faq">
                View All FAQs
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 