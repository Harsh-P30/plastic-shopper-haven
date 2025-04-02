
import { useState } from 'react';

export type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'featured';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  originalPrice?: number;
}

export const useProductFiltering = (allProducts: Product[], initialCategory: string) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFeatured, setShowFeatured] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showDiscount, setShowDiscount] = useState(true);
  
  // Get products based on category
  const getFilteredProducts = () => {
    if (activeCategory === 'All') {
      return allProducts;
    } else {
      return allProducts.filter(product => 
        product.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
  };
  
  const filteredProducts = getFilteredProducts();
  
  // Sort products
  const getSortedProducts = (products: Product[]) => {
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
  const groupProductsByCategory = (categories: string[]) => {
    if (activeCategory !== 'All') {
      return null;
    }
    
    const groups: Record<string, Product[]> = {};
    
    // Create groups for each category
    categories.forEach(category => {
      if (category !== 'All') {
        groups[category] = allProducts.filter(
          product => product.category.toLowerCase() === category.toLowerCase()
        );
      }
    });
    
    return groups;
  };
  
  return {
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    showFeatured,
    setShowFeatured,
    showNew,
    setShowNew,
    showDiscount,
    setShowDiscount,
    filteredProducts,
    sortedProducts,
    featuredProducts,
    newProducts,
    discountedProducts,
    getSortedProducts,
    groupProductsByCategory
  };
};
