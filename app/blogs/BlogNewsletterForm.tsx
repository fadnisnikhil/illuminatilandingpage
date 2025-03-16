'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function BlogNewsletterForm({ title = "Stay Enlightened", description = "Subscribe to our newsletter to receive the latest articles, tips, and exclusive content straight to your inbox." }) {
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
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-300 mb-8">
        {description}
      </p>
      
      {isSubmitted ? (
        <div className="bg-emerald-900/30 border border-emerald-500 rounded-lg p-6 text-center">
          <h4 className="text-white font-bold text-xl mb-2">Thank You!</h4>
          <p className="text-gray-300">
            You have been successfully added to our newsletter. Stay tuned for enlightening content!
          </p>
        </div>
      ) : (
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
} 