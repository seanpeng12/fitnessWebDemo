<!-- I'll refine the product display to be more compact and suitable for a grid -->
<template>
  <div class="product-card border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col">
    <!-- Error State -->
    <div v-if="error" class="p-4 text-red-600">
      <p>Could not load product.</p>
      <button @click="fetchProductData" class="text-sm underline">Try Again</button>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !product" class="p-4 text-center">
      <p>Loading...</p>
    </div>

    <!-- Product Content -->
    <div v-if="product" class="flex flex-col h-full">
      <!-- Image -->
      <div class="relative">
        <img :src="activeImageUrl" :alt="activeImageAlt" class="w-full aspect-square object-cover" />
      </div>

      <!-- Info -->
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-2xl font-bold" style="font-family: 'Barlow Condensed', sans-serif;">{{ product.title }}</h3>
        <p v-if="selectedVariant" class="mt-2 text-xl font-semibold text-[#DC2626]">
          {{ formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode) }}
        </p>

        <!-- Variant Selector -->
        <div v-if="product.variants.edges.length > 1" class="mt-4 flex-grow">
          <label for="variant-select-{{ product.id }}" class="sr-only">Select Variant</label>
          <select :id="'variant-select-' + product.id" v-model="selectedVariantId" class="w-full p-2 border border-gray-300 rounded-md">
            <option
              v-for="variant in product.variants.edges"
              :key="variant.node.id"
              :value="variant.node.id"
            >
              {{ variant.node.title }}
            </option>
          </select>
        </div>
        
        <div class="mt-auto pt-4">
          <!-- Buy Now Button -->
          <button
            @click="handleBuyNow"
            :disabled="isCheckoutLoading"
            class="w-full bg-[#16A34A] text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:opacity-50"
          >
            {{ isCheckoutLoading ? 'Processing...' : 'Buy Now' }}
          </button>
          <p v-if="checkoutError" class="text-red-600 text-sm mt-2">{{ checkoutError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useShopify } from '../composables/useShopify';

const props = defineProps({
  productHandle: {
    type: String,
    required: true,
  },
});

const { product, loading, error, fetchProductByHandle, createCart } = useShopify();

const selectedVariantId = ref(null);
const isCheckoutLoading = ref(false);
const checkoutError = ref(null);

const activeImageUrl = computed(() => {
  if (!product.value) return 'https://placehold.co/600x400?text=Loading';
  const variantImage = selectedVariant.value?.image?.url;
  // Use variant image if it exists, otherwise fallback to the first product image
  return variantImage || product.value.images.edges[0]?.node.url || 'https://placehold.co/600x400?text=No+Image';
});

const activeImageAlt = computed(() => {
    if (!product.value) return 'Product image';
    return selectedVariant.value?.image?.altText || product.value.images.edges[0]?.node.altText || product.value.title;
});


const selectedVariant = computed(() => {
  if (!product.value) return null;
  return product.value.variants.edges.find(
    (edge) => edge.node.id === selectedVariantId.value
  )?.node;
});

const formatPrice = (amount, currencyCode) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

const handleBuyNow = async () => {
  if (!selectedVariantId.value) {
    checkoutError.value = "Please select a variant.";
    return;
  }
  isCheckoutLoading.value = true;
  checkoutError.value = null;
  const checkoutUrl = await createCart(selectedVariantId.value, 1);
  if (checkoutUrl) {
    window.location.href = checkoutUrl;
  } else {
    checkoutError.value = "Could not create checkout. Please try again.";
  }
  isCheckoutLoading.value = false;
};

const fetchProductData = () => {
  fetchProductByHandle(props.productHandle);
};

onMounted(fetchProductData);

watch(product, (newProduct) => {
  if (newProduct && newProduct.variants.edges.length > 0) {
    selectedVariantId.value = newProduct.variants.edges[0].node.id;
  }
}, { immediate: true });
</script>