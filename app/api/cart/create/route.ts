import { NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function POST() {
  try {
    const cart = await createCart();
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Error creating cart:', error);
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    );
  }
}

