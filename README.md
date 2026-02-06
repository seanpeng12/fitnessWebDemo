# Vue Shopify Product Showcase

This project is a complete Vue 3 application that demonstrates how to connect to the Shopify Storefront API to display a product and create a checkout.

## Project Setup

### 1. Prerequisites
- Node.js (v18 or newer)
- npm

### 2. Installation
Navigate into the project directory and install the required dependencies.
```bash
cd ~/projects/testWebForUIUX/newWebSite
npm install
```

### 3. Configure Environment Variables
The project uses a `.env.local` file to store your Shopify API credentials. Make sure you have this file in the project root (`newWebSite/.env.local`) with your specific store domain and storefront access token.

```
VITE_SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN="your_public_storefront_api_token"
```

I have pre-filled this file with public credentials for a sample store.

### 4. Update Product Handle
To display your own product, open `src/App.vue` and change the `product-handle` prop to match a product handle from your store.
```vue
<template>
  <main>
    <!-- Change "snowboard-hydrogen" to your product's handle -->
    <ProductDisplay product-handle="snowboard-hydrogen" />
  </main>
</template>
```

## Development

To start the local development server, run the following command:
```bash
npm run dev
```
You can then access the application in your browser, usually at `http://localhost:5173`.
