// src/composables/useShopify.js

import { ref } from 'vue';
import { shopifyFetch } from '../lib/shopify';

// --- GraphQL 查詢語句 ---

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
  const loading = ref(false);
  const error = ref(null);

  /**
   * 根據 handle 獲取單一商品資料
   * @param {string} handle - 商品的 handle
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
   * 建立一個 Shopify 購物車並返回結帳頁面 URL
   * @param {string} variantId - 要購買的商品規格 ID (merchandiseId)
   * @param {number} quantity - 購買數量
   * @returns {Promise<string|null>} - 結帳頁面 URL，如果失敗則返回 null
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
    loading,
    error,
    fetchProductByHandle,
    createCart,
  };
}
