<!-- src/components/PageHeader.vue -->
<template>
  <header class="sticky top-0 z-50 bg-white border-b border-[#E8E3DE]">
    <!-- Top Blue Bar -->
    <div class="bg-[#3A3A3A] text-white text-[9px] tracking-[0.2em] py-2 px-6 text-center font-bold uppercase">
      {{ t('header.version') }}
    </div>
    
    <!-- Main Header -->
    <div class="py-4 px-6 lg:px-12">
      <div class="max-w-screen-2xl mx-auto flex justify-between items-center lg:grid lg:grid-cols-3">
        
        <!-- Left: Logo (Simple Router Link) -->
        <div class="flex min-w-0 items-center justify-start">
          <router-link to="/" class="group flex min-w-0 items-center gap-2">
            <img src="/logo.png" alt="Trinity Coffee Roaster" class="h-8 w-6 flex-none object-contain transition-transform group-hover:scale-105">
            <span class="flex h-8 flex-col items-start justify-between text-[12px] font-semibold uppercase leading-[10px] tracking-[0.05em] text-bb-text sm:hidden" aria-hidden="true">
              <span>Trinity</span>
              <span>Coffee</span>
              <span>Roaster</span>
            </span>
            <span class="hidden whitespace-nowrap text-lg font-medium uppercase tracking-tighter text-bb-text sm:inline">Trinity Coffee Roaster</span>
          </router-link>
        </div>

        <!-- Center: Navigation -->
        <nav class="hidden lg:flex items-center justify-center space-x-12 text-[11px] font-bold tracking-[0.3em] text-bb-text uppercase">
          <router-link :to="{ path: '/', hash: '#shop' }" class="hover:text-bb-blue transition-colors">{{ t('header.shop') }}</router-link>
          <router-link to="/story" class="hover:text-bb-blue transition-colors">{{ t('header.story') }}</router-link>
        </nav>

        <!-- Right: Utility Icons -->
        <div class="flex flex-none items-center justify-end space-x-4 text-bb-text sm:space-x-6">
          <router-link to="/login" :aria-label="t('header.login')" class="flex flex-col items-center space-y-1 group">
            <svg class="w-5 h-5 group-hover:text-bb-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0"></path></svg>
            <span class="hidden xs:block text-[8px] font-bold tracking-widest uppercase">{{ t('header.login') }}</span>
          </router-link>
          <button :aria-label="t('header.search')" class="hidden lg:flex flex-col items-center space-y-1 group">
            <svg class="w-5 h-5 group-hover:text-bb-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span class="hidden xs:block text-[8px] font-bold tracking-widest uppercase">{{ t('header.search') }}</span>
          </button>
          <button :aria-label="t('header.cart')" class="flex flex-col items-center space-y-1 group relative" @click="isOpen = true">
            <svg class="w-5 h-5 group-hover:text-bb-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span class="hidden xs:block text-[8px] font-bold tracking-widest uppercase">{{ t('header.cart') }}</span>
            <span v-if="totalQuantity" class="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-bb-blue px-1 text-[8px] font-bold text-white">{{ totalQuantity }}</span>
          </button>

          <button
            :aria-label="t('header.language')"
            class="min-w-10 border border-[#D8CEC5] px-2 py-1 text-[9px] font-bold tracking-wider hover:border-bb-blue hover:text-bb-blue transition-colors"
            @click="toggleLocale"
          >
            {{ locale === 'zh-TW' ? 'EN' : '中文' }}
          </button>

          <!-- Mobile Menu Button -->
          <button :aria-label="t('header.openMenu')" @click="isMobileMenuOpen = true" class="lg:hidden p-1 hover:text-bb-blue transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16m-16 6h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-white z-[60] flex flex-col p-8 overflow-y-auto">
        <button :aria-label="t('header.closeMenu')" @click="isMobileMenuOpen = false" class="self-end p-2 mb-12 hover:text-bb-blue transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <nav class="flex flex-col space-y-10 text-xl font-light tracking-[0.3em] uppercase">
          <button class="flex items-center gap-4 text-left" :aria-label="t('header.search')">
            <svg class="h-6 w-6 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path></svg>
            <span>{{ t('header.search') }}</span>
          </button>
          <router-link to="/#shop" @click="isMobileMenuOpen = false">{{ t('header.shop') }}</router-link>
          <router-link to="/story" @click="isMobileMenuOpen = false">{{ t('header.story') }}</router-link>
          
          <div class="pt-10 border-t border-[#E8E3DE] flex flex-col space-y-6">
            <button
              v-if="isAuthenticated"
              type="button"
              class="mobile-nav-item self-start opacity-0 delay-100 text-xs font-bold tracking-widest"
              @click="handleLogout"
            >
              {{ t('auth.logout') }}
            </button>
            <template v-else>
              <router-link to="/login" @click="isMobileMenuOpen = false" class="mobile-nav-item opacity-0 delay-100 text-xs font-bold tracking-widest">{{ t('header.login') }}</router-link>
              <router-link to="/login" @click="isMobileMenuOpen = false" class="mobile-nav-item opacity-0 delay-200 text-xs font-bold tracking-widest">{{ t('header.join') }}</router-link>
            </template>
          </div>
        </nav>
      </div>
    </transition>
    
    <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black/20 z-[55] lg:hidden"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from '../i18n';
import { useCart } from '../composables/useCart';
import { useCustomerAuth } from '../composables/useCustomerAuth';

const isMobileMenuOpen = ref(false);
const { t, locale } = useI18n();
const { isOpen, totalQuantity, refreshCart } = useCart();
const { isAuthenticated, logout } = useCustomerAuth();
const toggleLocale = () => {
  setLocale(locale.value === 'zh-TW' ? 'en' : 'zh-TW');
  refreshCart();
};
const handleLogout = async () => {
  isMobileMenuOpen.value = false;
  try { await logout(); } catch { /* The local session is already cleared. */ }
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.slide-enter-active, .slide-leave-active { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

.mobile-nav-item { animation: itemFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes itemFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.delay-100 { animation-delay: 0.15s; }
.delay-200 { animation-delay: 0.22s; }

@media (max-width: 380px) { .xs\:block { display: none; } }
</style>
