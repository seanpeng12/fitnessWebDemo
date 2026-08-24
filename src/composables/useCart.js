import { computed, ref } from 'vue'
import { shopifyFetch } from '../lib/shopify'
import { shopifyLanguageCode } from '../i18n'

const CART_ID_KEY = 'shopify-cart-id'

const cart = ref(null)
const loading = ref(false)
const error = ref('')
const isOpen = ref(false)
let initialized = false

const CART_FRAGMENT = `
  fragment CartDetails on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost { totalAmount { amount currencyCode } }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            image { url altText }
            price { amount currencyCode }
            product {
              title
              handle
              featuredImage { url altText }
            }
          }
        }
      }
    }
  }
`

const GET_CART = `
  ${CART_FRAGMENT}
  query Cart($id: ID!, $language: LanguageCode!) @inContext(language: $language) {
    cart(id: $id) { ...CartDetails }
  }
`

const CREATE_CART = `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!], $language: LanguageCode!) @inContext(language: $language) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartDetails }
      userErrors { field message code }
    }
  }
`

const ADD_LINES = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode!) @inContext(language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartDetails }
      userErrors { field message code }
    }
  }
`

const UPDATE_LINES = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode!) @inContext(language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartDetails }
      userErrors { field message code }
    }
  }
`

const REMOVE_LINES = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode!) @inContext(language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartDetails }
      userErrors { field message code }
    }
  }
`

function applyPayload(payload) {
  const userErrors = payload?.userErrors || []
  if (userErrors.length) throw new Error(userErrors.map((item) => item.message).join('\n'))
  if (!payload?.cart) throw new Error('Cart is unavailable.')
  cart.value = payload.cart
  localStorage.setItem(CART_ID_KEY, payload.cart.id)
  return payload.cart
}

async function loadCart() {
  if (initialized) return cart.value
  initialized = true
  return refreshCart()
}

async function refreshCart() {
  const cartId = cart.value?.id || localStorage.getItem(CART_ID_KEY)
  if (!cartId) return null

  loading.value = true
  error.value = ''
  try {
    const response = await shopifyFetch(GET_CART, {
      id: cartId,
      language: shopifyLanguageCode(),
    })
    cart.value = response.data.cart
    if (!cart.value) localStorage.removeItem(CART_ID_KEY)
    return cart.value
  } catch (cause) {
    error.value = cause.message
    return null
  } finally {
    loading.value = false
  }
}

async function addLine(merchandiseId, quantity = 1) {
  loading.value = true
  error.value = ''
  isOpen.value = true
  try {
    const lines = [{ merchandiseId, quantity: Math.max(1, Number(quantity) || 1) }]
    if (!cart.value) {
      const response = await shopifyFetch(CREATE_CART, {
        lines,
        language: shopifyLanguageCode(),
      })
      applyPayload(response.data.cartCreate)
    } else {
      const response = await shopifyFetch(ADD_LINES, {
        cartId: cart.value.id,
        lines,
        language: shopifyLanguageCode(),
      })
      applyPayload(response.data.cartLinesAdd)
    }
    return cart.value
  } catch (cause) {
    error.value = cause.message
    throw cause
  } finally {
    loading.value = false
  }
}

async function updateLine(lineId, quantity) {
  if (!cart.value) return
  if (Number(quantity) < 1) return removeLine(lineId)
  loading.value = true
  error.value = ''
  try {
    const response = await shopifyFetch(UPDATE_LINES, {
      cartId: cart.value.id,
      lines: [{ id: lineId, quantity: Number(quantity) }],
      language: shopifyLanguageCode(),
    })
    return applyPayload(response.data.cartLinesUpdate)
  } catch (cause) {
    error.value = cause.message
    throw cause
  } finally {
    loading.value = false
  }
}

async function removeLine(lineId) {
  if (!cart.value) return
  loading.value = true
  error.value = ''
  try {
    const response = await shopifyFetch(REMOVE_LINES, {
      cartId: cart.value.id,
      lineIds: [lineId],
      language: shopifyLanguageCode(),
    })
    return applyPayload(response.data.cartLinesRemove)
  } catch (cause) {
    error.value = cause.message
    throw cause
  } finally {
    loading.value = false
  }
}

async function checkout() {
  if (!cart.value?.checkoutUrl) return
  const localizedCart = await refreshCart()
  if (!localizedCart?.checkoutUrl) return
  const url = new URL(localizedCart.checkoutUrl)
  url.searchParams.set('sso', 'silent')
  window.location.assign(url.toString())
}

const lines = computed(() => cart.value?.lines?.nodes || [])
const totalQuantity = computed(() => cart.value?.totalQuantity || 0)

export function useCart() {
  return {
    cart,
    lines,
    totalQuantity,
    loading,
    error,
    isOpen,
    loadCart,
    refreshCart,
    addLine,
    updateLine,
    removeLine,
    checkout,
  }
}
