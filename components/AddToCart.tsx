'use client';

import { useState } from 'react';
import { ShopifyProductVariant } from '@/lib/types';

interface AddToCartProps {
  variants: Array<{ node: ShopifyProductVariant }>;
  productTitle: string;
}

export default function AddToCart({ variants, productTitle }: AddToCartProps) {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]?.node.id || '');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    console.log('🛒 Add to Cart clicked');
    console.log('Selected variant:', selectedVariant);

    try {
      // Get or create cart ID from localStorage
      let cartId = localStorage.getItem('shopify_cart_id');
      console.log('Existing cart ID:', cartId);

      if (!cartId) {
        console.log('Creating new cart...');
        const createResponse = await fetch('/api/cart/create', {
          method: 'POST',
        });
        
        if (!createResponse.ok) {
          const errorText = await createResponse.text();
          console.error('Failed to create cart:', createResponse.status, errorText);
          throw new Error('Failed to create cart');
        }
        
        const { cart } = await createResponse.json();
        console.log('Cart created:', cart);
        cartId = cart.id;
        if (cartId) {
          localStorage.setItem('shopify_cart_id', cartId);
        }
      }

      // Add item to cart
      console.log('Adding item to cart...');
      const addResponse = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          merchandiseId: selectedVariant,
          quantity: 1,
        }),
      });

      if (!addResponse.ok) {
        const errorText = await addResponse.text();
        console.error('Failed to add to cart:', addResponse.status, errorText);
        throw new Error('Failed to add to cart');
      }

      const { cart } = await addResponse.json();
      console.log('Item added to cart:', cart);
      console.log('Cart checkoutUrl:', cart.checkoutUrl);

      // Redirect to CART page (not checkout) so users can add/remove items
      const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
      
      if (cart.checkoutUrl) {
        try {
          // Parse the checkout URL to get the cart ID
          const url = new URL(cart.checkoutUrl);
          const pathname = url.pathname; // e.g., /cart/c/XXX
          const search = url.search; // e.g., ?key=XXX
          
          // Build cart VIEW URL (not checkout) with .myshopify.com domain
          // This shows the cart page where users can modify items before checkout
          const cartUrl = `https://${shopifyDomain}${pathname}${search}`;
          
          console.log('✅ Built cart URL:', cartUrl);
          console.log('🛒 Redirecting to cart page...');
          console.log('💡 Users can add/remove items, then click "Checkout"');
          
          window.location.href = cartUrl;
        } catch (e) {
          console.error('Error building cart URL:', e);
          throw new Error('Failed to build cart URL');
        }
      } else {
        console.error('No checkout URL returned from cart');
        throw new Error('No cart URL available');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const availableVariants = variants.filter((v) => v.node.availableForSale);

  if (availableVariants.length === 0) {
    return (
      <div className="mt-8 p-4 bg-dark-gray text-gray-400 text-sm uppercase tracking-wide text-center">
        Out of Stock
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Variant Selection */}
      {variants.length > 1 && (
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wide text-gray-400">
            Select Variant
          </label>
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="w-full bg-dark-gray text-white border border-gray-800 p-3 text-sm uppercase tracking-wide focus:border-accent outline-none"
          >
            {variants.map(({ node: variant }) => (
              <option
                key={variant.id}
                value={variant.id}
                disabled={!variant.availableForSale}
              >
                {variant.title}
                {variant.selectedOptions
                  .filter((opt) => opt.name !== 'Title')
                  .map((opt) => ` - ${opt.value}`)
                  .join('')}
                {!variant.availableForSale && ' (Sold Out)'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full bg-accent hover:bg-hover text-white font-bold py-4 px-8 uppercase tracking-wider text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        You will be redirected to Shopify checkout
      </p>
    </div>
  );
}

