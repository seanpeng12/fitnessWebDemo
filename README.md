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

## Customer login (OAuth 2.0 + PKCE)

The storefront uses Shopify Customer Account API authentication. Add these values
to `.env.local` for an HTTPS development tunnel:

```env
VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID="your_public_customer_account_client_id"
VITE_SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI="https://your-tunnel.example/"
VITE_SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_URI="https://your-tunnel.example/"
```

Shopify doesn't allow localhost or HTTP callback URLs. In Shopify Headless >
Customer Account API settings, select a public client and register the same
callback URL and logout URL. Register only the origin (for example,
`https://your-tunnel.example`) as the JavaScript origin.

For GitHub Pages, the public Customer Account API client ID is configured in the
deployment workflow. The workflow uses the custom domain
`https://trinityroastery.com/` for callback and logout. This client ID isn't a
secret and is visible in the browser bundle.

Google OAuth credentials are configured only in Shopify Admin > Settings >
Customer accounts > Authentication. Never add the Google Client Secret to this
repository or to a `VITE_*` variable.

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
