
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Minimalist Storage Box',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1594225372162-25b9f8a68a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Storage',
    isNew: true,
  },
  {
    id: '2',
    name: 'Modern Chair',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
  },
  {
    id: '3',
    name: 'Transparent Organizer',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Organization',
    isNew: true,
  },
  {
    id: '4',
    name: 'Kitchen Container Set',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1621972660772-6a0427dee658?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kitchen',
  },
];

const categories = ['All', 'Storage', 'Furniture', 'Organization', 'Kitchen'];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto text-center mb-12">
          <h2 className="text-3xl font-medium mb-4 animate-fade-in">Featured Products</h2>
          <p className="text-muted-foreground animate-fade-in animate-delay-100">
            Our collection of premium plastic products designed with simplicity and functionality in mind.
          </p>
        </div>
        
        {/* Category filter */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex space-x-2 md:space-x-4">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-all duration-300 animate-fade-in",
                  `animate-delay-${index * 100}`,
                  activeCategory === category 
                    ? "bg-black text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              className={`animate-delay-${index * 100}`}
            />
          ))}
        </div>
        
        {/* View all button */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" className="rounded-full px-8 py-6">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
