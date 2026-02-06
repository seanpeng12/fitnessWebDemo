// src/lib/shopify.js

/**
 * 執行 Shopify Storefront API 的 GraphQL 請求
 * @param {string} query - GraphQL 查詢語句
 * @param {object} [variables={}] - 傳遞給查詢的變數
 * @returns {Promise<object>} - API 回應的 JSON 物件
 * @throws {Error} - 如果 API 回應狀態不為 200，則拋出錯誤
 */
export async function shopifyFetch(query, variables = {}) {
  // 從 Vite 環境變數讀取 Shopify API 憑證
  const apiUrl = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!apiUrl || !accessToken) {
    throw new Error("Missing Shopify API credentials. Please check your .env.local file.");
  }
  
  const endpoint = `https://${apiUrl}/api/2024-04/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Shopify API request failed: ${response.statusText}\n${errorBody}`);
  }

  const jsonResponse = await response.json();
  if (jsonResponse.errors) {
    console.error('GraphQL Errors:', jsonResponse.errors);
    throw new Error('A GraphQL error occurred.');
  }

  return jsonResponse;
}
