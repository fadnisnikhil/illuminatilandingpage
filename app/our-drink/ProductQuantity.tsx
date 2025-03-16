'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface ProductQuantityProps {
  initialQuantity?: number;
}

export function ProductQuantity({ initialQuantity = 1 }: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  
  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  return (
    <div className="flex items-center space-x-2 mt-6 mb-8">
      <span className="text-white">Quantity:</span>
      <div className="flex items-center border border-gray-700 rounded">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-none text-gray-400"
          onClick={decreaseQuantity}
        >
          <Minus size={14} />
        </Button>
        <span className="w-8 text-center text-white">{quantity}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-none text-gray-400"
          onClick={increaseQuantity}
        >
          <Plus size={14} />
        </Button>
      </div>
    </div>
  );
} 