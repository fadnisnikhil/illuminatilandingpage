'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from 'lucide-react';

// FAQ Categories and Questions
const FAQ_CATEGORIES = [
  {
    id: 'product',
    name: 'Product Information',
    questions: [
      {
        q: 'How much caffeine is in Illuminati Energy drinks?',
        a: 'Most of our products contain 150mg of caffeine per can (30mg/100ml), which is approximately equivalent to a 12oz cup of coffee. Our focus is on sustained energy release rather than excessive caffeine content.'
      },
      {
        q: 'Are Illuminati Energy drinks vegan?',
        a: 'Yes, all Illuminati Energy drinks are vegan-friendly. We do not use any animal-derived ingredients in our formulations.'
      },
      {
        q: 'Do your products contain artificial sweeteners?',
        a: 'Our Zero Sugar formula uses a blend of natural and artificial sweeteners to provide great taste without the calories. Our Original and Berry Wildberry Blast formulas use natural cane sugar.'
      },
      {
        q: 'What gives Illuminati Energy drinks their unique taste?',
        a: 'Our drinks are formulated with natural and nature-identical flavoring substances to provide a refreshing taste that complements the functional benefits of our energy blend.'
      }
    ]
  },
  {
    id: 'consumption',
    name: 'Consumption Guidelines',
    questions: [
      {
        q: 'How should I consume Illuminati Energy for best results?',
        a: 'For optimal performance, we recommend drinking Illuminati Energy chilled, 15-30 minutes before you need heightened focus or energy. Limit consumption to 1-2 cans per day.'
      },
      {
        q: 'Can I mix Illuminati Energy with alcohol?',
        a: 'We do not recommend mixing our energy drinks with alcohol. The combination of energy drinks and alcohol can mask the effects of alcohol, potentially leading to overconsumption.'
      },
      {
        q: 'Is it safe to drink Illuminati Energy every day?',
        a: 'When consumed responsibly and as part of a balanced diet, Illuminati Energy can be enjoyed daily by most healthy adults. However, we recommend being mindful of your overall caffeine intake from all sources.'
      },
      {
        q: 'Are there any people who should avoid Illuminati Energy drinks?',
        a: 'As with most energy drinks, our products are not recommended for children, pregnant or nursing women, or individuals sensitive to caffeine. If you have any medical conditions or concerns, please consult with your healthcare provider before consumption.'
      }
    ]
  },
  {
    id: 'ingredients',
    name: 'Ingredients & Nutrition',
    questions: [
      {
        q: 'What are the main active ingredients in Illuminati Energy drinks?',
        a: 'Our primary active ingredients include caffeine (30mg/100ml), taurine (400mg/100ml), and a blend of B-vitamins (B3, B6, B2, and B12) that work synergistically to enhance mental focus and physical energy.'
      },
      {
        q: 'Are your ingredients sourced responsibly?',
        a: 'Yes, we prioritize quality and sustainability in our ingredient sourcing. We work with trusted suppliers who meet our high standards for both quality and ethical practices.'
      },
      {
        q: 'What is taurine and why is it in your drinks?',
        a: 'Taurine is an amino acid that occurs naturally in the body and in certain foods. It plays a role in several important metabolic processes and works synergistically with caffeine to enhance mental performance and reduce the potential for caffeine-related side effects.'
      },
      {
        q: 'Do your drinks contain any allergens?',
        a: 'Our products do not contain any major allergens such as milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, or soybeans. However, they are produced in facilities that may process these allergens, so cross-contamination is possible. Always check the label for the most up-to-date information.'
      }
    ]
  },
  {
    id: 'purchase',
    name: 'Purchase & Availability',
    questions: [
      {
        q: 'Where can I purchase Illuminati Energy drinks?',
        a: 'Illuminati Energy is available at select retailers nationwide. Use our Store Locator to find the nearest location.'
      },
      {
        q: 'Are Illuminati Energy drinks available internationally?',
        a: 'Currently, we are focused on distribution within select markets. We have plans to expand internationally in the future. Follow our social media channels for announcements about new market availability.'
      },
      {
        q: 'Do you offer bulk purchasing options?',
        a: 'For wholesale or bulk purchasing inquiries, please contact our sales team through the Contact page on our website.'
      },
      {
        q: 'How can I suggest a store to carry Illuminati Energy drinks?',
        a: 'You can recommend our products to your local retailers directly, or you can submit the store information through our Contact page, and our distribution team will follow up.'
      }
    ]
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('product');

  // Filter questions based on active category
  const activeQuestions = FAQ_CATEGORIES.find(cat => cat.id === activeCategory)?.questions || [];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[30vh] w-full">
        <Image
          src="/about/faq-hero.jpg"
          alt="Illuminati Energy Drinks FAQ"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-emerald-500">Questions</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Find answers to common questions about our energy drinks, ingredients, and more.
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Content */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Category Navigation */}
            <div className="md:sticky md:top-24 h-fit">
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-6">Categories</h3>
                <ul className="space-y-3">
                  {FAQ_CATEGORIES.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left py-2 px-4 rounded-md transition-colors ${
                          activeCategory === category.id
                            ? 'bg-emerald-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black">
                  <Link href="/contact" className="flex items-center justify-center">
                    Ask a Question
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Questions */}
            <div className="md:col-span-3">
              <div className="bg-black p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-8">
                  {FAQ_CATEGORIES.find(cat => cat.id === activeCategory)?.name}
                </h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {activeQuestions.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border-b border-gray-800 pb-4"
                    >
                      <AccordionTrigger className="text-white font-medium text-left hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400 mt-2">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              
              <div className="mt-8 bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Still Have Questions?</h3>
                <p className="text-gray-400 mb-6">
                  If you can't find the answer you're looking for, feel free to reach out to our customer support team. We're here to help!
                </p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Back to Products */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <Button asChild variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black">
            <Link href="/our-drink" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" /> Back to Products
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
} 