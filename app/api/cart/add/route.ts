import { NextResponse } from 'next/server';
import { addToCart } from '@/lib/shopify';

export async function POST(request: Request) {
  try {
    const { cartId, merchandiseId, quantity } = await request.json();

    if (!cartId || !merchandiseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const cart = await addToCart(cartId, merchandiseId, quantity || 1);
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

