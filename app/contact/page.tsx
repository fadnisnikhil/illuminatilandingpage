import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { ChatButton } from './ChatButton';

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        <Image
          src="/contact/contact-hero.jpg"
          alt="Contact Illuminati Energy"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="text-emerald-500">Us</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Have questions, feedback, or business inquiries? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info & Form */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <div className="bg-black p-8 rounded-lg mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <MapPin size={20} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Our Headquarters</h4>
                      <p className="text-gray-400">
                        123 Enlightenment Way<br />
                        San Francisco, CA 94103<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <Phone size={20} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Phone</h4>
                      <p className="text-gray-400">
                        <a href="tel:+1-800-ILLUMINATI" className="hover:text-emerald-500 transition-colors">
                          +1-800-ILLUMINATI
                        </a>
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Monday to Friday, 9am - 6pm PT
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <Mail size={20} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Email</h4>
                      <p className="text-gray-400">
                        <a href="mailto:info@illuminatienergy.com" className="hover:text-emerald-500 transition-colors">
                          info@illuminatienergy.com
                        </a>
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        We&apos;ll respond within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                      <Clock size={20} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Business Hours</h4>
                      <p className="text-gray-400">
                        Monday - Friday: 9am - 6pm PT<br />
                        Saturday: 10am - 4pm PT<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
                <p className="text-gray-400 mb-4">
                  Follow us on social media for the latest updates, promotions, and events.
                </p>
                
                <div className="flex space-x-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black hover:bg-emerald-600 transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black hover:bg-emerald-600 transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black hover:bg-emerald-600 transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-black hover:bg-emerald-600 transition-colors">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-black p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Visit Our Headquarters</h2>
          
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.757815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620920556204!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Chat Button */}
      <ChatButton />
    </div>
  );
} 