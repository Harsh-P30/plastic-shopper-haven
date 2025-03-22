
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

// Extended sample product data with multiple products per category
const products = [
  // Storage Category
  {
    id: '1',
    name: 'Minimalist Storage Box',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1594225372162-25b9f8a68a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Storage',
    isNew: true,
  },
  {
    id: '5',
    name: 'Stackable Storage Containers',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1605117882932-f9e32b3b4493?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Storage',
  },
  {
    id: '6',
    name: 'Multi-drawer Organizer',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Storage',
    isNew: true,
  },
  {
    id: '13',
    name: 'Foldable Storage Basket',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1597348989644-a6d4df15be76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Storage',
  },
  {
    id: '14',
    name: 'Under Bed Storage Box',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1558997519-83c9faafb721?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Storage',
  },
  
  // Furniture Category
  {
    id: '2',
    name: 'Modern Chair',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
  },
  {
    id: '7',
    name: 'Minimalist Coffee Table',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
  },
  {
    id: '8',
    name: 'Designer Stool',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
    isNew: true,
  },
  {
    id: '15',
    name: 'Modern Bookshelf',
    price: 229.99,
    image: 'https://images.unsplash.com/photo-1592136957897-4ab9a5a6c52e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
  },
  {
    id: '16',
    name: 'Plastic Side Table',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1631693218215-71871f1a6bf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
    isNew: true,
  },
  
  // Organization Category
  {
    id: '3',
    name: 'Transparent Organizer',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Organization',
    isNew: true,
  },
  {
    id: '9',
    name: 'Desk Organizer Set',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1589584649628-b597067e07a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Organization',
  },
  {
    id: '10',
    name: 'Modular Wall Organizer',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1585909695284-b029345d3a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Organization',
  },
  {
    id: '17',
    name: 'Drawer Dividers',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1591129841117-3adfd313a592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Organization',
  },
  {
    id: '18',
    name: 'Cable Management Box',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1600346019001-8d56d1b51d59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Organization',
    isNew: true,
  },
  
  // Kitchen Category
  {
    id: '4',
    name: 'Kitchen Container Set',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1621972660772-6a0427dee658?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kitchen',
  },
  {
    id: '11',
    name: 'Spice Organizer Rack',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kitchen',
    isNew: true,
  },
  {
    id: '12',
    name: 'Cutting Board Set',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1600111152185-9e376433e3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kitchen',
  },
  {
    id: '19',
    name: 'Microwave-Safe Containers',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kitchen',
  },
  {
    id: '20',
    name: 'Utensil Holder',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1590341328444-eb5a0cb91455?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Kitchen',
    isNew: true,
  },
];

// Export products to be used in other components
export { products };

const categories = ['All', 'Storage', 'Furniture', 'Organization', 'Kitchen'];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  
  // Only show 3 products per category in the featured section
  const getFilteredProducts = () => {
    if (activeCategory === 'All') {
      // For 'All' category, show 3 products from each category (total 12)
      const result = [];
      categories.forEach(category => {
        if (category !== 'All') {
          const categoryProducts = products
            .filter(product => product.category === category)
            .slice(0, 3);
          result.push(...categoryProducts);
        }
      });
      return result;
    } else {
      // For specific categories, show the first 3 products
      return products
        .filter(product => product.category === activeCategory)
        .slice(0, 3);
    }
  };
  
  const filteredProducts = getFilteredProducts();
  
  const handleViewAllClick = () => {
    navigate('/products', { state: { initialCategory: activeCategory } });
  };
  
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
        
        {/* Products carousel for smaller screens */}
        <div className="block md:hidden mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {filteredProducts.map((product, index) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <ProductCard
                    {...product}
                    className={`animate-delay-${index * 100}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static left-0 translate-y-0 mr-2" />
              <CarouselNext className="relative static right-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
        
        {/* Products grid for larger screens */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-6"
            onClick={handleViewAllClick}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
