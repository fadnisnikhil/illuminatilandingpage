'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ShareProduct() {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };
  
  return (
    <Button 
      variant="outline" 
      className="border-white text-white hover:bg-white/10"
      onClick={handleShare}
    >
      <Share2 size={16} className="mr-2" /> Share
    </Button>
  );
} 