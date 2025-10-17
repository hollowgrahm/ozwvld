# Quick Shopify Setup Guide

Follow these steps to get your store connected:

## 1. Create Shopify Store

- Go to [shopify.com](https://www.shopify.com)
- Sign up for a new store (free trial available)
- Complete basic store setup

## 2. Create a Storefront App

### In your Shopify Admin:

1. **Settings** → **Apps and sales channels** → **Develop apps**
2. Click **"Create an app"**
3. Name it: `Storefront API`
4. Click **"Create app"**

### Configure API Access:

1. Click **"Configure Storefront API scopes"**
2. Enable these permissions:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_product_tags`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_checkouts`
3. Click **"Save"**
4. Click **"Install app"**

### Get Your Credentials:

1. Go to **"API credentials"** tab
2. Copy your **Storefront API access token** (starts with `shpat_...`)
3. Your store domain is: `your-store-name.myshopify.com`

## 3. Add Products

1. **Products** → **Add product**
2. Fill in:
   - Product title
   - Description
   - Price
   - Upload images (at least one)
   - Add variants if needed (sizes, colors)
3. Click **"Save"**
4. Make sure **"Online Store"** is checked in the Product availability section

## 4. Configure This App

Edit the `.env.local` file in the project root:

\`\`\`
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
\`\`\`

## 5. Test Locally

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` - you should see your products!

## 6. Deploy

Push to GitHub and deploy to Vercel:

- Add the same environment variables in Vercel dashboard
- Deploy!

## Troubleshooting

**No products showing?**

- Check that products are available on "Online Store" sales channel
- Verify API credentials in `.env.local`
- Check browser console for errors

**Cart not working?**

- Ensure all API scopes are enabled (especially `unauthenticated_write_checkouts`)
- Try creating a fresh Storefront API app if issues persist

**Images not loading?**

- Verify images are uploaded in Shopify
- Check that `next.config.ts` allows Shopify domains

## Need Help?

- [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)
- [Shopify Help Center](https://help.shopify.com)
