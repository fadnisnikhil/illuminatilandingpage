import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  CalendarDays, 
  Star, 
  Check, 
  ArrowLeft, 
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { ShareProduct } from '../ShareProduct';
import { ProductQuantity } from '../ProductQuantity';

export const runtime = 'edge';

// Product data (in a real app, this would come from a database)
const PRODUCTS = [
  {
    id: 'original',
    name: 'Original',
    tagline: 'The Ultimate Energy Experience',
    description: 'Our flagship formula combines natural caffeine, nootropics, and B-vitamins for peak mental and physical performance.',
    longDescription: `
      The original Illuminati Energy drink represents the pinnacle of cognitive and physical enhancement. Meticulously crafted after years of research, our signature formula delivers sustained energy without the crash associated with conventional energy drinks.
      
      What sets Illuminati Energy apart is our balanced approach - combining natural caffeine from green tea and guarana with L-theanine for jitter-free focus. Our proprietary nootropic blend supports memory, cognitive processing, and mental clarity during demanding tasks.
      
      We've enhanced the formula with a comprehensive B-vitamin complex and electrolytes to support optimal metabolism and hydration. The result is an unparalleled energy experience that enlightens your mind and empowers your body.
    `,
    caffeine: '150mg',
    calories: '120',
    image: '/products/original.jpg',
    additionalImages: [
      '/products/original-2.jpg',
      '/products/original-3.jpg'
    ],
    benefits: [
      'Enhanced Mental Clarity',
      'Sustained Physical Energy',
      'Improved Reaction Time',
      'No Crash Formula'
    ],
    ingredientsList: 'Carbonated Water, Organic Cane Sugar, Natural Flavors, Citric Acid, Natural Caffeine (from Green Tea and Guarana), Taurine, L-Theanine, Panax Ginseng Extract, Rhodiola Rosea Extract, B-Vitamin Complex (B3, B6, B12), Potassium Citrate, Sodium Citrate, Magnesium Citrate.',
    nutritionFacts: {
      servingSize: '12 fl oz (355ml)',
      calories: 120,
      totalCarbs: '30g',
      sugars: '29g',
      sodium: '35mg',
      protein: '0g',
      caffeine: '150mg'
    },
    flavors: ['Classic', 'Citrus', 'Blue Lightning']
  },
  {
    id: 'zero-sugar',
    name: 'Zero Sugar',
    tagline: 'All the Energy, None of the Sugar',
    description: 'Experience the full cognitive and energy benefits of Illuminati Energy without the sugar or calories.',
    longDescription: `
      For those who demand optimal mental and physical performance without the added sugars, Illuminati Zero Sugar delivers our complete energy formula without compromise.
      
      Using a blend of natural sweeteners, we've created a zero-sugar alternative that maintains the exceptional taste profile of our original formula while eliminating calories. This makes Illuminati Zero Sugar ideal for athletes, keto enthusiasts, and anyone monitoring their sugar intake.
      
      Our Zero Sugar variant contains the full complement of nootropics, B-vitamins, and natural caffeine found in our original formula, ensuring you get the complete Illuminati experience. The only thing missing is the sugar.
    `,
    caffeine: '150mg',
    calories: '10',
    image: '/products/zero-sugar.jpg',
    additionalImages: [
      '/products/zero-sugar-2.jpg',
      '/products/zero-sugar-3.jpg'
    ],
    benefits: [
      'Zero Sugar Formula',
      'Full Energy Complex',
      'Enhanced Mental Focus',
      'Keto-Friendly'
    ],
    ingredientsList: 'Carbonated Water, Natural Flavors, Citric Acid, Natural Caffeine (from Green Tea and Guarana), Taurine, L-Theanine, Panax Ginseng Extract, Rhodiola Rosea Extract, B-Vitamin Complex (B3, B6, B12), Stevia Leaf Extract, Monk Fruit Extract, Potassium Citrate, Sodium Citrate, Magnesium Citrate.',
    nutritionFacts: {
      servingSize: '12 fl oz (355ml)',
      calories: 10,
      totalCarbs: '2g',
      sugars: '0g',
      sodium: '35mg',
      protein: '0g',
      caffeine: '150mg'
    },
    flavors: ['Original', 'Berry', 'Tropical']
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    tagline: 'Bursting with Flavor and Energy',
    description: 'A vibrant mix of berry flavors combined with our signature energy formula for a refreshing boost.',
    longDescription: `
      Illuminati Berry Blast combines the cognitive and energy benefits of our signature formula with an explosion of berry flavors for a refreshing and invigorating experience.
      
      We've created a complex berry profile using natural flavors from strawberry, blueberry, raspberry, and acai - all known for their antioxidant properties. This flavor variant maintains our commitment to natural ingredients while delivering a bold, fruit-forward taste.
      
      Like all Illuminati products, Berry Blast features our full-spectrum nootropic blend, natural caffeine sources, and B-vitamin complex to support mental clarity and sustained energy without the crash.
    `,
    caffeine: '150mg',
    calories: '130',
    image: '/products/berry-blast.jpg',
    additionalImages: [
      '/products/berry-blast-2.jpg',
      '/products/berry-blast-3.jpg'
    ],
    benefits: [
      'Robust Berry Flavor',
      'Antioxidant Enhanced',
      'Vitamin B Complex',
      'Mental Clarity Boost'
    ],
    ingredientsList: 'Carbonated Water, Organic Cane Sugar, Natural Berry Flavors (Strawberry, Blueberry, Raspberry, Acai), Citric Acid, Natural Caffeine (from Green Tea and Guarana), Taurine, L-Theanine, Panax Ginseng Extract, Rhodiola Rosea Extract, B-Vitamin Complex (B3, B6, B12), Potassium Citrate, Sodium Citrate, Magnesium Citrate.',
    nutritionFacts: {
      servingSize: '12 fl oz (355ml)',
      calories: 130,
      totalCarbs: '32g',
      sugars: '31g',
      sodium: '35mg',
      protein: '0g',
      caffeine: '150mg'
    },
    flavors: ['Mixed Berry', 'Strawberry', 'Blueberry Acai']
  },
  {
    id: 'tropical-surge',
    name: 'Tropical Surge',
    tagline: 'Exotic Flavor Meets Power',
    description: 'Transport yourself to a tropical paradise while enjoying elite mental and physical performance.',
    longDescription: `
      Escape to a tropical paradise with every sip of Illuminati Tropical Surge, where exotic fruit flavors complement our powerful cognitive enhancement formula.
      
      We've crafted a complex flavor profile featuring notes of pineapple, coconut, passion fruit, and mango for a refreshing tropical experience that energizes both mind and body.
      
      Despite its exotic flavor profile, Tropical Surge maintains the same potent blend of nootropics, natural caffeine, and B-vitamins as our original formula, ensuring you get the full Illuminati experience with a tropical twist.
    `,
    caffeine: '150mg',
    calories: '125',
    image: '/products/tropical-surge.jpg',
    additionalImages: [
      '/products/tropical-surge-2.jpg',
      '/products/tropical-surge-3.jpg'
    ],
    benefits: [
      'Tropical Fruit Blend',
      'Electrolyte Enhanced',
      'Cognitive Performance',
      'Refreshing Energy Boost'
    ],
    ingredientsList: 'Carbonated Water, Organic Cane Sugar, Natural Tropical Flavors (Pineapple, Coconut, Passion Fruit, Mango), Citric Acid, Natural Caffeine (from Green Tea and Guarana), Taurine, L-Theanine, Panax Ginseng Extract, Rhodiola Rosea Extract, B-Vitamin Complex (B3, B6, B12), Potassium Citrate, Sodium Citrate, Magnesium Citrate.',
    nutritionFacts: {
      servingSize: '12 fl oz (355ml)',
      calories: 125,
      totalCarbs: '31g',
      sugars: '30g',
      sodium: '35mg',
      protein: '0g',
      caffeine: '150mg'
    },
    flavors: ['Pineapple Coconut', 'Mango', 'Passion Fruit']
  }
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Find the product by ID
  const product = PRODUCTS.find(p => p.id === params.id);
  
  // If product not found, return 404
  if (!product) {
    notFound();
  }
  
  return (
    <div className="pt-24">
      {/* Product Hero */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <Link href="/our-drink" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to Products
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={`Illuminati ${product.name}`}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="flex gap-3">
                <button 
                  className={`relative h-20 w-20 rounded border-2 border-transparent`}
                >
                  <Image
                    src={product.image}
                    alt={`Illuminati ${product.name} Thumbnail`}
                    fill
                    className="object-cover rounded"
                  />
                </button>
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Illuminati {product.name}
              </h1>
              <p className="text-emerald-500 font-medium text-xl mb-4">{product.tagline}</p>
              
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
              
              <p className="text-gray-300 mb-8">{product.description}</p>
              
              {/* Key Benefits */}
              <h3 className="text-white font-bold mb-3">Key Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full mr-2"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
              
              {/* Flavor Selection */}
              <div className="mb-8">
                <h3 className="text-white font-bold mb-3">Flavor</h3>
                <div className="flex flex-wrap gap-3">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      className={`px-4 py-2 rounded ${
                        flavor === 'Classic' 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity selector */}
              <ProductQuantity initialQuantity={1} />
              
              <div className="flex gap-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/stores">Find in Stores</Link>
                </Button>
                <ShareProduct />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Details */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full flex justify-start mb-8 bg-transparent border-b border-gray-800">
              <TabsTrigger 
                value="description" 
                className="pb-2 border-b-2 border-transparent data-[state=active]:border-emerald-500 rounded-none bg-transparent text-gray-400 data-[state=active]:text-white"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="ingredients" 
                className="pb-2 border-b-2 border-transparent data-[state=active]:border-emerald-500 rounded-none bg-transparent text-gray-400 data-[state=active]:text-white"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger 
                value="nutrition" 
                className="pb-2 border-b-2 border-transparent data-[state=active]:border-emerald-500 rounded-none bg-transparent text-gray-400 data-[state=active]:text-white"
              >
                Nutrition Facts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="text-gray-300 space-y-4">
              {product.longDescription.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </TabsContent>
            
            <TabsContent value="ingredients" className="text-gray-300">
              <h3 className="text-white font-bold mb-4">Ingredients</h3>
              <p>{product.ingredientsList}</p>
            </TabsContent>
            
            <TabsContent value="nutrition" className="text-gray-300">
              <div className="max-w-md bg-gray-900 p-6 rounded-lg">
                <h3 className="text-white font-bold text-xl mb-2 text-center">Nutrition Facts</h3>
                <p className="text-center text-sm mb-4">Serving Size: {product.nutritionFacts.servingSize}</p>
                
                <div className="border-t border-b border-gray-700 py-2">
                  <div className="flex justify-between">
                    <span className="font-bold">Calories</span>
                    <span>{product.nutritionFacts.calories}</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-700 py-2">
                  <div className="flex justify-between">
                    <span>Total Carbohydrates</span>
                    <span>{product.nutritionFacts.totalCarbs}</span>
                  </div>
                  <div className="flex justify-between pl-6">
                    <span>Sugars</span>
                    <span>{product.nutritionFacts.sugars}</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-700 py-2">
                  <div className="flex justify-between">
                    <span>Sodium</span>
                    <span>{product.nutritionFacts.sodium}</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-700 py-2">
                  <div className="flex justify-between">
                    <span>Protein</span>
                    <span>{product.nutritionFacts.protein}</span>
                  </div>
                </div>
                
                <div className="py-2">
                  <div className="flex justify-between">
                    <span>Caffeine</span>
                    <span>{product.nutritionFacts.caffeine}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
} 