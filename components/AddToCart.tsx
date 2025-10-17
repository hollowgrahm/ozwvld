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

    try {
      // Get or create cart ID from localStorage
      let cartId = localStorage.getItem('shopify_cart_id');

      if (!cartId) {
        const createResponse = await fetch('/api/cart/create', {
          method: 'POST',
        });
        const { cart } = await createResponse.json();
        cartId = cart.id;
        if (cartId) {
          localStorage.setItem('shopify_cart_id', cartId);
        }
      }

      // Add item to cart
      const addResponse = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          merchandiseId: selectedVariant,
          quantity: 1,
        }),
      });

      const { cart } = await addResponse.json();

      // Redirect to checkout
      if (cart.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
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

