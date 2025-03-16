'use client';

import { Facebook, Twitter, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  variant?: 'icons' | 'text';
}

export function ShareButtons({ title, variant = 'icons' }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
    }
  };
  
  if (variant === 'icons') {
    return (
      <div className="flex space-x-4">
        <button
          onClick={() => handleShare('facebook')}
          className="w-10 h-10 bg-[#3b5998] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        >
          <Facebook size={18} />
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="w-10 h-10 bg-[#1da1f2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        >
          <Twitter size={18} />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="w-10 h-10 bg-[#0077b5] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        >
          <Linkedin size={18} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => handleShare('facebook')}
        className="flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <Facebook size={18} className="mr-2" /> Facebook
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <Twitter size={18} className="mr-2" /> Twitter
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <Linkedin size={18} className="mr-2" /> LinkedIn
      </button>
    </div>
  );
} 