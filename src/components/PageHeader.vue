<!-- src/components/PageHeader.vue -->
<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-100">
    <!-- Top Blue Bar -->
    <div class="bg-[#00AEEF] text-white text-[9px] tracking-[0.2em] py-2 px-6 text-center font-bold uppercase">
      這是一個測試頁面 - 2026,3,23
    </div>
    <!-- Main Header -->
    <div class="py-4 px-6 lg:px-12">
      <!-- RWD Layout: Flex on mobile (space-between), Grid on desktop (3 columns) -->
      <div class="max-w-screen-2xl mx-auto flex justify-between items-center lg:grid lg:grid-cols-3">
        
        <!-- Left: Logo (Always Returns Home) -->
        <div class="flex items-center justify-start">
          <a href="#" @click.prevent="$emit('go-home')" class="flex items-center space-x-2 group">
            <svg class="w-6 h-8 text-bb-blue transition-transform group-hover:scale-105" viewBox="0 0 40 50" fill="currentColor">
              <path d="M20 0C25 0 30 5 30 15C30 25 25 35 20 50C15 35 10 25 10 15C10 5 15 0 20 0Z" />
            </svg>
            <span class="text-base sm:text-lg font-medium tracking-tighter text-bb-text whitespace-nowrap">BLUE BOTTLE STYLE</span>
          </a>
        </div>

        <!-- Center: Navigation (SHOP & OUR STORY) - Hidden on mobile, Grid-center on desktop -->
        <nav class="hidden lg:flex items-center justify-center space-x-12 text-[11px] font-bold tracking-[0.3em] text-bb-text uppercase">
          <a href="#shop" @click="$emit('go-home')" class="hover:text-bb-blue transition-colors">SHOP</a>
          <a href="#blog" @click="$emit('go-home')" class="hover:text-bb-blue transition-colors">OUR STORY</a>
        </nav>

        <!-- Right: Utility Icons - Always stays at the end -->
        <div class="flex items-center justify-end space-x-4 sm:space-x-6 text-bb-text">
          <button class="flex flex-col items-center space-y-1 group">
            <svg class="w-5 h-5 group-hover:text-bb-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span class="hidden xs:block text-[8px] font-bold tracking-widest uppercase">検索</span>
          </button>
          <button class="flex flex-col items-center space-y-1 group relative">
            <svg class="w-5 h-5 group-hover:text-bb-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span class="hidden xs:block text-[8px] font-bold tracking-widest uppercase">カート</span>
            <span class="absolute -top-1 -right-1 bg-bb-blue text-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center font-bold">0</span>
          </button>

          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="lg:hidden p-1 hover:text-bb-blue transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16m-16 6h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-white z-[60] flex flex-col p-8">
        <button @click="isMobileMenuOpen = false" class="self-end p-2 mb-12">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <nav class="flex flex-col space-y-10 text-xl font-light tracking-[0.3em] uppercase">
          <a href="#shop" @click="isMobileMenuOpen = false; $emit('go-home')">SHOP</a>
          <a href="#blog" @click="isMobileMenuOpen = false; $emit('go-home')">OUR STORY</a>
          <div class="pt-10 border-t border-gray-100 flex flex-col space-y-6">
            <a href="#" class="text-xs font-bold tracking-widest">LOGIN</a>
            <a href="#" class="text-xs font-bold tracking-widest">JOIN US</a>
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
const isMobileMenuOpen = ref(false);
defineEmits(['go-home']);
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

/* Helper for very small screens */
@media (max-width: 380px) {
  .xs\:block { display: none; }
}
</style>
