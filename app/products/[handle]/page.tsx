import { getProductByHandle, getAllProducts } from '@/lib/shopify';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCart from '@/components/AddToCart';
import Link from 'next/link';

export const revalidate = 60;

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((product) => ({
      handle: product.handle,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;

  return (
    <main className="min-h-screen bg-black">
      <div className="pt-32 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-xs uppercase tracking-wide text-accent hover:text-hover transition-colors mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Shop
          </Link>

          {/* Product Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {product.images.edges.length > 0 ? (
                product.images.edges.map((edge, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-dark-gray overflow-hidden"
                  >
                    <Image
                      src={edge.node.url}
                      alt={edge.node.altText || product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                ))
              ) : (
                <div className="relative aspect-square bg-dark-gray flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 h-fit">
              <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white mb-4">
                {product.title}
              </h1>

              <div className="text-2xl text-accent font-bold mb-8">
                {currencyCode} ${price.toFixed(2)}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8">
                  <h2 className="text-sm uppercase tracking-wide text-gray-400 mb-3">
                    Description
                  </h2>
                  <div className="text-sm text-gray-300 leading-relaxed">
                    {product.description}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <AddToCart
                variants={product.variants.edges}
                productTitle={product.title}
              />

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-800 space-y-4">
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                    Limited Release
                  </h3>
                  <p className="text-xs text-gray-500">
                    This is a limited edition item. Once it's gone, it's gone.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                    Shipping
                  </h3>
                  <p className="text-xs text-gray-500">
                    Orders typically ship within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

