// src/composables/useShopify.js

import { ref } from 'vue';
import { shopifyFetch } from '../lib/shopify';
import { i18n, shopifyLanguageCode } from '../i18n';

// --- GraphQL Query Statements ---

const GET_PRODUCT_BY_HANDLE_QUERY = (language) => `
  query getProductByHandle($handle: String!) ${language === 'EN' ? '@inContext(language: EN)' : ''} {
    localization { language { isoCode } }
    product(handle: $handle) {
      id
      handle
      title
      vendor
      productType
      descriptionHtml
      options {
        name
        values
      }
      images(first: 20) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            sku
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
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

const GET_PRODUCTS_QUERY = (language) => `
  query getProducts($first: Int!, $after: String) ${language === 'EN' ? '@inContext(language: EN)' : ''} {
    localization {
      language {
        isoCode
      }
    }
    productTypes(first: 250) {
      nodes
    }
    products(first: $first, after: $after) {
      nodes {
        id
        handle
        title
        vendor
        productType
        descriptionHtml
        options {
          name
          values
        }
        images(first: 20) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              sku
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
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
  const productTypes = ref([]);
  const contentLanguage = ref(null);
  const loading = ref(false);
  const error = ref(null);
  let productsRequestId = 0;

  /** Fetches every product published to this Storefront API channel. */
  const fetchAllProducts = async () => {
    const requestId = ++productsRequestId;
    const language = shopifyLanguageCode();
    loading.value = true;
    error.value = null;
    products.value = [];
    productTypes.value = [];
    contentLanguage.value = null;

    try {
      let after = null;
      let hasNextPage = true;
      let queryLanguage = language;

      while (hasNextPage) {
        let response = await shopifyFetch(GET_PRODUCTS_QUERY(queryLanguage), {
          first: 50,
          after,
        });
        if (requestId !== productsRequestId) return;
        // Shopify falls back to the active market language when English is not published.
        // In this shop, that contextual fallback can be an older market adaptation.
        if (queryLanguage === 'EN' && response.data.localization.language.isoCode !== 'EN') {
          queryLanguage = 'ZH_TW';
          response = await shopifyFetch(GET_PRODUCTS_QUERY('ZH_TW'), { first: 50, after });
          if (requestId !== productsRequestId) return;
        }
        const page = response.data.products;
        contentLanguage.value = response.data.localization.language.isoCode;

        if (productTypes.value.length === 0) {
          productTypes.value = response.data.productTypes.nodes.filter(Boolean);
        }

        products.value.push(...page.nodes);
        hasNextPage = page.pageInfo.hasNextPage;
        after = page.pageInfo.endCursor;
      }
    } catch (e) {
      if (requestId === productsRequestId) error.value = e.message;
    } finally {
      if (requestId === productsRequestId) loading.value = false;
    }
  };

  /**
   * Fetches single product data by handle
   * @param {string} handle - The product handle
   */
  const fetchProductByHandle = async (handle) => {
    const language = shopifyLanguageCode();
    loading.value = true;
    error.value = null;
    product.value = null;
    try {
      let response = await shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY(language), {
        handle,
      });
      if (language === 'EN' && response.data.localization.language.isoCode !== 'EN') {
        response = await shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY('ZH_TW'), { handle });
      }
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
    productTypes,
    contentLanguage,
    loading,
    error,
    fetchAllProducts,
    fetchProductByHandle,
  };
}
