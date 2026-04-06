<!-- src/components/ShopSection.vue -->
<template>
  <section id="shop" class="py-24 bg-[#F5F3F0] border-t border-[#E8E3DE]">
    <div class="max-w-screen-2xl mx-auto px-6 lg:px-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div class="max-w-2xl">
          <span class="text-[10px] font-bold tracking-[0.3em] text-[#6B9A9B] uppercase mb-4 inline-block">Collection</span>
          <h2 class="text-3xl font-light tracking-tight text-bb-text mb-4 uppercase">Coffee Collections</h2>
          <p class="text-[#9D8B7E] font-light leading-relaxed">
            From our signature blends to rare single-origin beans, find your perfect cup.
          </p>
        </div>
        <a href="#shop" class="mt-6 md:mt-0 text-sm font-semibold tracking-widest uppercase border-b-2 border-bb-text pb-1 hover:text-bb-blue hover:border-bb-blue transition-all">
          View All
        </a>
      </div>
      
      <!-- Ensure the handles below match the "URL and handle" in your Shopify admin -->
      <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16">
        <!-- Update: Using actual handles existing in your Shopify store -->
        <ProductDisplay product-handle="product_1" />
        <ProductDisplay product-handle="product_2" />
        <ProductDisplay product-handle="product_3" />
        <ProductDisplay product-handle="product_4" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductDisplay from './ProductDisplay.vue';
defineEmits(['select-product']);
</script>
