<template>
  <div class="flex min-h-[65vh] items-center justify-center bg-[#F7F5F2] px-6">
    <section class="w-full max-w-md border border-[#DED7D0] bg-white px-8 py-12 text-center">
      <div v-if="completing" class="mx-auto mb-6 h-8 w-8 animate-spin rounded-full border-2 border-[#D8CEC5] border-t-bb-blue"></div>
      <h1 class="text-xl font-light text-bb-text">{{ completing ? t('auth.completing') : t('auth.loginFailed') }}</h1>
      <p v-if="!completing && error" class="mt-5 text-sm leading-6 text-red-600">{{ error }}</p>
      <router-link v-if="!completing" to="/login" class="mt-8 inline-block bg-bb-blue px-8 py-3 text-xs font-bold text-white">
        {{ t('auth.tryAgain') }}
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCustomerAuth } from '../composables/useCustomerAuth'

const router = useRouter()
const { t } = useI18n()
const { handleCallback, error } = useCustomerAuth()
const completing = ref(true)

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`)
  if (await handleCallback(params)) {
    router.replace('/account')
  } else {
    completing.value = false
  }
})
</script>
