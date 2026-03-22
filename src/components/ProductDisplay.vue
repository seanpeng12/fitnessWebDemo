<!-- src/components/ProductDisplay.vue -->
<template>
  <div class="group flex flex-col h-full bg-white transition-all duration-500">
    <!-- Image Area (Link to Detail) -->
    <router-link 
      :to="`/products/${productHandle}`"
      class="relative overflow-hidden bg-[#F7F7F7] aspect-[4/5] flex items-center justify-center p-8 mb-6 cursor-pointer"
    >
      <img 
        v-if="product" 
        :src="activeImageUrl" 
        :alt="activeImageAlt" 
        class="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
      />
      <div v-else-if="loading" class="animate-pulse bg-gray-200 w-full h-full"></div>
      <div v-else class="text-gray-400 font-light italic text-[10px]">Product not found</div>
      
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span class="bg-white text-bb-text px-8 py-3 text-[10px] font-bold tracking-widest uppercase shadow-sm border border-gray-100">
          View Details
        </span>
      </div>
    </router-link>

    <!-- Info Area -->
    <div v-if="product" class="flex flex-col flex-grow">
      <router-link :to="`/products/${productHandle}`" class="mb-2">
        <h3 class="text-sm font-normal tracking-tight text-bb-text group-hover:text-bb-blue transition-colors cursor-pointer uppercase">
          {{ product.title }}
        </h3>
      </router-link>
      
      <p v-if="selectedVariant" class="text-xs font-medium text-gray-500 mb-4">
        {{ formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) }}
      </p>

      <!-- Buy Button -->
      <button 
        @click="handleBuyNow" 
        class="mt-auto w-full border border-gray-100 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-bb-blue hover:text-white transition-all"
      >
        Quick Purchase
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useShopify } from '../composables/useShopify';

const props = defineProps({ productHandle: { type: String, required: true } });
const { product, loading, fetchProductByHandle, createCart } = useShopify();

const selectedVariantId = ref(null);

const activeImageUrl = computed(() => {
  if (!product.value) return '';
  return product.value.images.edges[0]?.node.url || '';
});

const activeImageAlt = computed(() => {
  if (!product.value) return '';
  return product.value.title;
});

const selectedVariant = computed(() => {
  if (!product.value) return null;
  return product.value.variants.edges[0]?.node;
});

const formatPrice = (amount, currencyCode) => {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: currencyCode }).format(amount);
};

const handleBuyNow = async () => {
  if (!selectedVariant.value) return;
  const checkoutUrl = await createCart(selectedVariant.value.id, 1);
  if (checkoutUrl) window.location.href = checkoutUrl;
};

onMounted(() => fetchProductByHandle(props.productHandle));
</script>
