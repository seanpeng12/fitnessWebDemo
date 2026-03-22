<!-- src/components/ShopSection.vue -->
<template>
  <section id="shop" class="py-24 bg-white border-t border-gray-50">
    <div class="max-w-screen-2xl mx-auto px-6 lg:px-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-light tracking-tight text-bb-text mb-4 uppercase">Coffee Collections</h2>
          <p class="text-gray-500 font-light leading-relaxed">
            From our signature blends to rare single-origin beans, find your perfect cup.
          </p>
        </div>
        <a href="#" class="mt-6 md:mt-0 text-sm font-semibold tracking-widest uppercase border-b border-bb-text pb-1 hover:text-bb-blue hover:border-bb-blue transition-all">
          View All
        </a>
      </div>
      
      <!-- 請確保以下 handle 與您 Shopify 後台的 "URL and handle" 一致 -->
      <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16">
        <!-- 修正: 這裡改回您 Shopify 商店中實際存在的 handle -->
        <ProductDisplay product-handle="商品1" />
        <ProductDisplay product-handle="商品2" />
        <ProductDisplay product-handle="商品3" />
        <ProductDisplay product-handle="商品4" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductDisplay from './ProductDisplay.vue';
defineEmits(['select-product']);
</script>
