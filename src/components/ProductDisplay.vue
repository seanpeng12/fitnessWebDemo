<!-- src/components/ProductDisplay.vue -->
<template>
  <div class="group flex flex-col h-full bg-white transition-all duration-500">
    <!-- Image -->
    <div 
      class="relative overflow-hidden bg-[#F7F7F7] aspect-[4/5] flex items-center justify-center p-8 mb-6 cursor-pointer"
      @click="$emit('select', productHandle)"
    >
      <img 
        v-if="product" 
        :src="activeImageUrl" 
        :alt="activeImageAlt" 
        class="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
      />
      <div v-else-if="loading" class="animate-pulse bg-gray-200 w-full h-full"></div>
      <div v-else class="text-gray-400 font-light italic">Product not found</div>
      
      <!-- Quick View / Hover Action -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button 
          @click.stop="$emit('select', productHandle)" 
          class="bg-white text-bb-text px-8 py-3 text-xs font-semibold tracking-widest uppercase shadow-sm border border-gray-100 hover:bg-bb-blue hover:text-white transition-all"
        >
          View Details
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div v-if="product" class="flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <h3 
          class="text-lg font-normal tracking-tight text-bb-text group-hover:text-bb-blue transition-colors cursor-pointer"
          @click="$emit('select', productHandle)"
        >
          {{ product.title }}
        </h3>
      </div>
      
      <p v-if="selectedVariant" class="text-sm font-medium text-gray-500 mb-4">
        {{ formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) }}
      </p>

      <!-- Variant Select (Compact) -->
      <div v-if="product.variants.edges.length > 1" class="mt-auto">
        <select v-model="selectedVariantId" class="w-full bg-transparent border-b border-gray-100 py-2 text-xs font-light text-gray-400 focus:outline-none focus:border-bb-blue cursor-pointer uppercase tracking-widest">
          <option v-for="v in product.variants.edges" :key="v.node.id" :value="v.node.id">
            {{ v.node.title }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useShopify } from '../composables/useShopify';

const props = defineProps({ productHandle: { type: String, required: true } });
const { product, loading, fetchProductByHandle, createCart } = useShopify();

const selectedVariantId = ref(null);
const isCheckoutLoading = ref(false);

const activeImageUrl = computed(() => {
  if (!product.value) return '';
  const variantImage = selectedVariant.value?.image?.url;
  return variantImage || product.value.images.edges[0]?.node.url || '';
});

const activeImageAlt = computed(() => {
  if (!product.value) return 'Product image';
  return selectedVariant.value?.image?.altText || product.value.images.edges[0]?.node.altText || product.value.title;
});

const selectedVariant = computed(() => {
  if (!product.value) return null;
  return product.value.variants.edges.find((edge) => edge.node.id === selectedVariantId.value)?.node;
});

const formatPrice = (amount, currencyCode) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

const handleBuyNow = async () => {
  if (!selectedVariantId.value) return;
  isCheckoutLoading.value = true;
  const checkoutUrl = await createCart(selectedVariantId.value, 1);
  if (checkoutUrl) window.location.href = checkoutUrl;
  isCheckoutLoading.value = false;
};

onMounted(() => fetchProductByHandle(props.productHandle));

watch(product, (newProduct) => {
  if (newProduct && newProduct.variants.edges.length > 0) {
    selectedVariantId.value = newProduct.variants.edges[0].node.id;
  }
}, { immediate: true });
</script>
