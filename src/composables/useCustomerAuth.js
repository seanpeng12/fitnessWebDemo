import { computed, ref } from 'vue'
import { i18n } from '../i18n'

const TOKEN_KEY = 'shopify-customer-tokens'
const OAUTH_KEY = 'shopify-customer-oauth'

const customer = ref(null)
const orders = ref([])
const loading = ref(false)
const ordersLoading = ref(false)
const error = ref('')
const ordersError = ref('')
const tokens = ref(readJson(TOKEN_KEY))

const storeDomain = (import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '')
const clientId = import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || ''

function readJson(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key) || 'null')
  } catch {
    return null
  }
}

function randomBase64Url(size = 32) {
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  return base64Url(bytes)
}

function base64Url(bytes) {
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function createChallenge(verifier) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
  return base64Url(new Uint8Array(digest))
}

function configuredRedirectUri() {
  return import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI || applicationRootUrl()
}

function configuredLogoutUri() {
  return import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_URI || applicationRootUrl()
}

function applicationRootUrl() {
  return new URL(import.meta.env.BASE_URL, window.location.href).href
}

async function discover(path) {
  if (!storeDomain) throw new Error(i18n.global.t('auth.missingDomain'))
  const response = await fetch(`https://${storeDomain}${path}`)
  if (!response.ok) throw new Error(i18n.global.t('auth.discoveryFailed'))
  return response.json()
}

function decodeJwtPayload(jwt) {
  const encoded = jwt.split('.')[1]
  if (!encoded) throw new Error(i18n.global.t('auth.invalidResponse'))
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
  return JSON.parse(atob(padded))
}

async function login() {
  error.value = ''
  if (!clientId) throw new Error(i18n.global.t('auth.missingClientId'))

  loading.value = true
  try {
    const config = await discover('/.well-known/openid-configuration')
    const verifier = randomBase64Url(64)
    const state = randomBase64Url()
    const nonce = randomBase64Url()
    const redirectUri = configuredRedirectUri()
    const challenge = await createChallenge(verifier)

    sessionStorage.setItem(OAUTH_KEY, JSON.stringify({ verifier, state, nonce, redirectUri }))

    const url = new URL(config.authorization_endpoint)
    url.searchParams.set('scope', 'openid email customer-account-api:full')
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('redirect_uri', redirectUri)
    url.searchParams.set('state', state)
    url.searchParams.set('nonce', nonce)
    url.searchParams.set('code_challenge', challenge)
    url.searchParams.set('code_challenge_method', 'S256')
    url.searchParams.set('locale', i18n.global.locale.value === 'zh-TW' ? 'zh-TW' : 'en')
    window.location.assign(url.toString())
  } catch (cause) {
    error.value = cause.message || i18n.global.t('auth.loginFailed')
    loading.value = false
    throw cause
  }
}

async function handleCallback(params = new URLSearchParams(window.location.search)) {
  error.value = ''
  loading.value = true
  try {
    const oauthError = params.get('error')
    if (oauthError) throw new Error(params.get('error_description') || oauthError)

    const code = params.get('code')
    const returnedState = params.get('state')
    const pending = readJson(OAUTH_KEY)
    if (!code || !pending || returnedState !== pending.state) {
      throw new Error(i18n.global.t('auth.invalidState'))
    }

    const config = await discover('/.well-known/openid-configuration')
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: pending.redirectUri,
      code,
      code_verifier: pending.verifier,
    })
    const response = await fetch(config.token_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    const result = await response.json()
    if (!response.ok || !result.access_token || !result.id_token) {
      throw new Error(result.error_description || result.error || i18n.global.t('auth.tokenFailed'))
    }

    const payload = decodeJwtPayload(result.id_token)
    if (payload.nonce !== pending.nonce) throw new Error(i18n.global.t('auth.invalidNonce'))

    tokens.value = {
      accessToken: result.access_token,
      idToken: result.id_token,
      refreshToken: result.refresh_token || null,
      expiresAt: Date.now() + Number(result.expires_in || 0) * 1000,
    }
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(tokens.value))
    sessionStorage.removeItem(OAUTH_KEY)
    await fetchCustomer()
    return true
  } catch (cause) {
    clearLocalSession()
    error.value = cause.message || i18n.global.t('auth.loginFailed')
    return false
  } finally {
    loading.value = false
  }
}

async function fetchCustomer() {
  if (!isAuthenticated.value) return null
  const config = await discover('/.well-known/customer-account-api')
  const response = await fetch(config.graphql_api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: tokens.value.accessToken,
    },
    body: JSON.stringify({
      query: `query CustomerProfile {
        customer {
          id
          firstName
          lastName
          displayName
          emailAddress { emailAddress }
        }
      }`,
    }),
  })
  const result = await response.json()
  if (!response.ok || result.errors) throw new Error(i18n.global.t('auth.profileFailed'))
  customer.value = result.data.customer
  return customer.value
}

async function fetchOrders() {
  if (!isAuthenticated.value) return []
  ordersLoading.value = true
  ordersError.value = ''
  try {
    const config = await discover('/.well-known/customer-account-api')
    const response = await fetch(config.graphql_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokens.value.accessToken,
      },
      body: JSON.stringify({
        query: `query CustomerOrders {
          customer {
            orders(first: 20, reverse: true, sortKey: PROCESSED_AT) {
              nodes {
                id
                name
                number
                processedAt
                financialStatus
                fulfillmentStatus
                statusPageUrl
                totalPrice { amount currencyCode }
                lineItems(first: 20) {
                  nodes {
                    id
                    title
                    variantTitle
                    quantity
                    image { url altText }
                    totalPrice { amount currencyCode }
                  }
                }
              }
            }
          }
        }`,
      }),
    })
    const result = await response.json()
    if (!response.ok || result.errors) {
      throw new Error(result.errors?.map((item) => item.message).join('\n') || i18n.global.t('orders.loadFailed'))
    }
    orders.value = result.data.customer.orders.nodes
    return orders.value
  } catch (cause) {
    ordersError.value = cause.message || i18n.global.t('orders.loadFailed')
    return []
  } finally {
    ordersLoading.value = false
  }
}

function clearLocalSession() {
  tokens.value = null
  customer.value = null
  orders.value = []
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(OAUTH_KEY)
}

async function logout() {
  const idToken = tokens.value?.idToken
  clearLocalSession()
  if (!idToken) return

  const config = await discover('/.well-known/openid-configuration')
  const url = new URL(config.end_session_endpoint)
  url.searchParams.set('id_token_hint', idToken)
  url.searchParams.set('post_logout_redirect_uri', configuredLogoutUri())
  url.searchParams.set('state', randomBase64Url())
  window.location.assign(url.toString())
}

const isAuthenticated = computed(() => Boolean(
  tokens.value?.accessToken && tokens.value.expiresAt > Date.now(),
))
const isConfigured = computed(() => Boolean(storeDomain && clientId))

export function useCustomerAuth() {
  return {
    customer,
    orders,
    loading,
    ordersLoading,
    error,
    ordersError,
    isAuthenticated,
    isConfigured,
    login,
    logout,
    handleCallback,
    fetchCustomer,
    fetchOrders,
  }
}
