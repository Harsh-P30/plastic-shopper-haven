
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductsCarouselProps {
  products: Product[];
}

const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  return (
    <div className="block md:hidden mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product, index) => (
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
  );
};

export default ProductsCarousel;
