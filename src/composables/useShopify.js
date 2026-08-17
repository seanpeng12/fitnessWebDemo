// src/composables/useShopify.js

import { ref } from 'vue';
import { shopifyFetch } from '../lib/shopify';

// --- GraphQL Query Statements ---

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        id
        handle
        title
        descriptionHtml
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation cartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;


export function useShopify() {
  const product = ref(null);
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  /** Fetches every product published to this Storefront API channel. */
  const fetchAllProducts = async () => {
    loading.value = true;
    error.value = null;
    products.value = [];

    try {
      let after = null;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await shopifyFetch(GET_PRODUCTS_QUERY, {
          first: 50,
          after,
        });
        const page = response.data.products;

        products.value.push(...page.nodes);
        hasNextPage = page.pageInfo.hasNextPage;
        after = page.pageInfo.endCursor;
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetches single product data by handle
   * @param {string} handle - The product handle
   */
  const fetchProductByHandle = async (handle) => {
    loading.value = true;
    error.value = null;
    product.value = null;
    try {
      const response = await shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
      if (!response.data.product) {
        throw new Error(`Product with handle "${handle}" not found.`);
      }
      product.value = response.data.product;
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };
  
  /**
   * Creates a Shopify cart and returns the checkout URL
   * @param {string} variantId - The product variant ID (merchandiseId)
   * @param {number} quantity - Purchase quantity
   * @returns {Promise<string|null>} - Checkout URL, or null if failed
   */
  const createCart = async (variantId, quantity) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await shopifyFetch(CREATE_CART_MUTATION, {
        lines: [{ merchandiseId: variantId, quantity }],
      });
      
      const cartData = response.data.cartCreate;

      if (cartData.userErrors.length > 0) {
        throw new Error(cartData.userErrors.map(e => e.message).join('\n'));
      }

      return cartData.cart?.checkoutUrl || null;
      
    } catch (e) {
      error.value = e.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    product,
    products,
    loading,
    error,
    fetchAllProducts,
    fetchProductByHandle,
    createCart,
  };
}
