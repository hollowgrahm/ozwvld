# Quick Start Guide

Your Shopify storefront is ready! Follow these steps to launch:

## ✅ What's Been Built

- ✨ Dark-themed storefront with video background
- 🛍️ Product listings with image galleries
- 📱 Fully responsive design
- 🛒 Shopping cart with Shopify checkout
- ⚡ Optimized with Next.js 15 and Tailwind CSS v4

## 🚀 Launch in 5 Steps

### Step 1: Add Shopify Credentials

Edit the `.env.local` file with your actual Shopify credentials:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

**Don't have these yet?** See `SHOPIFY_SETUP.md` for detailed instructions.

### Step 2: Add Your Branding

Update these files with your brand info:

1. **components/Header.tsx** - Change "Your Brand" to your brand name
2. **app/layout.tsx** - Update page title and description
3. **app/page.tsx** - Update email and footer text

### Step 3: Customize Video (Optional)

The default video works, but to add your own:

- See `VIDEO_BACKGROUND.md` for instructions
- Or remove the video for a solid background

### Step 4: Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Step 5: Deploy

Push to GitHub and deploy to Vercel:

```bash
git add .
git commit -m "Initial storefront setup"
git push origin main
```

Then:

1. Go to [vercel.com](https://vercel.com)
2. Import your repository
3. Add your environment variables
4. Deploy!

## 📁 Project Structure

```
├── app/
│   ├── api/cart/          # Cart API endpoints
│   ├── products/[handle]/ # Product detail pages
│   ├── layout.tsx         # Root layout with Header
│   ├── page.tsx           # Homepage with video + products
│   └── globals.css        # Styling (Inconsolata font, colors)
├── components/
│   ├── Header.tsx         # Navigation
│   ├── ProductCard.tsx    # Product grid item
│   └── AddToCart.tsx      # Add to cart button
├── lib/
│   ├── shopify.ts         # Shopify API functions
│   └── types.ts           # TypeScript types
└── public/                # Static files
```

## 🎨 Design Features

- **Font:** Inconsolata (monospace, technical aesthetic)
- **Colors:**
  - Black (#000000) background
  - White (#ffffff) text
  - Red (#ff5959) accent
  - Purple (#d8cbec) hover states
- **Video:** Full-screen looping background
- **Layout:** Centered navigation, minimal chrome

## 🛠️ Customization

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --accent: #ff5959;
  --hover: #d8cbec;
}
```

### Change Font

Update `app/layout.tsx` to import a different Google Font.

### Add Pages

Create new routes in the `app/` directory (e.g., `app/about/page.tsx`).

## 🆘 Troubleshooting

### Products not showing?

- Verify Shopify credentials in `.env.local`
- Check that products are published to "Online Store" channel
- Open browser console for errors

### Build errors?

```bash
npm run build
```

This will show any TypeScript or configuration issues.

### Need help?

- See `README.md` for full documentation
- See `SHOPIFY_SETUP.md` for Shopify-specific help
- Check [Next.js docs](https://nextjs.org/docs)

## 📦 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Shopify Storefront API** - Product data & checkout
- **Vercel** - Recommended hosting (free tier available)

## 🎯 Next Steps

1. Add your Shopify products
2. Customize branding and colors
3. Test the cart flow
4. Add your own video or images
5. Deploy to production

**Questions?** Check the other documentation files or Shopify's support resources.

Happy selling! 🚀
