'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Products data updated with content from 3plaintext.txt
const PRODUCTS = [
  {
    id: 'original',
    name: 'Original Classic',
    tagline: 'Original Classic Illuminati Formula',
    description: 'The Original Classic Illuminati Formula is a carefully crafted blend of ingredients designed to boost both energy and mental clarity. Featuring a powerful combination of caffeine, taurine, and essential vitamins, it provides a long-lasting burst of energy without the dreaded crash. The formula enhances focus, helping you stay sharp and productive throughout the day with unique taste formulation.',
    longDescription: 'This classic version has been perfected over time to ensure a smooth, refreshing taste with every sip. Whether you\'re working, studying, or on the move, it delivers the focus you need to power through your tasks. With its unique mix, the Classic Formula is a go-to choice for those who need to maintain peak performance in high-pressure situations. The energy boost is consistent, allowing you to stay focused and energized for hours.',
    caffeine: '150mg',
    calories: '120',
    image: '/products/original.jpg',
    benefits: [
      'Enhanced Focus and Mental Clarity',
      'Sustained Energy Without Crash',
      'Smooth, Refreshing Taste',
      'Perfect for Work, Study, or Sports'
    ],
    flavors: ['Classic', 'Citrus', 'Blue Lightning'],
    color: 'bg-emerald-500',
    textColor: 'text-emerald-500'
  },
  {
    id: 'berry-blast',
    name: 'Berry Wildberry Blast',
    tagline: 'Bursting with Flavor and Energy',
    description: 'Berry Wildberry Blast offers a refreshing twist with its bold, fruity flavor that\'s both delicious and energizing. This unique blend of wildberries provides a burst of natural sweetness, making every sip a flavorful experience. Packed with caffeine, taurine, and essential B-vitamins, it\'s designed to keep you sharp and focused throughout your day.',
    longDescription: 'The Berry Wildberry Blast formula is perfect for those who crave a fruity energy drink without compromising on performance. Whether you\'re hitting the gym, working on a project, or just need a boost, this energy drink delivers. Its smooth, vibrant taste makes it a great option for anyone looking for a new way to fuel their focus and energy levels. With no artificial aftertaste, it keeps you refreshed and energized without the crash.',
    caffeine: '150mg',
    calories: '130',
    image: '/products/berry-blast.jpg',
    benefits: [
      'Vibrant Berry Flavor',
      'Natural Sweetness',
      'No Artificial Aftertaste',
      'Perfect for Anyone On The Go'
    ],
    flavors: ['Mixed Berry', 'Strawberry', 'Blueberry Acai'],
    color: 'bg-pink-600',
    textColor: 'text-pink-600'
  },
  {
    id: 'zero-sugar',
    name: 'Zero Sugar',
    tagline: 'All the Energy, None of the Sugar',
    description: 'Illuminati Energy Drinks Zero Sugar offers the perfect solution for those who want the energy boost without the added calories. With zero sugar, it provides all the focus-enhancing benefits of the original formula, but without the guilt. Packed with caffeine, taurine, and B-vitamins, this version ensures sustained energy and mental clarity throughout the day.',
    longDescription: 'The refreshing taste is smooth and crisp, making it an ideal choice for anyone who loves energy drinks but prefers to avoid sugar. Despite having no sugar, it still delivers a powerful boost to keep you sharp and productive. Perfect for fitness enthusiasts, busy professionals, or anyone on the go, Illuminati Zero Sugar provides the performance you need without compromising your health goals. Whether you are powering through a workout or a busy day at work, this energy drink fuels your focus without the crash.',
    caffeine: '150mg',
    calories: '10',
    image: '/products/zero-sugar.jpg',
    benefits: [
      'Zero Sugar Formula',
      'Full Energy Complex',
      'Crisp, Refreshing Taste',
      'Perfect for Fitness Enthusiasts'
    ],
    flavors: ['Original', 'Berry', 'Tropical'],
    color: 'bg-blue-500',
    textColor: 'text-blue-500'
  }
];

export default function OurDrinkPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);

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
      <section className="relative h-[50vh] w-full">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                className={`bg-black rounded-lg overflow-hidden border-2 ${highlightedProduct === product.id ? 'border-' + product.color.split('-')[1] + '-500' : 'border-transparent'}`}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setHighlightedProduct(product.id)}
                onMouseLeave={() => setHighlightedProduct(null)}
              >
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={`Illuminati ${product.name}`}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute top-0 left-0 w-full h-1 ${product.color}`}></div>
                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
                      compareList.includes(product.id) 
                        ? product.color + ' text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {compareList.includes(product.id) ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    <span className={product.textColor}>Illuminati</span> {product.name}
                  </h3>
                  <p className={`${product.textColor} font-medium mb-4`}>{product.tagline}</p>
                  <p className="text-gray-400 mb-4 line-clamp-3">{product.description}</p>
                  
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
                  
                  <div className="flex justify-center mt-6">
                    <Button asChild className={`${product.color} hover:opacity-90 text-white`}>
                      <Link href={`/our-drink/${product.id}`} className="flex items-center">
                        View Details <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
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
              <h3 className="text-white font-bold mb-3">B-Vitamins</h3>
              <p className="text-gray-400">
                Essential vitamins B3, B6, B12 that support energy metabolism and brain function.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/icons/leaf.svg" alt="Natural" width={24} height={24} />
              </div>
              <h3 className="text-white font-bold mb-3">Natural Flavors</h3>
              <p className="text-gray-400">
                Real fruit extracts and natural flavors for a clean, authentic taste experience.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-gray-900 p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Ingredients</h3>
            <p className="text-gray-300 text-lg text-left">
              Carbonated Water, Sugar, Energy Premix [ Taurine (400mg/100ml), Maltodextrin, Caffeine (30 mg/100ml), Vitamins (B3, B6, B2 and B12), Acidity Regulator (INS 330, INS 331 (11) ], Natural and Nature Identical Flavoring Substances, Permitted Natural Colour (INS 150 a), Antioxidant (INS 300), Stabiliser (INS 440) and Preservative (INS 211)
            </p>
          </div>
        </div>
      </section>
      
      {/* Quality Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Premium <span className="text-emerald-500">Quality</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Illuminati Energy Drink is crafted with the highest quality ingredients, ensuring a premium experience with every sip. Each can is packed with carefully selected components like caffeine, taurine, and B-vitamins, designed to enhance your focus and energy.
              </p>
              <p className="text-gray-300 mb-6">
                The brand focuses on delivering consistent performance, giving you long-lasting energy without the crash. The quality of Illuminati Energy Drink extends beyond its ingredients—its smooth, refreshing taste ensures a satisfying experience every time.
              </p>
              <p className="text-gray-300">
                It&apos;s produced with strict quality control measures to guarantee that every can meets the brand&apos;s high standards. Illuminati Energy Drink is trusted by those who demand both performance and flavor, offering a superior option in the energy drink market.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/about/quality.jpg"
                alt="Illuminati Quality"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ link */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Have <span className="text-emerald-500">Questions?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Find answers to common questions about our energy drinks, ingredients, and more.
          </p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href="/faq">
              View FAQ
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 