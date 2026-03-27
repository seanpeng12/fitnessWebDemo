<!-- src/components/PageHeader.vue -->
<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-100">
    <!-- Top Blue Bar -->
    <div class="bg-[#00AEEF] text-white text-[9px] tracking-[0.2em] py-2 px-6 text-center font-bold uppercase">
      NEW PAGE 2026.03.27 LAUNCH v2
    </div>
    
    <!-- Main Header -->
    <div class="py-4 px-6 lg:px-12">
      <div class="max-w-screen-2xl mx-auto flex justify-between items-center lg:grid lg:grid-cols-3">
        
        <!-- Left: Logo (Simple Router Link) -->
        <div class="flex items-center justify-start">
          <router-link to="/" class="flex items-center space-x-2 group">
            <svg class="w-6 h-8 text-bb-blue transition-transform group-hover:scale-105" viewBox="0 0 40 50" fill="currentColor">
              <path d="M20 0C25 0 30 5 30 15C30 25 25 35 20 50C15 35 10 25 10 15C10 5 15 0 20 0Z" />
            </svg>
            <span class="text-base sm:text-lg font-medium tracking-tighter text-bb-text whitespace-nowrap uppercase">BLUE BOTTLE STYLE</span>
          </router-link>
        </div>

        <!-- Center: Navigation -->
        <nav class="hidden lg:flex items-center justify-center space-x-12 text-[11px] font-bold tracking-[0.3em] text-bb-text uppercase">
          <router-link :to="{ path: '/', hash: '#shop' }" class="hover:text-bb-blue transition-colors">SHOP</router-link>
          <router-link :to="{ path: '/', hash: '#blog' }" class="hover:text-bb-blue transition-colors">OUR STORY</router-link>
        </nav>

        <!-- Right: Utility Icons -->
        <div class="flex items-center justify-end space-x-4 sm:space-x-6 text-bb-text">
          <button class="flex flex-col items-center space-y-1 group">
            <svg class="w-5 h-5 group-hover:text-bb-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span class="hidden xs:block text-[8px] font-bold tracking-widest uppercase">SEARCH</span>
          </button>
          <button class="flex flex-col items-center space-y-1 group relative">
            <svg class="w-5 h-5 group-hover:text-bb-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span class="hidden xs:block text-[8px] font-bold tracking-widest uppercase">CART</span>
          </button>

          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = true" class="lg:hidden p-1 hover:text-bb-blue transition-colors">
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
        <button @click="isMobileMenuOpen = false" class="self-end p-2 mb-12 hover:text-bb-blue transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <nav class="flex flex-col space-y-10 text-xl font-light tracking-[0.3em] uppercase">
          <router-link to="/#shop" @click="isMobileMenuOpen = false">SHOP</router-link>
          <router-link to="/#blog" @click="isMobileMenuOpen = false">OUR STORY</router-link>
          
          <div class="pt-10 border-t border-gray-100 flex flex-col space-y-6">
            <a href="#" class="mobile-nav-item opacity-0 delay-100 text-xs font-bold tracking-widest">LOGIN</a>
            <a href="#" class="mobile-nav-item opacity-0 delay-200 text-xs font-bold tracking-widest">JOIN US</a>
          </div>
        </nav>
      </div>
    </transition>
    
    <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black/20 z-[55] lg:hidden"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
const isMobileMenuOpen = ref(false);
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
