'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomePage() {
  const [currentFlavor, setCurrentFlavor] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Flavors data
  const flavors = [
    {
      title: "Original Energy",
      subtitle: "Classic Power",
      description: "Our signature blend that delivers pure, unadulterated energy. Perfect for those who demand the best without compromise.",
      keywords: "Pure Energy. Classic Taste. Maximum Power.",
      image: "/assets/cans/original-can.png"
    },
    {
      title: "Berry Blast",
      subtitle: "Fruity Explosion",
      description: "A burst of mixed berries that tantalizes your taste buds while providing the energy boost you need to conquer your day.",
      keywords: "Berry Mix. Sweet Energy. Natural Flavors.",
      image: "/assets/cans/berry-can.png"
    },
    {
      title: "Zero Sugar",
      subtitle: "Clean Energy",
      description: "All the energy without the sugar crash. Perfect for health-conscious individuals who want clean, sustained energy.",
      keywords: "Zero Sugar. Clean Energy. No Crash.",
      image: "/assets/cans/zero-can.png"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "John Doe",
      role: "Professional Athlete",
      comment: "This energy drink gave me the boost I needed to perform at my best. The taste is amazing and the energy lasts all day!",
    },
    {
      name: "Jane Smith",
      role: "Student",
      comment: "I've been using Illuminati for my study sessions. It's helped me stay focused and productive for hours. Highly recommend!",
    },
    {
      name: "Mike Johnson",
      role: "Entrepreneur",
      comment: "As a busy entrepreneur, I need energy drinks that work. Illuminati delivers exactly what it promises. Great product!",
    },
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {/* Hero Section with Illuminati Logo and Can */}
      <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-400 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 w-full px-4">
          {/* Background Illuminati Text */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold text-white tracking-wide leading-none px-1">
              ILLUMINATI
            </div>
          </motion.div>

          {/* Foreground Can */}
          <motion.div 
            className="relative z-20 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div 
              className="flex-shrink-0"
              style={{
                width: 'clamp(20rem, 40vw, 60rem)',
                height: 'clamp(12rem, 30vw, 45rem)',
                minWidth: '18rem',
                minHeight: '12rem'
              }}
            >
              <Image
                src="/assets/cans/original-can.png"
                alt="Illuminati Energy Drink Can"
                width={200}
                height={150}
                className="w-full h-full object-contain"
                style={{
                  animation: 'spinHorizontal 8s linear infinite'
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="min-h-screen bg-gray-900 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Can Image */}
            <div className="flex justify-center">
              <div className="w-64 h-80 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-2">🥤</div>
                  <div>Can Image</div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Us</h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                We are passionate about creating innovative energy drinks that not only provide the boost you need but also taste incredible. Our journey began with a simple mission: to craft beverages that energize your body and delight your taste buds.
              </p>
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                With cutting-edge technology and premium ingredients, we've developed a range of flavors that cater to every preference. From classic favorites to bold new combinations, each sip delivers the perfect balance of energy and flavor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flavors Section */}
      <section id="flavors" className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Flavors</h2>
            <p className="text-xl text-gray-300">Discover our range of energizing flavors</p>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-center">
              <button 
                onClick={() => setCurrentFlavor((prev) => (prev === 0 ? flavors.length - 1 : prev - 1))}
                className="absolute left-4 z-10 bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full transition-colors"
              >
                ←
              </button>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center">
                      <div className="w-48 h-64 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                        <div className="text-gray-400 text-center">
                          <div className="text-4xl mb-2">🥤</div>
                          <div>{flavors[currentFlavor].title}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-white">
                      <h3 className="text-3xl font-bold mb-4">{flavors[currentFlavor].title}</h3>
                      <p className="text-lg text-gray-300 mb-6">{flavors[currentFlavor].description}</p>
                      <div className="flex flex-wrap gap-2">
                        {flavors[currentFlavor].keywords.split('.').map((keyword, index) => (
                          <span key={index} className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setCurrentFlavor((prev) => (prev === flavors.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 z-10 bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full transition-colors"
              >
                →
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {flavors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFlavor(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentFlavor ? 'bg-emerald-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="min-h-screen bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-300">Real experiences from real people</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{testimonial.comment}</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-xl text-gray-300">Get in touch with our team</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea rows={4} name="message" value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-400 mt-4">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 mt-4">Failed to send message. Please try again later.</p>
                )}
              </form>
            </div>
            
            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="bg-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get in touch</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center">
                    <span className="text-emerald-500 mr-3">📍</span>
                    <span>123 Energy Street, Power City, PC 12345</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-500 mr-3">📧</span>
                    <span>hello@illuminatienergy.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-emerald-500 mr-3">📞</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Visit us</h3>
                <div className="w-full h-64 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <div>Interactive Map</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">LOGO</div>
            
            {/* Copyright */}
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              @2025 Illuminati.com. All Rights Reserved.
            </div>
            
            {/* Navigation Links */}
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#about" className="hover:text-gray-800 transition-colors">About Us</a>
              <a href="#flavors" className="hover:text-gray-800 transition-colors">Flavors</a>
              <a href="#testimonials" className="hover:text-gray-800 transition-colors">Testimonials</a>
              <a href="#contact" className="hover:text-gray-800 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 