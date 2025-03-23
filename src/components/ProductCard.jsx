
import { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductCard = ({ id, name, price, image, category, isNew = false, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "product-card group relative animate-scale-in",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Overlay with actions */}
        <div className={cn(
          "absolute inset-0 bg-black/5 flex flex-col justify-between p-4 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          {/* Wishlist button */}
          <div className="self-end">
            <button className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick add to cart */}
          <button 
            className="w-full py-2.5 px-4 bg-black text-white text-sm font-medium flex items-center justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
        
        {/* New label */}
        {isNew && (
          <div className="absolute top-4 left-4 bg-black text-white text-xs py-1 px-2 font-medium">
            New
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="p-4 space-y-1">
        <div className="text-xs text-muted-foreground tracking-wide">{category}</div>
        <h3 className="font-medium">{name}</h3>
        <div className="text-sm">${price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
