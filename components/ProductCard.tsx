import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/lib/types';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;

  return (
    <Link href={`/products/${product.handle}`}>
      <div className="group cursor-pointer">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-dark-gray mb-4">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="text-sm uppercase tracking-wide text-white group-hover:text-accent transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-gray-400">
            {currencyCode} ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}

