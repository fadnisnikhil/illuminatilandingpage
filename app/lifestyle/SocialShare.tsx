'use client';

import { Instagram, Facebook, Twitter } from 'lucide-react';

interface SocialShareProps {
  id: number;
}

export function SocialShare({ id }: SocialShareProps) {
  const shareToInstagram = () => {
    alert(`Sharing item ${id} to Instagram (this would open Instagram share in a real implementation)`);
  };
  
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
  };
  
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=Check out this awesome Illuminati Energy event!&url=${window.location.href}`, '_blank');
  };
  
  return (
    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={shareToInstagram}
        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
        aria-label="Share to Instagram"
      >
        <Instagram size={16} />
      </button>
      <button
        onClick={shareToFacebook}
        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
        aria-label="Share to Facebook"
      >
        <Facebook size={16} />
      </button>
      <button
        onClick={shareToTwitter}
        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors"
        aria-label="Share to Twitter"
      >
        <Twitter size={16} />
      </button>
    </div>
  );
} 