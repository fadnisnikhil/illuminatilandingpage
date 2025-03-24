'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareProductProps {
  productId?: string;
}

export function ShareProduct({ productId }: ShareProductProps) {
  const handleShare = () => {
    const shareUrl = productId 
      ? `${window.location.origin}/our-drink/${productId}`
      : window.location.href;
      
    navigator.clipboard.writeText(shareUrl);
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