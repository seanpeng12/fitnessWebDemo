<template>
  <div class="min-h-[70vh] bg-[#F7F5F2] px-6 py-20">
    <section class="mx-auto max-w-md border border-[#DED7D0] bg-white px-7 py-10 text-center shadow-sm sm:px-10">
      <img src="/logo.png" alt="Trinity Coffee Roaster" class="mx-auto mb-6 h-12 w-auto" />
      <p class="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-bb-blue">{{ t('auth.customerAccount') }}</p>
      <h1 class="text-3xl font-light text-bb-text">{{ t('auth.loginTitle') }}</h1>
      <p class="mt-5 text-sm font-light leading-7 text-gray-500">{{ t('auth.loginDescription') }}</p>

      <div v-if="!isConfigured" class="mt-7 border border-amber-300 bg-amber-50 px-4 py-3 text-left text-xs leading-6 text-amber-800">
        {{ t('auth.notConfigured') }}
      </div>
      <div v-if="error" class="mt-7 border border-red-200 bg-red-50 px-4 py-3 text-left text-xs leading-6 text-red-700">
        {{ error }}
      </div>

      <button
        :disabled="loading || !isConfigured"
        class="mt-8 flex w-full items-center justify-center gap-3 bg-[#6B9A9B] px-6 py-4 text-xs font-bold tracking-wider text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        @click="startLogin"
      >
        <svg aria-hidden="true" class="h-5 w-5 rounded-full bg-white p-0.5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z"/>
          <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.38l-3.24-2.53c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.61A10 10 0 0 0 12 22Z"/>
          <path fill="#FBBC05" d="M6.39 13.92A6 6 0 0 1 6.07 12c0-.67.12-1.32.32-1.92V7.47H3.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.04 4.53l3.35-2.61Z"/>
          <path fill="#EA4335" d="M12 5.95c1.47 0 2.79.5 3.82 1.5l2.88-2.87A9.65 9.65 0 0 0 12 2a10 10 0 0 0-8.96 5.47l3.35 2.61C7.18 7.71 9.39 5.95 12 5.95Z"/>
        </svg>
        {{ loading ? t('auth.redirecting') : t('auth.continueLogin') }}
      </button>

      <p class="mt-5 text-[11px] font-light leading-5 text-gray-400">{{ t('auth.hostedNotice') }}</p>
      <router-link to="/" class="mt-8 inline-block text-[10px] font-bold tracking-widest text-gray-400 hover:text-bb-blue">
        {{ t('auth.backHome') }}
      </router-link>
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
const { login, loading, error, isAuthenticated, isConfigured } = useCustomerAuth()

const startLogin = async () => {
  try { await login() } catch { /* Error is displayed by the composable. */ }
}

onMounted(() => {
  if (isAuthenticated.value) router.replace('/account')
})
</script>
