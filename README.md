# Urban Apparel - Shopify Storefront

A minimal, modern Next.js storefront for Shopify with a dark, futuristic aesthetic inspired by Distortion Dynamics.

## Features

- 🎨 Dark theme with custom color palette
- 🎥 Full-screen video background on homepage
- 🛍️ Product listings and detail pages
- 🛒 Cart integration with Shopify Checkout
- ⚡ Built with Next.js 15, TypeScript, and Tailwind CSS v4
- 📱 Fully responsive design
- 🔤 Inconsolata monospace font for technical aesthetic

## Prerequisites

Before you begin, you'll need:

1. A Shopify store (you can sign up at [shopify.com](https://www.shopify.com))
2. Node.js 18+ installed
3. npm or yarn package manager

## Shopify Setup

### Step 1: Create Your Shopify Store

1. Go to [shopify.com](https://www.shopify.com) and create a new store
2. Complete the initial setup and add your products

### Step 2: Enable Storefront API

1. In your Shopify admin, go to **Settings** → **Apps and sales channels**
2. Click **Develop apps**
3. Click **Create an app**
4. Name it (e.g., "Storefront")
5. Click **Configure Storefront API scopes**
6. Enable the following permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
7. Save and click **Install app**

### Step 3: Get Your API Credentials

1. Go to the **API credentials** tab
2. Copy your **Storefront API access token**
3. Note your **Store domain** (e.g., `your-store.myshopify.com`)

### Step 4: Add Products

1. In your Shopify admin, go to **Products**
2. Add your products with:
   - Title
   - Description
   - Images
   - Price
   - Variants (sizes, colors, etc.)
3. Make sure products are available on the "Online Store" sales channel

## Installation

1. **Clone or download this repository**

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create environment file:**

   Create a file named `.env.local` in the root directory with your Shopify credentials:

   \`\`\`
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/
│ ├── api/
│ │ └── cart/ # Cart API endpoints
│ ├── products/
│ │ └── [handle]/ # Dynamic product pages
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Homepage
├── components/
│ ├── Header.tsx # Navigation header
│ ├── ProductCard.tsx # Product card component
│ └── AddToCart.tsx # Add to cart functionality
├── lib/
│ ├── shopify.ts # Shopify API client
│ └── types.ts # TypeScript types
└── public/ # Static assets
\`\`\`

## Customization

### Colors

Edit the color scheme in `app/globals.css`:

\`\`\`css
:root {
--background: #000000; /_ Black background _/
--foreground: #ffffff; /_ White text _/
--accent: #ff5959; /_ Red/coral accent _/
--hover: #d8cbec; /_ Purple hover _/
--dark-gray: #171717; /_ Dark gray _/
}
\`\`\`

### Video Background

Replace the video URL in `app/page.tsx`:

\`\`\`tsx
<video autoPlay muted loop playsInline>

  <source src="YOUR_VIDEO_URL" type="video/mp4" />
</video>
\`\`\`

### Branding

Update the brand name in:

- `components/Header.tsx` - Update "Your Brand"
- `app/layout.tsx` - Update page title and description
- `app/page.tsx` - Update email address and footer text

### Font

To change the font, update the import in `app/layout.tsx` and the CSS variable in `app/globals.css`.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add your environment variables:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
5. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to:

- Netlify
- Railway
- AWS Amplify
- Any platform that supports Next.js

## Troubleshooting

### Products not loading

- Check that your `.env.local` file has the correct credentials
- Verify your Shopify app has the correct API scopes enabled
- Ensure products are available on the "Online Store" sales channel
- Check the browser console for error messages

### Images not displaying

- Verify your products have images in Shopify
- Check that `next.config.ts` includes Shopify domains in `remotePatterns`

### Cart not working

- Ensure `unauthenticated_write_checkouts` scope is enabled
- Check browser console for API errors
- Verify your Storefront API token is correct

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Font:** Inconsolata (Google Fonts)
- **E-commerce:** Shopify Storefront API
- **Checkout:** Shopify hosted checkout

## Support

For Shopify-specific questions:

- [Shopify Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [Shopify Support](https://help.shopify.com)

For Next.js questions:

- [Next.js Documentation](https://nextjs.org/docs)

## License

This project is provided as-is for your use.
