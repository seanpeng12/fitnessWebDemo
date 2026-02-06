<!-- src/components/ShopSection.vue -->
<template>
  <section id="shop" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-[#DC2626]" style="font-family: 'Barlow Condensed', sans-serif;">SHOP OUR TOP PRODUCTS</h2>
        <p class="mt-4 text-lg max-w-3xl mx-auto" style="font-family: 'Barlow', sans-serif;">High-quality gear and nutrition to supplement your fitness journey.</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        <!-- Product 1 -->
        <ProductDisplay product-handle="商品1" />
        <!-- Product 2 -->
        <ProductDisplay product-handle="商品2" />
        <!-- Product 3 -->
        <ProductDisplay product-handle="商品3" />
        <!-- Product 4 -->
        <ProductDisplay product-handle="商品4" />
        <!-- Product 5 -->
        <ProductDisplay product-handle="商品5" />
        <!-- Product 6 -->
        <ProductDisplay product-handle="商品6" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductDisplay from './ProductDisplay.vue';
</script>
