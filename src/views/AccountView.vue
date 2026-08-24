<template>
  <div class="min-h-[65vh] bg-[#F7F5F2] px-6 py-20">
    <div class="mx-auto max-w-5xl">
      <section class="border border-[#DED7D0] bg-white px-8 py-10 sm:px-12">
        <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.35em] text-bb-blue">{{ t('auth.customerAccount') }}</p>
            <h1 class="mt-3 text-3xl font-light text-bb-text">{{ t('auth.accountTitle') }}</h1>
          </div>
          <button class="self-start border border-bb-text px-6 py-3 text-[10px] font-bold tracking-widest text-bb-text hover:border-bb-blue hover:text-bb-blue sm:self-auto" @click="signOut">
            {{ t('auth.logout') }}
          </button>
        </div>

        <div v-if="loading" class="py-12 text-center text-sm text-gray-400">{{ t('common.loading') }}</div>
        <div v-else-if="customer" class="mt-8 border-t border-[#E8E3DE] pt-7">
          <p class="text-lg text-bb-text">{{ t('auth.welcome', { name: customer.displayName || customer.firstName || customer.emailAddress?.emailAddress }) }}</p>
          <p class="mt-2 text-sm text-gray-500">{{ customer.emailAddress?.emailAddress }}</p>
        </div>
        <p v-if="error" class="mt-6 text-sm text-red-600">{{ error }}</p>
      </section>

      <section class="mt-10">
        <div class="mb-6 flex items-end justify-between">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-bb-blue">Shopify</p>
            <h2 class="mt-2 text-2xl font-light text-bb-text">{{ t('orders.title') }}</h2>
          </div>
          <span v-if="orders.length" class="text-xs text-gray-400">{{ t('orders.count', { count: orders.length }) }}</span>
        </div>

        <div v-if="ordersLoading" class="border border-[#DED7D0] bg-white py-16 text-center text-sm text-gray-400">{{ t('orders.loading') }}</div>
        <div v-else-if="ordersError" class="border border-red-200 bg-red-50 px-6 py-5 text-sm leading-6 text-red-700">
          {{ ordersError }}
          <p class="mt-2 text-xs">{{ t('orders.permissionHint') }}</p>
        </div>
        <div v-else-if="!orders.length" class="border border-[#DED7D0] bg-white px-8 py-14 text-center">
          <p class="text-lg font-light text-bb-text">{{ t('orders.empty') }}</p>
          <router-link to="/#shop" class="mt-5 inline-block text-xs font-bold tracking-widest text-bb-blue">{{ t('orders.shopNow') }}</router-link>
        </div>

        <div v-else class="space-y-5">
          <article v-for="order in orders" :key="order.id" class="border border-[#DED7D0] bg-white">
            <header class="grid gap-4 border-b border-[#E8E3DE] bg-[#FAF9F7] px-6 py-5 sm:grid-cols-[1fr_auto_auto] sm:items-center">
              <div>
                <h3 class="font-medium text-bb-text">{{ order.name }}</h3>
                <p class="mt-1 text-xs text-gray-400">{{ date(order.processedAt) }}</p>
              </div>
              <div class="flex flex-wrap gap-2 text-[10px]">
                <span class="bg-[#EEF5F5] px-3 py-1.5 text-[#547E7F]">{{ financialStatus(order.financialStatus) }}</span>
                <span class="bg-[#F3EEE9] px-3 py-1.5 text-[#806D60]">{{ fulfillmentStatus(order.fulfillmentStatus) }}</span>
              </div>
              <strong class="text-sm text-bb-text sm:text-right">{{ money(order.totalPrice) }}</strong>
            </header>

            <div class="divide-y divide-[#EEE9E4] px-6">
              <div v-for="item in order.lineItems.nodes" :key="item.id" class="flex items-center gap-4 py-4">
                <div class="h-16 w-14 flex-none bg-[#F5F3F0] p-1">
                  <img v-if="item.image" :src="item.image.url" :alt="item.image.altText || item.title" class="h-full w-full object-contain mix-blend-multiply" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm text-bb-text">{{ item.title }}</p>
                  <p v-if="item.variantTitle" class="mt-1 text-[11px] text-gray-400">{{ item.variantTitle }}</p>
                </div>
                <span class="text-xs text-gray-400">× {{ item.quantity }}</span>
                <span v-if="item.totalPrice" class="text-xs text-bb-text">{{ money(item.totalPrice) }}</span>
              </div>
            </div>

            <footer class="flex justify-end border-t border-[#E8E3DE] px-6 py-4">
              <a :href="order.statusPageUrl" class="text-[10px] font-bold tracking-widest text-bb-blue hover:underline">{{ t('orders.viewDetails') }} →</a>
            </footer>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCustomerAuth } from '../composables/useCustomerAuth'

const router = useRouter()
const { t, locale } = useI18n()
const { customer, orders, loading, ordersLoading, error, ordersError, isAuthenticated, fetchCustomer, fetchOrders, logout } = useCustomerAuth()

const money = ({ amount, currencyCode }) => new Intl.NumberFormat(
  locale.value === 'zh-TW' ? 'zh-TW' : 'en-US',
  { style: 'currency', currency: currencyCode },
).format(amount)
const date = (value) => new Intl.DateTimeFormat(
  locale.value === 'zh-TW' ? 'zh-TW' : 'en-US',
  { year: 'numeric', month: 'short', day: 'numeric' },
).format(new Date(value))
const financialStatus = (status) => t(`orders.financial.${status || 'UNKNOWN'}`)
const fulfillmentStatus = (status) => t(`orders.fulfillment.${status || 'UNKNOWN'}`)

const signOut = async () => {
  try {
    await logout()
    router.replace('/')
  } catch {
    router.replace('/')
  }
}

onMounted(async () => {
  if (!isAuthenticated.value) return router.replace('/login')
  if (!customer.value) {
    try { await fetchCustomer() } catch (cause) { error.value = cause.message }
  }
  await fetchOrders()
})
</script>
