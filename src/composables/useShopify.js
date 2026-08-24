// src/composables/useShopify.js

import { ref } from 'vue';
import { shopifyFetch } from '../lib/shopify';
import { i18n, shopifyLanguageCode } from '../i18n';

// --- GraphQL Query Statements ---

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
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
            availableForSale
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
  query getProducts($first: Int!, $after: String, $language: LanguageCode!) @inContext(language: $language) {
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
              availableForSale
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
          language: shopifyLanguageCode(),
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
      const response = await shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY, {
        handle,
        language: shopifyLanguageCode(),
      });
      if (!response.data.product) {
        throw new Error(i18n.global.t('product.notFound', { handle }));
      }
      product.value = response.data.product;
    } catch (e) {
      error.value = e.message;
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
  };
}
