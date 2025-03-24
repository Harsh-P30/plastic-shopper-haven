
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories } from '@/components/products/productsData.js';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Categories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products`, { state: { initialCategory: categoryId } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Browse Our Categories</h1>
              <p className="text-lg text-muted-foreground mb-8 animate-fade-in animate-delay-100">
                Explore our comprehensive collection of premium products organized by category.
              </p>
            </div>
          </div>
        </section>

        {/* Categories grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {categories.filter(cat => cat !== 'All').map((category, index) => (
                <CategoryCard 
                  key={category} 
                  category={category} 
                  index={index}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const CategoryCard = ({ category, index, onClick }) => {
  // Map category names to image URLs
  const getCategoryImage = (categoryName) => {
    const imageMap = {
      'Storage': 'https://images.unsplash.com/photo-1605117882932-f9e32b3b4493?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Furniture': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Organization': 'https://images.unsplash.com/photo-1578382371622-eb6a616692dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Kitchen': 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Footwear': 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Clothing': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Accessories': 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'Electronics': 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    };
    
    return imageMap[categoryName] || 'https://images.unsplash.com/photo-1567016526105-22da7c13for6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };
  
  // Generate a description based on the category name
  const getCategoryDescription = (categoryName) => {
    const descriptionMap = {
      'Storage': 'Practical and stylish storage solutions for any space',
      'Furniture': 'Modern and functional furniture pieces for your home',
      'Organization': 'Clever organizational systems to keep everything in place',
      'Kitchen': 'Essential items for a well-equipped, modern kitchen',
      'Footwear': 'Stylish and comfortable footwear for every occasion',
      'Clothing': 'Quality garments designed with style and comfort in mind',
      'Accessories': 'The perfect finishing touches for any outfit',
      'Electronics': 'Innovative devices to enhance your daily life',
    };
    
    return descriptionMap[categoryName] || 'Explore our selection of quality products';
  };

  return (
    <div 
      className={cn(
        "group relative rounded-lg overflow-hidden cursor-pointer animate-scale-in aspect-[4/3]",
        `animate-delay-${index * 200}`
      )}
      onClick={onClick}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={getCategoryImage(category)} 
          alt={category} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-medium mb-2">{category}</h3>
        <p className="text-white/80 mb-4 max-w-xs">{getCategoryDescription(category)}</p>
        
        <div className="inline-flex items-center text-sm font-medium group">
          <span className="border-b border-white/30 group-hover:border-white transition-colors">
            Browse Products
          </span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
