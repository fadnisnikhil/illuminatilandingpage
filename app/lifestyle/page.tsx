import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { GalleryFilter } from './GalleryFilter';

// Gallery data (would come from database in real app)
const GALLERY_ITEMS = [
  {
    id: 1,
    image: '/lifestyle/gallery/event1.jpg',
    title: 'Illuminati Launch Party',
    location: 'New York City',
    type: 'events'
  },
  {
    id: 2,
    image: '/lifestyle/gallery/people1.jpg',
    title: 'Team Illuminati Athlete',
    location: 'Miami',
    type: 'people'
  },
  {
    id: 3,
    image: '/lifestyle/gallery/product1.jpg',
    title: 'Zero Sugar Edition',
    location: 'Studio Shoot',
    type: 'products'
  },
  {
    id: 4,
    image: '/lifestyle/gallery/event2.jpg',
    title: 'Music Festival Sponsorship',
    location: 'Los Angeles',
    type: 'events'
  },
  {
    id: 5,
    image: '/lifestyle/gallery/people2.jpg',
    title: 'Developer Hackathon',
    location: 'San Francisco',
    type: 'people'
  },
  {
    id: 6,
    image: '/lifestyle/gallery/product2.jpg',
    title: 'Berry Blast Photoshoot',
    location: 'Studio Shoot',
    type: 'products'
  },
  {
    id: 7,
    image: '/lifestyle/gallery/event3.jpg',
    title: 'Fitness Expo',
    location: 'Chicago',
    type: 'events'
  },
  {
    id: 8,
    image: '/lifestyle/gallery/people3.jpg',
    title: 'Community Meetup',
    location: 'Austin',
    type: 'people'
  },
  {
    id: 9,
    image: '/lifestyle/gallery/product3.jpg',
    title: 'Product Line',
    location: 'Studio Shoot',
    type: 'products'
  }
];

export default function LifestylePage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <Image
          src="/lifestyle/lifestyle-hero.jpg"
          alt="Illuminati Lifestyle"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent/50 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Illuminati <span className="text-emerald-500">Lifestyle</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Join a community that embraces enlightenment, excellence, and elevated energy in all aspects of life.
            </p>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                More Than a Drink—<span className="text-emerald-500">A Movement</span>
              </h2>
              <p className="text-gray-300 mb-6">
                The Illuminati Energy lifestyle is about pushing boundaries, challenging limits, and achieving greatness in all aspects of life. Our global community is made up of athletes, creators, entrepreneurs, and forward-thinkers who refuse to settle for mediocrity.
              </p>
              <p className="text-gray-300 mb-8">
                When you choose Illuminati Energy, you&apos;re not just selecting a beverage—you&apos;re aligning yourself with a philosophy of excellence and a network of like-minded individuals who are writing their own rules for success.
              </p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <a href="#join">Join the Movement</a>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[250px] rounded-lg overflow-hidden">
                <Image
                  src="/lifestyle/community1.jpg"
                  alt="Illuminati Community"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[250px] rounded-lg overflow-hidden mt-10">
                <Image
                  src="/lifestyle/community2.jpg"
                  alt="Illuminati Community"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[250px] rounded-lg overflow-hidden -mt-10">
                <Image
                  src="/lifestyle/community3.jpg"
                  alt="Illuminati Community"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[250px] rounded-lg overflow-hidden">
                <Image
                  src="/lifestyle/community4.jpg"
                  alt="Illuminati Community"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-10">
            Energy in <span className="text-emerald-500">Action</span>
          </h2>
          
          <GalleryFilter items={GALLERY_ITEMS} />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            What the <span className="text-emerald-500">Community</span> Says
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;Illuminati Energy has been a game-changer for my training routine. I&apos;ve never experienced such clean, sustained energy without the crash. It&apos;s become an essential part of my pre-workout ritual.&quot;
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/testimonials/user1.jpg"
                    alt="User Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">Alex Rodriguez</h4>
                  <p className="text-gray-400 text-sm">Marathon Runner</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;As a software developer, I need to stay focused for long stretches. Illuminati Energy helps me maintain peak mental performance during intensive coding sessions without the jitters of traditional energy drinks.&quot;
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/testimonials/user2.jpg"
                    alt="User Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">Sophia Chen</h4>
                  <p className="text-gray-400 text-sm">Tech Entrepreneur</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                &quot;I DJ sets that last 4+ hours, and Illuminati Energy keeps me performing at my best throughout the night. The clean energy and mental clarity are unmatched—plus the Zero Sugar option is perfect for my lifestyle.&quot;
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/testimonials/user3.jpg"
                    alt="User Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">Marcus Fletcher</h4>
                  <p className="text-gray-400 text-sm">Professional DJ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Movement CTA */}
      <section id="join" className="py-20 bg-emerald-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join the Illuminati Movement
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10">
            Connect with us on social media, share your Illuminati moments, and become part of a global community that&apos;s redefining what&apos;s possible.
          </p>
          
          <div className="flex justify-center space-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-900 p-4 rounded-full hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-900 p-4 rounded-full hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-900 p-4 rounded-full hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-900 p-4 rounded-full hover:bg-gray-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 