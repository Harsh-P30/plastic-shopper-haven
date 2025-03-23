
import ProductCard from '@/components/ProductCard';

const ProductsGrid = ({ products }) => {
  return (
    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          {...product}
          className={`animate-delay-${index * 100}`}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
