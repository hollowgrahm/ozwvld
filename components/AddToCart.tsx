'use client';

import { useState } from 'react';
import { ShopifyProductVariant } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

interface AddToCartProps {
  variants: Array<{ node: ShopifyProductVariant }>;
  productTitle: string;
  productImage?: string;
}

export default function AddToCart({ variants, productTitle, productImage }: AddToCartProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.node.id || '');
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const selectedVariant = variants.find((v) => v.node.id === selectedVariantId)?.node;
    
    if (!selectedVariant) return;

    // Add to local cart (no API calls yet)
    addItem({
      variantId: selectedVariant.id,
      productTitle,
      variantTitle: selectedVariant.title,
      price: selectedVariant.priceV2.amount,
      currencyCode: selectedVariant.priceV2.currencyCode,
      quantity: 1,
      image: productImage,
    });

    console.log('✅ Added to cart:', productTitle, selectedVariant.title);
  };

  const availableVariants = variants.filter((v) => v.node.availableForSale);

  if (availableVariants.length === 0) {
    return (
      <div className="mt-8 p-4 bg-dark-gray text-gray-400 text-sm tracking-wide text-center">
        Out of Stock
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Variant Selection */}
      {variants.length > 1 && (
        <div className="space-y-2">
          <label className="text-xs tracking-wide text-gray-400">
            Select Variant
          </label>
          <select
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="w-full bg-dark-gray text-white border border-gray-800 p-3 text-sm tracking-wide focus:border-accent outline-none"
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
        className="w-full bg-accent hover:bg-hover text-white font-bold py-4 px-8 tracking-wider text-sm transition-colors"
      >
        Add to Cart
      </button>

      <p className="text-xs text-gray-500 text-center">
        Item will be added to your cart
      </p>
    </div>
  );
}

