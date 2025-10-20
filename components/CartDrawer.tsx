'use client';

import { useCart } from '@/lib/cart-context';
import Image from 'next/image';
import { useState } from 'react';

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    itemCount,
    isCartOpen,
    closeCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    try {
      // Create cart with all items
      const createResponse = await fetch('/api/cart/create', {
        method: 'POST',
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create cart');
      }

      const { cart } = await createResponse.json();
      let cartId = cart.id;

      // Add all items to the cart
      for (const item of items) {
        const addResponse = await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartId,
            merchandiseId: item.variantId,
            quantity: item.quantity,
          }),
        });

        if (!addResponse.ok) {
          throw new Error('Failed to add item to cart');
        }

        const { cart: updatedCart } = await addResponse.json();
        cartId = updatedCart.id;
      }

      // Get final cart with checkout URL
      const finalResponse = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId,
          merchandiseId: items[0].variantId,
          quantity: 0, // Just to get the cart back
        }),
      });

      const { cart: finalCart } = await finalResponse.json();

      // Build checkout URL with .myshopify.com domain
      const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
      if (finalCart.checkoutUrl) {
        const url = new URL(finalCart.checkoutUrl);
        const checkoutUrl = `https://${shopifyDomain}${url.pathname}${url.search}`;
        
        console.log('🚀 Redirecting to checkout:', checkoutUrl);
        
        // Clear local cart and redirect
        clearCart();
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to proceed to checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-accent z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl uppercase tracking-wider text-white font-bold">
              Cart ({itemCount})
            </h2>
            <button
              onClick={closeCart}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm uppercase tracking-wide">
                Your cart is empty
              </p>
              <button
                onClick={closeCart}
                className="mt-4 text-accent hover:text-hover text-sm uppercase tracking-wide transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 bg-dark-gray p-4"
                >
                  {/* Product Image */}
                  {item.image && (
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-900">
                      <Image
                        src={item.image}
                        alt={item.productTitle}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white text-sm uppercase tracking-wide">
                        {item.productTitle}
                      </h3>
                      {item.variantTitle !== 'Default Title' && (
                        <p className="text-gray-400 text-xs mt-1">
                          {item.variantTitle}
                        </p>
                      )}
                      <p className="text-accent text-sm mt-1">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white text-sm transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-white text-sm min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white text-sm transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="ml-auto text-gray-400 hover:text-accent text-xs uppercase tracking-wide transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-800 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-white">
              <span className="text-sm uppercase tracking-wide">Total:</span>
              <span className="text-xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-accent hover:bg-hover text-white font-bold py-4 px-8 uppercase tracking-wider text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>

            {/* Continue Shopping */}
            <button
              onClick={closeCart}
              className="w-full text-gray-400 hover:text-white text-sm uppercase tracking-wide transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

