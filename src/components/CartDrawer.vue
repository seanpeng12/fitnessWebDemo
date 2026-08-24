<template>
  <teleport to="body">
    <transition name="cart-fade">
      <div v-if="isOpen" class="fixed inset-0 z-[90] bg-black/30" @click="isOpen = false"></div>
    </transition>
    <transition name="cart-slide">
      <aside
        v-if="isOpen"
        class="fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        :aria-label="t('cart.title')"
      >
        <header class="flex items-center justify-between border-b border-[#E8E3DE] px-6 py-5">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-bb-blue">Trinity Coffee Roaster</p>
            <h2 class="mt-1 text-xl font-light text-bb-text">{{ t('cart.title') }}（{{ totalQuantity }}）</h2>
          </div>
          <button :aria-label="t('cart.close')" class="p-2 text-bb-text hover:text-bb-blue" @click="isOpen = false">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.5" d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div v-if="loading && !lines.length" class="flex flex-1 items-center justify-center text-sm text-gray-400">
          {{ t('cart.loading') }}
        </div>
        <div v-else-if="!lines.length" class="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <svg class="mb-5 h-12 w-12 text-[#C9C0B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z" /></svg>
          <p class="text-lg font-light text-bb-text">{{ t('cart.empty') }}</p>
          <button class="mt-6 text-xs font-bold tracking-widest text-bb-blue" @click="isOpen = false">{{ t('cart.continueShopping') }}</button>
        </div>

        <div v-else class="flex-1 overflow-y-auto px-6">
          <article v-for="line in lines" :key="line.id" class="flex gap-4 border-b border-[#E8E3DE] py-6">
            <router-link :to="`/products/${line.merchandise.product.handle}`" class="h-24 w-20 flex-none bg-[#F5F3F0] p-2" @click="isOpen = false">
              <img v-if="lineImage(line)" :src="lineImage(line).url" :alt="lineImage(line).altText || line.merchandise.product.title" class="h-full w-full object-contain mix-blend-multiply" />
            </router-link>
            <div class="min-w-0 flex-1">
              <h3 class="truncate text-sm text-bb-text">{{ line.merchandise.product.title }}</h3>
              <p v-if="line.merchandise.title !== 'Default Title'" class="mt-1 text-[11px] text-gray-400">{{ line.merchandise.title }}</p>
              <p class="mt-2 text-xs font-medium text-[#9D8B7E]">{{ money(line.cost.totalAmount) }}</p>
              <div class="mt-4 flex items-center justify-between">
                <div class="flex h-8 items-center border border-[#DED7D0]">
                  <button :disabled="loading" class="h-full px-3 hover:bg-[#F5F3F0] disabled:opacity-40" @click="changeQuantity(line, -1)">−</button>
                  <span class="min-w-8 text-center text-xs">{{ line.quantity }}</span>
                  <button :disabled="loading" class="h-full px-3 hover:bg-[#F5F3F0] disabled:opacity-40" @click="changeQuantity(line, 1)">＋</button>
                </div>
                <button :disabled="loading" class="text-[10px] tracking-wider text-gray-400 underline hover:text-red-500 disabled:opacity-40" @click="remove(line.id)">{{ t('cart.remove') }}</button>
              </div>
            </div>
          </article>
        </div>

        <footer v-if="lines.length" class="border-t border-[#E8E3DE] bg-[#FAF9F7] px-6 py-6">
          <p v-if="error" class="mb-4 text-xs leading-5 text-red-600">{{ error }}</p>
          <div class="flex items-center justify-between text-sm text-bb-text">
            <span>{{ t('cart.subtotal') }}</span>
            <strong>{{ money(cart.cost.subtotalAmount) }}</strong>
          </div>
          <p class="mt-2 text-[10px] leading-5 text-gray-400">{{ t('cart.checkoutNotice') }}</p>
          <button
            :disabled="loading || checkingOut"
            :aria-busy="checkingOut"
            class="mt-5 inline-flex w-full items-center justify-center gap-3 bg-bb-blue py-4 text-xs font-bold tracking-[0.2em] text-white hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
            @click="checkout"
          >
            <span v-if="checkingOut" class="h-4 w-4 flex-none animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true"></span>
            <span>{{ t('cart.checkout') }}</span>
          </button>
        </footer>
      </aside>
    </transition>
    <transition name="cart-fade">
      <div
        v-if="checkingOut"
        class="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#F7F5F2] px-6 text-center"
        role="status"
        aria-live="polite"
      >
        <span class="h-10 w-10 animate-spin rounded-full border-[3px] border-[#D8CEC5] border-t-bb-blue" aria-hidden="true"></span>
        <p class="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-bb-text">{{ t('auth.redirecting') }}</p>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCart } from '../composables/useCart'

const { t, locale } = useI18n()
const { cart, lines, totalQuantity, loading, checkingOut, error, isOpen, loadCart, updateLine, removeLine, checkout } = useCart()

const money = ({ amount, currencyCode }) => new Intl.NumberFormat(
  locale.value === 'zh-TW' ? 'zh-TW' : 'en-US',
  { style: 'currency', currency: currencyCode },
).format(amount)

const changeQuantity = async (line, delta) => {
  try { await updateLine(line.id, line.quantity + delta) } catch { /* Displayed in drawer. */ }
}
const remove = async (lineId) => {
  try { await removeLine(lineId) } catch { /* Displayed in drawer. */ }
}
const lineImage = (line) => line.merchandise.image || line.merchandise.product.featuredImage

onMounted(loadCart)
</script>

<style scoped>
.cart-fade-enter-active, .cart-fade-leave-active { transition: opacity 0.25s ease; }
.cart-fade-enter-from, .cart-fade-leave-to { opacity: 0; }
.cart-slide-enter-active, .cart-slide-leave-active { transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.cart-slide-enter-from, .cart-slide-leave-to { transform: translateX(100%); }
</style>
