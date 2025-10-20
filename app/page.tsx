import { getAllProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let products: Awaited<ReturnType<typeof getAllProducts>> = [];
  let error: Error | null = null;

  try {
    products = await getAllProducts();
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error = err instanceof Error ? err : new Error('Unknown error');
  }

  return (
    <main className="min-h-screen">
      {/* Video Background */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.shopify.com/videos/c/o/v/42c520b636b64558a48e596d5fc8257b.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider text-white mb-4">
              create.collection.001
            </h1>
            <p className="text-sm md:text-base text-gray-300 uppercase tracking-wide">
              Limited Release Collection
            </p>
          </div>

          {/* Products Grid */}
          {error ? (
            <div className="text-center py-20">
              <div className="bg-dark-gray p-8 inline-block">
                <p className="text-accent text-sm uppercase tracking-wide mb-4">
                  Unable to load products
                </p>
                <p className="text-gray-400 text-xs">
                  Please ensure your Shopify credentials are configured in .env.local
                </p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-dark-gray p-8 inline-block">
                <p className="text-white text-sm uppercase tracking-wide mb-4">
                  No products available yet
                </p>
                <p className="text-gray-400 text-xs">
                  Add products to your Shopify store to see them here
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-8 pb-20">
              {products.map((product) => (
                <div key={product.id} className="w-full sm:w-[350px] lg:w-[300px] xl:w-[280px] flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* Contact Section */}
          <div id="contact" className="py-20 text-center">
            <div className="bg-dark-gray p-8 max-w-md mx-auto">
              <h2 className="text-xl uppercase tracking-wider text-white mb-4">
                Get in Touch
              </h2>
              {/* <p className="text-sm text-gray-400 mb-6">
                Questions about this limited release?
              </p> */}
              <a
                href="mailto:ozwvld@gmail.com"
                className="inline-block bg-accent hover:bg-hover text-white font-bold py-3 px-8 uppercase tracking-wider text-sm transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-black border-t border-gray-900 py-8 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          © 2025 Ozwvld. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
