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
      
      <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16">
        <ProductDisplay
          v-for="product in products"
          :key="product.id"
          :product-handle="product.handle"
          :product-data="product"
        />
      </div>

      <p v-if="loading" class="text-center text-sm text-[#9D8B7E]">Loading products...</p>
      <p v-else-if="error" class="text-center text-sm text-red-600">{{ error }}</p>
      <p v-else-if="products.length === 0" class="text-center text-sm text-[#9D8B7E]">No products available.</p>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import ProductDisplay from './ProductDisplay.vue';
import { useShopify } from '../composables/useShopify';

defineEmits(['select-product']);

const { products, loading, error, fetchAllProducts } = useShopify();

onMounted(fetchAllProducts);
</script>
