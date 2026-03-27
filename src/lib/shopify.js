// src/lib/shopify.js

/**
 * Executes a GraphQL request to the Shopify Storefront API
 * @param {string} query - GraphQL query string
 * @param {object} [variables={}] - Variables passed to the query
 * @returns {Promise<object>} - JSON object from the API response
 * @throws {Error} - Throws error if API response status is not 200
 */
export async function shopifyFetch(query, variables = {}) {
  // Read Shopify API credentials from Vite environment variables
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
