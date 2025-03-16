'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export function StoreRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your request! We\'ll consider bringing Illuminati Energy to your area.');
    e.currentTarget.reset();
    setSubmitted(true);
    
    // Reset submission status after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  return (
    <div className="mt-12 bg-black p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Can&apos;t Find Illuminati Energy Near You?</h2>
      <p className="text-gray-300 mb-6">
        Don&apos;t see Illuminati Energy in your area? Let us know where you&apos;d like to see our products!
      </p>
      
      {submitted ? (
        <div className="bg-emerald-900/30 border border-emerald-500 rounded-lg p-6 text-center">
          <h4 className="text-white font-bold text-xl mb-2">Thanks for your request!</h4>
          <p className="text-gray-300">
            We have received your suggestion and will consider bringing Illuminati Energy to this location.
          </p>
        </div>
      ) : (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Your Name"
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
          <Input
            type="email"
            placeholder="Email Address"
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Where would you like to see Illuminati Energy?"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </div>
  );
} 