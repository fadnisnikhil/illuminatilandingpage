'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DirectionsButtonProps {
  lat: number;
  lng: number;
  variant?: 'link' | 'button';
  size?: 'default' | 'sm';
  onClick?: (e: React.MouseEvent) => void;
}

export function DirectionsButton({ lat, lng, variant = 'link', size = 'default', onClick }: DirectionsButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    
    window.open(`https://maps.google.com/maps?q=${lat},${lng}`, '_blank');
  };
  
  if (variant === 'link') {
    return (
      <Button 
        variant="link" 
        className="text-emerald-500 p-0 h-auto" 
        onClick={handleClick}
      >
        Get Directions <ExternalLink size={14} className="ml-1" />
      </Button>
    );
  }
  
  return (
    <Button
      variant="link"
      size={size}
      className="text-emerald-600 p-0 h-auto mt-2"
      onClick={handleClick}
    >
      Get Directions
    </Button>
  );
} 