<!-- src/components/PageHeader.vue -->
<template>
  <header class="absolute top-0 left-0 right-0 z-20 py-4 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <a href="#" class="text-3xl font-bold text-white tracking-wider" style="font-family: 'Barlow Condensed', sans-serif;">bodyGoals</a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center">
        <a href="#features" class="text-white hover:text-gray-200 transition-colors duration-300">Features</a>
        <a href="#shop" class="text-white hover:text-gray-200 transition-colors duration-300 ml-6">Shop</a>
        <a href="#cta" class="ml-6 bg-[#16A34A] text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">Get Started</a>
      </nav>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="isMobileMenuOpen = true" class="text-white focus:outline-none">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Panel -->
    <div
      :class="['fixed top-0 right-0 h-full w-64 bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-xl z-30 transform transition-transform duration-300 ease-in-out', isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full']"
    >
      <div class="p-5">
        <button @click="isMobileMenuOpen = false" class="text-white float-right mb-4">
           <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <nav class="flex flex-col space-y-6 mt-10 text-lg">
          <a href="#features" @click="isMobileMenuOpen = false" class="text-white hover:text-gray-200">Features</a>
          <a href="#shop" @click="isMobileMenuOpen = false" class="text-white hover:text-gray-200">Shop</a>
          <a href="#cta" @click="isMobileMenuOpen = false" class="text-white hover:text-gray-200 bg-[#16A34A] text-center py-2 px-4 rounded-lg">Get Started</a>
        </nav>
      </div>
    </div>
    
    <!-- Overlay -->
    <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black opacity-50 z-20 md:hidden"></div>

  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);
</script>