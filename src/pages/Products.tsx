
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsCarousel from '@/components/products/ProductsCarousel';
import Newsletter from '@/components/Newsletter';
import { products, categories } from '@/components/products/productsData';
import ProductCardWrapper from '@/components/ProductCardWrapper';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { 
  Filter, 
  SlidersHorizontal, 
  ShoppingBag, 
  Star, 
  Clock,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocationState {
  initialCategory?: string;
}

type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'featured';

const Products = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const { initialCategory = 'All' } = (location.state as LocationState) || {};
  const [activeCategory, setActiveCategory] = useState(queryCategory || initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFeatured, setShowFeatured] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showDiscount, setShowDiscount] = useState(true);
  
  // Get products based on category
  const getFilteredProducts = () => {
    if (activeCategory === 'All') {
      return products;
    } else {
      return products.filter(product => 
        product.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
  };
  
  const filteredProducts = getFilteredProducts();
  
  // Sort products
  const getSortedProducts = (products: typeof filteredProducts) => {
    switch (sortBy) {
      case 'newest':
        return [...products].sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
      case 'price-low-high':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return [...products].sort((a, b) => b.price - a.price);
      case 'featured':
      default:
        return products;
    }
  };
  
  const sortedProducts = getSortedProducts(filteredProducts);
  
  // Featured products
  const featuredProducts = filteredProducts.filter(product => product.isNew).slice(0, 4);
  
  // New products
  const newProducts = filteredProducts.filter(product => product.isNew);
  
  // Discounted products
  const discountedProducts = filteredProducts.filter(product => product.originalPrice && product.originalPrice > product.price);
  
  // Group products by category when viewing "All"
  const groupedProducts = () => {
    if (activeCategory !== 'All') {
      return null;
    }
    
    const groups: Record<string, typeof products> = {};
    
    // Create groups for each category
    categories.forEach(category => {
      if (category !== 'All') {
        groups[category] = products.filter(
          product => product.category.toLowerCase() === category.toLowerCase()
        );
      }
    });
    
    return groups;
  };
  
  const productGroups = groupedProducts();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Show toast notification when category changes via URL
    if (queryCategory) {
      toast.success(`Viewing ${queryCategory} products`);
    }
  }, [queryCategory]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Products Hero */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Plastic Products</h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Browse our collection of premium plastic products designed with simplicity and functionality in mind.
              </p>
            </div>
          </div>
        </section>
        
        {/* Products listing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            {/* Category filter */}
            <div className="flex justify-center mb-12 overflow-x-auto pb-2 no-scrollbar">
              <div className="flex space-x-2 md:space-x-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-all duration-300",
                      activeCategory.toLowerCase() === category.toLowerCase() 
                        ? "bg-black text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Section buttons and sorting */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={showFeatured ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFeatured(!showFeatured)}
                  className="flex items-center gap-1"
                >
                  <Star className="h-4 w-4" />
                  Featured
                </Button>
                <Button 
                  variant={showNew ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowNew(!showNew)}
                  className="flex items-center gap-1"
                >
                  <Clock className="h-4 w-4" />
                  New Arrivals
                </Button>
                <Button 
                  variant={showDiscount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowDiscount(!showDiscount)}
                  className="flex items-center gap-1"
                >
                  <ShoppingBag className="h-4 w-4" />
                  On Sale
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <SlidersHorizontal className="h-4 w-4" />
                      Sort
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => setSortBy('featured')}>
                      Featured
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('newest')}>
                      Newest first
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-low-high')}>
                      Price: Low to high
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-high-low')}>
                      Price: High to low
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Featured Products Section */}
            {showFeatured && featuredProducts.length > 0 && (
              <div className="mb-16">
                <ProductsGrid products={featuredProducts} title="Featured Products" />
              </div>
            )}
            
            {/* New Arrivals Section */}
            {showNew && newProducts.length > 0 && (
              <div className="mb-16">
                <ProductsGrid products={newProducts} title="New Arrivals" />
              </div>
            )}
            
            {/* On Sale Section */}
            {showDiscount && discountedProducts.length > 0 && (
              <div className="mb-16">
                <ProductsGrid products={discountedProducts} title="On Sale" />
              </div>
            )}
            
            {/* If viewing "All", show products grouped by category */}
            {activeCategory === 'All' && productGroups && (
              <div className="space-y-16">
                {Object.entries(productGroups).map(([category, categoryProducts]) => (
                  categoryProducts.length > 0 && (
                    <div key={category} className="category-group">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-medium">Plastic {category}</h2>
                        <button 
                          onClick={() => setActiveCategory(category)}
                          className="text-sm font-medium hover:underline"
                        >
                          View all {category} products
                        </button>
                      </div>
                      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {getSortedProducts(categoryProducts).map((product) => (
                          <ProductCardWrapper
                            key={product.id}
                            {...product}
                          />
                        ))}
                      </div>
                      <ProductsCarousel products={getSortedProducts(categoryProducts)} />
                    </div>
                  )
                ))}
              </div>
            )}
            
            {/* If not viewing "All", show standard product grid */}
            {activeCategory !== 'All' && !(showFeatured || showNew || showDiscount) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {sortedProducts.map((product) => (
                  <ProductCardWrapper
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>
            )}
            
            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or check back later.
                </p>
              </div>
            )}
          </div>
        </section>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
