'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';

export function NewsletterForm() {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.currentTarget.reset();
    setIsSubmitted(true);
    
    // Reset submission status after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };
  
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Stay Enlightened</h2>
      <p className="text-gray-200 mb-8">
        Subscribe to our newsletter for exclusive content, promotions, and energy tips.
      </p>
      
      {isSubmitted ? (
        <div className="bg-emerald-900/30 border border-emerald-500 rounded-lg p-6 text-center max-w-lg mx-auto">
          <h4 className="text-white font-bold text-xl mb-2">Thank You!</h4>
          <p className="text-gray-300">
            You have been successfully added to our newsletter. Stay tuned for enlightening content!
          </p>
        </div>
      ) : (
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className={`flex-1 relative ${isEmailFocused ? 'ring-2 ring-emerald-400' : ''}`}>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded bg-emerald-800 border border-emerald-700 text-white focus:outline-none"
              required
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
          </div>
          <Button type="submit" className="bg-white text-emerald-900 hover:bg-gray-100">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
} 