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
    name: 'Original Classic',
    tagline: 'Original Classic Illuminati Formula',
    description: 'The Original Classic Illuminati Formula is a carefully crafted blend of ingredients designed to boost both energy and mental clarity.',
    longDescription: `
      The Original Classic Illuminati Formula is a carefully crafted blend of ingredients designed to boost both energy and mental clarity. Featuring a powerful combination of caffeine, taurine, and essential vitamins, it provides a long-lasting burst of energy without the dreaded crash. The formula enhances focus, helping you stay sharp and productive throughout the day with unique taste formulation.

      This classic version has been perfected over time to ensure a smooth, refreshing taste with every sip. Whether you're working, studying, or on the move, it delivers the focus you need to power through your tasks.

      With its unique mix, the Classic Formula is a go-to choice for those who need to maintain peak performance in high-pressure situations. The energy boost is consistent, allowing you to stay focused and energized for hours. Experience the original formula that has earned a loyal following among those who demand more from their energy drink.
    `,
    caffeine: '150mg',
    calories: '120',
    image: '/products/original.jpg',
    additionalImages: [
      '/products/original-2.jpg',
      '/products/original-3.jpg'
    ],
    benefits: [
      'Enhanced Focus and Mental Clarity',
      'Sustained Energy Without Crash',
      'Smooth, Refreshing Taste',
      'Perfect for Work, Study, or Sports'
    ],
    ingredientsList: 'Carbonated Water, Sugar, Energy Premix [Taurine (400mg/100ml), Maltodextrin, Caffeine (30mg/100ml), Vitamins (B3, B6, B2 and B12), Acidity Regulator (INS 330, INS 331 (11))], Natural and Nature Identical Flavoring Substances, Permitted Natural Colour (INS 150 a), Antioxidant (INS 300), Stabiliser (INS 440) and Preservative (INS 211)',
    nutritionFacts: {
      servingSize: '12 fl oz (355ml)',
      calories: 120,
      totalCarbs: '30g',
      sugars: '29g',
      sodium: '35mg',
      protein: '0g',
      caffeine: '150mg'
    },
    flavors: ['Classic', 'Citrus', 'Blue Lightning'],
    color: 'bg-emerald-500',
    textColor: 'text-emerald-500'
  },
  {
    id: 'zero-sugar',
    name: 'Zero Sugar',
    tagline: 'All the Energy, None of the Sugar',
    description: 'Illuminati Energy Drinks Zero Sugar offers the perfect solution for those who want the energy boost without the added calories.',
    longDescription: `
      Illuminati Energy Drinks Zero Sugar offers the perfect solution for those who want the energy boost without the added calories. With zero sugar, it provides all the focus-enhancing benefits of the original formula, but without the guilt. Packed with caffeine, taurine, and B-vitamins, this version ensures sustained energy and mental clarity throughout the day.

      The refreshing taste is smooth and crisp, making it an ideal choice for anyone who loves energy drinks but prefers to avoid sugar. Despite having no sugar, it still delivers a powerful boost to keep you sharp and productive.

      Perfect for fitness enthusiasts, busy professionals, or anyone on the go, Illuminati Zero Sugar provides the performance you need without compromising your health goals. Whether you're powering through a workout or a busy day at work, this energy drink fuels your focus without the crash. Stay energized, stay sharp, and enjoy the refreshing taste of Illuminati Zero Sugar!
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
      'Crisp, Refreshing Taste',
      'Perfect for Fitness Enthusiasts'
    ],
    ingredientsList: 'Carbonated Water, Zero-Calorie Sweeteners, Energy Premix [Taurine (400mg/100ml), Maltodextrin, Caffeine (30mg/100ml), Vitamins (B3, B6, B2 and B12), Acidity Regulator (INS 330, INS 331 (11))], Natural and Nature Identical Flavoring Substances, Permitted Natural Colour (INS 150 a), Antioxidant (INS 300), Stabiliser (INS 440) and Preservative (INS 211)',
    nutritionFacts: {
      servingSize: '12 fl oz (355ml)',
      calories: 10,
      totalCarbs: '2g',
      sugars: '0g',
      sodium: '35mg',
      protein: '0g',
      caffeine: '150mg'
    },
    flavors: ['Original', 'Berry', 'Tropical'],
    color: 'bg-blue-500',
    textColor: 'text-blue-500'
  },
  {
    id: 'berry-blast',
    name: 'Berry Wildberry Blast',
    tagline: 'Bursting with Flavor and Energy',
    description: 'Berry Wildberry Blast offers a refreshing twist with its bold, fruity flavor that\'s both delicious and energizing.',
    longDescription: `
      Berry Wildberry Blast offers a refreshing twist with its bold, fruity flavor that's both delicious and energizing. This unique blend of wildberries provides a burst of natural sweetness, making every sip a flavorful experience. Packed with caffeine, taurine, and essential B-vitamins, it's designed to keep you sharp and focused throughout your day.

      The Berry Wildberry Blast formula is perfect for those who crave a fruity energy drink without compromising on performance. Whether you're hitting the gym, working on a project, or just need a boost, this energy drink delivers with added caffeine and vitamins.

      Its smooth, vibrant taste makes it a great option for anyone looking for a new way to fuel their focus and energy levels. With no artificial aftertaste, it keeps you refreshed and energized without the crash. Illuminati's Berry Wildberry Blast is the perfect blend of taste and function for those on the go.
    `,
    caffeine: '150mg',
    calories: '130',
    image: '/products/berry-blast.jpg',
    additionalImages: [
      '/products/berry-blast-2.jpg',
      '/products/berry-blast-3.jpg'
    ],
    benefits: [
      'Vibrant Berry Flavor',
      'Natural Sweetness',
      'No Artificial Aftertaste',
      'Perfect for Anyone On The Go'
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
    flavors: ['Mixed Berry', 'Strawberry', 'Blueberry Acai'],
    color: 'bg-pink-600',
    textColor: 'text-pink-600'
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
              <div className={"relative h-[400px] rounded-lg overflow-hidden mb-4 border-2 border-" + (product.color ? product.color.split('-')[1] : 'emerald') + "-500"}>
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
                <span className={product.textColor}>Illuminati</span> {product.name}
              </h1>
              <p className={`${product.textColor} font-medium text-xl mb-4`}>{product.tagline}</p>
              
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
                    <div className={`h-2 w-2 ${product.color} rounded-full mr-2`}></div>
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center gap-4">
                <ShareProduct productId={product.id} />
                <Link 
                  href="/stores" 
                  className={`text-sm ${product.textColor} hover:underline`}
                >
                  Find in stores
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Details */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="bg-gray-900 w-full max-w-md mx-auto flex mb-12">
              <TabsTrigger 
                value="description" 
                className="flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="nutrition" 
                className="flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Nutrition Facts
              </TabsTrigger>
              <TabsTrigger 
                value="ingredients" 
                className="flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                Ingredients
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-0">
              <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">About {product.name}</h2>
                <div className="prose prose-invert max-w-none">
                  {product.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-0">
              <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Nutrition Facts</h2>
                <div className="bg-black p-6 rounded border border-gray-800">
                  <div className="border-b border-gray-800 pb-4 mb-4">
                    <p className="text-white font-bold">Serving Size {product.nutritionFacts.servingSize}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <p className="text-white font-bold">Calories</p>
                      <p className="text-white">{product.nutritionFacts.calories}</p>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <p className="text-white">Total Carbohydrates</p>
                      <p className="text-white">{product.nutritionFacts.totalCarbs}</p>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-800 pb-2 pl-6">
                      <p className="text-white">Sugars</p>
                      <p className="text-white">{product.nutritionFacts.sugars}</p>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <p className="text-white">Sodium</p>
                      <p className="text-white">{product.nutritionFacts.sodium}</p>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-800 pb-2">
                      <p className="text-white">Protein</p>
                      <p className="text-white">{product.nutritionFacts.protein}</p>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                      <p className="text-white font-bold">Caffeine</p>
                      <p className="text-white">{product.nutritionFacts.caffeine}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-0">
              <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Ingredients</h2>
                <p className="text-gray-300">
                  {product.ingredientsList}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-12 text-center">
            You Might Also Like
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.filter(p => p.id !== product.id).map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-black rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={relatedProduct.image}
                    alt={`Illuminati ${relatedProduct.name}`}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    <span className={relatedProduct.textColor}>Illuminati</span> {relatedProduct.name}
                  </h3>
                  <p className={`${relatedProduct.textColor} font-medium mb-4`}>{relatedProduct.tagline}</p>
                  
                  <Button asChild className={`${relatedProduct.color} hover:opacity-90 w-full text-white`}>
                    <Link href={`/our-drink/${relatedProduct.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Link */}
      <section className="py-16 bg-black text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">
            Have Questions About Our Products?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Check out our Frequently Asked Questions for more information about our ingredients, consumption guidelines, and more.
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