<template>
  <div class="min-h-[65vh] bg-[#F7F5F2] px-6 py-20">
    <section class="mx-auto max-w-2xl border border-[#DED7D0] bg-white px-8 py-10 sm:px-12">
      <p class="text-[10px] font-bold uppercase tracking-[0.35em] text-bb-blue">{{ t('auth.customerAccount') }}</p>
      <h1 class="mt-3 text-3xl font-light text-bb-text">{{ t('auth.accountTitle') }}</h1>

      <div v-if="loading" class="py-16 text-center text-sm text-gray-400">{{ t('common.loading') }}</div>
      <div v-else-if="customer" class="mt-10 border-t border-[#E8E3DE] pt-8">
        <p class="text-lg text-bb-text">{{ t('auth.welcome', { name: customer.displayName || customer.firstName || customer.emailAddress?.emailAddress }) }}</p>
        <p class="mt-3 text-sm text-gray-500">{{ customer.emailAddress?.emailAddress }}</p>
      </div>
      <p v-if="error" class="mt-6 text-sm text-red-600">{{ error }}</p>

      <button class="mt-10 border border-bb-text px-8 py-3 text-xs font-bold tracking-widest text-bb-text hover:border-bb-blue hover:text-bb-blue" @click="signOut">
        {{ t('auth.logout') }}
      </button>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCustomerAuth } from '../composables/useCustomerAuth'

const router = useRouter()
const { t } = useI18n()
const { customer, loading, error, isAuthenticated, fetchCustomer, logout } = useCustomerAuth()

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
})
</script>
