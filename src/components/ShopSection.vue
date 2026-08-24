<!-- src/components/ShopSection.vue -->
<template>
  <section id="shop" class="py-24 bg-[#F5F3F0] border-t border-[#E8E3DE]">
    <div class="max-w-screen-2xl mx-auto px-6 lg:px-12">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div class="max-w-2xl">
          <span class="text-[10px] font-bold tracking-[0.3em] text-[#6B9A9B] uppercase mb-4 inline-block">{{ t('shop.eyebrow') }}</span>
          <h2 class="text-3xl font-light tracking-tight text-bb-text mb-4 uppercase">{{ t('shop.title') }}</h2>
          <p class="text-[#9D8B7E] font-light leading-relaxed">
            {{ t('shop.description') }}
          </p>
        </div>
        <div class="mt-8 md:mt-0">
          <label class="relative">
            <span class="sr-only">{{ t('shop.categoryLabel') }}</span>
            <select
              v-model="selectedProductType"
              class="category-select min-w-36 appearance-none border-0 border-b border-[#B8ADA3] bg-transparent py-2 pl-0 pr-8 text-xs font-medium tracking-[0.12em] text-bb-text outline-none transition-colors hover:border-bb-blue focus:border-bb-blue"
            >
              <option value="">{{ t('shop.allCategories') }}</option>
              <option v-for="type in productTypes" :key="type" :value="type">{{ type }}</option>
            </select>
            <svg class="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8D8177]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 9 6 6 6-6" />
            </svg>
          </label>
        </div>
      </div>
      
      <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16">
        <ProductDisplay
          v-for="product in filteredProducts"
          :key="product.id"
          :product-handle="product.handle"
          :product-data="product"
        />
      </div>

      <p v-if="loading" class="text-center text-sm text-[#9D8B7E]">{{ t('shop.loading') }}</p>
      <p v-else-if="error" class="text-center text-sm text-red-600">{{ error }}</p>
      <p v-else-if="filteredProducts.length === 0" class="text-center text-sm text-[#9D8B7E]">{{ t('shop.empty') }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ProductDisplay from './ProductDisplay.vue';
import { useShopify } from '../composables/useShopify';

defineEmits(['select-product']);

const { products, productTypes, loading, error, fetchAllProducts } = useShopify();
const { t, locale } = useI18n();
const selectedProductType = ref('');

const filteredProducts = computed(() => {
  if (!selectedProductType.value) return products.value;
  return products.value.filter((product) => product.productType === selectedProductType.value);
});

watch(locale, () => {
  selectedProductType.value = '';
  fetchAllProducts();
}, { immediate: true });
</script>
